'use client'

import Link from 'next/link'

const TODAY_VISITS = [
  { id: '1', elder: 'Subba Rao Garu', address: 'Door 12, Gandhi Nagar, Vijayawada', time: '9:00 AM', status: 'completed' },
  { id: '2', elder: 'Rama Devi', address: 'Plot 45, Autonagar, Vijayawada', time: '2:30 PM', status: 'scheduled' },
]

const ASSIGNMENTS = [
  { id: '1', name: 'Subba Rao Garu', city: 'Vijayawada', age: 74, services: 6, parentId: '1' },
  { id: '2', name: 'Rama Devi', city: 'Vijayawada', age: 69, services: 4, parentId: '2' },
  { id: '3', name: 'Venkatesh Rao', city: 'Guntur', age: 78, services: 8, parentId: '3' },
]

export default function CaretakerDashboard() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hello, Lakshmi Devi</h1>
        <p className="text-gray-500 text-sm mt-1">Your care overview for today — Jul 5, 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Assignments', value: '3', icon: '👴', color: 'text-brand-600' },
          { label: 'Visits Today', value: '2', icon: '📅', color: 'text-blue-600' },
          { label: 'Completed Today', value: '1', icon: '✅', color: 'text-green-600' },
          { label: 'New Requests', value: '1', icon: '🔔', color: 'text-orange-600' },
        ].map(stat => (
          <div key={stat.label} className="card">
            <div className="text-xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Today's visits */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Today&apos;s Visits</h2>
          <Link href="/caretaker/visits" className="text-sm text-brand-600 hover:underline">View All</Link>
        </div>
        <div className="space-y-3">
          {TODAY_VISITS.map(visit => (
            <div key={visit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 text-sm">{visit.elder}</div>
                <div className="text-xs text-gray-500">{visit.address}</div>
                <div className="text-xs text-gray-400">{visit.time}</div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${
                  visit.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>{visit.status}</span>
                {visit.status === 'scheduled' && (
                  <button className="btn-primary text-xs py-1.5 px-3">Check In</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New request */}
      <div className="card border-2 border-orange-200 bg-orange-50">
        <h2 className="font-semibold text-gray-900 mb-3">🔔 New Care Plan Request</h2>
        <div className="bg-white p-4 rounded-lg flex items-center justify-between">
          <div>
            <div className="font-medium text-gray-900 text-sm">Seetharama Garu</div>
            <div className="text-xs text-gray-500">Guntur · ₹6,500/mo · 7 services</div>
          </div>
          <Link href="/caretaker/assignments" className="btn-primary text-xs py-1.5 px-3">Review</Link>
        </div>
      </div>

      {/* Active assignments */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Active Assignments</h2>
          <Link href="/caretaker/assignments" className="text-sm text-brand-600 hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {ASSIGNMENTS.map(a => (
            <Link key={a.id} href="/caretaker/timeline" className="p-4 bg-gray-50 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-200">
              <div className="font-medium text-gray-900 text-sm">{a.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{a.city} · Age {a.age}</div>
              <div className="text-xs text-gray-400 mt-0.5">{a.services} services</div>
              <div className="text-xs text-brand-600 mt-2">View Timeline →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
