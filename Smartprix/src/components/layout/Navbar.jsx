import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Search, ChevronDown, User, Bell, Heart, List,
  AlertCircle, Settings, Globe, X, Menu,
  Smartphone, Mail, Newspaper, BarChart2, ExternalLink
} from 'lucide-react'

// Social icon components (lucide-react doesn't include brand icons)
const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)
const TelegramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.238l3.553 1.184 1.184 3.553a2.25 2.25 0 0 0 3.938.39l1.614-2.42 3.553 2.662a2.25 2.25 0 0 0 3.506-1.51l2.25-13.5a2.25 2.25 0 0 0-2.202-2.562z"/>
  </svg>
)
const TwitterXIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
import { logout, selectUser } from '../../store/authSlice'
import { selectCompare } from '../../store/compareSlice'

// ── category nav items ──────────────────────────────────────────────────────
const NAV_CATEGORIES = [
  { label: 'News', path: '/news' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'How To', path: '/how-to' },
  {
    label: 'Mobiles', path: '/category/mobiles',
    sub: ['Smartphones', 'Feature Phones', 'Tablets', 'Mobile Accessories'],
  },
  {
    label: 'Tablets', path: '/category/tablets',
    sub: ['Android Tablets', 'iPads', 'Windows Tablets'],
  },
  {
    label: 'Laptops', path: '/category/laptops',
    sub: ['Gaming Laptops', 'Ultrabooks', 'Chromebooks', 'Workstations'],
  },
  {
    label: 'TVs', path: '/category/tvs',
    sub: ['OLED TVs', 'QLED TVs', '4K TVs', 'Smart TVs'],
  },
  {
    label: 'Electronics', path: '/category/electronics',
    sub: ['Cameras', 'Earphones', 'Smartwatches', 'Speakers'],
  },
  {
    label: 'Appliances', path: '/category/appliances',
    sub: ['ACs', 'Refrigerators', 'Washing Machines', 'Microwaves'],
  },
  {
    label: 'Computers', path: '/category/computers',
    sub: ['Desktops', 'Monitors', 'Keyboards', 'Mice'],
  },
  {
    label: 'Accessories', path: '/category/accessories',
    sub: ['Chargers', 'Cases', 'Screen Guards', 'Cables'],
  },
]

// ── profile dropdown items ──────────────────────────────────────────────────
const PROFILE_ITEMS = [
  { icon: User,        label: 'My Profile',    path: '/profile' },
  { icon: Bell,        label: 'Notifications', path: '/notifications' },
  { icon: Heart,       label: 'Likes',         path: '/likes' },
  { icon: List,        label: 'Lists',         path: '/lists' },
  { icon: AlertCircle, label: 'Price Alerts',  path: '/wishlist' },
  { icon: Settings,    label: 'Account',       path: '/account' },
  { icon: Globe,       label: 'India',         path: '/region', flag: true },
]

// ── "More" dropdown items ───────────────────────────────────────────────────
const MORE_ITEMS = [
  { icon: Mail,        label: 'Contact Us',  path: '/contact',                  external: false },
  { icon: FacebookIcon,    label: 'Facebook',    path: 'https://facebook.com',      external: true },
  { icon: TwitterXIcon,    label: 'X (Twitter)', path: 'https://twitter.com',       external: true },
  { icon: YoutubeIcon,     label: 'YouTube',     path: 'https://youtube.com',       external: true },
  { icon: InstagramIcon,   label: 'Instagram',   path: 'https://instagram.com',     external: true },
  { icon: TelegramIcon,    label: 'Telegram',    path: 'https://t.me',              external: true },
  { icon: Smartphone,  label: 'Android App', path: 'https://play.google.com',   external: true },
  { icon: Newspaper,   label: 'Google News', path: 'https://news.google.com',   external: true },
]

