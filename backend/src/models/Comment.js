import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema(
  {
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
    author: { type: String, default: 'Guest' },
    content: { type: String, required: true }
  },
  { timestamps: true }
)

export default mongoose.model('Comment', CommentSchema)
