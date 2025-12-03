import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  trip_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Trip', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  seat_num: { type: String, required: true },
  status: { type: String, enum: ['confirmed','cancelled','pending'], default: 'pending' },
  qr_code: { type: String },
  payment_status: { type: String, enum: ['paid','unpaid','refunded'], default: 'unpaid' },
  proof_image: { type: String },
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model('Booking', schema);
