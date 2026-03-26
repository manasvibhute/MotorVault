// routes/compare.js
import express from "express";
import Compare from "../models/Compare.js";
import mongoose from "mongoose";

const router = express.Router();

// ✅ GET all
router.get("/", async (req, res) => {
  const items = await Compare.find().sort({ _id: -1 });
  res.json(items);
});

// ✅ ADD (max 3)
router.post("/", async (req, res) => {
  const items = await Compare.find();

  if (items.length >= 3) {
    return res.status(400).json({ message: "Max 3 vehicles allowed" });
  }

  const vehicleId = req.body?.vehicleId;
  const exists = items.find((v) => v.vehicleId === vehicleId);

  if (exists) {
    return res.status(400).json({ message: "Already added" });
  }

  const newItem = new Compare(req.body);
  await newItem.save();

  res.json({ item: newItem, count: items.length + 1 });
});

// ❌ DELETE one
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  // Accept either compare document _id OR vehicleId (Details uses vehicleId)
  const deletedByDocId = await Compare.findByIdAndDelete(id);
  if (deletedByDocId) {
    return res.json({ message: "Removed" });
  }

  await Compare.findOneAndDelete({ vehicleId: id });
  return res.json({ message: "Removed" });
});

// ❌ CLEAR ALL
router.delete("/", async (req, res) => {
  await Compare.deleteMany();
  res.json({ message: "Cleared" });
});

export default router;