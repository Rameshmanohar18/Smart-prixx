import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import CompareBar from './components/layout/CompareBar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

// Placeholder pages for routes not yet built
function ComingSoon({ title }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="text-6xl mb-4">🚧</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
      <p className="text-gray-500">This page is coming soon.</p>
    </div>
  )
}

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Navbar />
          <div className="flex-1 pb-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/search" element={<ComingSoon title="Search Results" />} />
              <Route path="/compare" element={<ComingSoon title="Compare Products" />} />
              <Route path="/wishlist" element={<ComingSoon title="My Wishlist" />} />
              <Route path="/profile" element={<ComingSoon title="My Profile" />} />
              <Route path="/news" element={<ComingSoon title="News & Reviews" />} />
              <Route path="/news/:slug" element={<ComingSoon title="Article" />} />
              <Route path="/category/:slug" element={<ComingSoon title="Category" />} />
              <Route path="/product/:slug" element={<ComingSoon title="Product Detail" />} />
              <Route path="/deals" element={<ComingSoon title="Today's Deals" />} />
              <Route path="/notifications" element={<ComingSoon title="Notifications" />} />
              <Route path="/account" element={<ComingSoon title="Account Settings" />} />
              <Route path="/contact" element={<ComingSoon title="Contact Us" />} />
              <Route path="*" element={<ComingSoon title="Page Not Found" />} />
            </Routes>
          </div>
          <CompareBar />
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  )
}
