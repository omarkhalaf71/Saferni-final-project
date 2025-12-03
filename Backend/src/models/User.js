import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  full_name: { type: String, required: true },
  username: { type: String },
  phone: { type: String, unique: true, required: true },
  email: { type: String, unique: true, sparse: true },
  password_hash: { type: String, required: true },
  role: { type: String, enum: ['customer','officeEmployee','admin'], default: 'customer' },
  office_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Office', default: null },
  profile_image: { type: String },
  payment_method: { type: String },
  created_at: { type: Date, default: Date.now }
});
export default mongoose.model('User', schema);
