import { useState } from 'react'
import { unassignedLeads } from '../utils/leadsData'

export default function UnassignedQueuePage() {
  const [selectedIds, setSelectedIds] = useState([])
  const [selectedAgent, setSelectedAgent] = useState('Sarah Jenkins')

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const isSelected = (id) => selectedIds.includes(id)

  return (
    <main className="unassigned-shell">
      <header className="unassigned-header">
        <div>
          <p className="dashboard-subtitle">Unassigned Leads Queue</p>
        </div>
      </header>

      <section className="unassigned-actions">
        <button className="outline-button">
          Assign to Agent
        </button>
      </section>

      <section className="unassigned-panel">
        <div className="unassigned-top-bar">
          <div className="unassigned-selected">
            <input
              type="checkbox"
              checked={selectedIds.length === unassignedLeads.length}
              onChange={(e) =>
                setSelectedIds(e.target.checked ? unassignedLeads.map((lead) => lead.id) : [])
              }
            />
            <span>{selectedIds.length} Selected</span>
          </div>

          <div className="unassigned-actions-row">
            <button className="outline-button">Assign to Agent</button>
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
              className="filter-select"
            >
              <option>Sarah Jenkins</option>
              <option>John Doe</option>
            </select>
          </div>
        </div>

        <div className="unassigned-table-wrapper">
          <table className="unassigned-table">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedIds.length === unassignedLeads.length}
                    onChange={(e) =>
                      setSelectedIds(e.target.checked ? unassignedLeads.map((lead) => lead.id) : [])
                    }
                  />
                </th>
                <th>Name</th>
                <th>Created Date/Time</th>
                <th>Hours</th>
                <th>Assign</th>
              </tr>
            </thead>
            <tbody>
              {unassignedLeads.map((lead) => (
                <tr
                  key={lead.id}
                  className={isSelected(lead.id) ? 'unassigned-row-selected' : ''}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={isSelected(lead.id)}
                      onChange={() => toggleSelect(lead.id)}
                    />
                  </td>
                  <td>{lead.name}</td>
                  <td>{lead.created}</td>
                  <td>
                    <span className="hours-badge">{lead.hours}</span>
                  </td>
                  <td>
                    <button className="outline-button">Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  )
}