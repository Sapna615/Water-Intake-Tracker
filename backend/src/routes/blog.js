import express from 'express'
import Blog from '../models/Blog.js'
import Comment from '../models/Comment.js'

const router = express.Router()

router.post('/blog', async (req, res) => {
  try {
    const { title, content, author } = req.body
    const b = await Blog.create({ title, content, author })
    res.json(b)
  } catch (err) {
    res.status(500).json({ message: 'Failed to create blog' })
  }
})

router.get('/blogs', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 })
  res.json(blogs)
})

router.get('/blog/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).json({ message: 'Not found' })
  const comments = await Comment.find({ blog: blog._id }).sort({ createdAt: -1 })
  res.json({ blog, comments })
})

router.post('/blog/:id/comments', async (req, res) => {
  const { author, content } = req.body
  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.status(404).json({ message: 'Not found' })
  const c = await Comment.create({ blog: blog._id, author, content })
  res.json(c)
})

export default router
