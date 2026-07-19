import { useState } from 'react'
import { unassignedLeads } from '../utils/leadsData'

export default function UnassignedQueuePage() {
  const [agentSelections, setAgentSelections] = useState({})

  const updateAgent = (id, agent) => {
    setAgentSelections((prev) => ({ ...prev, [id]: agent }))
  }

  return (
    <main className="unassigned-shell">
      <header className="unassigned-header">
        <div>
          <p className="dashboard-subtitle">Unassigned Leads Queue</p>
        </div>
      </header>

      <section className="unassigned-panel">
        <div className="unassigned-top-bar">
          <div className="unassigned-selected">
            <span>{unassignedLeads.length} Leads</span>
          </div>
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
                <tr key={lead.id}>
                  <td>{lead.name}</td>
                  <td>{lead.created}</td>
                  <td>
                    <span className="hours-badge">{lead.hours}</span>
                  </td>
                  <td>{lead.project}</td>
                  <td>
                    <select
                      value={agentSelections[lead.id] || ''}
                      onChange={(e) => updateAgent(lead.id, e.target.value)}
                      className="filter-select"
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
          <button className="primary-button">Submit Assignments</button>
        </div>
      </section>
    </main>
  )
}