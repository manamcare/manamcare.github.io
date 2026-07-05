import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'

export default async function AdminCaretakersPage() {
  const supabase = createClient()

  const { data: caretakers } = await supabase
    .from('profiles')
    .select('*, service_plans(status, parent_id)')
    .eq('role', 'caretaker')
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Caretakers</h1>
        <p className="text-gray-500 text-sm mt-1">{caretakers?.length ?? 0} registered caretakers</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {caretakers?.map(ct => {
          const activeAssignments = ct.service_plans?.filter((p: any) => p.status === 'active').length ?? 0
          return (
            <div key={ct.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-100 flex items-center justify-center text-xl shrink-0">🤝</div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900">{ct.full_name}</div>
                  <div className="text-sm text-gray-500">{ct.email}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{ct.phone}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-sm">
                <span className={`badge ${activeAssignments > 0 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {activeAssignments} active assignment{activeAssignments !== 1 ? 's' : ''}
                </span>
                <span className="text-xs text-gray-400">Joined {formatDate(ct.created_at)}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex gap-2">
                <Link href={`/admin/caretakers/${ct.id}`} className="btn-secondary text-xs py-1.5 flex-1 justify-center">
                  View Profile
                </Link>
                <Link href={`/admin/plans?caretaker=${ct.id}`} className="btn-outline text-xs py-1.5 flex-1 justify-center">
                  Assignments
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      {(!caretakers || caretakers.length === 0) && (
        <div className="card text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">🤝</div>
          <p>No caretakers registered yet</p>
        </div>
      )}
    </div>
  )
}
