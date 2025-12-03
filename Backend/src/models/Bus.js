import mongoose from "mongoose"
const schema = new mongoose.Schema({
  office_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Office",
    required: true,
  },
  bus_number: { type: String },
  seat_count: { type: Number, default: 0 },
  layout_type: { type: String }, // e.g. "2+2", "2+1"
  model_name: { type: String },
})
export default mongoose.model("Bus", schema)
