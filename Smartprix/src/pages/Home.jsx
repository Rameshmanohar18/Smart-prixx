import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  TrendingUp, Tag, ChevronRight, Star, Heart,
  BarChart2, ShoppingCart, Zap, Award
} from 'lucide-react'
import { addToCompare, selectCompare } from '../store/compareSlice'

// ── Mock data ────────────────────────────────────────────────────────────────

const TRENDING_ARTICLES = [
  {
    id: 1,
    tag: 'Trending',
    title: 'Best Smartphones To Buy Under Rs. 25,000 During Flipkart SASA LELE Sale 2026',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    large: true,
    category: 'Mobiles',
    time: '2h ago',
  },
  {
    id: 2,
    title: 'Samsung Offers Temporary Price Cuts on Galaxy S26, S26 Ultra, A37 & A57 Series (Up to ₹9,000...)',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80',
    category: 'Mobiles',
    time: '3h ago',
  },
  {
    id: 3,
    title: 'Exclusive: The existence of the vivo X300 series confirmed by GSMA database',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80',
    category: 'Mobiles',
    time: '4h ago',
  },
  {
    id: 4,
    title: 'OnePlus Nord CE6 and Nord CE6 Lite Launched in India: Check Pricing and Specifications',
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&q=80',
    category: 'Mobiles',
    time: '5h ago',
  },
  {
    id: 5,
    title: 'Qualcomm Launches Snapdragon 6 Gen 5 and Snapdragon 4 Gen 5 Chipsets',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
    category: 'Tech',
    time: '6h ago',
  },
  {
    id: 6,
    title: 'OPPO Find X9 Ultra and Find X9s India Launch Tipped for May 15',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80',
    category: 'Mobiles',
    time: '7h ago',
  },
  {
    id: 7,
    title: 'vivo X300 FE Arrives in India: A ₹79,999 Compact Flagship with a Record-Breaking 6,500mAh...',
    image: 'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&q=80',
    large: true,
    category: 'Mobiles',
    time: '8h ago',
  },
]

const CATEGORY_ICONS = [
  { label: 'News',       emoji: '📰', path: '/news',                  bg: 'bg-blue-100' },
  { label: 'Deals',      emoji: '🏷️', path: '/deals',                 bg: 'bg-red-100' },
  { label: 'Flights',    emoji: '✈️', path: '/flights',               bg: 'bg-sky-100' },
  { label: 'Mobiles',    emoji: '📱', path: '/category/mobiles',      bg: 'bg-purple-100' },
  { label: 'Laptops',    emoji: '💻', path: '/category/laptops',      bg: 'bg-indigo-100' },
  { label: 'TVs',        emoji: '📺', path: '/category/tvs',          bg: 'bg-green-100' },
  { label: 'Tablets',    emoji: '📟', path: '/category/tablets',      bg: 'bg-yellow-100' },
  { label: 'Bikes',      emoji: '🏍️', path: '/category/bikes',        bg: 'bg-orange-100' },
  { label: 'Scooters',   emoji: '🛵', path: '/category/scooters',     bg: 'bg-pink-100' },
  { label: 'Cars',       emoji: '🚗', path: '/category/cars',         bg: 'bg-red-100' },
  { label: 'Cameras',    emoji: '📷', path: '/category/cameras',      bg: 'bg-teal-100' },
  { label: 'Earphones',  emoji: '🎧', path: '/category/earphones',    bg: 'bg-violet-100' },
  { label: 'Smartwatch', emoji: '⌚', path: '/category/smartwatches', bg: 'bg-cyan-100' },
  { label: 'ACs',        emoji: '❄️', path: '/category/acs',          bg: 'bg-blue-100' },
]

const TRENDING_PRODUCTS = [
  {
    _id: 'p1',
    name: 'Samsung Galaxy S26 Ultra',
    slug: 'samsung-galaxy-s26-ultra',
    brand: 'Samsung',
    category: 'mobile',
    lowestPrice: 124999,
    highestPrice: 134999,
    specScore: 94,
    avgRating: 4.7,
    reviewCount: 1243,
    images: ['https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=300&q=80'],
    stores: [
      { store: 'Amazon', price: 124999, inStock: true },
      { store: 'Flipkart', price: 126999, inStock: true },
    ],
  },
  {
    _id: 'p2',
    name: 'Apple iPhone 16 Pro Max',
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    category: 'mobile',
    lowestPrice: 134900,
    highestPrice: 149900,
    specScore: 97,
    avgRating: 4.8,
    reviewCount: 3421,
    images: ['https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&q=80'],
    stores: [
      { store: 'Amazon', price: 134900, inStock: true },
      { store: 'Flipkart', price: 136900, inStock: false },
    ],
  },
  {
    _id: 'p3',
    name: 'OnePlus 13 Pro',
    slug: 'oneplus-13-pro',
    brand: 'OnePlus',
    category: 'mobile',
    lowestPrice: 69999,
    highestPrice: 74999,
    specScore: 88,
    avgRating: 4.5,
    reviewCount: 876,
    images: ['https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=300&q=80'],
    stores: [
      { store: 'Amazon', price: 69999, inStock: true },
      { store: 'Flipkart', price: 71999, inStock: true },
    ],
  },
  {
    _id: 'p4',
    name: 'Xiaomi 15 Ultra',
    slug: 'xiaomi-15-ultra',
    brand: 'Xiaomi',
    category: 'mobile',
    lowestPrice: 99999,
    highestPrice: 109999,
    specScore: 91,
    avgRating: 4.6,
    reviewCount: 542,
    images: ['https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=300&q=80'],
    stores: [
      { store: 'Amazon', price: 99999, inStock: true },
      { store: 'Flipkart', price: 101999, inStock: true },
    ],
  },
]

