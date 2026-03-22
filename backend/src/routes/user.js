import express from 'express'
import { protect } from '../middleware/auth.js'
import User from '../models/User.js'

const router = express.Router()

router.get('/profile', protect, async (req, res) => {
  res.json(req.user)
})

router.put('/profile', protect, async (req, res) => {
  const { name, dailyGoal, weight } = req.body
  req.user.name = name ?? req.user.name
  req.user.dailyGoal = dailyGoal ?? req.user.dailyGoal
  req.user.weight = weight ?? req.user.weight
  await req.user.save()
  res.json({ id: req.user._id, name: req.user.name, email: req.user.email, dailyGoal: req.user.dailyGoal, weight: req.user.weight })
})

export default router
