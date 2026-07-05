'use client'

import { useState, useEffect } from 'react'
import { SERVICES } from '@/types'
import { formatCurrency } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

export default function ServicesPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<string[]>([])
  const [existingPlan, setExistingPlan] = useState<{ id: string; status: string; services: string[] } | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      const { data: plan } = await supabase.from('service_plans').select('*').eq('requestor_id', user?.id).single()
      if (plan) {
        setExistingPlan(plan)
        setSelected(plan.services ?? [])
      }
    }
    load()
  }, [])

  const total = selected.reduce((sum, id) => {
    const s = SERVICES.find(sv => sv.id === id)
    return sum + (s?.monthly_cost ?? 0)
  }, 0)

  function toggle(id: string) {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  async function handleSave() {
    if (selected.length === 0) return
    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    const { data: parent } = await supabase.from('parent_profiles').select('id').eq('requestor_id', user?.id).single()

    if (existingPlan) {
      await supabase.from('service_plans').update({ services: selected, monthly_cost: total }).eq('id', existingPlan.id)
    } else {
      await supabase.from('service_plans').insert({
        requestor_id: user?.id,
        parent_id: parent?.id,
        status: 'pending',
        services: selected,
        monthly_cost: total,
      })
    }

    setSaving(false)
    router.push('/requestor')
  }

  const byCategory = SERVICES.reduce<Record<string, typeof SERVICES>>((acc, s) => {
    acc[s.category] = [...(acc[s.category] ?? []), s]
    return acc
  }, {})

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Choose Services</h1>
          <p className="text-gray-500 text-sm mt-1">Select the services your parent needs. You can change this anytime.</p>
        </div>
        {existingPlan && (
          <span className={`badge ${existingPlan.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'} shrink-0`}>
            Plan {existingPlan.status}
          </span>
        )}
      </div>

      {Object.entries(byCategory).map(([category, services]) => (
        <div key={category}>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map(service => {
              const isSelected = selected.includes(service.id)
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => toggle(service.id)}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected ? 'border-brand-500 bg-brand-50' : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-gray-900 text-sm">{service.name}</span>
                        <span className={`text-sm font-medium shrink-0 ${isSelected ? 'text-brand-600' : 'text-gray-600'}`}>
                          ₹{service.monthly_cost.toLocaleString('en-IN')}/mo
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">{service.description}</p>
                    </div>
                  </div>
                  {isSelected && <div className="mt-2 text-xs text-brand-600 font-medium">✓ Selected</div>}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Sticky summary */}
      <div className="sticky bottom-4 bg-white rounded-xl shadow-lg border border-gray-200 p-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">{selected.length} service{selected.length !== 1 ? 's' : ''} selected</div>
          <div className="text-xl font-bold text-gray-900">{formatCurrency(total)}<span className="text-sm font-normal text-gray-500">/month</span></div>
        </div>
        <button
          onClick={handleSave}
          disabled={selected.length === 0 || saving}
          className="btn-primary"
        >
          {saving ? 'Saving…' : existingPlan ? 'Update Plan' : 'Submit Plan →'}
        </button>
      </div>
    </div>
  )
}
