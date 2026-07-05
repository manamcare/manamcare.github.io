import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export default async function CaretakerDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user?.id).single()
  const { data: plans } = await supabase
    .from('service_plans')
    .select('*, parent_profiles(name, city, age)')
    .eq('caretaker_id', user?.id)
    .eq('status', 'active')

  const { data: todayVisits } = await supabase
    .from('visits')
    .select('*, parent_profiles(name)')
    .eq('caretaker_id', user?.id)
    .gte('scheduled_at', new Date().toISOString().split('T')[0])
    .lte('scheduled_at', new Date().toISOString().split('T')[0] + 'T23:59:59')
    .order('scheduled_at')

  const { data: pendingPlans } = await supabase
    .from('service_plans')
    .select('*, parent_profiles(name, city)')
    .eq('status', 'pending')
    .is('caretaker_id', null)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Hello, {profile?.full_name ?? 'Caretaker'}</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s your care overview for today</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Assignments', value: plans?.length ?? 0, icon: '👴', color: 'text-brand-600' },
          { label: 'Visits Today', value: todayVisits?.length ?? 0, icon: '📅', color: 'text-blue-600' },
          { label: 'Completed Today', value: todayVisits?.filter(v => v.status === 'completed').length ?? 0, icon: '✅', color: 'text-green-600' },
          { label: 'New Requests', value: pendingPlans?.length ?? 0, icon: '🔔', color: 'text-orange-600' },
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
        {todayVisits && todayVisits.length > 0 ? (
          <div className="space-y-3">
            {todayVisits.map(visit => (
              <div key={visit.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{visit.parent_profiles?.name ?? 'Elder'}</div>
                  <div className="text-xs text-gray-500">{formatDate(visit.scheduled_at)}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`badge ${
                    visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                    visit.status === 'in_progress' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {visit.status.replace('_', ' ')}
                  </span>
                  <Link href={`/caretaker/visits/${visit.id}`} className="text-xs text-brand-600 hover:underline">
                    {visit.status === 'scheduled' ? 'Check In' : 'View'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-4 text-center">No visits scheduled for today</p>
        )}
      </div>

      {/* New plan requests */}
      {pendingPlans && pendingPlans.length > 0 && (
        <div className="card border-2 border-orange-200 bg-orange-50">
          <h2 className="font-semibold text-gray-900 mb-3">🔔 New Care Plan Requests</h2>
          <div className="space-y-3">
            {pendingPlans.slice(0, 3).map(plan => (
              <div key={plan.id} className="bg-white p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium text-gray-900 text-sm">{plan.parent_profiles?.name ?? 'Elder'}</div>
                  <div className="text-xs text-gray-500">{plan.parent_profiles?.city} · ₹{plan.monthly_cost?.toLocaleString('en-IN')}/mo</div>
                </div>
                <Link href={`/caretaker/assignments/${plan.id}`} className="btn-primary text-xs py-1.5 px-3">
                  Review
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active assignments summary */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">Active Assignments</h2>
          <Link href="/caretaker/assignments" className="text-sm text-brand-600 hover:underline">View All</Link>
        </div>
        {plans && plans.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {plans.map(plan => (
              <Link key={plan.id} href={`/caretaker/timeline/${plan.parent_id}`} className="p-4 bg-gray-50 hover:bg-brand-50 rounded-lg transition-colors border border-transparent hover:border-brand-200">
                <div className="font-medium text-gray-900 text-sm">{plan.parent_profiles?.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{plan.parent_profiles?.city} · Age {plan.parent_profiles?.age}</div>
                <div className="text-xs text-brand-600 mt-1">View Timeline →</div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 py-4 text-center">No active assignments yet</p>
        )}
      </div>
    </div>
  )
}
