import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  bus_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Bus', required: true },
  seat_num: { type: String },
  row: { type: Number },
  column: { type: Number },
  position: { type: String, enum: ['left','right','middle'], default: 'right' },
  status: { type: String, enum: ['available','blocked'], default: 'available' }
});
export default mongoose.model('Seat', schema);
