'use client'

const REQUESTORS = [
  { id: '1', name: 'Ravi Chowdary', email: 'ravi@example.com', phone: '+1 408 555 0101', parent: 'Subba Rao Garu', city: 'Vijayawada', planStatus: 'active', monthlyValue: 5800, joined: 'Jun 1, 2026' },
  { id: '2', name: 'Prasad Rao', email: 'prasad@example.com', phone: '+44 780 555 0102', parent: 'Rama Devi', city: 'Vijayawada', planStatus: 'active', monthlyValue: 4200, joined: 'Jun 10, 2026' },
  { id: '3', name: 'Anitha Kumar', email: 'anitha@example.com', phone: '+61 490 555 0103', parent: 'Venkatesh Rao', city: 'Guntur', planStatus: 'active', monthlyValue: 7500, joined: 'May 20, 2026' },
  { id: '4', name: 'Kiran Babu', email: 'kiran@example.com', phone: '+971 50 555 0104', parent: 'Seetharama Garu', city: 'Guntur', planStatus: 'pending', monthlyValue: 6500, joined: 'Jul 4, 2026' },
  { id: '5', name: 'Suresh NRI', email: 'suresh@example.com', phone: '+1 510 555 0105', parent: 'Lakshmi Bai', city: 'Nellore', planStatus: 'pending', monthlyValue: 3200, joined: 'Jul 5, 2026' },
  { id: '6', name: 'Deepak Kumar', email: 'deepak@example.com', phone: '+65 9123 5566', parent: 'Ranga Rao', city: 'Vijayawada', planStatus: 'paused', monthlyValue: 4900, joined: 'Apr 15, 2026' },
]

export default function AdminRequestorsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Requestors (Families)</h1>
        <p className="text-gray-500 text-sm mt-1">{REQUESTORS.length} registered families</p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Family', 'Contact', 'Parent', 'City', 'Plan Status', 'Monthly Value', 'Joined', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {REQUESTORS.map(r => (
              <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{r.name}</div>
                </td>
                <td className="px-4 py-3 text-gray-600">
                  <div>{r.email}</div>
                  <div className="text-xs text-gray-400">{r.phone}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">{r.parent}</td>
                <td className="px-4 py-3 text-gray-500">{r.city}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${
                    r.planStatus === 'active' ? 'bg-green-100 text-green-800' :
                    r.planStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>{r.planStatus}</span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">₹{r.monthlyValue.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{r.joined}</td>
                <td className="px-4 py-3">
                  <button className="text-brand-600 hover:underline text-xs">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
