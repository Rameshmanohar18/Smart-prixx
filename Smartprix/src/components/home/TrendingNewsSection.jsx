import { Link } from "react-router-dom"
import { TRENDING_NEWS } from "../../data/homeData"

export default function TrendingNewsSection() {
  return (
    <section className="bg-white rounded mb-3 p-3">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <h2 className="text-[15px] font-bold text-gray-900">Trending News</h2>
        <Link to="/news" className="text-[12px] text-[#1a7fe8] hover:underline font-medium flex items-center gap-0.5">
          View All <span className="text-[10px]">&#8594;</span>
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {TRENDING_NEWS.map((article) => (
          <Link
            key={article.id}
            to={`/news/${article.slug}`}
            className="relative rounded overflow-hidden group block"
            style={{height:"130px"}}
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0" style={{background:"linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 60%, transparent 100%)"}} />
            <p className="absolute bottom-0 left-0 right-0 px-2 pb-2 text-white text-[11px] font-semibold leading-snug"
              style={{display:"-webkit-box", WebkitLineClamp:3, WebkitBoxOrient:"vertical", overflow:"hidden"}}>
              {article.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  )
}
