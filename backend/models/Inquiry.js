// models/Inquiry.js
import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema({
  vehicleId: String,
  vehicleName: String,   // was "name" before — now matches route
  category: String,
  userName: String,      // ← ADD
  email: String,         // ← ADD
  message: String,       // ← ADD
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Inquiry", inquirySchema);