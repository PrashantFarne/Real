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
        <div>
          <h1>{lead.name}</h1>
        </div>
        <div className="lead-detail-actions">
          <button className="outline-button" onClick={() => navigate('/leads')}>
            Back to Leads
          </button>
        </div>
      </header>

      <section className="lead-detail-top">
        <div className="lead-detail-card">
          <p className="lead-detail-label">Email</p>
          <p className="lead-detail-value">{lead.email}</p>
        </div>
        <div className="lead-detail-card">
          <p className="lead-detail-label">Phone</p>
          <p className="lead-detail-value">{lead.phone}</p>
        </div>
        <div className="lead-detail-card lead-detail-chip-card">
          <p className="lead-detail-label">Current Stage</p>
          <span className="stage-chip">{lead.stage}</span>
        </div>
        <div className="lead-detail-card lead-detail-chip-card">
          <p className="lead-detail-label">Assigned Agent</p>
          <span className="agent-chip">{lead.assignedAgent}</span>
        </div>
      </section>

      <section className="lead-detail-body">
        <div className="lead-summary-card">
          <h2>Info</h2>
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
          <h2>Recent Activity</h2>
          <ul>
            {lead.recentActivity.map((entry, index) => (
              <li key={index}>{entry}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="lead-admin-card">
        <div className="admin-card-header">
          <h2>Admin Actions</h2>
          <span>Visible to Admins Only</span>
        </div>
        <div className="admin-actions-row">
          <select>
            <option>Select Agent</option>
            <option>Sarah Jenkins</option>
          </select>
          <button className="link-button">Delete Lead</button>
          <button className="link-button">Merge Lead</button>
        </div>
      </section>
    </main>
  )
}
