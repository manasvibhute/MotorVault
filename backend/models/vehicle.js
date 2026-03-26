import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  name: String,
  price: String,
  category: String,
  image: String,

  // Fields used by Details + Compare UI
  year: String,
  fuel: String,
  power: String, // Horsepower
  topSpeed: String,
  zeroToSixty: String, // e.g. "3.0s 0-60"
  transmission: String,
  drivetrain: String,
  seats: String,
  color: String,
  mileage: String,

  // Optional
  tag: String, // e.g. "Great Deal"
  description: String,
});

export default mongoose.model("Vehicle", vehicleSchema);