import { Link } from "react-router-dom"
import { POPULAR_COMPARISONS, RECENT_COMPARISONS } from "../../data/homeData"

function CompareRow({ item }) {
  return (
    <div className="flex items-center gap-1.5 py-2 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer group">
      <span className="text-[11px] text-gray-700 flex-1 leading-snug group-hover:text-[#1a7fe8] line-clamp-2 min-w-0">
        {item.a}
      </span>
      <div className="flex items-center gap-1 flex-shrink-0">
        <img src={item.imgA} alt="" className="w-8 h-8 object-contain rounded border border-gray-100" />
        <span className="text-[10px] text-gray-400 font-semibold">vs</span>
        <img src={item.imgB} alt="" className="w-8 h-8 object-contain rounded border border-gray-100" />
      </div>
      <span className="text-[11px] text-gray-700 flex-1 text-right leading-snug group-hover:text-[#1a7fe8] line-clamp-2 min-w-0">
        {item.b}
      </span>
    </div>
  )
}

export default function ComparisonsSection() {
  return (
    <section className="bg-white rounded mb-3 p-3">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
            <h2 className="text-[15px] font-bold text-gray-900">Popular Comparisons</h2>
          </div>
          {POPULAR_COMPARISONS.map((item, i) => <CompareRow key={i} item={item} />)}
        </div>
        <div>
          <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
            <h2 className="text-[15px] font-bold text-gray-900">Recent Comparisons</h2>
          </div>
          {RECENT_COMPARISONS.map((item, i) => <CompareRow key={i} item={item} />)}
        </div>
      </div>
    </section>
  )
}
