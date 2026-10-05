import pool from "../config/db.js";

const columns = "id, name, type, seats, price_per_km AS pricePerKm, image, available";

export const getVehicles = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT ${columns} FROM vehicles`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getVehicleById = async (req, res) => {
  try {
    const [rows] = await pool.query(`SELECT ${columns} FROM vehicles WHERE id = ?`, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Vehicle not found" });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createVehicle = async (req, res) => {
  try {
    const { name, type, seats, pricePerKm, image } = req.body;
    const [result] = await pool.query(
      "INSERT INTO vehicles (name, type, seats, price_per_km, image) VALUES (?, ?, ?, ?, ?)",
      [name, type, seats, pricePerKm, image || null]
    );
    res.status(201).json({ id: result.insertId, name, type, seats, pricePerKm, image });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateVehicle = async (req, res) => {
  try {
    const { name, type, seats, pricePerKm, image, available } = req.body;
    const [result] = await pool.query(
      "UPDATE vehicles SET name=?, type=?, seats=?, price_per_km=?, image=?, available=? WHERE id=?",
      [name, type, seats, pricePerKm, image || null, available ?? true, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM vehicles WHERE id = ?", [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Vehicle not found" });
    res.json({ message: "Vehicle deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};