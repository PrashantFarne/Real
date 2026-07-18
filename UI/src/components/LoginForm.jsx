import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/validation'

export default function LoginForm() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const normalizedEmail = email.trim()

    if (!normalizedEmail || !password) {
      setError('Please enter both email and password.')
      return
    }

    if (normalizedEmail.includes('@') && !validateEmail(normalizedEmail)) {
      setError('Please enter a valid email address.')
      return
    }

    setError('')
    navigate('/leads')
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <label className="form-field">
        <span>Email or Username</span>
        <input
          type="text"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email or username"
        />
      </label>

      <label className="form-field">
        <span>Password</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
        />
      </label>

      {error && <div className="form-error">{error}</div>}

      <button type="submit" className="primary-button">
        Log In
      </button>

      <div className="form-footer">
        <button type="button" className="link-button">
          Forgot password?
        </button>
        <button type="button" className="link-button">
          Create an account
        </button>
      </div>
    </form>
  )
}
