export default function PerformanceTable({ rows }) {
  return (
    <div className="table-card">
      <table>
        <thead>
          <tr>
            <th>Agent Name</th>
            <th>Leads Assigned</th>
            <th>Contacted</th>
            <th>Site Visits Done</th>
            <th>Booked</th>
            <th>Conversion %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name}>
              <td>{row.name}</td>
              <td>{row.assigned}</td>
              <td>{row.contacted}</td>
              <td>{row.visits}</td>
              <td>{row.booked}</td>
              <td>{row.conversion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
