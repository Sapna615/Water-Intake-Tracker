import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001' })

export default function Blog() {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')

  const load = async () => {
    const res = await api.get('/blogs')
    setBlogs(res.data)
  }
  useEffect(() => { load() }, [])

  const submit = async () => {
    if (!title || !content) return
    await api.post('/blog', { title, content, author })
    setTitle(''); setContent(''); setAuthor('')
    await load()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            💧 Hydration Hub Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover the science of hydration, wellness tips, and inspiring stories to help you stay healthy and energized every day.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Blog Posts Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Latest Articles</h2>
            <div className="space-y-6">
              {blogs.map(b => (
                <article key={b._id} className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-100 dark:bg-blue-900 dark:text-blue-200 rounded-full">
                        Hydration Tips
                      </span>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(b.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </time>
                    </div>
                    <Link to={`/blog/${b._id}`} className="block group-hover:text-blue-600 transition-colors">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {b.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {b.content.slice(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                          {b.author ? b.author[0].toUpperCase() : 'A'}
                        </div>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {b.author || 'Anonymous'}
                        </span>
                      </div>
                      <Link 
                        to={`/blog/${b._id}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm group-hover:translate-x-1 transition-all"
                      >
                        Read More 
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
              {blogs.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-neutral-800 rounded-xl">
                  <div className="text-6xl mb-4">📝</div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No articles yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Be the first to share your hydration journey!</p>
                </div>
              )}
            </div>
          </div>

          {/* Write Blog Section */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Share Your Story</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Inspire others with your hydration journey</p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Article Title
                    </label>
                    <input 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-all" 
                      placeholder="Enter a compelling title..." 
                      value={title} 
                      onChange={e => setTitle(e.target.value)} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Your Name
                    </label>
                    <input 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-all" 
                      placeholder="John Doe" 
                      value={author} 
                      onChange={e => setAuthor(e.target.value)} 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Content
                    </label>
                    <textarea 
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:text-white h-48 resize-none transition-all" 
                      placeholder="Share your hydration tips, success stories, or wellness insights..." 
                      value={content} 
                      onChange={e => setContent(e.target.value)} 
                    />
                  </div>
                  
                  <button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={submit}
                    disabled={!title || !content}
                  >
                    Publish Article
                  </button>
                </div>
              </div>

              {/* Quick Tips Card */}
              <div className="mt-6 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 Quick Tip</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Drinking water first thing in the morning helps kickstart your metabolism and rehydrate your body after sleep.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
