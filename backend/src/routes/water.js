import express from 'express'
import { protect } from '../middleware/auth.js'
import WaterLog from '../models/WaterLog.js'
import { evaluateAchievements, calcStreak } from '../utils/achievements.js'

const router = express.Router()

const todayKey = () => new Date().toISOString().slice(0, 10)

router.post('/add', protect, async (req, res) => {
  try {
    const { amount } = req.body
    if (!amount || amount <= 0) return res.status(400).json({ message: 'Amount required' })
    const date = todayKey()
    await WaterLog.create({ user: req.user._id, amount, date })
    const logs = await WaterLog.find({ user: req.user._id, date }).sort({ timestamp: 1 })
    const total = logs.reduce((s, l) => s + l.amount, 0)
    res.json({ date, total, goal: req.user.dailyGoal, remaining: Math.max(req.user.dailyGoal - total, 0), logs })
  } catch (err) {
    console.error('Error adding water log:', err)
    res.status(500).json({ message: 'Internal server error while adding water' })
  }
})

router.post('/reset', protect, async (req, res) => {
  const date = todayKey()
  await WaterLog.deleteMany({ user: req.user._id, date })
  res.json({ message: 'Today\'s intake reset successfully' })
})

router.get('/today', protect, async (req, res) => {
  const date = todayKey()
  const logs = await WaterLog.find({ user: req.user._id, date }).sort({ timestamp: 1 })
  const total = logs.reduce((s, l) => s + l.amount, 0)
  res.json({ date, total, goal: req.user.dailyGoal, remaining: Math.max(req.user.dailyGoal - total, 0), logs })
})

router.get('/history', protect, async (req, res) => {
  const logs = await WaterLog.find({ user: req.user._id }).sort({ date: -1 })
  const grouped = {}
  for (const l of logs) {
    grouped[l.date] = grouped[l.date] || []
    grouped[l.date].push(l)
  }
  const daily = Object.keys(grouped)
    .sort((a, b) => (a < b ? 1 : -1))
    .map(d => ({ date: d, total: grouped[d].reduce((s, l) => s + l.amount, 0), entries: grouped[d] }))
  res.json({ daily })
})

router.get('/stats', protect, async (req, res) => {
  const logs = await WaterLog.find({ user: req.user._id })
  const grouped = {}
  for (const l of logs) {
    grouped[l.date] = (grouped[l.date] || 0) + l.amount
  }
  const dailyTotals = Object.keys(grouped)
    .sort((a, b) => (a < b ? 1 : -1))
    .map(d => ({ date: d, total: grouped[d] }))
  const bestDay = dailyTotals.reduce((a, b) => (a.total >= b.total ? a : b), { date: null, total: 0 })
  const worstDay = dailyTotals.reduce((a, b) => (a.total <= b.total ? a : b), { date: null, total: Number.MAX_SAFE_INTEGER })
  const last30 = dailyTotals.slice(0, 30).reverse()
  const weeklyAvg = avgWeekly(dailyTotals)
  const achievements = evaluateAchievements(dailyTotals, req.user.dailyGoal)
  const streak = calcStreak(dailyTotals, req.user.dailyGoal)
  res.json({ bestDay, worstDay, last30, weeklyAvg, achievements, streak })
})

const avgWeekly = totals => {
  const weeks = {}
  for (const d of totals) {
    const dt = new Date(d.date)
    const key = isoWeekYear(dt) + '-W' + isoWeek(dt)
    weeks[key] = (weeks[key] || [])
    weeks[key].push(d.total)
  }
  return Object.keys(weeks)
    .sort()
    .map(k => ({ week: k, average: Math.round(weeks[k].reduce((s, v) => s + v, 0) / weeks[k].length) }))
}

const isoWeek = date => {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = tmp.getUTCDay() || 7
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(tmp.getUTCFullYear(), 0, 1))
  return Math.ceil(((tmp - yearStart) / 86400000 + 1) / 7)
}

const isoWeekYear = date => {
  const tmp = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = tmp.getUTCDay() || 7
  tmp.setUTCDate(tmp.getUTCDate() + 4 - dayNum)
  return tmp.getUTCFullYear()
}

export default router
