'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { formatDateTime } from '@/lib/utils'
import Link from 'next/link'

export default function VisitsPage() {
  const [visits, setVisits] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data } = await supabase
        .from('visits')
        .select('*, parent_profiles(name, city, address)')
        .eq('caretaker_id', user?.id)
        .order('scheduled_at', { ascending: false })
      setVisits(data ?? [])
      setLoading(false)
    }
    load()
  }, [])

  async function checkIn(visitId: string) {
    const supabase = createClient()
    await supabase.from('visits').update({
      status: 'in_progress',
      checked_in_at: new Date().toISOString(),
    }).eq('id', visitId)
    setVisits(prev => prev.map(v => v.id === visitId ? { ...v, status: 'in_progress', checked_in_at: new Date().toISOString() } : v))
  }

  async function checkOut(visitId: string) {
    const supabase = createClient()
    await supabase.from('visits').update({
      status: 'completed',
      checked_out_at: new Date().toISOString(),
    }).eq('id', visitId)
    setVisits(prev => prev.map(v => v.id === visitId ? { ...v, status: 'completed', checked_out_at: new Date().toISOString() } : v))
  }

  if (loading) return <div className="text-center py-12 text-gray-500">Loading visits…</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">My Visits</h1>

      {visits.length === 0 ? (
        <div className="card text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">📅</div>
          <p>No visits scheduled yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visits.map(visit => (
            <div key={visit.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="font-semibold text-gray-900">{visit.parent_profiles?.name ?? 'Elder'}</div>
                  <div className="text-sm text-gray-500">{visit.parent_profiles?.address}, {visit.parent_profiles?.city}</div>
                  <div className="text-xs text-gray-400 mt-1">Scheduled: {formatDateTime(visit.scheduled_at)}</div>
                  {visit.checked_in_at && <div className="text-xs text-green-600">Checked in: {formatDateTime(visit.checked_in_at)}</div>}
                  {visit.checked_out_at && <div className="text-xs text-blue-600">Checked out: {formatDateTime(visit.checked_out_at)}</div>}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`badge ${
                    visit.status === 'completed' ? 'bg-green-100 text-green-800' :
                    visit.status === 'in_progress' ? 'bg-orange-100 text-orange-800' :
                    visit.status === 'missed' ? 'bg-red-100 text-red-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {visit.status.replace('_', ' ')}
                  </span>
                  <div className="flex gap-2">
                    {visit.status === 'scheduled' && (
                      <button onClick={() => checkIn(visit.id)} className="btn-primary text-xs py-1.5 px-3">
                        Check In
                      </button>
                    )}
                    {visit.status === 'in_progress' && (
                      <button onClick={() => checkOut(visit.id)} className="btn-primary text-xs py-1.5 px-3">
                        Check Out
                      </button>
                    )}
                    <Link href={`/caretaker/visits/${visit.id}`} className="btn-secondary text-xs py-1.5 px-3">
                      Details
                    </Link>
                  </div>
                </div>
              </div>
              {visit.notes && <p className="text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100">{visit.notes}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
