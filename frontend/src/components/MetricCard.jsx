
import Icon from "./Icon"

export default function MetricCard({ label, value, note, icon, tone, delta }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}>
        <Icon name={icon} />
      </div>

      {delta && (
        <span className="delta">
          <Icon name="trend" size={12} /> {delta}
        </span>
      )}

      <p>{label}</p>
      <strong>{value}</strong>
      <small>{note}</small>
    </article>
  )
}
