export const evaluateAchievements = (dailyTotals, goal) => {
  const achievements = []
  const totals = dailyTotals.map(d => d.total)
  const streak = calcStreak(dailyTotals, goal)
  if (totals.some(t => t >= goal)) achievements.push('Hydration Hero')
  if (streak >= 3) achievements.push('3-Day Streak')
  const weeklyGoal = dailyTotals.slice(0, 7).every(d => d.total >= goal)
  if (weeklyGoal) achievements.push('Weekly Goal Completed')
  return achievements
}

export const calcStreak = (dailyTotals, goal) => {
  let s = 0
  for (const d of dailyTotals) {
    if (d.total >= goal) s++
    else break
  }
  return s
}
