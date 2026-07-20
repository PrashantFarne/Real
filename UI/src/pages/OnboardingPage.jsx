import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api/client'

export default function OnboardingPage() {
  const [mode, setMode] = useState(null) // 'solo' | 'team'
  const navigate = useNavigate()

  function selectMode(m) {
    setMode(m)
    api.saveWorkMode(m).catch(() => {})
    if (m === 'team') navigate('/team-setup')
  }

  return (
    <main className="onboarding-shell">
      <div className="onboarding-card">
        <h1>How do you work?</h1>

        <div className="onboarding-cards">
          <button
            className={`onboarding-option ${mode === 'solo' ? 'selected' : ''}`}
            onClick={() => selectMode('solo')}
            aria-pressed={mode === 'solo'}
          >
            <div className="option-icon">👤</div>
            <h3>Just Me</h3>
            <p>I'll handle all my leads myself.</p>
          </button>

          <button
            className={`onboarding-option ${mode === 'team' ? 'selected' : ''}`}
            onClick={() => selectMode('team')}
            aria-pressed={mode === 'team'}
          >
            <div className="option-icon">👥</div>
            <h3>With a Team</h3>
            <p>I have agents who need leads assigned to them.</p>
          </button>
        </div>

        <p className="onboarding-note">Changeable later in Settings: Add team members to activate unassigned queue and agent management tools.</p>
      </div>
    </main>
  )
}
