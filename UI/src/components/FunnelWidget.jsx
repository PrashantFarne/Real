export default function FunnelWidget({ stages }) {
  return (
    <div className="funnel-widget">
      <div className="funnel-stage-row funnel-stage-row--headers">
        {['New', 'Contacted', 'Site Visit', 'Negotiation', 'Booked'].map((label) => (
          <div key={label} className="funnel-stage">
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="funnel-bar-row">
        {stages.map((stage) => (
          <div key={stage.label} className="funnel-bar" style={{ width: stage.width }}>
            <span>{stage.value}</span>
          </div>
        ))}
      </div>
      <div className="funnel-footer">
        {stages.map((stage) => (
          <div key={stage.label} className="funnel-footer-item">
            <strong>{stage.percentage}</strong>
            <span>{stage.note}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
