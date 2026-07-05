'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const STEPS = ['Parent Details', 'Health & Doctors', 'Insurance', 'Emergency Contact']

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    name: '', age: '', address: '', city: '', state: '',
    health_notes: '', primary_physician: '', physician_phone: '',
    insurance_provider: '', insurance_policy_number: '',
    emergency_contact_name: '', emergency_contact_phone: '',
  })

  function update(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit() {
    setSaving(true)
    setError('')
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const { error: err } = await supabase.from('parent_profiles').insert({
      requestor_id: user?.id,
      name: form.name,
      age: parseInt(form.age),
      address: form.address,
      city: form.city,
      state: form.state,
      health_notes: form.health_notes,
      primary_physician: form.primary_physician,
      physician_phone: form.physician_phone,
      insurance_provider: form.insurance_provider,
      insurance_policy_number: form.insurance_policy_number,
      emergency_contact_name: form.emergency_contact_name,
      emergency_contact_phone: form.emergency_contact_phone,
    })

    if (err) {
      setError(err.message)
      setSaving(false)
      return
    }

    router.push('/requestor/services')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Set Up Parent Profile</h1>
        <p className="text-gray-500 text-sm mt-1">This helps us assign the right caretaker and provide personalised care.</p>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-2 flex-1">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold shrink-0 ${
              i < step ? 'bg-brand-600 text-white' :
              i === step ? 'bg-brand-600 text-white ring-4 ring-brand-100' :
              'bg-gray-200 text-gray-500'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            {i < STEPS.length - 1 && <div className={`flex-1 h-1 rounded-full ${i < step ? 'bg-brand-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="card space-y-5">
        <h2 className="font-semibold text-gray-900 text-lg">{STEPS[step]}</h2>

        {step === 0 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Parent&apos;s Full Name *</label>
                <input className="form-input" placeholder="Rama Rao" value={form.name} onChange={e => update('name', e.target.value)} required />
              </div>
              <div>
                <label className="form-label">Age *</label>
                <input type="number" className="form-input" placeholder="72" value={form.age} onChange={e => update('age', e.target.value)} required />
              </div>
            </div>
            <div>
              <label className="form-label">Home Address *</label>
              <input className="form-input" placeholder="Door No. 12, Gandhi Nagar" value={form.address} onChange={e => update('address', e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">City *</label>
                <input className="form-input" placeholder="Vijayawada" value={form.city} onChange={e => update('city', e.target.value)} required />
              </div>
              <div>
                <label className="form-label">State *</label>
                <select className="form-input" value={form.state} onChange={e => update('state', e.target.value)}>
                  <option value="">Select</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  <option value="Telangana">Telangana</option>
                </select>
              </div>
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <label className="form-label">Health Notes / Conditions</label>
              <textarea className="form-textarea" rows={3} placeholder="e.g., Type 2 Diabetes, Hypertension, Knee pain..." value={form.health_notes} onChange={e => update('health_notes', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Primary Physician Name</label>
                <input className="form-input" placeholder="Dr. Suresh Kumar" value={form.primary_physician} onChange={e => update('primary_physician', e.target.value)} />
              </div>
              <div>
                <label className="form-label">Physician Phone</label>
                <input type="tel" className="form-input" placeholder="+91 98765 43210" value={form.physician_phone} onChange={e => update('physician_phone', e.target.value)} />
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label className="form-label">Insurance Provider</label>
              <input className="form-input" placeholder="Star Health / LIC / ESIS..." value={form.insurance_provider} onChange={e => update('insurance_provider', e.target.value)} />
            </div>
            <div>
              <label className="form-label">Policy Number</label>
              <input className="form-input" placeholder="Policy / ID number" value={form.insurance_policy_number} onChange={e => update('insurance_policy_number', e.target.value)} />
            </div>
            <p className="text-sm text-gray-500">You can upload insurance documents in the Health Records section after setup.</p>
          </>
        )}

        {step === 3 && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Emergency Contact Name *</label>
                <input className="form-input" placeholder="Ravi Kumar" value={form.emergency_contact_name} onChange={e => update('emergency_contact_name', e.target.value)} required />
              </div>
              <div>
                <label className="form-label">Emergency Contact Phone *</label>
                <input type="tel" className="form-input" placeholder="+91 98765 43210" value={form.emergency_contact_phone} onChange={e => update('emergency_contact_phone', e.target.value)} required />
              </div>
            </div>
          </>
        )}

        {error && <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>}

        <div className="flex gap-3 pt-2">
          {step > 0 && (
            <button type="button" onClick={() => setStep(s => s - 1)} className="btn-secondary flex-1 justify-center">
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button type="button" onClick={() => setStep(s => s + 1)} className="btn-primary flex-1 justify-center">
              Continue →
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} disabled={saving} className="btn-primary flex-1 justify-center">
              {saving ? 'Saving…' : 'Save & Choose Services →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
