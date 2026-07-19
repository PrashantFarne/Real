import StatCard from '../components/StatCard'
import FunnelWidget from '../components/FunnelWidget'
import AttentionList from '../components/AttentionList'
import PerformanceTable from '../components/PerformanceTable'
import QuickLinks from '../components/QuickLinks'
import { dashboardStats, funnelStages, attentionRows, performanceRows, quickLinks } from '../utils/dashboardData'

export default function DashboardPage() {
  return (
    <main className="dashboard-shell">
      <header className="dashboard-header">
        <div>
          <p className="dashboard-subtitle">Admin Dashboard — Organization Wide</p>
        </div>
      </header>

      <section className="stats-row">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-panel dashboard-panel--wide">
          <div className="panel-header">
            <div>
              <h2>Leads</h2>
              <p>Current sales pipeline overview</p>
            </div>
            <button className="small-button">Funnel Insights</button>
          </div>
          <FunnelWidget stages={funnelStages} />
        </div>

        <div className="dashboard-panel dashboard-panel--wide">
          <div className="panel-header">
            <div>
              <h2>Attention-Needed List</h2>
              <p>Leads stuck in stage (&gt;7 days)</p>
            </div>
            <button className="small-button">Threshold Config</button>
          </div>
          <AttentionList rows={attentionRows} />
        </div>

        {/* <aside className="dashboard-sidepanel">
          <QuickLinks links={quickLinks} />
        </aside> */}
      </section>

      <section className="performance-panel">
        <div className="panel-header">
          <h2>Agent Performance Table</h2>
        </div>
        <PerformanceTable rows={performanceRows} />
      </section>
    </main>
  )
}
