import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import FloatingChatbot from './components/FloatingChatbot.jsx'
import Home from './pages/Home.jsx'
import Intake from './pages/Intake.jsx'
import Records from './pages/Records.jsx'
import About from './pages/About.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Contact from './pages/Contact.jsx'
import Chatbot from './pages/Chatbot.jsx'
import Products from './pages/Products.jsx'
import Videos from './pages/Videos.jsx'
import Profile from './pages/Profile.jsx'
import ReminderPopup from './components/ReminderPopup.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-blueSoft dark:bg-neutral-900">
      <Navbar />
      <ReminderPopup />
      <ToastContainer position="bottom-right" autoClose={3000} />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/records" element={<Records />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <Footer />
      <FloatingChatbot />
    </div>
  )
}
