import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatCurrency } from '@/lib/utils'

export default async function AdminDashboard() {
  const supabase = createClient()

  const [
    { count: totalRequestors },
    { count: totalCaretakers },
    { count: totalPlans },
    { count: pendingPlans },
    { count: activePlans },
    { count: totalVisits },
    { data: recentPlans },
    { data: recentVisits },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'requestor'),
    supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'caretaker'),
    supabase.from('service_plans').select('*', { count: 'exact', head: true }),
    supabase.from('service_plans').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    supabase.from('service_plans').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('visits').select('*', { count: 'exact', head: true }),
    supabase.from('service_plans').select('*, parent_profiles(name, city), profiles!requestor_id(full_name)').order('created_at', { ascending: false }).limit(5),
    supabase.from('visits').select('*, parent_profiles(name), profiles!caretaker_id(full_name)').order('scheduled_at', { ascending: false }).limit(5),
  ])

  const STATS = [
    { label: 'Total Families', value: totalRequestors ?? 0, icon: '👨‍👩‍👧‍👦', href: '/admin/requestors', color: 'text-blue-600' },
    { label: 'Caretakers', value: totalCaretakers ?? 0, icon: '🤝', href: '/admin/caretakers', color: 'text-green-600' },
    { label: 'Pending Plans', value: pendingPlans ?? 0, icon: '⏳', href: '/admin/plans?status=pending', color: 'text-orange-600' },
    { label: 'Active Plans', value: activePlans ?? 0, icon: '✅', href: '/admin/plans?status=active', color: 'text-brand-600' },
    { label: 'Total Visits', value: totalVisits ?? 0, icon: '📅', href: '/admin/visits', color: 'text-purple-600' },
    { label: 'Total Plans', value: totalPlans ?? 0, icon: '📋', href: '/admin/plans', color: 'text-gray-600' },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Admin Overview</h1>
        <p className="text-gray-500 text-sm mt-1">MANAM platform at a glance</p>
      </div>

      {/* Stats grid */}
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
            {recentPlans?.map(plan => (
              <div key={plan.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{plan.parent_profiles?.name}</div>
                  <div className="text-xs text-gray-500">{plan.profiles?.full_name} · {plan.parent_profiles?.city}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`badge ${
                    plan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    plan.status === 'active' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>{plan.status}</span>
                  <span className="text-xs text-gray-500">₹{plan.monthly_cost?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            )) ?? <p className="text-sm text-gray-500 text-center py-4">No plans yet</p>}
          </div>
        </div>

        {/* Recent visits */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">Recent Visits</h2>
            <Link href="/admin/visits" className="text-sm text-brand-600 hover:underline">View All</Link>
          </div>
          <div className="space-y-3">
            {recentVisits?.map(visit => (
              <div key={visit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="text-sm font-medium text-gray-900">{visit.parent_profiles?.name}</div>
                  <div className="text-xs text-gray-500">By {visit.profiles?.full_name}</div>
                </div>
                <span className={`badge ${
                  visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                  visit.status === 'in_progress' ? 'bg-orange-100 text-orange-800' :
                  visit.status === 'missed' ? 'bg-red-100 text-red-800' :
                  'bg-blue-100 text-blue-800'
                }`}>{visit.status.replace('_', ' ')}</span>
              </div>
            )) ?? <p className="text-sm text-gray-500 text-center py-4">No visits yet</p>}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/plans?status=pending" className="btn-primary text-sm py-2">
            🔔 Review Pending Plans ({pendingPlans ?? 0})
          </Link>
          <Link href="/admin/caretakers" className="btn-secondary text-sm py-2">
            👤 Manage Caretakers
          </Link>
          <Link href="/admin/reports" className="btn-secondary text-sm py-2">
            📈 View Reports
          </Link>
          <Link href="/admin/emergency" className="btn-secondary text-sm py-2">
            🆘 Emergency Log
          </Link>
        </div>
      </div>
    </div>
  )
}
