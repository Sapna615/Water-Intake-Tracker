import { useWater } from '../context/WaterContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'
import LineChart30Days from '../components/charts/LineChart30Days.jsx'
import WeeklyBarChart from '../components/charts/WeeklyBarChart.jsx'

export default function Records() {
  const { history, stats, isLoading } = useWater()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/profile" />
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Hydration Analytics</h1>
        <p className="text-gray-600 dark:text-gray-400">Deep dive into your drinking patterns and achievements.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Last 30 Days Intake</h3>
            <div className="h-80 w-full">
              <LineChart30Days data={stats.last30 || []} />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Weekly Performance</h3>
            <div className="h-80 w-full">
              <WeeklyBarChart data={stats.weeklyAvg || []} />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Quick Stats</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center text-2xl">🏆</div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Best Day</div>
                  <div className="text-lg font-black text-gray-900 dark:text-white">{stats.bestDay?.total || 0} ml <span className="text-xs font-normal text-gray-400">({stats.bestDay?.date || 'N/A'})</span></div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-2xl">🔥</div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Current Streak</div>
                  <div className="text-lg font-black text-gray-900 dark:text-white">{stats.streak || 0} Days</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Achievements</h3>
            <div className="grid grid-cols-1 gap-3">
              {(stats.achievements || []).map(a => (
                <div key={a} className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">✓</div>
                  <span className="text-sm font-bold text-blue-700 dark:text-blue-300">{a}</span>
                </div>
              ))}
              {(stats.achievements || []).length === 0 && (
                <div className="text-center py-6 text-gray-400 italic text-sm">No badges earned yet. Keep drinking!</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
        <div className="p-8 border-b border-gray-100 dark:border-gray-700">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Detailed History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50">
              <tr>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Date</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Daily Total</th>
                <th className="px-8 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {history.map(r => (
                <tr key={r.date} className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                  <td className="px-8 py-4 font-bold text-gray-700 dark:text-gray-300">{r.date}</td>
                  <td className="px-8 py-4">
                    <span className="text-lg font-black text-blue-600">{r.total}</span>
                    <span className="text-xs text-gray-400 ml-1">ml</span>
                  </td>
                  <td className="px-8 py-4">
                    {r.total >= (stats.goal || 2000) ? (
                      <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-black uppercase">Goal Met</span>
                    ) : (
                      <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-black uppercase">In Progress</span>
                    )}
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan="3" className="px-8 py-12 text-center text-gray-400 font-medium italic">No history data available yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
