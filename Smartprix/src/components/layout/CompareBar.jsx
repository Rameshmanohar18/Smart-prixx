import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { X, BarChart2 } from 'lucide-react'
import { removeFromCompare, clearCompare, selectCompare } from '../../store/compareSlice'

export default function CompareBar() {
  const dispatch = useDispatch()
  const items = useSelector(selectCompare)

  if (items.length === 0) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-blue-600 shadow-2xl">
      <div className="max-w-[1280px] mx-auto px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-blue-700 font-semibold text-sm flex-shrink-0">
          <BarChart2 size={18} />
          Compare ({items.length}/4)
        </div>

        <div className="flex-1 flex items-center gap-3 overflow-x-auto">
          {items.map((product) => (
            <div
              key={product._id}
              className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5 flex-shrink-0"
            >
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-8 h-8 object-contain"
              />
              <span className="text-xs font-medium text-gray-700 max-w-[120px] truncate">
                {product.name}
              </span>
              <button
                onClick={() => dispatch(removeFromCompare(product._id))}
                className="text-gray-400 hover:text-red-500 transition-colors ml-1"
                aria-label={`Remove ${product.name} from compare`}
              >
                <X size={14} />
              </button>
            </div>
          ))}

          {/* Empty slots */}
          {Array.from({ length: 4 - items.length }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="flex items-center justify-center w-24 h-10 border-2 border-dashed border-gray-200 rounded-lg flex-shrink-0"
            >
              <span className="text-xs text-gray-400">+ Add</span>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => dispatch(clearCompare())}
            className="text-xs text-gray-500 hover:text-red-500 transition-colors px-2 py-1"
          >
            Clear All
          </button>
          <Link
            to="/compare"
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-colors ${
              items.length >= 2
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
            }`}
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  )
}
