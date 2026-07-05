'use client'

const CARETAKERS = [
  { id: '1', name: 'Lakshmi Devi', email: 'lakshmi@manam.care', phone: '+91 98765 43210', city: 'Vijayawada', assignments: 2, completedVisits: 56, joined: 'May 15, 2026' },
  { id: '2', name: 'Ramu Garu', email: 'ramu@manam.care', phone: '+91 98765 43211', city: 'Guntur', assignments: 2, completedVisits: 48, joined: 'May 20, 2026' },
  { id: '3', name: 'Sujatha Rani', email: 'sujatha@manam.care', phone: '+91 98765 43212', city: 'Vijayawada', assignments: 1, completedVisits: 24, joined: 'Jun 1, 2026' },
  { id: '4', name: 'Krishna Mohan', email: 'krishna@manam.care', phone: '+91 98765 43213', city: 'Nellore', assignments: 0, completedVisits: 8, joined: 'Jul 1, 2026' },
]

export default function AdminCaretakersPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Caretakers</h1>
        <p className="text-gray-500 text-sm mt-1">{CARETAKERS.length} registered caretakers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CARETAKERS.map(ct => (
          <div key={ct.id} className="card hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-xl shrink-0">🤝</div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">{ct.name}</div>
                <div className="text-xs text-gray-500">{ct.email}</div>
                <div className="text-xs text-gray-400">{ct.phone}</div>
                <div className="text-xs text-gray-500 mt-0.5">📍 {ct.city}</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-center">
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-bold text-brand-600">{ct.assignments}</div>
                <div className="text-xs text-gray-500">Assignments</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2">
                <div className="text-lg font-bold text-green-600">{ct.completedVisits}</div>
                <div className="text-xs text-gray-500">Visits Done</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
              <button className="btn-secondary text-xs py-1.5 flex-1 justify-center">Profile</button>
              <button className="btn-outline text-xs py-1.5 flex-1 justify-center">Assign</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
