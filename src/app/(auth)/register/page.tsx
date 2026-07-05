'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { UserRole } from '@/types'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState<UserRole>('requestor')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, phone, role } },
    })

    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      await supabase.from('profiles').insert({
        id: data.user.id,
        role,
        full_name: fullName,
        phone,
        email,
      })
    }

    const redirectMap: Record<UserRole, string> = {
      requestor: '/requestor/onboarding',
      caretaker: '/caretaker',
      admin: '/admin',
    }
    router.push(redirectMap[role])
    router.refresh()
  }

  const ROLES = [
    { value: 'requestor', label: 'Family / NRI', desc: 'I want to arrange care for my parent', icon: '👨‍👩‍👧‍👦' },
    { value: 'caretaker', label: 'Caretaker', desc: 'I provide elder care services', icon: '🤝' },
  ]

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create Your Account</h1>
          <p className="text-gray-500 text-sm mt-1">Step {step} of 2</p>
          <div className="flex gap-2 mt-3 justify-center">
            <div className={`h-1.5 w-16 rounded-full ${step >= 1 ? 'bg-brand-600' : 'bg-gray-200'}`} />
            <div className={`h-1.5 w-16 rounded-full ${step >= 2 ? 'bg-brand-600' : 'bg-gray-200'}`} />
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <p className="text-sm font-medium text-gray-700 mb-4">I am registering as:</p>
            {ROLES.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value as UserRole)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  role === r.value ? 'border-brand-500 bg-brand-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-900">{r.label}</div>
                    <div className="text-xs text-gray-500">{r.desc}</div>
                  </div>
                </div>
              </button>
            ))}
            <button type="button" onClick={() => setStep(2)} className="btn-primary w-full justify-center mt-2">
              Continue →
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="form-label">Full Name</label>
              <input type="text" className="form-input" placeholder="Ravi Kumar" value={fullName} onChange={e => setFullName(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" placeholder="+91 98765 43210" value={phone} onChange={e => setPhone(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <label className="form-label">Password</label>
              <input type="password" className="form-input" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg border border-red-200">{error}</div>
            )}

            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(1)} className="btn-secondary flex-1 justify-center">
                ← Back
              </button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 justify-center">
                {loading ? 'Creating…' : 'Create Account'}
              </button>
            </div>
          </form>
        )}

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-600 font-medium hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
