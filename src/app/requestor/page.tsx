import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'

export default async function RequestorDashboard() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user?.id).single()
  const { data: parent } = await supabase.from('parent_profiles').select('*').eq('requestor_id', user?.id).single()
  const { data: plan } = await supabase.from('service_plans').select('*').eq('requestor_id', user?.id).order('created_at', { ascending: false }).limit(1).single()
  const { data: recentVisits } = await supabase.from('visits').select('*').eq('parent_id', parent?.id ?? '').order('scheduled_at', { ascending: false }).limit(5)

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome, {profile?.full_name ?? 'Family'}</h1>
        <p className="text-gray-500 text-sm mt-1">Here&apos;s the latest on your parent&apos;s care</p>
      </div>

      {/* No parent profile yet */}
      {!parent && (
        <div className="card border-2 border-dashed border-brand-200 bg-brand-50 text-center py-12">
          <div className="text-4xl mb-3">👴</div>
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Set Up Your Parent&apos;s Profile</h2>
          <p className="text-gray-500 text-sm mb-6 max-w-sm mx-auto">Add your parent&apos;s details, health records, and insurance to get started.</p>
          <Link href="/requestor/onboarding" className="btn-primary">
            Start Onboarding →
          </Link>
        </div>
      )}

      {/* Parent profile exists */}
      {parent && (
        <>
          {/* Plan status banner */}
          {plan && (
            <div className={`card flex items-center justify-between ${
              plan.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
              plan.status === 'active' ? 'bg-green-50 border-green-200' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div>
                <div className="font-semibold text-gray-900">
                  {plan.status === 'pending' ? '⏳ Care Plan Pending Acceptance' :
                   plan.status === 'active' ? '✅ Care Plan Active' :
                   '⏸ Care Plan Paused'}
                </div>
                <div className="text-sm text-gray-500 mt-0.5">
                  {plan.status === 'pending' ? 'A caretaker is being assigned to your plan.' :
                   plan.status === 'active' ? `Started ${formatDate(plan.start_date ?? plan.created_at)}` :
                   'Contact support to resume care.'}
                </div>
              </div>
              <Link href="/requestor/services" className="btn-secondary text-sm py-2">
                View Plan
              </Link>
            </div>
          )}

          {!plan && (
            <div className="card border-2 border-dashed border-brand-200 bg-brand-50 text-center py-8">
              <p className="text-gray-600 mb-4">No care plan yet. Choose services for {parent.name}.</p>
              <Link href="/requestor/services" className="btn-primary">Choose Services →</Link>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Visits This Month', value: recentVisits?.filter(v => v.status === 'completed').length ?? 0, icon: '📅' },
              { label: 'Parent', value: parent.name, icon: '👴' },
              { label: 'City', value: parent.city, icon: '📍' },
              { label: 'Emergency Contact', value: parent.emergency_contact_name ?? '—', icon: '📞' },
            ].map(stat => (
              <div key={stat.label} className="card">
                <div className="text-xl mb-1">{stat.icon}</div>
                <div className="text-lg font-bold text-gray-900 truncate">{stat.value}</div>
                <div className="text-xs text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Recent visits */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Recent Activity</h2>
              <Link href="/requestor/timeline" className="text-sm text-brand-600 hover:underline">View All</Link>
            </div>
            {recentVisits && recentVisits.length > 0 ? (
              <div className="space-y-3">
                {recentVisits.map(visit => (
                  <div key={visit.id} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      visit.status === 'completed' ? 'bg-green-500' :
                      visit.status === 'in_progress' ? 'bg-orange-500' :
                      visit.status === 'missed' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 capitalize">{visit.status.replace('_', ' ')} Visit</div>
                      <div className="text-xs text-gray-500">{formatDate(visit.scheduled_at)}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 py-4 text-center">No visits recorded yet</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}
