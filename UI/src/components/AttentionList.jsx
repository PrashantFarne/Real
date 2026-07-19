export default function AttentionList({ rows }) {
  return (
    <div className="attention-list">
      <div className="attention-list__body">
        {rows.map((row) => (
          <div key={row.name} className="attention-row">
            <div>
              <strong>{row.name}</strong>
              <p>{row.stage} • {row.days} days</p>
            </div>
            <div className="attention-actions">
              <span className={`status-pill status-pill--${row.status.toLowerCase()}`}>
                {row.status}
              </span>
              {/* <button className="outline-button">Log Activity</button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
