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
      <div className="add-lead-grid">
        <section className="lead-form-card">
          <div className="form-card-header">
            <div>
              <p className="section-title">Add New Lead</p>
              <p className="section-note">Fill out the lead details below. Required fields are marked with an asterisk.</p>
            </div>
          </div>

          <form className="lead-form" onSubmit={handleSubmit}>
            <div className="form-row form-row--two">
              <label className="field-label">
                <span className="field-label-title">
                  Name <span className="required">*</span>
                </span>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
              </label>

              <label className="field-label">
                <span className="field-label-title">
                  Phone <span className="required">*</span>
                </span>
                <div className="phone-field">
                  <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
              </label>
            </div>

            <div className="form-row form-row--two">
              <label className="field-label">
                <span className="field-label-title">
                  Email <span className="field-optional">(optional)</span>
                </span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </label>
              <label className="field-label">
                <span className="field-label-title">Source</span>
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
                <span className="field-label-title">Interested Project</span>
                <select value={project} onChange={(e) => setProject(e.target.value)}>
                  {projects.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field-label">
                <span className="field-label-title">Unit</span>
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
                <span className="field-label-title">
                  Budget Range <span className="field-optional">(optional)</span>
                </span>
                <div className="budget-row">
                  <input type="text" value={budgetMin} onChange={(e) => setBudgetMin(e.target.value)} />
                  <span className="budget-separator">to</span>
                  <input type="text" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} />
                </div>
              </label>
              <label className="field-label field-label--notes">
                <span className="field-label-title">Notes</span>
                <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={6} />
              </label>
            </div>

            <button type="submit" className="submit-button">
              Submit & Redirect to Lead Detail Screen
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
