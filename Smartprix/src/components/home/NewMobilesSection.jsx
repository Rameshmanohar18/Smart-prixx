import { Link } from "react-router-dom"
import { NEW_MOBILES } from "../../data/homeData"

export default function NewMobilesSection() {
  return (
    <section className="bg-white rounded mb-3 p-3">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <h2 className="text-[15px] font-bold text-gray-900">New Mobiles</h2>
        <Link to="/category/mobiles?filter=new" className="text-[12px] text-[#1a7fe8] hover:underline font-medium flex items-center gap-0.5">
          View All <span className="text-[10px]">&#8594;</span>
        </Link>
      </div>
      <div>
        {NEW_MOBILES.map((p, i) => (
          <Link key={p._id} to={`/product/${p.slug}`}
            className={`flex items-center gap-3 py-2.5 group ${i < NEW_MOBILES.length - 1 ? "border-b border-gray-100" : ""}`}>
            <img src={p.image} alt={p.name} className="w-12 h-12 object-contain rounded flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-medium text-gray-800 group-hover:text-[#1a7fe8] transition-colors line-clamp-2 leading-snug">
                {p.name}
              </p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[13px] font-bold text-gray-900">
                  {"Rs." + p.lowestPrice.toLocaleString("en-IN")}
                </span>
                {p.priceChange !== 0 && (
                  <span className={`text-[11px] font-semibold ${p.priceChange < 0 ? "text-green-600" : "text-red-500"}`}>
                    {p.priceChange < 0 ? "▼" : "▲"}{Math.abs(p.priceChange)}%
                  </span>
                )}
              </div>
            </div>
            <span className="text-gray-300 text-xl flex-shrink-0 leading-none">⋮</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
