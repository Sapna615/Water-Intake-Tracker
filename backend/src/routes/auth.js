import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, dailyGoal, weight } = req.body
    const exists = await User.findOne({ email })
    if (exists) return res.status(400).json({ message: 'Email already registered' })
    const user = await User.create({ name, email, password, dailyGoal, weight })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, dailyGoal: user.dailyGoal, weight: user.weight } })
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' })
  }
})

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.body
//     const user = await User.findOne({ email })
//     if (!user) return res.status(400).json({ message: 'Invalid credentials' })
//     const match = await user.matchPassword(password)
//     if (!match) return res.status(400).json({ message: 'Invalid credentials' })
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
//     res.json({ token, user: { id: user._id, name: user.name, email: user.email, dailyGoal: user.dailyGoal, weight: user.weight } })
//   } catch (err) {
//     res.status(500).json({ message: 'Login failed' })
//   }
// })


// ...existing code...
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    const match = await user.matchPassword(password)
    if (!match) return res.status(400).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email, dailyGoal: user.dailyGoal, weight: user.weight } })
  } catch (err) {
    console.error(err) // <--- Add this line
    res.status(500).json({ message: 'Login failed' })
  }
})

export default router
