import { createClient } from '@/lib/supabase/server'
import { formatDate, formatCurrency } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminPlansPage({ searchParams }: { searchParams: { status?: string } }) {
  const supabase = createClient()

  let query = supabase
    .from('service_plans')
    .select('*, parent_profiles(name, city, age), profiles!requestor_id(full_name, email), caretaker:profiles!caretaker_id(full_name)')
    .order('created_at', { ascending: false })

  if (searchParams.status) {
    query = query.eq('status', searchParams.status)
  }

  const { data: plans } = await query

  const STATUSES = ['all', 'pending', 'active', 'paused', 'cancelled']

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plans & Orders</h1>
        <p className="text-gray-500 text-sm mt-1">All service plans across all families</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(s => (
          <Link
            key={s}
            href={s === 'all' ? '/admin/plans' : `/admin/plans?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              (searchParams.status === s) || (!searchParams.status && s === 'all')
                ? 'bg-brand-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Elder', 'Family', 'Caretaker', 'Services', 'Monthly Cost', 'Status', 'Created', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {plans && plans.length > 0 ? plans.map(plan => (
              <tr key={plan.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{plan.parent_profiles?.name ?? '—'}</div>
                  <div className="text-xs text-gray-500">{plan.parent_profiles?.city}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">{plan.profiles?.full_name ?? '—'}</td>
                <td className="px-4 py-3 text-gray-700">{plan.caretaker?.full_name ?? <span className="text-orange-600 font-medium">Unassigned</span>}</td>
                <td className="px-4 py-3 text-gray-500">{plan.services?.length ?? 0} services</td>
                <td className="px-4 py-3 font-medium text-gray-900">{formatCurrency(plan.monthly_cost ?? 0)}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${
                    plan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    plan.status === 'active' ? 'bg-green-100 text-green-800' :
                    plan.status === 'paused' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>{plan.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(plan.created_at)}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/plans/${plan.id}`} className="text-brand-600 hover:underline text-xs">Manage</Link>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                  No plans found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
