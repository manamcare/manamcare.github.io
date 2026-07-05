import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { formatDate } from '@/lib/utils'

export default async function CaretakerTimelinePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: plans } = await supabase
    .from('service_plans')
    .select('*, parent_profiles(id, name, age, city)')
    .eq('caretaker_id', user?.id)
    .eq('status', 'active')

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Timeline View</h1>
      <p className="text-gray-500 text-sm">Select an elder to view their full care timeline.</p>

      {(!plans || plans.length === 0) ? (
        <div className="card text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">👴</div>
          <p>No active assignments</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {plans.map(plan => (
            <Link
              key={plan.id}
              href={`/caretaker/timeline/${plan.parent_profiles?.id}`}
              className="card hover:shadow-md transition-shadow border-2 border-transparent hover:border-brand-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-xl">👴</div>
                <div>
                  <div className="font-semibold text-gray-900">{plan.parent_profiles?.name}</div>
                  <div className="text-sm text-gray-500">{plan.parent_profiles?.city} · Age {plan.parent_profiles?.age}</div>
                  <div className="text-xs text-brand-600 mt-1">View full timeline →</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
