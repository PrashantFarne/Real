import { useNavigate } from 'react-router-dom'
import { leadColumns, leads } from '../utils/leadsData'

export default function LeadsPage() {
  const navigate = useNavigate()
  return (
    <div className="leads-shell">
      <header className="leads-header">
        <div>
          <h1>My Leads</h1>
        </div>
        <div className="leads-actions">
          <div className="agent-select">
            <label>Agent:</label>
            <select defaultValue="Sarah Jenkins">
              <option>Sarah Jenkins</option>
              <option>John Doe</option>
            </select>
          </div>
          <button className="primary-button">+ Add Lead</button>
        </div>
      </header>

      <div className="lead-columns">
        {leadColumns.map((column) => (
          <section key={column.title} className="lead-column">
            <div className="lead-column__header">
              <span>{column.title}</span>
              <span>{column.count}</span>
            </div>
            <div className="lead-column__cards">
              {leads
                .filter((lead) => lead.column === column.title)
                .map((lead) => (
                  <div
                    key={lead.id}
                    className="lead-card lead-card--clickable"
                    onClick={() => navigate(`/lead/${lead.id}`)}
                  >
                    <div className="lead-card__title">
                      <strong>{lead.name}</strong>
                      {lead.flag && <span className="lead-flag">!</span>}
                    </div>
                    <p className="lead-chip">{lead.project}</p>
                    <p>{`Project: ${lead.project}`}</p>
                    <p>{`Activity: ${lead.activity}`}</p>
                    <span className="lead-status">{lead.status}</span>
                  </div>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
