export const dashboardStats = [
  {
    title: 'Total Leads (This Month)',
    value: '1,250',
    extra: '+5% vs Last Month\nNew Leads Today: 25',
  },
  {
    title: 'Unassigned Leads Count',
    value: '18',
    extra: 'Go to Queue',
  },
  {
    title: 'Site Visits Scheduled This Week',
    value: '55',
  },
  {
    title: 'Leads Booked This Month',
    value: '30',
    extra: '+10% vs last month',
  },
]

export const funnelStages = [
  { label: 'New', value: 300, width: '20%', percentage: '73%', note: '73% to Contacted' },
  { label: 'Contacted', value: 220, width: '18%', percentage: '73%', note: '73% to Site Visit' },
  { label: 'Site Visit', value: 110, width: '22%', percentage: '50%', note: '50% to Booked' },
  { label: 'Negotiation', value: 60, width: '18%', percentage: '50%', note: '50% to Booked' },
  { label: 'Booked', value: 30, width: '22%', percentage: '10%', note: '10%' },
]

export const attentionRows = [
  { name: 'Sarah Jenkins', stage: 'Contacted', days: 7, status: 'Contacted' },
  { name: 'Michael Brown', stage: 'Contacted', days: 3, status: 'Contacted' },
  { name: 'John Adams', stage: 'Walk-in', days: 3, status: 'Walk-in' },
]

export const performanceRows = [
  { name: 'Sarah Jenkins', assigned: 120, contacted: 110, visits: 50, booked: 15, conversion: '12.5%' },
  { name: 'Michael Brown', assigned: 100, contacted: 95, visits: 45, booked: 10, conversion: '10.0%' },
]

export const quickLinks = [
  { label: 'Unassigned Queue' },
  { label: 'Inventory Management' },
  { label: 'Reports' },
]
