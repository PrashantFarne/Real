export default function StatCard({ stat }) {
  return (
    <article className="stat-card">
      <div>
        <p className="stat-card__label">{stat.title}</p>
        <p className="stat-card__value">{stat.value}</p>
      </div>
      {stat.extra && <p className="stat-card__meta">{stat.extra}</p>}
    </article>
  )
}
