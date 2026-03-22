import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001' })

export default function BlogDetail() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')

  const load = async () => {
    const res = await api.get(`/blog/${id}`)
    setBlog(res.data.blog)
    setComments(res.data.comments)
  }
  useEffect(() => { load() }, [id])

  const addComment = async () => {
    if (!content) return
    await api.post(`/blog/${id}/comments`, { author, content })
    setAuthor(''); setContent('')
    await load()
  }

  if (!blog) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-300">Loading article...</p>
      </div>
    </div>
  )
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-neutral-900 dark:to-neutral-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Article Header */}
        <article className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
            <div className="flex items-center space-x-2 mb-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur rounded-full">
                Featured Article
              </span>
              <time className="text-sm opacity-90">
                {new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-full flex items-center justify-center text-white font-bold">
                {blog.author ? blog.author[0].toUpperCase() : 'A'}
              </div>
              <div>
                <p className="font-semibold">{blog.author || 'Anonymous Writer'}</p>
                <p className="text-sm opacity-75">Health & Wellness Contributor</p>
              </div>
            </div>
          </div>
          
          {/* Article Content */}
          <div className="p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {blog.content}
              </div>
            </div>
            
            {/* Article Footer */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {Math.ceil(blog.content.length / 500)} min read
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="mt-12">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Discussion ({comments.length})
            </h2>
            
            {/* Comments List */}
            <div className="space-y-4 mb-8">
              {comments.map(c => (
                <div key={c._id} className="flex space-x-3 p-4 bg-gray-50 dark:bg-neutral-700 rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    {c.author ? c.author[0].toUpperCase() : 'A'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{c.author || 'Anonymous'}</h4>
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </time>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{c.content}</p>
                  </div>
                </div>
              ))}
              {comments.length === 0 && (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">💬</div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No comments yet</h3>
                  <p className="text-gray-600 dark:text-gray-400">Be the first to share your thoughts on this article!</p>
                </div>
              )}
            </div>

            {/* Add Comment Form */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Join the Discussion</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:text-white transition-all" 
                    placeholder="Enter your name" 
                    value={author} 
                    onChange={e => setAuthor(e.target.value)} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Comment
                  </label>
                  <textarea 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-neutral-700 dark:text-white h-32 resize-none transition-all" 
                    placeholder="Share your thoughts on this article..." 
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                  />
                </div>
                <button 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={addComment}
                  disabled={!content}
                >
                  Post Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
