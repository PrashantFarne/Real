import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import DashboardPage from './pages/DashboardPage'
import LeadsPage from './pages/LeadsPage'
import AddLeadPage from './pages/AddLeadPage'
import LeadDetailPage from './pages/LeadDetailPage'
import UnassignedQueuePage from './pages/UnassignedQueuePage'
import LoginPage from './pages/LoginPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Navigate to="/leads" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="leads" element={<LeadsPage />} />
        <Route path="unassigned" element={<UnassignedQueuePage />} />
        <Route path="add-lead" element={<AddLeadPage />} />
        <Route path="lead/:id" element={<LeadDetailPage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/leads" replace />} />
    </Routes>
  )
}

export default App
