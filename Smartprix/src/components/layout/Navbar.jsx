
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Search, ChevronDown, User, Bell, Heart, List,
  AlertCircle, Settings, Globe, X, Menu,
  Smartphone, Mail, Newspaper, BarChart2,
} from 'lucide-react'
import { logout, selectUser } from '../../store/authSlice'
import { selectCompare } from '../../store/compareSlice'

// ─── Brand SVG Icons ──────────────────────────────────────────────────────────

function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function YoutubeIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  )
}

function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function TelegramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.498c-1.019.401-1.01 1.61.001 2.004l4.014 1.49 1.547 4.773c.193.594.876.818 1.37.452l2.26-1.652 4.076 3.004c.552.406 1.34.124 1.51-.524l3.5-14.5a1.5 1.5 0 0 0-1.756-1.76zm-3.023 4.26l-7.5 7.083-1.19-3.672 8.69-3.41z" />
    </svg>
  )
}

function TwitterXIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// ─── Navigation Categories ────────────────────────────────────────────────────

const NAV_CATEGORIES = [
  { label: 'News', path: '/news' },
  { label: 'Reviews', path: '/reviews' },
  { label: 'How To', path: '/how-to' },
  {
    label: 'Mobiles',
    path: '/category/mobiles',
    mega: {
      columns: [
        {
          title: 'Popular Brands',
          items: [
            { icon: '📱', label: 'Samsung', path: '/category/mobiles/samsung' },
            { icon: '📱', label: 'Apple', path: '/category/mobiles/apple' },
            { icon: '📱', label: 'OnePlus', path: '/category/mobiles/oneplus' },
            { icon: '📱', label: 'Xiaomi', path: '/category/mobiles/xiaomi' },
            { icon: '📱', label: 'Vivo', path: '/category/mobiles/vivo' },
            { icon: '📱', label: 'Oppo', path: '/category/mobiles/oppo' },
          ],
        },
        {
          title: 'By Budget',
          items: [
            { icon: '💰', label: 'Under ₹10,000', path: '/category/mobiles?maxPrice=10000' },
            { icon: '💰', label: 'Under ₹15,000', path: '/category/mobiles?maxPrice=15000' },
            { icon: '💰', label: 'Under ₹20,000', path: '/category/mobiles?maxPrice=20000' },
            { icon: '💰', label: 'Under ₹30,000', path: '/category/mobiles?maxPrice=30000' },
            { icon: '💰', label: 'Under ₹50,000', path: '/category/mobiles?maxPrice=50000' },
          ],
        },
      ],
    },
  },
  {
    label: 'Tablets',
    path: '/category/tablets',
    sub: ['Android Tablets', 'iPads', 'Windows Tablets'],
  },
  {
    label: 'Laptops',
    path: '/category/laptops',
    mega: {
      columns: [
        {
          title: 'Categories',
          items: [
            { icon: '💻', label: 'Gaming Laptops', path: '/category/laptops/gaming' },
            { icon: '💻', label: 'Ultrabooks', path: '/category/laptops/ultrabooks' },
            { icon: '💻', label: 'Chromebooks', path: '/category/laptops/chromebooks' },
            { icon: '💻', label: 'Workstations', path: '/category/laptops/workstations' },
            { icon: '💻', label: '2-in-1 Laptops', path: '/category/laptops/2in1' },
          ],
        },
        {
          title: 'By Brand',
          items: [
            { icon: '💻', label: 'Dell', path: '/category/laptops/dell' },
            { icon: '💻', label: 'HP', path: '/category/laptops/hp' },
            { icon: '💻', label: 'Lenovo', path: '/category/laptops/lenovo' },
            { icon: '💻', label: 'Apple MacBook', path: '/category/laptops/apple' },
            { icon: '💻', label: 'Asus', path: '/category/laptops/asus' },
          ],
        },
      ],
    },
  },
  {
    label: 'TVs',
    path: '/category/tvs',
    sub: ['OLED TVs', 'QLED TVs', '4K TVs', 'Smart TVs', 'LED TVs'],
  },
  {
    label: 'Electronics',
    path: '/category/electronics',
    mega: {
      columns: [
        {
          title: null,
          items: [
            { icon: '📷', label: 'Cameras', path: '/category/cameras' },
            { icon: '⌚', label: 'Smart Watches', path: '/category/smartwatches' },
            { icon: '💪', label: 'Fitness Bands', path: '/category/fitness-bands' },
            { icon: '🥽', label: 'VR Headsets', path: '/category/vr-headsets' },
          ],
        },
        {
          title: 'Gaming',
          items: [
            { icon: '🎮', label: 'Gaming Consoles', path: '/category/gaming-consoles' },
            { icon: '🕹️', label: 'Gamepads and Joysticks', path: '/category/gamepads' },
          ],
        },
      ],
    },
  },
  {
    label: 'Appliances',
    path: '/category/appliances',
    sub: ['ACs', 'Refrigerators', 'Washing Machines', 'Microwaves', 'Dishwashers'],
  },
  {
    label: 'Computers',
    path: '/category/computers',
    mega: {
      columns: [
        {
          title: 'Categories',
          items: [
            { icon: '💻', label: 'Laptops', path: '/category/laptops' },
            { icon: '🖥️', label: 'Computers', path: '/category/computers' },
          ],
        },
        {
          title: 'Computer Components',
          items: [
            { icon: '🔧', label: 'RAM', path: '/category/ram' },
            { icon: '⚙️', label: 'Processors (CPU)', path: '/category/processors' },
            { icon: '🔌', label: 'PSU', path: '/category/psu' },
            { icon: '🔧', label: 'MotherBoards', path: '/category/motherboards' },
            { icon: '🎮', label: 'Graphics Cards', path: '/category/graphics-cards' },
            { icon: '💾', label: 'Internal Hard Drives', path: '/category/hard-drives' },
          ],
        },
        {
          title: 'Other Accessories',
          items: [
            { icon: '🖥️', label: 'Monitors', path: '/category/monitors' },
            { icon: '🖨️', label: 'Printers', path: '/category/printers' },
            { icon: '📽️', label: 'Projectors', path: '/category/projectors' },
            { icon: '🌐', label: 'Routers & Modems', path: '/category/routers' },
          ],
        },
        {
          title: 'Audio and Video',
          items: [
            { icon: '🎬', label: 'Home Theaters', path: '/category/home-theaters' },
            { icon: '🎧', label: 'Computer Headphones', path: '/category/computer-headphones' },
            { icon: '🔊', label: 'Computer Speakers', path: '/category/computer-speakers' },
          ],
        },
      ],
    },
  },
  {
    label: 'Accessories',
    path: '/category/accessories',
    mega: {
      columns: [
        {
          title: 'Mobile Accessories',
          items: [
            { icon: '🎧', label: 'Headphones And Earphones', path: '/category/earphones' },
            { icon: '📱', label: 'Cases And Covers', path: '/category/cases' },
            { icon: '⌚', label: 'Smart Watches', path: '/category/smartwatches' },
            { icon: '💾', label: 'Memory Cards', path: '/category/memory-cards' },
            { icon: '🔊', label: 'Speakers', path: '/category/speakers' },
            { icon: '🔋', label: 'Power Banks', path: '/category/power-banks' },
            { icon: '🔌', label: 'Chargers', path: '/category/chargers' },
          ],
          footer: { label: 'All Mobile Accessories →', path: '/category/mobile-accessories' },
        },
        {
          title: 'Laptop Accessories',
          items: [
            { icon: '💾', label: 'Pen Drives', path: '/category/pen-drives' },
            { icon: '💽', label: 'External Hard Disks', path: '/category/external-hard-disks' },
            { icon: '⌨️', label: 'Keyboards', path: '/category/keyboards' },
            { icon: '🖱️', label: 'Mouse', path: '/category/mouse' },
            { icon: '📷', label: 'Webcams', path: '/category/webcams' },
            { icon: '📱', label: 'Graphical Tablets', path: '/category/graphical-tablets' },
            { icon: '🔋', label: 'Laptop Batteries', path: '/category/laptop-batteries' },
          ],
          footer: { label: 'All Laptop Accessories →', path: '/category/laptop-accessories' },
        },
      ],
    },
  },
  {
    label: 'Auto',
    path: '/category/auto',
    autoSub: [
      { icon: '🚗', label: 'Cars', path: '/category/cars' },
      { icon: '🏍️', label: 'Bikes', path: '/category/bikes' },
      { icon: '🛵', label: 'Scooters', path: '/category/scooters' },
    ],
  },
  {
    label: 'Flights',
    path: '/flights',
    badge: true,
  },
]

