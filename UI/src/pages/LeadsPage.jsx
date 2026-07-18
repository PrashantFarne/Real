import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { leadColumns, leads } from '../utils/leadsData'

export default function LeadsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProject, setFilterProject] = useState('')
  const [filterStatus, setFilterStatus] = useState('')

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProject = !filterProject || lead.project === filterProject
    const matchesStatus = !filterStatus || lead.status === filterStatus

    return matchesSearch && matchesProject && matchesStatus
  })

  const projects = [...new Set(leads.map((lead) => lead.project))]
  const statuses = [...new Set(leads.map((lead) => lead.status))]

  return (
    <div className="leads-shell">
      <header className="leads-header">
        <div className="leads-header-top">
          <h1>My Leads</h1>
          <div className="leads-search-actions">
            <input
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="leads-search"
            />
            <button className="primary-button" onClick={() => navigate('/add-lead')}>
              + Add Lead
            </button>
          </div>
        </div>

        <div className="leads-controls">
          <div className="filter-group">
            <label>Filter:</label>
            <div className="filter-controls">
              <select
                value={filterProject}
                onChange={(e) => setFilterProject(e.target.value)}
                className="filter-select"
              >
                <option value="">All Projects</option>
                {projects.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="">All Status</option>
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="leads-view-options">
            <div className="agent-select">
              <label>Agent:</label>
              <select defaultValue="Sarah Jenkins">
                <option>Sarah Jenkins</option>
                <option>John Doe</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {filteredLeads.length === 0 ? (
        <div className="leads-empty">
          <p>No leads found matching your filters.</p>
        </div>
      ) : (
        <div className="lead-columns">
          {leadColumns.map((column) => {
            const columnLeads = filteredLeads.filter((lead) => lead.column === column.title)
            return (
              <section key={column.title} className="lead-column">
                <div className="lead-column__header">
                  <span>{column.title}</span>
                  <span className="lead-count">{columnLeads.length}</span>
                </div>
                <div className="lead-column__cards">
                  {columnLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="lead-card lead-card--clickable"
                      onClick={() => navigate(`/lead/${lead.id}`)}
                    >
                      <div className="lead-card-top">
                        <div className="lead-card__title">
                          <strong>{lead.name}</strong>
                          {lead.flag && <span className="lead-flag">⚠</span>}
                        </div>
                        <span className={`lead-status-badge lead-status-badge--${lead.status.toLowerCase()}`}>
                          {lead.status}
                        </span>
                      </div>

                      <div className="lead-card-body">
                        <div className="lead-detail-row">
                          <span className="lead-label">Project:</span>
                          <span className="lead-project-badge">{lead.project}</span>
                        </div>
                        <div className="lead-detail-row">
                          <span className="lead-label">Unit:</span>
                          <span>{lead.unit}</span>
                        </div>
                        <div className="lead-detail-row">
                          <span className="lead-label">Budget:</span>
                          <span className="lead-budget">{lead.budget}</span>
                        </div>
                        <div className="lead-detail-row">
                          <span className="lead-label">Phone:</span>
                          <span className="lead-phone">{lead.phone}</span>
                        </div>
                      </div>

                      <div className="lead-card-footer">
                        <span className="lead-activity">{lead.activity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
