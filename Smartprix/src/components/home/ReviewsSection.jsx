import { Link } from "react-router-dom"
import { REVIEWS } from "../../data/homeData"

export default function ReviewsSection() {
  return (
    <section className="bg-white rounded mb-3 p-3">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <h2 className="text-[15px] font-bold text-gray-900">Reviews</h2>
        <Link to="/reviews" className="text-[12px] text-[#1a7fe8] hover:underline font-medium flex items-center gap-0.5">
          View All <span className="text-[10px]">&#8594;</span>
        </Link>
      </div>
      <div>
        {REVIEWS.map((r, i) => (
          <Link key={r.id} to={`/reviews/${r.slug}`}
            className={`flex gap-3 py-2.5 group ${i < REVIEWS.length - 1 ? "border-b border-gray-100" : ""}`}>
            <img src={r.image} alt={r.title}
              className="w-[120px] h-[80px] object-cover rounded flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="text-[13px] font-semibold text-gray-900 leading-snug group-hover:text-[#1a7fe8] transition-colors line-clamp-2 mb-1">
                {r.title}
              </h3>
              <p className="text-[11.5px] text-gray-500 leading-relaxed line-clamp-3">{r.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
