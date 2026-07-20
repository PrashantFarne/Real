export const visitDetails = [
  {
    id: 1,
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    flatSize: '2 BHK',
    notes: 'Prefers a south-facing flat and wants a quick walkthrough.',
    profession: 'Software Engineer',
  },
  {
    id: 2,
    name: 'Meera Patel',
    email: 'meera.patel@example.com',
    phone: '+91 98220 45678',
    flatSize: '3 BHK',
    notes: 'Interested in premium amenities and school proximity.',
    profession: 'Doctor',
  },
  {
    id: 3,
    name: 'Rohan Desai',
    email: 'rohan.desai@example.com',
    phone: '+91 97654 32109',
    flatSize: '1 BHK',
    notes: 'Looking for a ready-to-move-in unit near metro.',
    profession: 'Architect',
  },
]

export const scheduledVisits = {
  today: visitDetails.map((visitor, index) => ({
    ...visitor,
    time: ['10:30 AM', '1:00 PM', '4:30 PM'][index],
  })),
  tomorrow: [
    {
      id: 4,
      name: 'Priya Nair',
      email: 'priya.nair@example.com',
      phone: '+91 98989 12345',
      flatSize: '2 BHK',
      notes: 'Wants to compare two available tower options.',
      profession: 'Marketing Manager',
      time: '11:00 AM',
    },
    {
      id: 5,
      name: 'Karan Malhotra',
      email: 'karan.malhotra@example.com',
      phone: '+91 98111 22334',
      flatSize: '3 BHK',
      notes: 'Visiting with family; interested in clubhouse amenities.',
      profession: 'Business Owner',
      time: '3:30 PM',
    },
  ],
  week: [
    {
      id: 6,
      name: 'Ananya Iyer',
      email: 'ananya.iyer@example.com',
      phone: '+91 99001 12345',
      flatSize: '2 BHK',
      notes: 'Requested a weekday evening visit.',
      profession: 'Product Designer',
      time: 'Wednesday, 5:00 PM',
    },
    {
      id: 7,
      name: 'Vikram Singh',
      email: 'vikram.singh@example.com',
      phone: '+91 99887 66554',
      flatSize: '3 BHK',
      notes: 'Looking for a larger home close to the metro.',
      profession: 'Chartered Accountant',
      time: 'Friday, 11:30 AM',
    },
    {
      id: 8,
      name: 'Neha Kapoor',
      email: 'neha.kapoor@example.com',
      phone: '+91 97777 44556',
      flatSize: '1 BHK',
      notes: 'First property purchase; needs a financing discussion.',
      profession: 'Teacher',
      time: 'Saturday, 2:00 PM',
    },
  ],
}

export const dashboardStats = [
  {
    title: 'Site Visits Scheduled Today',
    value: '10',
    popup: true,
    visitGroup: 'today',
    tone: 'today',
    context: 'Needs attention today',
  },
  {
    title: 'Site Visits Scheduled Tomorrow',
    value: '5',
    popup: true,
    visitGroup: 'tomorrow',
    tone: 'tomorrow',
    context: 'Prepare for tomorrow',
  },
  {
    title: 'Site Visits Scheduled Next 7 Days',
    value: '55',
    popup: true,
    visitGroup: 'week',
    tone: 'week',
    context: 'Upcoming this week',
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
