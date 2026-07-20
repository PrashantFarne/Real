export default function FunnelWidget({ stages }) {
  const maxValue = Math.max(...stages.map((s) => s.value))
  const colors = ['#2563eb', '#4f46e5', '#0ea5e9', '#8b5cf6', '#16a34a']

  return (
    <div className="funnel-widget" aria-label="Lead pipeline by stage">
      {stages.map((stage, index) => {
        const pipelineShare = Math.round((stage.value / maxValue) * 100)

        return (
          <article
            key={stage.label}
            className="funnel-item"
            style={{ '--stage-color': colors[index % colors.length] }}
          >
            <div className="funnel-item-header">
              <div className="funnel-stage-heading">
                <span className="funnel-stage-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="funnel-label">{stage.label}</span>
              </div>
              <span className="funnel-percentage">{pipelineShare}%</span>
            </div>

            <div className="funnel-volume">
              <strong>{stage.value}</strong>
              <span>leads</span>
            </div>

            <div className="funnel-bar-container" aria-hidden="true">
              <div className="funnel-bar-fill" style={{ width: `${pipelineShare}%` }} />
            </div>

            <div className="funnel-item-footer">
              <span className="funnel-count">of new leads</span>
              <span className="funnel-note">{stage.note}</span>
            </div>
          </article>
        )
      })}
    </div>
  )
}