// ─── Profile & More Items ─────────────────────────────────────────────────────

const PROFILE_ITEMS = [
  { icon: User, label: 'My Profile', path: '/profile' },
  { icon: Bell, label: 'Notifications', path: '/notifications' },
  { icon: Heart, label: 'Likes', path: '/likes' },
  { icon: List, label: 'Lists', path: '/lists' },
  { icon: AlertCircle, label: 'Price Alerts', path: '/wishlist' },
  { icon: Settings, label: 'Account', path: '/account' },
  { icon: Globe, label: 'India', path: '/region', flag: true },
]

const MORE_ITEMS = [
  { icon: Mail, label: 'Contact Us', path: '/contact', external: false },
  { icon: FacebookIcon, label: 'Facebook', path: 'https://facebook.com', external: true },
  { icon: TwitterXIcon, label: 'X (Twitter)', path: 'https://twitter.com', external: true },
  { icon: YoutubeIcon, label: 'YouTube', path: 'https://youtube.com', external: true },
  { icon: InstagramIcon, label: 'Instagram', path: 'https://instagram.com', external: true },
  { icon: TelegramIcon, label: 'Telegram', path: 'https://t.me', external: true },
  { icon: Smartphone, label: 'Android App', path: 'https://play.google.com', external: true },
  { icon: Newspaper, label: 'Google News', path: 'https://news.google.com', external: true },
]

