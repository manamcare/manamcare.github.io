'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

const ALL_PLANS = [
  { id: '1', elder: 'Subba Rao Garu', elderCity: 'Vijayawada', family: 'Ravi Chowdary', caretaker: 'Lakshmi Devi', services: 6, cost: 5800, status: 'active', created: 'Jun 1, 2026' },
  { id: '2', elder: 'Rama Devi', elderCity: 'Vijayawada', family: 'Prasad Rao', caretaker: 'Lakshmi Devi', services: 4, cost: 4200, status: 'active', created: 'Jun 10, 2026' },
  { id: '3', elder: 'Venkatesh Rao', elderCity: 'Guntur', family: 'Anitha Kumar', caretaker: 'Ramu Garu', services: 8, cost: 7500, status: 'active', created: 'May 20, 2026' },
  { id: '4', elder: 'Seetharama Garu', elderCity: 'Guntur', family: 'Kiran Babu', caretaker: '—', services: 7, cost: 6500, status: 'pending', created: 'Jul 4, 2026' },
  { id: '5', elder: 'Lakshmi Bai', elderCity: 'Nellore', family: 'Suresh NRI', caretaker: '—', services: 3, cost: 3200, status: 'pending', created: 'Jul 5, 2026' },
  { id: '6', elder: 'Ranga Rao', elderCity: 'Vijayawada', family: 'Deepak Kumar', caretaker: 'Ramu Garu', services: 5, cost: 4900, status: 'paused', created: 'Apr 15, 2026' },
]

const STATUSES = ['all', 'pending', 'active', 'paused', 'cancelled']

function PlansContent() {
  const searchParams = useSearchParams()
  const statusFilter = searchParams.get('status') ?? 'all'

  const plans = statusFilter === 'all' ? ALL_PLANS : ALL_PLANS.filter(p => p.status === statusFilter)

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Plans & Orders</h1>
        <p className="text-gray-500 text-sm mt-1">{plans.length} plans shown</p>
      </div>

      <div className="flex gap-2 flex-wrap">
        {STATUSES.map(s => (
          <Link key={s} href={s === 'all' ? '/admin/plans' : `/admin/plans?status=${s}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              statusFilter === s ? 'bg-brand-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}>
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Link>
        ))}
      </div>

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
            {plans.map(plan => (
              <tr key={plan.id} className="border-b border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="font-medium text-gray-900">{plan.elder}</div>
                  <div className="text-xs text-gray-500">{plan.elderCity}</div>
                </td>
                <td className="px-4 py-3 text-gray-700">{plan.family}</td>
                <td className="px-4 py-3">
                  {plan.caretaker === '—'
                    ? <span className="text-orange-600 font-medium text-xs">Unassigned</span>
                    : <span className="text-gray-700">{plan.caretaker}</span>}
                </td>
                <td className="px-4 py-3 text-gray-500">{plan.services} services</td>
                <td className="px-4 py-3 font-medium text-gray-900">₹{plan.cost.toLocaleString('en-IN')}</td>
                <td className="px-4 py-3">
                  <span className={`badge ${
                    plan.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    plan.status === 'active' ? 'bg-green-100 text-green-800' :
                    plan.status === 'paused' ? 'bg-gray-100 text-gray-800' :
                    'bg-red-100 text-red-800'
                  }`}>{plan.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">{plan.created}</td>
                <td className="px-4 py-3">
                  <button className="text-brand-600 hover:underline text-xs">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default function AdminPlansPage() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-gray-500">Loading…</div>}>
      <PlansContent />
    </Suspense>
  )
}
