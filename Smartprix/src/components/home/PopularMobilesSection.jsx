import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { POPULAR_MOBILES } from "../../data/homeData"
import { addToCompare, selectCompare } from "../../store/compareSlice"

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5 mt-0.5">
      {[1,2,3,4,5].map((s) => (
        <svg key={s} width="11" height="11" viewBox="0 0 24 24">
          <path
            fill={s <= Math.round(rating) ? "#f59e0b" : "#d1d5db"}
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          />
        </svg>
      ))}
    </div>
  )
}

function MobileCard({ product }) {
  const dispatch = useDispatch()
  const compareItems = useSelector(selectCompare)
  const isInCompare = compareItems.some((p) => p._id === product._id)

  return (
    <div className="flex flex-col">
      <Link to={`/product/${product.slug}`} className="group block">
        <div className="bg-white border border-gray-100 rounded flex items-center justify-center overflow-hidden"
          style={{height:"160px", padding:"8px"}}>
          <img
            src={product.image}
            alt={product.name}
            className="h-[144px] w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="mt-1.5">
          <p className="text-[12px] text-gray-800 font-medium leading-snug line-clamp-2" style={{minHeight:"32px"}}>
            {product.name}
          </p>
          <p className="text-[13px] font-bold text-[#2e7d32] mt-0.5">
            {"Rs." + product.lowestPrice.toLocaleString("en-IN")}
          </p>
          <StarRating rating={product.avgRating} />
        </div>
      </Link>
      <button
        onClick={() => { if (!isInCompare && compareItems.length < 4) dispatch(addToCompare({...product, images:[product.image]})) }}
        className="mt-1.5 flex items-center justify-center gap-1 text-[11px] py-[5px] rounded border transition-colors"
        style={isInCompare
          ? {background:"#1a7fe8", color:"#fff", borderColor:"#1a7fe8"}
          : {background:"#fff", color:"#1a7fe8", borderColor:"#1a7fe8"}}
      >
        <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[9px] font-bold"
          style={isInCompare ? {background:"#fff", color:"#1a7fe8"} : {background:"#1a7fe8", color:"#fff"}}>
          {isInCompare ? "✓" : "+"}
        </span>
        Compare
      </button>
    </div>
  )
}

export default function PopularMobilesSection() {
  return (
    <section className="bg-white rounded mb-3 p-3">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
        <h2 className="text-[15px] font-bold text-gray-900">Popular Mobiles</h2>
        <Link to="/category/mobiles" className="text-[12px] text-[#1a7fe8] hover:underline font-medium flex items-center gap-0.5">
          View All <span className="text-[10px]">&#8594;</span>
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {POPULAR_MOBILES.map((p) => <MobileCard key={p._id} product={p} />)}
      </div>
    </section>
  )
}
