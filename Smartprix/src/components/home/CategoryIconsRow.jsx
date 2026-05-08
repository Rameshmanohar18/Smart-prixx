import { Link } from "react-router-dom"
import { CATEGORY_ICONS } from "../../data/homeData"

export default function CategoryIconsRow() {
  return (
    <section className="bg-white border-b border-gray-200 mb-0">
      <div className="max-w-[1060px] mx-auto px-3">
        <div className="flex items-center gap-0 overflow-x-auto py-3"
          style={{scrollbarWidth:"none", msOverflowStyle:"none"}}>
          {CATEGORY_ICONS.map((cat) => (
            <Link
              key={cat.label}
              to={cat.path}
              className="flex flex-col items-center gap-1 flex-shrink-0 px-3 group"
            >
              <div
                className="w-[52px] h-[52px] rounded-full flex items-center justify-center text-[22px] group-hover:scale-110 transition-transform duration-200"
                style={{ backgroundColor: cat.color }}
              >
                {cat.emoji}
              </div>
              <span className="text-[11px] text-gray-600 font-medium whitespace-nowrap group-hover:text-blue-600 transition-colors">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