const DEALS = [
  {
    _id: 'd1',
    name: 'Dell 27 All-in-One Desktop ec2725',
    slug: 'dell-27-aio-ec2725',
    lowestPrice: 184022,
    originalPrice: 210000,
    dropPercent: 12,
    image: 'https://images.unsplash.com/photo-1593640408182-31c228b2b7e8?w=200&q=80',
    store: 'Amazon',
  },
  {
    _id: 'd2',
    name: 'Samsung 65" QLED 4K Smart TV',
    slug: 'samsung-65-qled-4k',
    lowestPrice: 89999,
    originalPrice: 119999,
    dropPercent: 25,
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=200&q=80',
    store: 'Flipkart',
  },
  {
    _id: 'd3',
    name: 'Sony WH-1000XM6 Headphones',
    slug: 'sony-wh-1000xm6',
    lowestPrice: 24990,
    originalPrice: 34990,
    dropPercent: 29,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80',
    store: 'Amazon',
  },
  {
    _id: 'd4',
    name: 'Apple MacBook Air M3 13"',
    slug: 'apple-macbook-air-m3',
    lowestPrice: 99900,
    originalPrice: 114900,
    dropPercent: 13,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&q=80',
    store: 'Amazon',
  },
]

// ── Helper components ────────────────────────────────────────────────────────

function formatPrice(n) {
  return '₹' + n.toLocaleString('en-IN')
}

