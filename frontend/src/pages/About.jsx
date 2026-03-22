import { useState } from 'react'

export default function About() {
  const [activeTab, setActiveTab] = useState('mission')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-neutral-900 dark:to-neutral-800">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              💧 About HydrateTrack
            </h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
              Your intelligent companion for optimal hydration and wellness
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-1 inline-flex">
            {['mission', 'features', 'science'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Mission Tab */}
        {activeTab === 'mission' && (
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                At HydrateTrack, we believe that proper hydration is the foundation of optimal health and performance. Our mission is to make hydration tracking simple, engaging, and effective for everyone.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                We combine cutting-edge technology with scientific research to provide personalized hydration recommendations that adapt to your lifestyle, activity level, and environmental conditions.
              </p>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                <h3 className="font-bold text-blue-900 dark:text-blue-300 mb-3">Our Vision</h3>
                <p className="text-blue-800 dark:text-blue-200">
                  To create a world where everyone has the tools and knowledge to maintain optimal hydration, leading to improved health, performance, and quality of life.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Why Hydration Matters</h2>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-green-600 dark:text-green-400">🧠</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Brain Function</h4>
                    <p className="text-gray-600 dark:text-gray-300">Even mild dehydration can impair concentration, memory, and cognitive performance by up to 10%</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 dark:text-blue-400">💪</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Physical Performance</h4>
                    <p className="text-gray-600 dark:text-gray-300">Proper hydration maintains blood volume and ensures efficient oxygen delivery to muscles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-purple-600 dark:text-purple-400">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Energy Levels</h4>
                    <p className="text-gray-600 dark:text-gray-300">Dehydration is a common cause of fatigue and decreased productivity</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 dark:text-pink-400">🌟</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Skin Health</h4>
                    <p className="text-gray-600 dark:text-gray-300">Well-hydrated skin appears more plump, elastic, and youthful</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Tab */}
        {activeTab === 'features' && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Tracking</h3>
              <p className="text-gray-600 dark:text-gray-300">Intuitive water intake tracking with visual progress indicators and daily goals</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Personalized Goals</h3>
              <p className="text-gray-600 dark:text-gray-300">Custom hydration recommendations based on your weight, activity level, and climate</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Progress Analytics</h3>
              <p className="text-gray-600 dark:text-gray-300">Detailed insights into your hydration patterns with weekly and monthly reports</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🔔</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Smart Reminders</h3>
              <p className="text-gray-600 dark:text-gray-300">Intelligent notifications that adapt to your schedule and hydration needs</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Achievement System</h3>
              <p className="text-gray-600 dark:text-gray-300">Stay motivated with badges, streaks, and milestones for consistent hydration</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Cross-Platform</h3>
              <p className="text-gray-600 dark:text-gray-300">Access your hydration data anywhere with our responsive web and mobile apps</p>
            </div>
          </div>
        )}

        {/* Science Tab */}
        {activeTab === 'science' && (
          <div className="space-y-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">The Science Behind Hydration</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recommended Intake Formulas</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 dark:text-white">Basic Formula:</p>
                      <p className="text-gray-600 dark:text-gray-300">30–35 ml per kg of body weight daily</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 dark:text-white">Athletes:</p>
                      <p className="text-gray-600 dark:text-gray-300">40–50 ml per kg body weight</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-neutral-700 rounded-lg p-4">
                      <p className="font-semibold text-gray-900 dark:text-white">Hot Climates:</p>
                      <p className="text-gray-600 dark:text-gray-300">Add 500ml per hour of heat exposure</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Hydration Benefits</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Skin: Improved elasticity and clarity</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Energy: Reduced fatigue and better focus</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Weight: Supports satiety and metabolism</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Immunity: Optimized lymphatic function</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                      <span className="text-gray-600 dark:text-gray-300">Digestion: Prevents constipation and aids nutrient absorption</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Practical Hydration Tips</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-500 mt-1">💧</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Carry a reusable bottle</p>
                      <p className="text-gray-600 dark:text-gray-300">Keep water accessible at all times</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-500 mt-1">⏰</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Set hourly reminders</p>
                      <p className="text-gray-600 dark:text-gray-300">Build consistent hydration habits</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-500 mt-1">🍽️</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Drink with meals</p>
                      <p className="text-gray-600 dark:text-gray-300">Combine hydration with eating routines</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <span className="text-orange-500 mt-1">🍋</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Add natural flavors</p>
                      <p className="text-gray-600 dark:text-gray-300">Lemon, mint, or cucumber enhance taste</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-pink-500 mt-1">🌡️</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Monitor temperature</p>
                      <p className="text-gray-600 dark:text-gray-300">Room temperature water is easier to drink</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-cyan-500 mt-1">📊</span>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Track your progress</p>
                      <p className="text-gray-600 dark:text-gray-300">Visual tracking increases motivation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Scientific References</h3>
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <p className="font-semibold text-gray-900 dark:text-white">WHO Hydration Guidelines (2020)</p>
                  <p className="text-gray-600 dark:text-gray-300">World Health Organization recommendations for daily water intake</p>
                </div>
                <div className="border-l-4 border-green-500 pl-4">
                  <p className="font-semibold text-gray-900 dark:text-white">ACSM Position Stand on Hydration (2016)</p>
                  <p className="text-gray-600 dark:text-gray-300">American College of Sports Medicine guidelines for exercise and hydration</p>
                </div>
                <div className="border-l-4 border-purple-500 pl-4">
                  <p className="font-semibold text-gray-900 dark:text-white">Journal of Nutrition: Hydration and Cognitive Function (2019)</p>
                  <p className="text-gray-600 dark:text-gray-300">Research on water intake effects on mental performance and brain function</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
