import { useState } from 'react'
import { useWater } from '../context/WaterContext.jsx'
import { toast } from 'react-toastify'

export default function AddIntakeModal() {
  const { addIntake, error, isLoading } = useWater()
  const [open, setOpen] = useState(false)
  const [amount, setAmount] = useState('250')

  // In /frontend/src/components/AddIntakeModal.jsx
const submit = async (e) => {
    e?.preventDefault();
    const val = Number(amount);
    
    if (val <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    try {
      const result = await addIntake(val);
      if (result.success) {
        toast.success('Water intake added successfully!');
        setOpen(false);
        setAmount('250');
      } else {
        toast.error(result.error || 'Failed to add water intake');
      }
    } catch (err) {
      console.error('Error in submit:', err);
      toast.error('An error occurred. Please try again.');
    }
  };
  return (
    <>
      <button 
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        onClick={() => setOpen(true)}
      >
        Log Water Intake
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add Water Intake</h2>
            
            <form onSubmit={submit}>
              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (ml)
                </label>
                <input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter amount in ml"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false)
                    setAmount('250')
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Intake'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
