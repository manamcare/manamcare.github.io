'use client'

import Link from 'next/link'

const ASSIGNMENTS = [
  { id: '1', name: 'Subba Rao Garu', city: 'Vijayawada', age: 74, lastVisit: 'Jul 5, 2026', nextVisit: 'Jul 7, 2026', completedVisits: 18, status: 'active' },
  { id: '2', name: 'Rama Devi', city: 'Vijayawada', age: 69, lastVisit: 'Jul 3, 2026', nextVisit: 'Jul 5, 2026', completedVisits: 12, status: 'active' },
  { id: '3', name: 'Venkatesh Rao', city: 'Guntur', age: 78, lastVisit: 'Jul 2, 2026', nextVisit: 'Jul 8, 2026', completedVisits: 24, status: 'active' },
]

const MOCK_HISTORY = [
  { date: 'Jul 5, 2026', elder: 'Subba Rao Garu', status: 'completed', summary: 'BP 118/78, medicines given, photos uploaded' },
  { date: 'Jul 3, 2026', elder: 'Rama Devi', status: 'completed', summary: 'Doctor visit completed, prescription collected' },
  { date: 'Jul 2, 2026', elder: 'Venkatesh Rao', status: 'completed', summary: 'Weekly check-in, home cleaning done' },
  { date: 'Jul 1, 2026', elder: 'Subba Rao Garu', status: 'completed', summary: 'Grocery delivery + utility bills paid' },
  { date: 'Jun 28, 2026', elder: 'Rama Devi', status: 'completed', summary: 'Companion visit, played cards, called family' },
]

export default function CaretakerTimelinePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Timeline View</h1>

      {/* Elder selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {ASSIGNMENTS.map(a => (
          <div key={a.id} className="card hover:shadow-md transition-shadow cursor-pointer border-2 border-transparent hover:border-brand-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-brand-100 flex items-center justify-center text-lg">👴</div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">{a.name}</div>
                <div className="text-xs text-gray-500">{a.city} · Age {a.age}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-gray-50 rounded p-2">
                <div className="text-gray-500">Last Visit</div>
                <div className="font-medium text-gray-800">{a.lastVisit}</div>
              </div>
              <div className="bg-gray-50 rounded p-2">
                <div className="text-gray-500">Next Visit</div>
                <div className="font-medium text-gray-800">{a.nextVisit}</div>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500">{a.completedVisits} visits completed</div>
          </div>
        ))}
      </div>

      {/* Recent activity across all */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Recent Activity — All Elders</h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-4">
            {MOCK_HISTORY.map((h, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-xs z-10 shrink-0">✓</div>
                <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-gray-900 text-sm">{h.elder}</span>
                    <span className="text-xs text-gray-400">{h.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-0.5">{h.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
