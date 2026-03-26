// models/Compare.js
import mongoose from "mongoose";

const compareSchema = new mongoose.Schema({
  vehicleId: String,
  name: String,
  price: String,
  image: String,
  category: String,
  fuel: String,
  year: String,
  power: String, // Horsepower
  topSpeed: String,
  zeroToSixty: String,
  transmission: String,
  drivetrain: String,
  seats: String,
  color: String,
  mileage: String,
  tag: String,
});

export default mongoose.model("Compare", compareSchema);