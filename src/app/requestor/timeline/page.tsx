import { createClient } from '@/lib/supabase/server'
import { formatDateTime } from '@/lib/utils'

export default async function TimelinePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: parent } = await supabase.from('parent_profiles').select('id, name').eq('requestor_id', user?.id).single()
  const { data: visits } = await supabase
    .from('visits')
    .select('*, visit_uploads(*)')
    .eq('parent_id', parent?.id ?? '')
    .order('scheduled_at', { ascending: false })

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Care Timeline</h1>
        <p className="text-gray-500 text-sm mt-1">{parent?.name ? `Full history for ${parent.name}` : 'All visits and activities'}</p>
      </div>

      {(!visits || visits.length === 0) ? (
        <div className="card text-center py-12 text-gray-500">
          <div className="text-4xl mb-3">📅</div>
          <p>No visits recorded yet. Your caretaker&apos;s visits will appear here.</p>
        </div>
      ) : (
        <div className="relative">
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-6">
            {visits.map(visit => (
              <div key={visit.id} className="relative flex gap-4">
                <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm z-10 ${
                  visit.status === 'completed' ? 'bg-green-500 text-white' :
                  visit.status === 'in_progress' ? 'bg-orange-500 text-white' :
                  visit.status === 'missed' ? 'bg-red-500 text-white' :
                  'bg-blue-500 text-white'
                }`}>
                  {visit.status === 'completed' ? '✓' :
                   visit.status === 'in_progress' ? '▶' :
                   visit.status === 'missed' ? '✗' : '○'}
                </div>
                <div className="card flex-1 mb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="font-semibold text-gray-900 capitalize">{visit.status.replace('_', ' ')} Visit</div>
                      <div className="text-xs text-gray-500 mt-0.5">{formatDateTime(visit.scheduled_at)}</div>
                    </div>
                    {visit.checked_in_at && (
                      <div className="text-xs text-right text-gray-500">
                        <div>In: {formatDateTime(visit.checked_in_at)}</div>
                        {visit.checked_out_at && <div>Out: {formatDateTime(visit.checked_out_at)}</div>}
                      </div>
                    )}
                  </div>
                  {visit.notes && <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>}
                  {visit.visit_uploads && visit.visit_uploads.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {visit.visit_uploads.map((upload: { id: string; file_type: string; file_url: string; notes?: string }) => (
                        <a
                          key={upload.id}
                          href={upload.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1.5 rounded-lg transition-colors"
                        >
                          {upload.file_type === 'photo' ? '📷' : upload.file_type === 'receipt' ? '🧾' : '📄'}
                          {upload.notes ?? upload.file_type}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
