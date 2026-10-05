import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  createBooking, getMyBookings, cancelBooking, getAllBookings, updateBookingStatus,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", protect, createBooking);
router.get("/my", protect, getMyBookings);
router.get("/", protect, adminOnly, getAllBookings);
router.put("/:id/cancel", protect, cancelBooking);
router.put("/:id/status", protect, adminOnly, updateBookingStatus);

export default router;