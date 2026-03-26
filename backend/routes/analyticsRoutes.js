import express from "express";
import mongoose from "mongoose";

const router = express.Router();

// 🔥 GET analytics data
router.get("/", async (req, res) => {
  try {
    const views = await mongoose.connection.db.collection("views").find().toArray();
    const inquiries = await mongoose.connection.db.collection("inquiries").find().toArray();

    res.json({ views, inquiries });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE VIEW
router.post("/view", async (req, res) => {
    await mongoose.connection.db.collection("views").insertOne(req.body);
    res.send("View saved");
  });
  
  // SAVE INQUIRY
  router.post("/inquiry", async (req, res) => {
    await mongoose.connection.db.collection("inquiries").insertOne(req.body);
    res.send("Inquiry saved");
  });

export default router;