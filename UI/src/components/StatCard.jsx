export default function StatCard({ stat, onClick }) {
  return (
    <article
      className={`stat-card${stat.popup ? ' stat-card--clickable' : ''}${stat.tone ? ` stat-card--${stat.tone}` : ''}`}
      onClick={stat.popup ? onClick : undefined}
    >
      <div>
        {stat.context && <p className="stat-card__context">{stat.context}</p>}
        <p className="stat-card__label">{stat.title}</p>
        <p className="stat-card__value">{stat.value}</p>
      </div>
      {stat.popup && <span className="stat-card__action">View visits <span aria-hidden="true">→</span></span>}
      {stat.extra && <p className="stat-card__meta">{stat.extra}</p>}
    </article>
  )
}
