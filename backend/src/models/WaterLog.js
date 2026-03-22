import mongoose from 'mongoose'

const WaterLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  },
  { timestamps: true }
)

export default mongoose.model('WaterLog', WaterLogSchema)
