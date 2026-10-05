import express from "express";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import {
  getVehicles, getVehicleById, createVehicle, updateVehicle, deleteVehicle,
} from "../controllers/vehicleController.js";

const router = express.Router();

router.get("/", getVehicles);
router.get("/:id", getVehicleById);
router.post("/", protect, adminOnly, createVehicle);
router.put("/:id", protect, adminOnly, updateVehicle);
router.delete("/:id", protect, adminOnly, deleteVehicle);

export default router;