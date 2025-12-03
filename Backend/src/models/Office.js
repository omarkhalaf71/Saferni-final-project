import mongoose from "mongoose"
const schema = new mongoose.Schema({
  office_name: { type: String, required: true },
  city: { type: String },
  phone_number: { type: String },
  address: { type: String },
  logo_url: { type: String },
  status: {
    type: String,
    enum: ["pending", "active", "suspended"],
    default: "pending",
  },
  created_at: { type: Date, default: Date.now },
})
export default mongoose.model("Office", schema)
