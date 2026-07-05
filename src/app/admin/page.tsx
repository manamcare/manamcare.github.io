'use client'

import Link from 'next/link'

const RECENT_PLANS = [
  { elder: 'Subba Rao Garu', family: 'Ravi Chowdary', city: 'Vijayawada', status: 'active', cost: 5800 },
  { elder: 'Rama Devi', family: 'Prasad Rao', city: 'Vijayawada', status: 'active', cost: 4200 },
  { elder: 'Venkatesh Rao', family: 'Anitha Kumar', city: 'Guntur', status: 'active', cost: 7500 },
  { elder: 'Seetharama Garu', family: 'Kiran Babu', city: 'Guntur', status: 'pending', cost: 6500 },
  { elder: 'Lakshmi Bai', family: 'Suresh NRI', city: 'Nellore', status: 'pending', cost: 3200 },
]

const RECENT_VISITS = [
  { elder: 'Subba Rao Garu', caretaker: 'Lakshmi Devi', status: 'completed', date: 'Jul 5' },
  { elder: 'Rama Devi', caretaker: 'Lakshmi Devi', status: 'scheduled', date: 'Jul 5' },
  { elder: 'Venkatesh Rao', caretaker: 'Ramu Garu', status: 'completed', date: 'Jul 4' },
  { elder: 'Seetharama Garu', caretaker: 'Unassigned', status: 'scheduled', date: 'Jul 6' },
]

const STATS = [
  { label: 'Total Families', value: 28, icon: '👨‍👩‍👧‍👦', href: '/admin/requestors', color: 'text-blue-600' },
  { label: 'Caretakers', value: 8, icon: '🤝', href: '/admin/caretakers', color: 'text-green-600' },
  { label: 'Pending Plans', value: 3, icon: '⏳', href: '/admin/plans', color: 'text-orange-600' },
  { label: 'Active Plans', value: 19, icon: '✅', href: '/admin/plans', color: 'text-brand-600' },
  { label: 'Total Visits', value: 312, icon: '📅', href: '/admin/visits', color: 'text-purple-600' },
  { label: 'Monthly Revenue', value: '₹1.4L', icon: '💰', href: '/admin/billing', color: 'text-gray-700' },
]

export default function AdminDashboard() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 text-sm mt-1">MANAM platform at a glance — Jul 5, 2026</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {STATS.map(stat => (
          <Link key={stat.label} href={stat.href} className="card hover:shadow-md transition-shadow text-center">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent plans */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Plans</h2>
            <Link href="/admin/plans" className="text-sm text-brand-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {RECENT_PLANS.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{p.elder}</div>
                  <div className="text-xs text-gray-500">{p.family} · {p.city}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {p.status}
                  </span>
                  <span className="text-xs text-gray-500">₹{p.cost.toLocaleString('en-IN')}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent visits */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Visits</h2>
            <Link href="/admin/visits" className="text-sm text-brand-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {RECENT_VISITS.map((v, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{v.elder}</div>
                  <div className="text-xs text-gray-500">By {v.caretaker} · {v.date}</div>
                </div>
                <span className={`badge ${
                  v.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>{v.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/plans" className="btn-primary text-sm py-2">🔔 Review Pending Plans (3)</Link>
          <Link href="/admin/caretakers" className="btn-secondary text-sm py-2">👤 Manage Caretakers</Link>
          <Link href="/admin/reports" className="btn-secondary text-sm py-2">📈 View Reports</Link>
          <Link href="/admin/emergency" className="btn-secondary text-sm py-2">🆘 Emergency Log</Link>
        </div>
      </div>
    </div>
  )
}
