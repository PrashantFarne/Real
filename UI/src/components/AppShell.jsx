import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'My Leads', path: '/leads' },
  { label: 'Unassigned Queue', path: '/unassigned' },
]

export default function AppShell() {
  return (
    <div className="app-shell-layout">
      <aside className="app-sidebar">
        <div className="sidebar-brand">CRM</div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                isActive ? 'sidebar-link sidebar-link--active' : 'sidebar-link'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="app-shell-content">
        <Outlet />
      </main>
    </div>
  )
}
