
import { categories } from "../data/sampleExpenses"

export default function CategoryBadge({ category }) {
  const meta = categories[category]

  return (
    <span
      className="category-badge"
      style={{ color: meta.color, background: meta.soft }}
    >
      <i style={{ background: meta.color }} />
      {category}
    </span>
  )
}
