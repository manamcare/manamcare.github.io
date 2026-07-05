'use client'

const MOCK_TIMELINE = [
  {
    id: '1', status: 'completed', date: 'Jul 5, 2026', checkin: '9:10 AM', checkout: '11:45 AM',
    notes: 'Morning routine completed. BP 118/78 (normal). Medicines given. House swept and mopped.',
    uploads: [{ type: 'photo', label: 'Morning visit' }, { type: 'photo', label: 'Medicine given' }],
  },
  {
    id: '2', status: 'completed', date: 'Jul 4, 2026', checkin: '3:00 PM', checkout: '5:30 PM',
    notes: 'Accompanied to Dr. Srinivas clinic. Prescription renewed for BP medication. Receipt attached.',
    uploads: [{ type: 'receipt', label: 'Pharmacy receipt' }, { type: 'document', label: 'Prescription' }],
  },
  {
    id: '3', status: 'completed', date: 'Jul 1, 2026', checkin: '9:30 AM', checkout: '12:00 PM',
    notes: 'Groceries delivered. Utility bill for June paid at e-seva. Elder in good spirits.',
    uploads: [{ type: 'receipt', label: 'Grocery bill' }, { type: 'receipt', label: 'Electricity bill' }],
  },
  {
    id: '4', status: 'completed', date: 'Jun 28, 2026', checkin: '10:00 AM', checkout: '1:00 PM',
    notes: 'Weekly nurse visit. Blood sugar: 126 mg/dL. Slight knee pain reported — noted for doctor.',
    uploads: [{ type: 'health_report', label: 'Blood sugar report' }, { type: 'photo', label: 'Visit photo' }],
  },
  {
    id: '5', status: 'scheduled', date: 'Jul 7, 2026', checkin: null, checkout: null,
    notes: 'Upcoming: Weekly nurse visit + medicine refill',
    uploads: [],
  },
]

const UPLOAD_ICONS: Record<string, string> = {
  photo: '📷',
  receipt: '🧾',
  document: '📄',
  health_report: '🏥',
}

export default function TimelinePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Care Timeline</h1>
        <p className="text-gray-500 text-sm mt-1">Full history for Subba Rao Garu, Vijayawada</p>
      </div>

      <div className="relative">
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />
        <div className="space-y-6">
          {MOCK_TIMELINE.map(visit => (
            <div key={visit.id} className="relative flex gap-4">
              <div className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center text-sm z-10 font-bold ${
                visit.status === 'completed' ? 'bg-green-500 text-white' : 'bg-blue-400 text-white'
              }`}>
                {visit.status === 'completed' ? '✓' : '○'}
              </div>
              <div className="card flex-1 mb-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-semibold text-gray-900 capitalize">
                      {visit.status === 'scheduled' ? '⏰ Upcoming Visit' : '✅ Visit Completed'}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{visit.date}</div>
                  </div>
                  {visit.checkin && (
                    <div className="text-xs text-right text-gray-500 shrink-0">
                      <div>In: {visit.checkin}</div>
                      {visit.checkout && <div>Out: {visit.checkout}</div>}
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-2">{visit.notes}</p>
                {visit.uploads.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {visit.uploads.map((u, i) => (
                      <span key={i} className="inline-flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-2.5 py-1.5 rounded-lg">
                        {UPLOAD_ICONS[u.type]} {u.label}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
