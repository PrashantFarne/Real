import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { leadColumns, leads as seedLeads } from '../utils/leadsData'
import { api } from '../api/client'

export default function LeadsPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProject, setFilterProject] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [allLeads, setAllLeads] = useState(seedLeads)

  useEffect(() => {
    api.leads().then(setAllLeads).catch(() => {})
  }, [])

  const filteredLeads = allLeads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.phone.includes(searchTerm) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProject = !filterProject || lead.project === filterProject
    const matchesStatus = !filterStatus || lead.status === filterStatus

    return matchesSearch && matchesProject && matchesStatus
  })

  const projects = [...new Set(allLeads.map((lead) => lead.project))]
  const statuses = [...new Set(allLeads.map((lead) => lead.status))]
  const totalLeads = filteredLeads.length

  const initialsFor = (name) => name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)

  return (
    <div className="leads-shell">
      <header className="leads-header">
        <div className="leads-header-top">
          <div>
            <p className="leads-eyebrow">Sales workspace</p>
            <h1>My Leads</h1>
            <p className="leads-header-copy">Track conversations and move every opportunity forward.</p>
          </div>
          <div className="leads-search-actions">
            <label className="leads-search-wrap">
              <span className="leads-search-icon" aria-hidden="true">⌕</span>
              <input
                type="text"
                placeholder="Search by name, phone, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="leads-search"
              />
            </label>
            <button className="primary-button" onClick={() => navigate('/add-lead')}>
              <span aria-hidden="true">+</span> Add Lead
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
                aria-label="Filter by project"
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
                aria-label="Filter by status"
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
            <span className="leads-total"><strong>{totalLeads}</strong> leads shown</span>
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
              <section key={column.title} className={`lead-column lead-column--${column.title.toLowerCase().replace('-', '')}`}>
                <div className="lead-column__header">
                  <div>
                    <span className="lead-column__title">{column.title}</span>
                    <span className="lead-column__subtitle">{columnLeads.length === 1 ? '1 opportunity' : `${columnLeads.length} opportunities`}</span>
                  </div>
                  <span className="lead-count" aria-label={`${columnLeads.length} leads`}>{columnLeads.length}</span>
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
                          <span className="lead-avatar" aria-hidden="true">{initialsFor(lead.name)}</span>
                          <div>
                            <strong>{lead.name}</strong>
                            <span className="lead-card-project">{lead.project}</span>
                          </div>
                        </div>
                        <div className="lead-card-indicators">
                          {lead.flag && <span className="lead-flag" title="Needs follow-up">!</span>}
                          <span className={`lead-status-badge lead-status-badge--${lead.status.toLowerCase()}`}>
                            {lead.status}
                          </span>
                        </div>
                      </div>

                      <div className="lead-card-body">
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
