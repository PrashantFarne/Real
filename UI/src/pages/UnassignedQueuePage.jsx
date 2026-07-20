import { useState } from 'react'
import { unassignedLeads } from '../utils/leadsData'

export default function UnassignedQueuePage() {
  const [agentSelections, setAgentSelections] = useState({})
  const assignedCount = Object.values(agentSelections).filter(Boolean).length
  const urgentCount = unassignedLeads.filter((lead) => lead.hours >= 24).length

  const updateAgent = (id, agent) => {
    setAgentSelections((prev) => ({ ...prev, [id]: agent }))
  }

  return (
    <main className="unassigned-shell">
      <header className="unassigned-header">
        <div>
          <p className="leads-eyebrow">Assignment center</p>
          <h1>Unassigned Leads Queue</h1>
          <p>Route new opportunities to the right agent before they go cold.</p>
        </div>
        <div className="queue-header-stat">
          <strong>{urgentCount}</strong>
          <span>need attention</span>
        </div>
      </header>

      <section className="unassigned-panel">
        <div className="unassigned-top-bar">
          <div className="unassigned-selected">
            <span className="queue-count-icon" aria-hidden="true">⌁</span>
            <div>
              <strong>{unassignedLeads.length} leads awaiting assignment</strong>
              <span>Choose an agent for each lead, then submit.</span>
            </div>
          </div>
          <span className="queue-progress"><strong>{assignedCount}</strong> of {unassignedLeads.length} assigned</span>
        </div>

        <div className="unassigned-table-wrapper">
          <table className="unassigned-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Created Date/Time</th>
                <th>Hours</th>
                <th>Project</th>
                <th>Select Agent</th>
              </tr>
            </thead>
            <tbody>
              {unassignedLeads.map((lead) => (
                <tr key={lead.id} className={agentSelections[lead.id] ? 'unassigned-row-selected' : ''}>
                  <td data-label="Lead">
                    <div className="queue-lead-name">
                      <span className="queue-avatar">{lead.name.split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>
                      <strong>{lead.name}</strong>
                    </div>
                  </td>
                  <td data-label="Created">{lead.created}</td>
                  <td data-label="Waiting">
                    <span className={`hours-badge${lead.hours >= 24 ? ' hours-badge--urgent' : ''}`}>{lead.hours}h</span>
                  </td>
                  <td data-label="Project"><span className="queue-project">{lead.project}</span></td>
                  <td data-label="Assign agent">
                    <select
                      value={agentSelections[lead.id] || ''}
                      onChange={(e) => updateAgent(lead.id, e.target.value)}
                      className="filter-select queue-agent-select"
                    >
                      <option value="">Choose Agent...</option>
                      <option value="Alex Thompson">Alex Thompson</option>
                      <option value="Sarah Jenkins">Sarah Jenkins</option>
                      <option value="John Doe">John Doe</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="unassigned-submit-row">
          <button className="primary-button queue-submit-button">Assign selected leads <span aria-hidden="true">→</span></button>
        </div>
      </section>
    </main>
  )
}
