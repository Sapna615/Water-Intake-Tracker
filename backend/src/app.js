import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import connectDB from './config/db.js'

import waterRoutes from './routes/water.js'
import blogRoutes from './routes/blog.js'
import contactRoutes from './routes/contact.js'
import chatbotRoutes from './routes/chatbot.js'
import authRoutes from './routes/auth.js'
import userRoutes from './routes/user.js'

const app = express()
app.use(cors({ 
  origin: true, // Dynamically allow the origin that made the request
  credentials: true 
}))
app.use(express.json())
app.use(morgan('dev'))

connectDB()

app.get('/', (req, res) => {
  res.json({ message: 'Water Intake Tracker API' })
})

app.use('/auth', authRoutes)
app.use('/user', userRoutes)
app.use('/water', waterRoutes)
app.use('/', blogRoutes)
app.use('/contact', contactRoutes)
app.use('/chatbot', chatbotRoutes)

export default app
