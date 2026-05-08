import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { UPCOMING_MOBILES } from "../../data/homeData"
import { addToCompare, selectCompare } from "../../store/compareSlice"

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5 mt-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="10" height="10" viewBox="0 0 24 24">
          <path fill={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function UpcomingMobilesSection() {
  const dispatch = useDispatch()
  const compareItems = useSelector(selectCompare)
  return (
    <section className="bg-white rounded mb-3 p-3">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <h2 className="text-[15px] font-bold text-gray-900">Upcoming Mobiles</h2>
        <Link to="/category/mobiles?filter=upcoming" className="text-[12px] text-[#1a7fe8] hover:underline font-medium flex items-center gap-0.5">
          View All <span className="text-[10px]">&#8594;</span>
        </Link>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {UPCOMING_MOBILES.map((p) => {
          const isInCompare = compareItems.some((c) => c._id === p._id)
          return (
            <div key={p._id} className="flex flex-col">
              <Link to={`/product/${p.slug}`} className="group block">
                <div className="bg-white border border-gray-100 rounded flex items-center justify-center overflow-hidden"
                  style={{height:"130px", padding:"6px"}}>
                  <img src={p.image} alt={p.name}
                    className="h-[116px] w-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="mt-1">
                  <p className="text-[11px] text-gray-800 font-medium leading-snug line-clamp-2" style={{minHeight:"26px"}}>{p.name}</p>
                  <p className="text-[12px] font-bold text-[#2e7d32] mt-0.5">{"Rs." + p.lowestPrice.toLocaleString("en-IN")}</p>
                  <StarRating rating={p.avgRating} />
                </div>
              </Link>
              <button
                onClick={() => { if (!isInCompare && compareItems.length < 4) dispatch(addToCompare({...p, images:[p.image]})) }}
                className="mt-1.5 flex items-center justify-center gap-1 text-[11px] py-[4px] rounded border transition-colors"
                style={isInCompare ? {background:"#1a7fe8",color:"#fff",borderColor:"#1a7fe8"} : {background:"#fff",color:"#1a7fe8",borderColor:"#1a7fe8"}}
              >
                <span className="w-3 h-3 rounded-full flex items-center justify-center text-[8px] font-bold"
                  style={isInCompare ? {background:"#fff",color:"#1a7fe8"} : {background:"#1a7fe8",color:"#fff"}}>
                  {isInCompare ? "✓" : "+"}
                </span>
                Compare
              </button>
            </div>
          )
        })}
      </div>
    </section>
  )
}
