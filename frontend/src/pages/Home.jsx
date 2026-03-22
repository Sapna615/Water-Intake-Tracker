import AddIntakeModal from '../components/AddIntakeModal.jsx'
import ProgressBar from '../components/ProgressBar.jsx'
import { useWater } from '../context/WaterContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { Link } from 'react-router-dom'

const placeholder = (text) => `https://placehold.co/600x400?text=${encodeURIComponent(text)}`
const bottles = [
  { id: 1, name: 'HydroMax 1L', img: 'https://m.media-amazon.com/images/I/81oWtGtvHwL._AC_UF350,350_QL80_.jpg', price: '$19.99', link: 'https://www.amazon.com/s?k=hydrojug&crid=ZFH664C902XX&sprefix=hydroju%2Caps%2C338&ref=nb_sb_noss_2', desc: 'Durable BPA-free bottle with time marker.' },
  { id: 2, name: 'SteelFlow 750ml', img: 'https://m.media-amazon.com/images/I/51Da+TBexCL.jpg', price: '$24.99', link: 'https://www.amazon.com/s?k=steel+bottle&crid=1CVUZ6ZP5KT6&sprefix=steel+bottle%2Caps%2C355&ref=nb_sb_noss_1', desc: 'Insulated stainless steel for all-day cold.' },
  { id: 3, name: 'AquaFit 500ml', img: 'https://m.media-amazon.com/images/I/41qcXW8SSqL.jpg', price: '$15.99', link: 'https://www.amazon.com/s?k=aqua+fit&crid=1YEVP7THA3NME&sprefix=aqua+fit%2Caps%2C363&ref=nb_sb_noss_1', desc: 'Lightweight sports bottle with flip-top lid.' }
]

export default function Home() {
  const { today } = useWater()
  const { isAuthenticated } = useAuth()
  
  return (
    <div className="space-y-12 pb-12">
      <section className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 dark:text-white">
            Stay <span className="text-blue-600">Hydrated</span>, Stay Healthy
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
            Track your daily water intake, set goals, and achieve a healthier lifestyle with our easy-to-use tracker.
          </p>
          
          {isAuthenticated ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border border-blue-100 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700 dark:text-gray-300">Daily Progress</span>
                <span className="text-blue-600 font-bold">{Math.round((today.total / today.goal) * 100)}%</span>
              </div>
              <ProgressBar value={today.total} max={today.goal} />
              <div className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
                {today.total} ml of {today.goal} ml goal reached
              </div>
              <div className="mt-8">
                <AddIntakeModal />
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/profile" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full transition-all transform hover:scale-105 shadow-lg">
                Start Tracking Now
              </Link>
              <Link to="/about" className="px-8 py-3 bg-white dark:bg-gray-800 text-blue-600 border-2 border-blue-600 font-bold rounded-full hover:bg-blue-50 dark:hover:bg-gray-700 transition-all">
                Learn More
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Why Hydration Matters</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { title: 'Energy Boost', desc: 'Prevents fatigue and keeps you alert.' },
            { title: 'Clear Skin', desc: 'Flushes out toxins for a healthy glow.' },
            { title: 'Weight Loss', desc: 'Boosts metabolism and reduces hunger.' },
            { title: 'Immunity', desc: 'Helps your body fight off infections.' }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-b-4 border-blue-500 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-bold mb-2 text-blue-600">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12 bg-blue-600 rounded-3xl text-white shadow-2xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-4">Learn From Experts</h2>
            <p className="text-blue-100 mb-6">Watch our curated selection of educational videos to understand the science behind hydration.</p>
            {/* <Link to="/videos" className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-colors">
              Browse Videos
            </Link> */}
          </div>
          <div className="aspect-video p-4">
            <iframe className="w-full h-full rounded-2xl shadow-lg" src="https://www.youtube.com/embed/9iMGFqMmUFs" title="Educational" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Top Rated Bottles</h2>
        <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
          {bottles.map(b => (
            <div key={b.id} className="min-w-[300px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group border border-gray-100 dark:border-gray-700">
              <div className="relative overflow-hidden">
                <img src={b.img} alt={b.name} className="h-56 w-full object-cover transform group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" crossOrigin="anonymous" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{b.name}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">{b.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-extrabold text-blue-600">{b.price}</span>
                  <a href={b.link} className="px-4 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md" target="_blank" rel="noopener noreferrer">Buy Now</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-12 text-gray-900 dark:text-white">User Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { n: 'Alex Johnson', t: 'I feel more energetic tracking my water! This app changed my daily habits.', r: 5 },
              { n: 'Priya Sharma', t: 'The graphs keep me motivated. I love seeing my weekly progress.', r: 5 },
              { n: 'Sam Wilson', t: 'Simple, effective, and the chatbot tips are actually useful!', r: 4 }
            ].map((s, i) => (
              <div key={i} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg relative">
                <div className="text-4xl text-blue-200 absolute top-4 left-4 font-serif">“</div>
                <div className="mb-4 text-yellow-400">{'★'.repeat(s.r)}{'☆'.repeat(5-s.r)}</div>
                <p className="text-gray-600 dark:text-gray-400 italic mb-6 relative z-10">{s.t}</p>
                <div className="font-bold text-gray-900 dark:text-white">— {s.n}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