function SpecScoreBadge({ score }) {
  const color = score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-blue-500' : 'bg-orange-400'
  return (
    <span className={`${color} text-white text-[10px] font-bold px-1.5 py-0.5 rounded`}>
      {score}
    </span>
  )
}

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const compareItems = useSelector(selectCompare)
  const isInCompare = compareItems.some((p) => p._id === product._id)
  const [wishlisted, setWishlisted] = useState(false)

  const handleCompare = (e) => {
    e.preventDefault()
    if (!isInCompare && compareItems.length < 4) dispatch(addToCompare(product))
  }

  return (
    <Link
      to={`/product/${product.slug}`}
      className="bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow group overflow-hidden flex flex-col"
    >
      {/* Image */}
      <div className="relative bg-gray-50 p-4 flex items-center justify-center h-44">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-36 w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
        {/* Wishlist btn */}
        <button
          onClick={(e) => { e.preventDefault(); setWishlisted((v) => !v) }}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white shadow hover:shadow-md transition-shadow"
          aria-label="Add to wishlist"
        >
          <Heart
            size={16}
            className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
        {/* Spec score */}
        <div className="absolute top-2 left-2">
          <SpecScoreBadge score={product.specScore} />
        </div>
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1.5 flex-1">
        <p className="text-xs text-blue-600 font-medium">{product.brand}</p>
        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <Star
                key={s}
                size={11}
                className={s <= Math.round(product.avgRating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200 fill-gray-200'}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviewCount.toLocaleString()})</span>
        </div>

        {/* Price */}
        <div className="mt-auto pt-1">
          <p className="text-base font-bold text-gray-900">{formatPrice(product.lowestPrice)}</p>
          <p className="text-xs text-gray-400">Lowest price across stores</p>
        </div>

        {/* Store pills */}
        <div className="flex gap-1 flex-wrap">
          {product.stores.map((s) => (
            <span
              key={s.store}
              className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                s.inStock
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-gray-100 text-gray-400 border border-gray-200'
              }`}
            >
              {s.store} {s.inStock ? formatPrice(s.price) : 'OOS'}
            </span>
          ))}
        </div>

        {/* Compare btn */}
        <button
          onClick={handleCompare}
          className={`mt-1 flex items-center justify-center gap-1 text-xs py-1.5 rounded-lg font-medium transition-colors ${
            isInCompare
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700'
          }`}
        >
          <BarChart2 size={12} />
          {isInCompare ? 'Added to Compare' : 'Add to Compare'}
        </button>
      </div>
    </Link>
  )
}

function DealCard({ deal }) {
  return (
    <Link
      to={`/product/${deal.slug}`}
      className="flex items-center gap-3 bg-white rounded-lg border border-gray-100 p-3 hover:shadow-md transition-shadow"
    >
      <img src={deal.image} alt={deal.name} className="w-16 h-16 object-contain rounded flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-gray-500 mb-0.5">{deal.store}</p>
        <p className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">{deal.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm font-bold text-gray-900">{formatPrice(deal.lowestPrice)}</span>
          <span className="text-xs text-gray-400 line-through">{formatPrice(deal.originalPrice)}</span>
          <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
            -{deal.dropPercent}%
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ icon: Icon, title, linkTo, linkLabel = 'View All' }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <Icon size={20} className="text-blue-600" />
        <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      </div>
      {linkTo && (
        <Link
          to={linkTo}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          {linkLabel} <ChevronRight size={16} />
        </Link>
      )}
    </div>
  )
}

// ── Main Home page ───────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main className="max-w-[1280px] mx-auto px-4 py-4 space-y-8">

      {/* ── Trending News Grid ── */}
      <section>
        <SectionHeader icon={TrendingUp} title="Trending" linkTo="/news" linkLabel="All News" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Large featured article */}
          {TRENDING_ARTICLES.filter((a) => a.large).slice(0, 1).map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="relative rounded-xl overflow-hidden group sm:row-span-2 h-64 sm:h-auto"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                  {article.tag}
                </span>
                <h3 className="text-white font-bold text-lg leading-snug line-clamp-3">
                  {article.title}
                </h3>
                <p className="text-gray-300 text-xs mt-1">{article.time}</p>
              </div>
            </Link>
          ))}

          {/* Smaller articles */}
          <div className="grid grid-cols-1 gap-3">
            {TRENDING_ARTICLES.filter((a) => !a.large).slice(0, 2).map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="relative rounded-xl overflow-hidden group h-40"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-0.5">{article.time}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-3">
            {TRENDING_ARTICLES.filter((a) => !a.large).slice(2, 4).map((article) => (
              <Link
                key={article.id}
                to={`/news/${article.id}`}
                className="relative rounded-xl overflow-hidden group h-40"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 text-xs mt-0.5">{article.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category Icons Row ── */}
      <section>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4">
          <div className="grid grid-cols-7 sm:grid-cols-14 gap-2 overflow-x-auto">
            {CATEGORY_ICONS.map((cat) => (
              <Link
                key={cat.label}
                to={cat.path}
                className="flex flex-col items-center gap-1.5 group min-w-[60px]"
              >
                <div className={`w-12 h-12 ${cat.bg} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform shadow-sm`}>
                  {cat.emoji}
                </div>
                <span className="text-xs text-gray-600 font-medium text-center leading-tight">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trending Products + Deals (2-col layout) ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Trending Products — takes 2/3 width */}
        <section className="lg:col-span-2">
          <SectionHeader icon={TrendingUp} title="Trending Products" linkTo="/category/mobiles" />
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {TRENDING_PRODUCTS.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </section>

        {/* Deals — takes 1/3 width */}
        <section>
          <SectionHeader icon={Tag} title="Today's Deals" linkTo="/deals" />
          <div className="space-y-3">
            {DEALS.map((deal) => (
              <DealCard key={deal._id} deal={deal} />
            ))}
          </div>
        </section>
      </div>

      {/* ── Best Phones Under Budget ── */}
      <section>
        <SectionHeader icon={Award} title="Best Phones Under Budget" linkTo="/category/mobiles" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3">
          {[
            { label: 'Under ₹10,000', path: '/category/mobiles?maxPrice=10000', emoji: '💰' },
            { label: 'Under ₹15,000', path: '/category/mobiles?maxPrice=15000', emoji: '📱' },
            { label: 'Under ₹20,000', path: '/category/mobiles?maxPrice=20000', emoji: '⚡' },
            { label: 'Under ₹30,000', path: '/category/mobiles?maxPrice=30000', emoji: '🚀' },
          ].map((b) => (
            <Link
              key={b.label}
              to={b.path}
              className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md hover:border-blue-200 transition-all group"
            >
              <span className="text-2xl">{b.emoji}</span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors">
                {b.label}
              </span>
              <ChevronRight size={16} className="ml-auto text-gray-400 group-hover:text-blue-600" />
            </Link>
          ))}
        </div>
      </section>

      {/* ── Latest News strip ── */}
      <section>
        <SectionHeader icon={Zap} title="Latest News" linkTo="/news" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDING_ARTICLES.slice(1, 4).map((article) => (
            <Link
              key={article.id}
              to={`/news/${article.id}`}
              className="flex gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-md transition-shadow group"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0 group-hover:opacity-90 transition-opacity"
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-blue-600 font-medium">{article.category}</span>
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-3 leading-snug mt-0.5">
                  {article.title}
                </h3>
                <p className="text-xs text-gray-400 mt-1">{article.time}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="bg-gradient-to-r from-[#1a3c6e] to-[#1e4a8a] rounded-2xl p-6 text-white text-center">
        <h2 className="text-xl font-bold mb-2">Get Price Drop Alerts</h2>
        <p className="text-blue-200 text-sm mb-4">
          Add products to your wishlist and we'll notify you when prices drop.
        </p>
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2.5 rounded-lg text-gray-800 text-sm outline-none"
          />
          <button className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-5 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-1.5">
            <ShoppingCart size={16} />
            Subscribe
          </button>
        </div>
      </section>

    </main>
  )
}
