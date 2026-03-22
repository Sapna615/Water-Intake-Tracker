import ProgressBar from '../components/ProgressBar.jsx'
import AddIntakeModal from '../components/AddIntakeModal.jsx'
import { useWater } from '../context/WaterContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Intake() {
  const { today, resetToday, isLoading } = useWater()
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/profile" />
  }

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset today\'s intake?')) {
      await resetToday()
      toast.info('Today\'s intake has been reset.')
    }
  }

  const handleQuickAdd = async (amt) => {
    const result = await addIntake(amt)
    if (result.success) {
      toast.success(`${amt}ml added successfully!`)
    } else {
      toast.error(result.error)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Daily Water Intake</h1>
          <p className="text-gray-600 dark:text-gray-400">Track your progress and stay hydrated throughout the day.</p>
        </div>
        <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg">
          Goal: {today.goal} ml
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="flex justify-between items-end mb-6">
              <div>
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Total Intake</div>
                <div className="text-5xl font-black text-blue-600">{today.total} <span className="text-xl font-normal text-gray-400 uppercase">ml</span></div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Remaining</div>
                <div className="text-2xl font-bold text-gray-700 dark:text-gray-300">{today.remaining} ml</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <ProgressBar value={today.total} max={today.goal} />
              <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
                <span>0 ml</span>
                <span>{today.goal} ml</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <AddIntakeModal />
              <button 
                className="px-6 py-2 rounded-lg border-2 border-red-100 text-red-500 hover:bg-red-50 font-bold transition-colors disabled:opacity-50" 
                onClick={handleReset}
                disabled={isLoading || today.total === 0}
              >
                Reset Today
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
              Today's Timeline
            </h2>
            <div className="relative">
              {today.logs.length > 0 && (
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-100 dark:bg-gray-700"></div>
              )}
              <ul className="space-y-6 relative">
                {today.logs.map((l, idx) => (
                  <li key={idx} className="flex items-center gap-4 pl-10 relative">
                    <div className="absolute left-3 w-2.5 h-2.5 bg-blue-600 rounded-full ring-4 ring-blue-100 dark:ring-blue-900/30"></div>
                    <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-4 rounded-xl flex justify-between items-center">
                      <span className="font-bold text-gray-700 dark:text-gray-300">{new Date(l.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-lg font-black">+{l.amount} ml</span>
                    </div>
                  </li>
                ))}
                {today.logs.length === 0 && (
                  <div className="text-center py-10">
                    <div className="text-4xl mb-4">💧</div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No water logged yet today. Start hydrating!</p>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold text-lg mb-2">Hydration Tip</h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Drinking a glass of water right after waking up helps jumpstart your metabolism and rehydrates your body after a long night's sleep.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Add</h3>
            <div className="grid grid-cols-2 gap-3">
              {[250, 500].map(amt => (
                <button 
                  key={amt}
                  className="py-3 bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400 rounded-xl font-bold hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors border border-blue-100 dark:border-gray-600 disabled:opacity-50"
                  onClick={() => handleQuickAdd(amt)}
                  disabled={isLoading}
                >
                  +{amt}ml
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