// ─── MegaDropdown ─────────────────────────────────────────────────────────────

function MegaDropdown({ columns, onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-2xl border border-gray-100">
      <div className="flex gap-6 p-4">
        {columns.map((col, ci) => (
          <div key={ci} className="min-w-[150px]">
            {col.title && (
              <p className="text-blue-700 font-semibold text-xs uppercase tracking-wide mb-2">
                {col.title}
              </p>
            )}
            <ul>
              {col.items.map((item, ii) => (
                <li key={ii}>
                  <Link
                    to={item.path}
                    onClick={onClose}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded transition-colors whitespace-nowrap"
                  >
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {col.footer && (
              <Link
                to={col.footer.path}
                onClick={onClose}
                className="text-blue-600 text-xs font-medium hover:underline mt-2 block px-3"
              >
                {col.footer.label}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── SimpleDropdown ───────────────────────────────────────────────────────────

function SimpleDropdown({ items, onClose }) {
  return (
    <div className="bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[160px]">
      {items.map((item, i) => {
        const isString = typeof item === 'string'
        const label = isString ? item : item.label
        const path = isString ? '#' : item.path
        const icon = isString ? null : item.icon
        return (
          <Link
            key={i}
            to={path}
            onClick={onClose}
            className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
          >
            {icon && <span className="text-base">{icon}</span>}
            {label}
          </Link>
        )
      })}
    </div>
  )
}

// ─── CategoryNavItem ──────────────────────────────────────────────────────────

function CategoryNavItem({ item }) {
  const [hovered, setHovered] = useState(false)

  const closeDropdown = () => setHovered(false)

  const hasDropdown = item.mega || item.sub || item.autoSub

  return (
    <div
      className="relative h-10 flex items-center"
      onMouseEnter={() => hasDropdown && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Trigger */}
      {item.badge ? (
        <Link
          to={item.path}
          className="relative flex items-center gap-0.5 text-sm text-white hover:text-yellow-300 whitespace-nowrap px-2 py-1 h-10 transition-colors"
        >
          {item.label}
          <span className="w-2 h-2 bg-green-400 rounded-full absolute -top-0.5 -right-1" />
        </Link>
      ) : hasDropdown ? (
        <button
          className="flex items-center gap-0.5 text-sm text-white hover:text-yellow-300 whitespace-nowrap px-2 py-1 h-10 transition-colors bg-transparent border-0 cursor-pointer"
        >
          {item.label}
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${hovered ? 'rotate-180' : ''}`}
          />
        </button>
      ) : (
        <Link
          to={item.path}
          className="flex items-center gap-0.5 text-sm text-white hover:text-yellow-300 whitespace-nowrap px-2 py-1 h-10 transition-colors"
        >
          {item.label}
        </Link>
      )}

      {/* Dropdown panels */}
      {hovered && item.mega && (
        <div className="absolute top-full left-0 z-50 pt-1">
          <MegaDropdown columns={item.mega.columns} onClose={closeDropdown} />
        </div>
      )}

      {hovered && item.sub && (
        <div className="absolute top-full left-0 z-50 pt-1">
          <SimpleDropdown items={item.sub} onClose={closeDropdown} />
        </div>
      )}

      {hovered && item.autoSub && (
        <div className="absolute top-full right-0 z-50 pt-1">
          <SimpleDropdown items={item.autoSub} onClose={closeDropdown} />
        </div>
      )}
    </div>
  )
}

// ─── TopBarDropdown ───────────────────────────────────────────────────────────

function TopBarDropdown({ trigger, children }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer select-none"
      >
        {trigger}
      </div>
      {open && (
        <div className="absolute top-full right-0 mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-100 py-1 min-w-[200px]">
          {children({ close: () => setOpen(false) })}
        </div>
      )}
    </div>
  )
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const compareItems = useSelector(selectCompare)

  const [searchQuery, setSearchQuery] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : 'U'

  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* ── TOP BAR ── */}
      <div className="bg-[#1a3c6e]">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center h-[52px] gap-3">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 mr-2">
            <div className="bg-white rounded px-2 py-0.5 flex items-center">
              <span className="font-bold text-xl tracking-tight">
                <span className="text-blue-500">s</span>
                <span className="text-[#1a3c6e]">martprix</span>
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-[380px] hidden sm:flex">
            <div className="flex w-full rounded overflow-hidden border border-gray-300 bg-white h-9">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search with Smartprix"
                className="flex-1 px-3 text-sm text-gray-800 outline-none"
              />
              <button
                type="submit"
                className="px-3 text-gray-400 hover:text-blue-600 border-l border-gray-200 bg-white"
              >
                <Search size={17} />
              </button>
            </div>
          </form>

          {/* Amazon promo */}
          <div className="hidden lg:flex items-center bg-[#febd69] rounded px-3 py-1.5 whitespace-nowrap ml-2">
            <span className="text-[#232f3e] font-bold text-xs mr-1">amazon</span>
            <span className="text-red-700 font-bold text-xs">GREAT SUMMER SALE</span>
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Compare badge */}
          {compareItems.length > 0 && (
            <Link
              to="/compare"
              className="hidden sm:flex items-center gap-1 text-white text-xs hover:text-yellow-300 transition-colors"
            >
              <BarChart2 size={15} />
              <span>Compare</span>
              <span className="bg-yellow-400 text-[#1a3c6e] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {compareItems.length}
              </span>
            </Link>
          )}

          {/* Auth area */}
          {user ? (
            <TopBarDropdown
              trigger={
                <div className="flex items-center gap-1.5 text-white text-sm hover:text-yellow-300 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-blue-400 text-white text-xs font-bold flex items-center justify-center">
                    {avatarLetter}
                  </div>
                  <span className="hidden sm:inline">{user.name?.split(' ')[0]}</span>
                  <ChevronDown size={13} />
                </div>
              }
            >
              {({ close }) => (
                <>
                  {PROFILE_ITEMS.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={close}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                      >
                        <Icon size={15} className="text-gray-400" />
                        <span>{item.label}</span>
                        {item.flag && <span className="ml-auto">🇮🇳</span>}
                      </Link>
                    )
                  })}
                  <div className="border-t border-gray-100 mt-1 pt-1">
                    <button
                      onClick={() => { close(); handleLogout() }}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left transition-colors"
                    >
                      <X size={15} />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </TopBarDropdown>
          ) : (
            <div className="hidden sm:flex items-center gap-3 text-sm text-white">
              <Link to="/login" className="hover:text-yellow-300 transition-colors">
                Login
              </Link>
              <span className="text-white/40">|</span>
              <Link to="/register" className="hover:text-yellow-300 transition-colors">
                Register
              </Link>
            </div>
          )}

          {/* More dropdown */}
          <TopBarDropdown
            trigger={
              <div className="hidden sm:flex items-center gap-0.5 text-white text-sm hover:text-yellow-300 transition-colors">
                <span>More</span>
                <ChevronDown size={13} />
              </div>
            }
          >
            {({ close }) => (
              <>
                {MORE_ITEMS.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <span className="flex items-center gap-2.5 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors w-full">
                      <Icon size={15} className="text-gray-400 flex-shrink-0" />
                      {item.label}
                    </span>
                  )
                  return item.external ? (
                    <a
                      key={item.path}
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={close}
                      className="block"
                    >
                      {content}
                    </a>
                  ) : (
                    <Link key={item.path} to={item.path} onClick={close} className="block">
                      {content}
                    </Link>
                  )
                })}
              </>
            )}
          </TopBarDropdown>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-white p-1"
            onClick={() => setMobileMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── CATEGORY NAV BAR ── */}
      <div className="bg-[#1e4a8a] hidden sm:block">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center h-10 gap-0">
          {NAV_CATEGORIES.map((item) => (
            <CategoryNavItem key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* ── MOBILE MENU ── */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#1a3c6e] border-t border-blue-800">
          {/* Mobile search */}
          <div className="px-4 py-3">
            <form onSubmit={(e) => { handleSearch(e); setMobileMenuOpen(false) }}>
              <div className="flex w-full rounded overflow-hidden border border-gray-300 bg-white h-9">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search with Smartprix"
                  className="flex-1 px-3 text-sm text-gray-800 outline-none"
                />
                <button type="submit" className="px-3 text-gray-400 border-l border-gray-200 bg-white">
                  <Search size={17} />
                </button>
              </div>
            </form>
          </div>

          {/* Mobile nav links */}
          <nav className="px-4 pb-4 flex flex-col gap-1">
            {NAV_CATEGORIES.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className="text-white text-sm py-2 border-b border-blue-800/50 hover:text-yellow-300 transition-colors flex items-center justify-between"
              >
                <span>{item.label}</span>
                {item.badge && <span className="w-2 h-2 bg-green-400 rounded-full" />}
              </Link>
            ))}

            {/* Mobile auth */}
            <div className="mt-3 flex gap-3">
              {user ? (
                <button
                  onClick={() => { handleLogout(); setMobileMenuOpen(false) }}
                  className="text-red-300 text-sm hover:text-red-200 transition-colors"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-sm hover:text-yellow-300 transition-colors"
                  >
                    Login
                  </Link>
                  <span className="text-white/40 text-sm">|</span>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-white text-sm hover:text-yellow-300 transition-colors"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
