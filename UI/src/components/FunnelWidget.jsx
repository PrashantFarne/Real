export default function FunnelWidget({ stages }) {
  const maxValue = Math.max(...stages.map((s) => s.value))

  return (
    <div className="funnel-widget">
      {stages.map((stage, index) => {
        const percentage = (stage.value / maxValue) * 100
        const colors = ['#0ea5e9', '#2563eb', '#10b981', '#14b8a6', '#22c55e']

        return (
          <div key={stage.label} className="funnel-item">
            <div className="funnel-item-header">
              <div>
                <span className="funnel-label">{stage.label}</span>
                <span className="funnel-count">{stage.value}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
