import { Link } from "react-router-dom"
import { TRENDING_HERO } from "../../data/homeData"

export default function TrendingHeroSection() {
  const large = TRENDING_HERO.filter((a) => a.size === "large")
  const small = TRENDING_HERO.filter((a) => a.size === "small")

  return (
    <section className="mb-0">
      <div className="grid grid-cols-3 gap-[3px] bg-[#e0e0e0]">

        {/* Col 1 — large card, spans 2 rows */}
        <div className="row-span-2 relative overflow-hidden group cursor-pointer" style={{height:"302px"}}>
          <Link to={`/news/${large[0].slug}`} className="block w-full h-full">
            <img src={large[0].image} alt={large[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="inline-block bg-[#1a7fe8] text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1.5">
                Trending
              </span>
              <h3 className="text-white font-bold text-[15px] leading-snug line-clamp-4">
                {large[0].title}
              </h3>
            </div>
          </Link>
        </div>

        {/* Col 2 top */}
        <div className="relative overflow-hidden group cursor-pointer" style={{height:"149px"}}>
          <Link to={`/news/${small[0].slug}`} className="block w-full h-full">
            <img src={small[0].image} alt={small[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <p className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 text-white text-[12px] font-semibold leading-snug line-clamp-2">
              {small[0].title}
            </p>
          </Link>
        </div>

        {/* Col 3 top */}
        <div className="relative overflow-hidden group cursor-pointer" style={{height:"149px"}}>
          <Link to={`/news/${small[1].slug}`} className="block w-full h-full">
            <img src={small[1].image} alt={small[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <p className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 text-white text-[12px] font-semibold leading-snug line-clamp-2">
              {small[1].title}
            </p>
          </Link>
        </div>

        {/* Col 2 bottom */}
        <div className="relative overflow-hidden group cursor-pointer" style={{height:"149px"}}>
          <Link to={`/news/${small[2].slug}`} className="block w-full h-full">
            <img src={small[2].image} alt={small[2].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <p className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 text-white text-[12px] font-semibold leading-snug line-clamp-2">
              {small[2].title}
            </p>
          </Link>
        </div>

        {/* Col 3 bottom — large card */}
        <div className="relative overflow-hidden group cursor-pointer" style={{height:"149px"}}>
          <Link to={`/news/${large[1].slug}`} className="block w-full h-full">
            <img src={large[1].image} alt={large[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <p className="absolute bottom-0 left-0 right-0 px-2.5 pb-2 text-white text-[13px] font-bold leading-snug line-clamp-3">
              {large[1].title}
            </p>
          </Link>
        </div>

      </div>
    </section>
  )
}
