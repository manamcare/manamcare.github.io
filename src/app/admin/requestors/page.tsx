import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminRequestorsPage() {
  const supabase = createClient()

  const { data: requestors } = await supabase
    .from('profiles')
    .select('*, parent_profiles(name, city, age), service_plans(status, monthly_cost)')
    .eq('role', 'requestor')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Requestors (Families)</h1>
        <p className="text-gray-500 text-sm mt-1">{requestors?.length ?? 0} registered families</p>
      </div>

      <div className="card overflow-x-auto p-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100">
              {['Family', 'Email', 'Parent', 'City', 'Plan Status', 'Monthly Value', 'Joined', 'Actions'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-gray-500 uppercase px-4 py-3">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {requestors?.map(r => {
              const activePlan = r.service_plans?.find((p: any) => p.status === 'active')
              const pendingPlan = r.service_plans?.find((p: any) => p.status === 'pending')
              const plan = activePlan ?? pendingPlan ?? r.service_plans?.[0]
              return (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">{r.full_name}</div>
                    <div className="text-xs text-gray-500">{r.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{r.email}</td>
                  <td className="px-4 py-3 text-gray-700">{r.parent_profiles?.[0]?.name ?? <span className="text-gray-400">Not set</span>}</td>
                  <td className="px-4 py-3 text-gray-500">{r.parent_profiles?.[0]?.city ?? '—'}</td>
                  <td className="px-4 py-3">
                    {plan ? (
                      <span className={`badge ${
                        plan.status === 'active' ? 'bg-green-100 text-green-800' :
                        plan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>{plan.status}</span>
                    ) : <span className="text-gray-400 text-xs">No plan</span>}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {plan ? `₹${plan.monthly_cost?.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(r.created_at)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/requestors/${r.id}`} className="text-brand-600 hover:underline text-xs">View</Link>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
