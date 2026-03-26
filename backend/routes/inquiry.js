import express from "express";
import Inquiry from "../models/Inquiry.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    // Destructure all fields being sent from Details.jsx
    const { vehicleId, name, category, userName, email, message } = req.body;

    const newInquiry = new Inquiry({
      vehicleId,
      vehicleName: name, // Be careful: match these to your Mongoose Schema fields
      category,
      userName,
      email,
      message
    });

    await newInquiry.save();
    res.status(201).json({ message: "Inquiry saved successfully" });
  } catch (err) {
    console.error("Inquiry Save Error:", err);
    res.status(500).json({ message: "Error saving inquiry" });
  }
});

export default router;