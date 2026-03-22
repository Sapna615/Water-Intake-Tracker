import express from 'express'

const router = express.Router()

const responseFor = (prompt, weight) => {
  const p = (prompt || '').toLowerCase()
  if (p.includes('how much') || p.includes('recommended')) {
    const w = Number(weight) || 70
    const ml = Math.round(w * 35)
    return `Based on a weight of ${w} kg, a recommended daily intake is about ${ml} ml. Adjust for activity and climate.`
  }
  if (p.includes('tips')) {
    return 'Carry a bottle, set hourly reminders, drink with meals, flavor water with lemon, track intake.'
  }
  if (p.includes('calculate')) {
    const nums = p.match(/(\d+\.?\d*)/g)
    const w = nums ? Number(nums[0]) : 70
    const ml = Math.round(w * 35)
    return `${w} kg → ~${ml} ml per day.`
  }
  return 'Hydration supports energy, cognition, skin, and metabolism. Ask me about tips or intake.'
}

router.post('/ask', async (req, res) => {
  const { prompt, weight } = req.body
  const answer = responseFor(prompt, weight)
  res.json({ answer })
})

router.get('/sample', (req, res) => {
  res.json({
    samples: [
      { q: 'How much water should I drink?', a: responseFor('how much', 70) },
      { q: 'Tips to stay hydrated?', a: responseFor('tips') },
      { q: 'Calculate my recommended intake by weight', a: responseFor('calculate 72') }
    ]
  })
})

export default router
