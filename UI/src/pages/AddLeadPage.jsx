import { useState } from 'react'

const sources = ['Walk-in', 'Referral', 'Online Ad', 'Social Media']
const projects = ['Serenity Towers', 'Oakwood Residences', 'Cityview Heights']
const units = ['1 BHK', '2 BHK', '3 BHK', 'Penthouse']

export default function AddLeadPage() {
  const [name, setName] = useState('John Adams')
  const [phone, setPhone] = useState('(555) 101-2000')
  const [email, setEmail] = useState('email@example.com')
  const [source, setSource] = useState('Walk-in')
  const [project, setProject] = useState('Serenity Towers')
  const [unit, setUnit] = useState('3 BHK')
  const [budgetMin, setBudgetMin] = useState('$500k')
  const [budgetMax, setBudgetMax] = useState('$750k')
  const [notes, setNotes] = useState('')
  const [duplicateCheck, setDuplicateCheck] = useState(true)
  const [autoAssign, setAutoAssign] = useState(true)

  const handleSubmit = (event) => {
    event.preventDefault()
    alert('Lead submitted and redirecting to detail screen')
  }

  return (
    <main className="add-lead-shell">
      <header className="add-lead-header">
        <div className="breadcrumb">
          <span className="breadcrumb-icon">←</span>
          <div>
            <p className="breadcrumb-label">Add New Lead</p>
            <p className="breadcrumb-subtitle">Sarah Jenkins</p>
          </div>
        </div>
        <span className="mode-badge">Agent Mode</span>
      </header>

      <div className="add-lead-grid">
        <section className="lead-form-card">
          <div className="form-card-header">
            <p className="section-title">Form fields</p>
            <span className="section-note">Required fields</span>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="form-row form-row--two">
              <label className="field-label">
                Name<span className="required">*</span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>

              <label className="field-label">
                Phone<span className="required">*</span>
                <div className="phone-field">
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <span className={`chip ${duplicateCheck ? 'chip--success' : 'chip--warn'}`}>
                    {duplicateCheck ? 'Duplicate check passed' : 'Duplicate check pending'}
                  </span>
                </div>
              </label>
            </div>

            <div className="form-row form-row--two">
              <label className="field-label">
                Email <span className="field-optional">(optional)</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="field-label">
                Source
                <select value={source} onChange={(e) => setSource(e.target.value)}>
                  {sources.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-row form-row--two">
              <label className="field-label">
                Interested Project
                <select value={project} onChange={(e) => setProject(e.target.value)}>
                  {projects.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                Unit
                <select value={unit} onChange={(e) => setUnit(e.target.value)}>
                  {units.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="form-row form-row--two">
              <label className="field-label">
                Budget Range (min-max) <span className="field-optional">(optional)</span>
                <div className="budget-row">
                  <input type="text" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} />
                  <span className="budget-separator">to</span>
                  <input type="text" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} />
                </div>
              </label>
              <label className="field-label field-label--notes">
                Notes
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} />
              </label>
            </div>

            <button type="submit" className="submit-button">
              Submit & Redirect to Lead Detail Screen
            </button>
          </form>
        </section>

        <aside className="lead-behavior-card">
          <div className="behavior-card-header">
            <p className="section-title">Behavior</p>
          </div>
          <div className="behavior-row">
            <label className="checkbox-row">
              <input type="checkbox" checked readOnly />
              <span>On phone duplicate check: Duplicate matched! existing lead John Doe found (08:35:10).</span>
            </label>
          </div>
          <div className="behavior-row">
            <p className="behavior-text">Existing lead matched.</p>
            <button className="outline-button">Log as New Touchpoint</button>
          </div>
          <div className="behavior-row">
            <p className="behavior-text">Redirecting to [John Doe's Detail] screen…</p>
          </div>
          <div className="divider" />
          <label className="checkbox-row checkbox-row--secondary">
            <input type="checkbox" checked={autoAssign} onChange={() => setAutoAssign(!autoAssign)} />
            <span>Auto-Assign</span>
          </label>
          <p className="behavior-note">Auto-assign to Sarah Jenkins. (Success)</p>
        </aside>
      </div>
    </main>
  )
}
