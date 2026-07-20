import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import StatCard from '../components/StatCard'
import FunnelWidget from '../components/FunnelWidget'
import AttentionList from '../components/AttentionList'
import PerformanceTable from '../components/PerformanceTable'
import { dashboardStats, funnelStages, attentionRows, scheduledVisits } from '../utils/dashboardData'

export default function DashboardPage() {
  const [selectedVisitGroup, setSelectedVisitGroup] = useState(null)
  const [showUrgentModal, setShowUrgentModal] = useState(false)
  const navigate = useNavigate()

  const urgentLeads = attentionRows.filter((row) => row.days > 7)
  const selectedVisitStat = dashboardStats.find((stat) => stat.visitGroup === selectedVisitGroup)
  const selectedVisits = selectedVisitGroup ? scheduledVisits[selectedVisitGroup] : []
  const visitCopy = {
    today: 'Today’s visits need confirmation and prompt follow-up.',
    tomorrow: 'Prepare the right inventory details before each visit.',
    week: 'Your upcoming visit schedule for the next seven days.',
  }

  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-subtitle">Admin Dashboard — Organization Wide</p>
        </div>
      </header>

      <section className="stats-row">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} onClick={() => stat.popup && setSelectedVisitGroup(stat.visitGroup)} />
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-panel dashboard-panel--wide">
          <div className="panel-header">
            <div>
              <h2>Leads</h2>
              <p>Current sales pipeline overview</p>
            </div>
            <button className="small-button" onClick={() => navigate('/unassigned')}>
              Assign New Leads
            </button>
          </div>
          <FunnelWidget stages={funnelStages} />
        </div>

        <div className="dashboard-panel dashboard-panel--wide">
          <div className="panel-header">
            <div>
              <h2>Attention-Needed List</h2>
              <p>Leads stuck in stage (&gt;7 days)</p>
            </div>
            <button className="small-button" onClick={() => setShowUrgentModal(true)}>
              Urgent look
            </button>
          </div>
          <AttentionList rows={attentionRows} />
        </div>
      </section>

      {selectedVisitStat && (
        <div className="visit-modal-overlay" onClick={() => setSelectedVisitGroup(null)}>
          <div className={`visit-modal visit-modal--${selectedVisitGroup}`} onClick={(e) => e.stopPropagation()}>
            <div className="visit-modal__header">
              <div>
                <span className="visit-modal__eyebrow">
                  {selectedVisitGroup === 'today' ? 'Needs attention' : 'Visit schedule'}
                </span>
                <h3>{selectedVisitStat.title}</h3>
                <p>{visitCopy[selectedVisitGroup]}</p>
              </div>
              <button className="small-button" onClick={() => setSelectedVisitGroup(null)}>
                Close
              </button>
            </div>

            <div className="visit-list">
              {selectedVisits.map((visitor) => (
                <div key={visitor.id} className="visit-item">
                  <div className="visit-item__header">
                    <div>
                      <strong>{visitor.name}</strong>
                      <span className="visit-time">{visitor.time}</span>
                    </div>
                    <span className="visit-chip">{visitor.flatSize}</span>
                  </div>
                  <p><span className="visit-label">Email:</span> {visitor.email}</p>
                  <p><span className="visit-label">Phone:</span> <a className="visit-phone" href={`tel:${visitor.phone.replace(/\s/g, '')}`}>{visitor.phone}</a></p>
                  <p><span className="visit-label">Notes:</span> {visitor.notes}</p>
                  <p><span className="visit-label">Profession:</span> {visitor.profession}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showUrgentModal && (
        <div className="visit-modal-overlay" onClick={() => setShowUrgentModal(false)}>
          <div className="visit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="visit-modal__header">
              <div>
                <h3>Urgent Leads</h3>
                <p>Leads waiting in the same stage for more than 7 days</p>
              </div>
              <button className="small-button" onClick={() => setShowUrgentModal(false)}>
                Close
              </button>
            </div>

            <div className="visit-list">
              {urgentLeads.length > 0 ? urgentLeads.map((lead) => (
                <div key={lead.name} className="visit-item">
                  <div className="visit-item__header">
                    <strong>{lead.name}</strong>
                    <span className="visit-chip">{lead.days} days</span>
                  </div>
                  <p><span className="visit-label">Stage:</span> {lead.stage}</p>
                  <p><span className="visit-label">Status:</span> {lead.status}</p>
                </div>
              )) : (
                <div className="visit-item">
                  <p>No leads are currently pending for more than 7 days.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
