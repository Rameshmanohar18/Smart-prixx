import { Link } from 'react-router-dom'

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
)
const TwitterXIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
const YoutubeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
  </svg>
)
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
)
const TelegramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.75a2.25 2.25 0 0 0 .126 4.238l3.553 1.184 1.184 3.553a2.25 2.25 0 0 0 3.938.39l1.614-2.42 3.553 2.662a2.25 2.25 0 0 0 3.506-1.51l2.25-13.5a2.25 2.25 0 0 0-2.202-2.562z"/>
  </svg>
)

const FOOTER_LINKS = {
  'Mobiles': [
    { label: 'Smartphones', path: '/category/mobiles' },
    { label: 'Tablets', path: '/category/tablets' },
    { label: 'Mobile Accessories', path: '/category/accessories' },
    { label: 'Best Phones Under 10K', path: '/category/mobiles?maxPrice=10000' },
    { label: 'Best Phones Under 20K', path: '/category/mobiles?maxPrice=20000' },
  ],
  'Laptops & Computers': [
    { label: 'Laptops', path: '/category/laptops' },
    { label: 'Gaming Laptops', path: '/category/laptops?type=gaming' },
    { label: 'Desktops', path: '/category/computers' },
    { label: 'Monitors', path: '/category/monitors' },
  ],
  'Electronics': [
    { label: 'TVs', path: '/category/tvs' },
    { label: 'Cameras', path: '/category/cameras' },
    { label: 'Earphones', path: '/category/earphones' },
    { label: 'Smartwatches', path: '/category/smartwatches' },
    { label: 'ACs', path: '/category/acs' },
  ],
  'Company': [
    { label: 'About Us', path: '/about' },
    { label: 'Contact Us', path: '/contact' },
    { label: 'Advertise', path: '/advertise' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Terms of Use', path: '/terms' },
  ],
}

const SOCIAL = [
  { icon: FacebookIcon,  href: 'https://facebook.com',  label: 'Facebook' },
  { icon: TwitterXIcon,  href: 'https://twitter.com',   label: 'Twitter' },
  { icon: YoutubeIcon,   href: 'https://youtube.com',   label: 'YouTube' },
  { icon: InstagramIcon, href: 'https://instagram.com', label: 'Instagram' },
  { icon: TelegramIcon,  href: 'https://t.me',          label: 'Telegram' },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a2a4a] text-gray-300 mt-12">
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {Object.entries(FOOTER_LINKS).map(([section, links]) => (
            <div key={section}>
              <h3 className="text-white font-semibold text-sm mb-3">{section}</h3>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.path}
                      className="text-xs text-gray-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo */}
          <div className="bg-white rounded px-2 py-0.5">
            <span className="text-[#1a3c6e] font-bold text-lg">
              <span className="text-blue-500">s</span>martprix
            </span>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {SOCIAL.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Smartprix. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
