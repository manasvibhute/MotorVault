import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";   
import vehicleRoutes from "./routes/vehicleRoutes.js";  
import analyticsRoutes from "./routes/analyticsRoutes.js";
import compareRoutes from "./routes/compareRoutes.js";  
import inquiryRoutes from "./routes/inquiry.js";  

dotenv.config();
const app = express();
app.use((req, res, next) => {
  console.log(`📢 Incoming Request: ${req.method} ${req.url}`);
  next();
});
app.use(cors());
app.use(express.json()); // Essential for parsing the POST body

// ROUTES
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/compare", compareRoutes);
app.use("/api/inquiry", inquiryRoutes); // This must be the ONLY one for inquiries

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});