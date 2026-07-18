export default function QuickLinks({ links }) {
  return (
    <div className="quick-links-card">
      <h3>Quick Links</h3>
      <div className="quick-links-list">
        {links.map((link) => (
          <button key={link.label} className="link-card-button">
            {link.label}
          </button>
        ))}
      </div>
    </div>
  )
}
