import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  office_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Office', required: true },
  bus_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  departure_city: { type: String, required: true },
  arrival_city: { type: String, required: true },
  departure_time: { type: Date, required: true },
  arrival_time: { type: Date },
  total_price: { type: Number, required: true },
  status: { type: String, enum: ['active','cancelled','finished'], default: 'active' },
  is_vip: { type: Boolean, default: false },
  vip_features: [{ type: String }],
  vip_price: { type: Number },
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model('Trip', schema);
