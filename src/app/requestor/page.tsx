'use client'

import Link from 'next/link'

const MOCK_VISITS = [
  { id: '1', status: 'completed', date: 'Jul 4, 2026', note: 'BP checked (120/80), medicines given, groceries delivered' },
  { id: '2', status: 'completed', date: 'Jul 1, 2026', note: 'Doctor visit at Ramesh Hospital — prescription updated' },
  { id: '3', status: 'completed', date: 'Jun 28, 2026', note: 'Weekly check-in, house cleaning done' },
  { id: '4', status: 'completed', date: 'Jun 25, 2026', note: 'Utility bills paid, groceries delivered' },
  { id: '5', status: 'scheduled', date: 'Jul 7, 2026', note: 'Upcoming nurse visit' },
]

export default function RequestorDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, Ravi Chowdary</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s the latest on your parent&apos;s care</p>
      </div>

      {/* Plan status */}
      <div className="card flex items-center justify-between bg-green-50 border-green-200">
        <div>
          <div className="font-semibold text-gray-900">✅ Care Plan Active</div>
          <div className="text-sm text-gray-500 mt-0.5">Started Jun 1, 2026 · Caretaker: Lakshmi Devi</div>
        </div>
        <Link href="/requestor/services" className="btn-secondary text-sm py-2">View Plan</Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Visits This Month', value: '8', icon: '📅' },
          { label: 'Parent', value: 'Subba Rao Garu', icon: '👴' },
          { label: 'City', value: 'Vijayawada', icon: '📍' },
          { label: 'Monthly Plan', value: '₹5,800', icon: '💳' },
        ].map(stat => (
          <div key={stat.label} className="card">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className="text-lg font-bold text-gray-900 truncate">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Today's update */}
      <div className="card bg-blue-50 border-blue-100">
        <h2 className="font-semibold text-gray-900 mb-3">📋 Today&apos;s Update — Jul 5, 2026</h2>
        <div className="space-y-2">
          {[
            { icon: '✅', text: 'BP checked — 118/78 (Normal)' },
            { icon: '💊', text: 'Morning & evening medicines given' },
            { icon: '📸', text: '4 photos uploaded by caretaker' },
            { icon: '🛒', text: 'Grocery list fulfilled' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700">
              <span>{item.icon}</span> {item.text}
            </div>
          ))}
        </div>
      </div>

      {/* Recent visits */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Recent Activity</h2>
          <Link href="/requestor/timeline" className="text-sm text-brand-600 hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {MOCK_VISITS.map(visit => (
            <div key={visit.id} className="flex items-start gap-3 py-2 border-b border-gray-50 last:border-0">
              <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                visit.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-700">{visit.note}</div>
                <div className="text-xs text-gray-400 mt-0.5">{visit.date}</div>
              </div>
              <span className={`badge shrink-0 ${visit.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {visit.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
