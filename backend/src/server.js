import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, '..', '.env') })

// Debug environment variables
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Missing')
console.log('MONGODB_URI:', process.env.MONGODB_URI ? 'Loaded' : 'Missing')

import app from './app.js'

const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
