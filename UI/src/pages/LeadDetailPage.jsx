import { useParams, useNavigate } from 'react-router-dom'
import { findLeadById } from '../utils/leadsData'

export default function LeadDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const lead = findLeadById(id)

  if (!lead) {
    return (
      <div className="lead-detail-shell">
        <p className="error-message">Lead not found.</p>
        <button className="primary-button" onClick={() => navigate('/leads')}>
          Back to Leads
        </button>
      </div>
    )
  }

  return (
    <main className="lead-detail-shell">
      <header className="lead-detail-header">
        <div className="lead-profile-heading">
          <span className="lead-profile-avatar" aria-hidden="true">
            {lead.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}
          </span>
          <div>
            <p className="leads-eyebrow">Lead profile</p>
            <h1>{lead.name}</h1>
            <p>{lead.project} · {lead.unit} · Added {lead.created}</p>
          </div>
        </div>
        <div className="lead-detail-actions">
          <a className="lead-call-button" href={`tel:${lead.phone.replace(/\D/g, '')}`}>Call lead</a>
          <button className="outline-button" onClick={() => navigate('/leads')}>
            ← Back to Leads
          </button>
        </div>
      </header>

      <section className="lead-detail-top">
        <div className="lead-detail-card">
          <p className="lead-detail-label">Email address</p>
          <a className="lead-detail-value lead-detail-link" href={`mailto:${lead.email}`}>{lead.email}</a>
        </div>
        <div className="lead-detail-card">
          <p className="lead-detail-label">Phone number</p>
          <a className="lead-detail-value lead-detail-link" href={`tel:${lead.phone.replace(/\D/g, '')}`}>{lead.phone}</a>
        </div>
        <div className="lead-detail-card lead-detail-chip-card">
          <p className="lead-detail-label">Current Stage</p>
          <span className="stage-chip"><span aria-hidden="true">●</span> {lead.stage}</span>
        </div>
        <div className="lead-detail-card lead-detail-chip-card">
          <p className="lead-detail-label">Assigned Agent</p>
          <span className="agent-chip"><span aria-hidden="true">●</span> {lead.assignedAgent}</span>
        </div>
      </section>

      <section className="lead-detail-body">
        <div className="lead-summary-card">
          <div className="detail-section-header">
            <div>
              <p className="detail-section-kicker">Overview</p>
              <h2>Lead information</h2>
            </div>
          </div>
          <div className="lead-summary-row">
            <span>Project</span>
            <strong>{lead.project}</strong>
          </div>
          <div className="lead-summary-row">
            <span>Unit</span>
            <strong>{lead.unit}</strong>
          </div>
          <div className="lead-summary-row">
            <span>Budget</span>
            <strong>{lead.budget}</strong>
          </div>
          <div className="lead-summary-row">
            <span>Created</span>
            <strong>{lead.created}</strong>
          </div>
          <div className="lead-summary-row">
            <span>Activity</span>
            <strong>{lead.activity}</strong>
          </div>
        </div>

        <div className="lead-activity-card">
          <div className="detail-section-header">
            <div>
              <p className="detail-section-kicker">Timeline</p>
              <h2>Recent activity</h2>
            </div>
            <span className="activity-count">{lead.recentActivity.length}</span>
          </div>
          <ul className="activity-timeline">
            {lead.recentActivity.map((entry, index) => (
              <li key={index}><span className="activity-dot" aria-hidden="true" />{entry}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lead-admin-card">
        <div className="admin-card-header">
          <div>
            <p className="detail-section-kicker">Controls</p>
            <h2>Admin actions</h2>
          </div>
          <span>Admins only</span>
        </div>
        <div className="admin-actions-row">
          <select>
            <option>Reassign agent</option>
            <option>Sarah Jenkins</option>
          </select>
          <button className="link-button link-button--neutral">Merge Lead</button>
          <button className="link-button link-button--danger">Delete Lead</button>
        </div>
      </section>
    </main>
  )
}
