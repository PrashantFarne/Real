export const visitDetails = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    flatSize: '2 BHK',
    notes: 'Prefers a south-facing flat and wants a quick walkthrough.',
    profession: 'Software Engineer',
  },
  {
    id: 2,
    name: 'Meera Patel',
    email: 'meera.patel@example.com',
    flatSize: '3 BHK',
    notes: 'Interested in premium amenities and school proximity.',
    profession: 'Doctor',
  },
  {
    id: 3,
    name: 'Rohan Desai',
    email: 'rohan.desai@example.com',
    flatSize: '1 BHK',
    notes: 'Looking for a ready-to-move-in unit near metro.',
    profession: 'Architect',
  },
]

export const dashboardStats = [
  {
    title: 'Site Visits Scheduled Today',
    value: '10',
    popup: true,
  },
  {
    title: 'Site Visits Scheduled Tomorrow',
    value: '5',
    popup: true,
  },
  {
    title: 'Site Visits Scheduled Next 7 Days',
    value: '55',
    popup: true,
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
  { name: 'Sarah Jenkins', stage: 'Contacted', days: 12, status: 'Contacted' },
  { name: 'Michael Brown', stage: 'Contacted', days: 9, status: 'Contacted' },
  { name: 'John Adams', stage: 'Walk-in', days: 8, status: 'Walk-in' },
]

export const performanceRows = [
  { name: 'Sarah Jenkins', assigned: 120, contacted: 110, visits: 50, booked: 15, conversion: '12.5%' },
  { name: 'Michael Brown', assigned: 100, contacted: 95, visits: 45, booked: 10, conversion: '10.0%' },
]
