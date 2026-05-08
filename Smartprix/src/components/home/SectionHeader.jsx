import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export default function SectionHeader({ title, linkTo }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-[15px] font-bold text-gray-900">{title}</h2>
      {linkTo && (
        <Link
          to={linkTo}
          className="flex items-center gap-0.5 text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors whitespace-nowrap"
        >
          View All <ChevronRight size={14} />
        </Link>
      )}
    </div>
  )
}
