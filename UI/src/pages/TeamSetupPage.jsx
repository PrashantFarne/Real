import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export default function TeamSetupPage() {
  const [agent1, setAgent1] = useState('')
  const [agent2, setAgent2] = useState('')
  const [agent3, setAgent3] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!agent1.trim()) {
      setError('First agent name is required')
      return
    }
    api.saveTeam([agent1, agent2, agent3])
      .then(() => navigate('/unassigned'))
      .catch(() => setError('Unable to save team members. Please confirm the backend is running.'))
  }

  return (
    <main className="team-setup-shell">
      <div className="team-form-card">
        <h2>Add Your Team Members</h2>
        <p className="help-text">Enter up to three agent names. First agent is required.</p>

        <form onSubmit={handleSubmit} className="team-form">
          <label>
            Agent 1 (required)
            <input value={agent1} onChange={(e) => setAgent1(e.target.value)} placeholder="e.g. Sarah Jenkins" />
          </label>

          <label>
            Agent 2 (optional)
            <input value={agent2} onChange={(e) => setAgent2(e.target.value)} placeholder="e.g. John Doe" />
          </label>

          <label>
            Agent 3 (optional)
            <input value={agent3} onChange={(e) => setAgent3(e.target.value)} placeholder="e.g. Alice Smith" />
          </label>

          {error && <p className="error-message">{error}</p>}

          <div className="form-actions">
            <button type="button" className="outline-button" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" className="primary-button">
              Continue
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
