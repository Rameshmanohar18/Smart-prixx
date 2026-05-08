import { Link } from "react-router-dom";

/* ================= ICONS ================= */

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TwitterXIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
    <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const TelegramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.198 2.433a2.242 2.242 0 0 0-1.022.215l-16.5 6.498c-1.019.401-1.01 1.61.001 2.004l4.014 1.49 1.547 4.773c.193.594.876.818 1.37.452l2.26-1.652 4.076 3.004c.552.406 1.34.124 1.51-.524l3.5-14.5a1.5 1.5 0 0 0-1.756-1.76z"/>
  </svg>
);

const RssIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <path d="M4 11a9 9 0 0 1 9 9"/>
    <path d="M4 4a16 16 0 0 1 16 16"/>
    <circle cx="5" cy="19" r="1"/>
  </svg>
);

const PlayStoreIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/>
  </svg>
);

/* ================= DATA ================= */

const SOCIAL_ICONS = [
  { Icon: MailIcon, href: "mailto:contact@smartprix.com", label: "Email" },
  { Icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { Icon: TwitterXIcon, href: "https://twitter.com", label: "X" },
  { Icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
  { Icon: InstagramIcon, href: "https://instagram.com", label: "Instagram" },
  { Icon: TelegramIcon, href: "https://t.me", label: "Telegram" },
  { Icon: RssIcon, href: "/rss", label: "RSS" },
  { Icon: PlayStoreIcon, href: "https://play.google.com", label: "Android App" },
];

const FOOTER_COLS = [
  {
    title: "Categories",
    links: [
      { label: "Mobile Phones", path: "/category/mobiles" },
      { label: "Tablets", path: "/category/tablets" },
      { label: "Cars", path: "/category/cars" },
      { label: "Laptops", path: "/category/laptops" },
      { label: "TVs", path: "/category/tvs" },
      { label: "Deals", path: "/deals" },
    ],
  },
  {
    title: "Mobile Brands",
    links: [
      { label: "Samsung", path: "/category/mobiles/samsung" },
      { label: "Apple", path: "/category/mobiles/apple" },
      { label: "OnePlus", path: "/category/mobiles/oneplus" },
      { label: "Realme", path: "/category/mobiles/realme" },
    ],
  },
  {
    title: "Mobile Lists",
    links: [
      { label: "5G Mobiles", path: "/category/mobiles?filter=5g" },
      { label: "New Mobiles", path: "/category/mobiles?filter=new" },
      { label: "Foldable Phones", path: "/category/mobiles?filter=foldable" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "About Us", path: "/about" },
      { label: "Contact", path: "/contact" },
      { label: "Jobs", path: "/jobs" },
      { label: "News", path: "/news" },
    ],
  },
];

/* ================= COMPONENT ================= */

export default function Footer() {
  return (
    <footer className="bg-[#1e2d4a] text-gray-300">
      <div className="max-w-[1060px] mx-auto px-4 pt-8 pb-4">

        {/* TOP SECTION */}
        <div className="flex gap-8 flex-wrap">

          {/* LEFT */}
          <div className="w-[160px]">

            {/* Logo */}
            <div className="mb-4">
              <div className="inline-flex items-center bg-white rounded px-2 py-0.5">
                <span className="font-bold text-lg">
                  <span className="text-blue-500">s</span>
                  <span className="text-[#1a3c6e]">martprix</span>
                </span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="grid grid-cols-4 gap-2 mb-3">
              {SOCIAL_ICONS.map(({ Icon, href, label }) => {
                const external = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    title={label}
                    className="w-8 h-8 flex items-center justify-center hover:text-white transition"
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>

            <a
              href="https://www.smartprix.com/about/contact"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-gray-400 hover:text-white"
            >
              Smartprix US
            </a>
          </div>

          {/* RIGHT COLUMNS */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-6">
            {FOOTER_COLS.map((col) => (
              <div key={col.title}>
                <h3 className="text-white font-semibold text-[13px] mb-3">
                  {col.title}
                </h3>

                <ul className="space-y-1.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.path}
                        className="text-[12px] text-gray-400 hover:text-white"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 mt-6 pt-4 flex flex-wrap justify-between gap-3">
          <p className="text-[12px] text-gray-400">
            © {new Date().getFullYear()} Smartprix. All Rights Reserved.
          </p>

          <div className="flex gap-4 text-[12px]">
            <Link to="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link to="/sitemap" className="hover:text-white">
              Sitemap
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}