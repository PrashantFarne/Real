export default function StatCard({ stat, onClick }) {
  return (
    <article className={`stat-card${stat.popup ? ' stat-card--clickable' : ''}`} onClick={stat.popup ? onClick : undefined}>
      <div>
        <p className="stat-card__label">{stat.title}</p>
        <p className="stat-card__value">{stat.value}</p>
      </div>
      {stat.extra && <p className="stat-card__meta">{stat.extra}</p>}
    </article>
  )
}