// ── reusable dropdown wrapper ───────────────────────────────────────────────
function Dropdown({ trigger, children, align = 'right' }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div onClick={() => setOpen((v) => !v)} className="cursor-pointer">
        {trigger(open)}
      </div>
      {open && (
        <div
          className={`absolute top-full mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[200px] ${align === 'right' ? 'right-0' : 'left-0'}`}
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}

// ── category mega-dropdown ──────────────────────────────────────────────────
function CategoryItem({ item }) {
  const [hover, setHover] = useState(false)
  if (!item.sub) {
    return (
      <Link to={item.path} className="text-sm text-white hover:text-yellow-300 whitespace-nowrap px-1 py-1 transition-colors">
        {item.label}
      </Link>
    )
  }
  return (
    <div
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <button className="flex items-center gap-0.5 text-sm text-white hover:text-yellow-300 whitespace-nowrap px-1 py-1 transition-colors">
        {item.label}
        <ChevronDown size={13} className={`transition-transform ${hover ? 'rotate-180' : ''}`} />
      </button>
      {hover && (
        <div className="absolute top-full left-0 z-50 bg-white rounded-lg shadow-xl border border-gray-100 py-2 min-w-[180px]">
          {item.sub.map((s) => (
            <Link
              key={s}
              to={`${item.path}/${s.toLowerCase().replace(/\s+/g, '-')}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              {s}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

// ── main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const compareItems = useSelector(selectCompare)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const avatarLetter = user?.name?.[0]?.toUpperCase() || 'U'

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* ── Top bar ── */}
      <div className="bg-[#1a3c6e] px-4">
        <div className="max-w-[1280px] mx-auto flex items-center justify-between h-14 gap-3">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <div className="bg-white rounded px-2 py-0.5">
              <span className="text-[#1a3c6e] font-bold text-xl tracking-tight">
                <span className="text-blue-500">s</span>martprix
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden sm:flex">
            <div className="flex w-full rounded-md overflow-hidden border border-gray-300 bg-white">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search with Smartprix"
                className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none"
              />
              <button
                type="submit"
                className="bg-white px-3 text-gray-500 hover:text-blue-600 transition-colors border-l border-gray-200"
              >
                <Search size={18} />
              </button>
            </div>
          </form>

          {/* Amazon promo banner */}
          <div className="hidden lg:flex items-center bg-[#ff9900] rounded px-3 py-1.5 text-xs font-bold text-black whitespace-nowrap">
            <span className="text-[#232f3e] mr-1">amazon</span>
            <span className="text-red-600">GREAT SUMMER SALE</span>
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-2">

            {/* Compare badge */}
            {compareItems.length > 0 && (
              <Link
                to="/compare"
                className="hidden sm:flex items-center gap-1 bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold px-2 py-1.5 rounded transition-colors"
              >
                <BarChart2 size={14} />
                Compare ({compareItems.length})
              </Link>
            )}

            {/* Profile dropdown */}
            {user ? (
              <Dropdown
                trigger={(open) => (
                  <div className={`flex items-center gap-1.5 text-white hover:text-yellow-300 transition-colors px-1 py-1 rounded ${open ? 'text-yellow-300' : ''}`}>
                    <div className="w-7 h-7 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold text-white">
                      {avatarLetter}
                    </div>
                    <span className="text-sm font-medium hidden sm:block">{user.name?.split(' ')[0]}</span>
                    <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                  </div>
                )}
              >
                {/* Profile header */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">
                      {avatarLetter}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </div>
                {/* Menu items */}
                {PROFILE_ITEMS.map(({ icon: Icon, label, path, flag }) => (
                  <Link
                    key={label}
                    to={path}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    {flag
                      ? <span className="text-base">🇮🇳</span>
                      : <Icon size={16} className="text-gray-500" />
                    }
                    {label}
                  </Link>
                ))}
                <div className="border-t border-gray-100 mt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <X size={16} />
                    Sign Out
                  </button>
                </div>
              </Dropdown>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="text-sm text-white hover:text-yellow-300 transition-colors px-2 py-1">
                  Login
                </Link>
                <Link to="/register" className="text-sm bg-white text-[#1a3c6e] font-semibold px-3 py-1.5 rounded hover:bg-yellow-300 transition-colors">
                  Register
                </Link>
              </div>
            )}

            {/* More dropdown */}
            <Dropdown
              trigger={(open) => (
                <div className={`flex items-center gap-1 text-white hover:text-yellow-300 transition-colors px-1 py-1 rounded ${open ? 'text-yellow-300' : ''}`}>
                  <span className="text-sm font-medium">More</span>
                  <ChevronDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
                </div>
              )}
            >
              {MORE_ITEMS.map(({ icon: Icon, label, path, external }) => (
                external ? (
                  <a
                    key={label}
                    href={path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Icon size={16} className="text-gray-500" />
                    {label}
                  </a>
                ) : (
                  <Link
                    key={label}
                    to={path}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                  >
                    <Icon size={16} className="text-gray-500" />
                    {label}
                  </Link>
                )
              ))}
            </Dropdown>

            {/* Mobile menu toggle */}
            <button
              className="sm:hidden text-white p-1"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Category nav bar ── */}
      <div className="bg-[#1e4a8a] px-4 hidden sm:block">
        <div className="max-w-[1280px] mx-auto flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
          {NAV_CATEGORIES.map((item) => (
            <CategoryItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* ── Mobile search + menu ── */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#1a3c6e] px-4 pb-4 space-y-3">
          <form onSubmit={handleSearch} className="flex rounded-md overflow-hidden border border-gray-300 bg-white">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search with Smartprix"
              className="flex-1 px-3 py-2 text-sm text-gray-800 outline-none"
            />
            <button type="submit" className="px-3 text-gray-500 border-l border-gray-200">
              <Search size={18} />
            </button>
          </form>
          <div className="flex flex-wrap gap-2">
            {NAV_CATEGORIES.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className="text-sm text-white bg-[#1e4a8a] px-3 py-1.5 rounded hover:bg-blue-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
