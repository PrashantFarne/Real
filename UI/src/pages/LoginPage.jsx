import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <div className="page-shell login-page">
      <section className="hero-panel">
        <div className="hero-content">
          <span className="eyebrow">PROPSYNC</span>
          <h1>Seamless. Efficient. Profitable.</h1>
          <p>
            Manage your real estate portfolio with a modern CRM built for agents,
            brokers, and portfolio managers.
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-card__header">
            <h2>Log In</h2>
            <p>Enter your account details to continue.</p>
          </div>
          <LoginForm />
        </div>
      </section>
    </div>
  )
}
