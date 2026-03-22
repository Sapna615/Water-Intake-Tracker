import express from 'express'
import ContactMessage from '../models/ContactMessage.js'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body
    const saved = await ContactMessage.create({ name, email, message })
    res.json({ stored: saved, autoReply: 'Thanks for reaching out. We will get back to you soon.' })
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit contact' })
  }
})

export default router
