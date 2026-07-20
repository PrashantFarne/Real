const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed (${response.status})`)
  }

  return response.status === 204 ? null : response.json()
}

export const api = {
  login: (credentials) => request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  dashboard: () => request('/dashboard'),
  agents: () => request('/agents'),
  leads: (filters = {}) => {
    const query = new URLSearchParams(Object.entries(filters).filter(([, value]) => value))
    return request(`/leads${query.toString() ? `?${query}` : ''}`)
  },
  lead: (id) => request(`/leads/${id}`),
  createLead: (lead) => request('/leads', { method: 'POST', body: JSON.stringify(lead) }),
  updateLead: (id, changes) => request(`/leads/${id}`, { method: 'PATCH', body: JSON.stringify(changes) }),
  deleteLead: (id) => request(`/leads/${id}`, { method: 'DELETE' }),
  mergeLead: (id, targetLeadId) => request(`/leads/${id}/merge`, { method: 'POST', body: JSON.stringify({ targetLeadId }) }),
  unassignedLeads: () => request('/leads/unassigned'),
  assignLeads: (assignments) => request('/leads/assignments', { method: 'POST', body: JSON.stringify({ assignments }) }),
  saveTeam: (agents) => request('/organization/team', { method: 'POST', body: JSON.stringify({ agents }) }),
  saveWorkMode: (workMode) => request('/organization/work-mode', { method: 'PATCH', body: JSON.stringify({ workMode }) }),
}
