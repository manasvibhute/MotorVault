import express from "express";
import mongoose from "mongoose";
import Vehicle from "../models/vehicle.js";

const router = express.Router(); // ✅ THIS WAS MISSING

// GET all vehicles
router.get("/", async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ message: "Error fetching vehicles" });
  }
});

// GET single vehicle
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ Validate Mongo ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    res.json(vehicle);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ EXPORT
export default router;