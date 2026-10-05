import pool from "../config/db.js";

export const createBooking = async (req, res) => {
  try {
    const { vehicleId, pickup, dropoff, date, time, distanceKm } = req.body;

    const [vehicles] = await pool.query(
      "SELECT * FROM vehicles WHERE id = ? AND available = TRUE", [vehicleId]
    );
    if (vehicles.length === 0) {
      return res.status(400).json({ message: "Vehicle not available" });
    }

    const [clash] = await pool.query(
      `SELECT id FROM bookings
       WHERE vehicle_id = ? AND booking_date = ? AND booking_time = ?
       AND status IN ('pending', 'confirmed')`,
      [vehicleId, date, time]
    );
    if (clash.length > 0) {
      return res.status(400).json({ message: "Vehicle already booked for that time" });
    }

    const totalPrice = Math.round(500 + Number(distanceKm) * Number(vehicles[0].price_per_km));

    const [result] = await pool.query(
      `INSERT INTO bookings
       (user_id, vehicle_id, pickup, dropoff, booking_date, booking_time, distance_km, total_price)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [req.user.id, vehicleId, pickup, dropoff, date, time, distanceKm, totalPrice]
    );

    res.status(201).json({ id: result.insertId, totalPrice, status: "pending" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT b.*, v.name AS vehicle_name, v.type AS vehicle_type, v.image AS vehicle_image
       FROM bookings b JOIN vehicles v ON b.vehicle_id = v.id
       WHERE b.user_id = ? ORDER BY b.created_at DESC`,
      [req.user.id]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM bookings WHERE id = ?", [req.params.id]);
    const booking = rows[0];
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.user_id !== req.user.id) {
      return res.status(403).json({ message: "Not your booking" });
    }
    if (!["pending", "confirmed"].includes(booking.status)) {
      return res.status(400).json({ message: "Cannot cancel this booking" });
    }
    await pool.query("UPDATE bookings SET status = 'cancelled' WHERE id = ?", [req.params.id]);
    res.json({ message: "Booking cancelled" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllBookings = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT b.*, u.name AS user_name, u.email AS user_email, u.phone AS user_phone,
              v.name AS vehicle_name, v.type AS vehicle_type
       FROM bookings b
       JOIN users u ON b.user_id = u.id
       JOIN vehicles v ON b.vehicle_id = v.id
       ORDER BY b.created_at DESC`
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "confirmed", "completed", "cancelled"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const [result] = await pool.query(
      "UPDATE bookings SET status = ? WHERE id = ?", [status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Status updated", status });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};