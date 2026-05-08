import { Link } from "react-router-dom"
import { POPULAR_NEWS_SIDEBAR } from "../../data/homeData"

function AdBannerSamsung() {
  return (
    <div className="bg-white rounded border border-gray-200 mb-3 overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-b border-gray-100">
        <span className="text-[10px] text-gray-400 font-medium">SAMSUNG</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-400">Ad</span>
          <span className="text-[10px] text-gray-400 cursor-pointer">ℹ</span>
        </div>
      </div>
      <div className="p-2">
        <div className="rounded overflow-hidden mb-2" style={{background:"linear-gradient(135deg,#e8f0fe 0%,#f3e8ff 100%)", height:"120px", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <div className="text-center px-2">
            <div className="text-3xl mb-1">⌚</div>
            <p className="text-[10px] text-gray-600 font-medium">Galaxy Watch8</p>
            <p className="text-[11px] font-bold text-gray-800">Starting ₹24999*</p>
            <p className="text-[9px] text-gray-500 mt-0.5">No Cost EMI ₹3500</p>
          </div>
        </div>
        <p className="text-[13px] font-bold text-gray-900 mb-0.5">Trade In &amp; Save Big Today</p>
        <p className="text-[11px] text-gray-500 mb-2 leading-snug">Buy Galaxy Watch8 with Galaxy AI Running Coach, BioActive Sensor &amp; No Cost EMI at ₹3,500.</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-blue-900 tracking-wide">SAMSUNG</span>
          <button className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function AdBannerLenovo() {
  return (
    <div className="bg-white rounded border border-gray-200 mb-3 overflow-hidden">
      <div className="flex items-center justify-between px-2 py-1 bg-gray-50 border-b border-gray-100">
        <span className="text-[10px] text-gray-400 font-medium">LENOVO</span>
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-gray-400">Ad</span>
          <span className="text-[10px] text-gray-400 cursor-pointer">ℹ</span>
        </div>
      </div>
      <div className="p-2">
        <div className="rounded overflow-hidden mb-2" style={{background:"linear-gradient(135deg,#fff0e8 0%,#ffe8e8 100%)", height:"100px", display:"flex", alignItems:"center", justifyContent:"center"}}>
          <div className="text-center px-2">
            <div className="text-3xl mb-1">💻</div>
            <p className="text-[11px] font-bold text-red-700">Summer Bonanza Sale</p>
            <p className="text-[9px] text-gray-500">No Cost EMI from ₹7,536</p>
          </div>
        </div>
        <p className="text-[13px] font-bold text-gray-900 mb-0.5">Creator Laptop Deals</p>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold text-gray-700">Lenovo</p>
            <p className="text-[10px] text-gray-500">No Cost EMI starts from ₹7,536/month.</p>
          </div>
          <button className="w-7 h-7 rounded-full bg-orange-500 hover:bg-orange-600 flex items-center justify-center text-white transition-colors flex-shrink-0 ml-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

function PopularNewsSidebar() {
  return (
    <div className="bg-white rounded border border-gray-200 mb-3 p-2">
      <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-gray-100">
        <h3 className="text-[14px] font-bold text-gray-900">Popular News</h3>
        <Link to="/news" className="text-[11px] text-[#1a7fe8] hover:underline font-medium flex items-center gap-0.5">
          View All <span className="text-[10px]">&#8594;</span>
        </Link>
      </div>
      <div>
        {POPULAR_NEWS_SIDEBAR.map((item, i) => (
          <Link key={item.id} to={`/news/${item.slug}`}
            className={`flex gap-2 py-2 group ${i < POPULAR_NEWS_SIDEBAR.length - 1 ? "border-b border-gray-100" : ""}`}>
            <img src={item.image} alt={item.title}
              className="w-[64px] h-[46px] object-cover rounded flex-shrink-0" />
            <p className="text-[11px] text-gray-700 leading-snug group-hover:text-[#1a7fe8] transition-colors line-clamp-3">
              {item.title}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default function RightSidebar() {
  return (
    <aside style={{width:"220px", flexShrink:0}}>
      <AdBannerSamsung />
      <PopularNewsSidebar />
      <AdBannerLenovo />
    </aside>
  )
}
