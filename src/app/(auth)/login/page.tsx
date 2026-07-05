'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="w-full max-w-md space-y-4">
      {/* Demo portal buttons */}
      <div className="bg-white rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Sign In to MANAM</h1>
          <p className="text-gray-500 text-sm mt-1">Choose your portal to continue</p>
        </div>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => router.push('/requestor')}
            className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-brand-400 hover:bg-brand-50 text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">👨‍👩‍👧‍👦</span>
              <div>
                <div className="font-semibold text-gray-900">Family / NRI Portal</div>
                <div className="text-xs text-gray-500">Manage care for your parent in AP</div>
              </div>
              <span className="ml-auto text-gray-400">→</span>
            </div>
          </button>

          <button
            onClick={() => router.push('/caretaker')}
            className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-brand-400 hover:bg-brand-50 text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <div className="font-semibold text-gray-900">Caretaker Portal</div>
                <div className="text-xs text-gray-500">View assignments, check in to visits</div>
              </div>
              <span className="ml-auto text-gray-400">→</span>
            </div>
          </button>

          <button
            onClick={() => router.push('/admin')}
            className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-brand-400 hover:bg-brand-50 text-left transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <div className="font-semibold text-gray-900">Admin Dashboard</div>
                <div className="text-xs text-gray-500">Platform overview and management</div>
              </div>
              <span className="ml-auto text-gray-400">→</span>
            </div>
          </button>
        </div>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs text-gray-400 bg-white px-2">
            or sign in with email
          </div>
        </div>

        <form className="space-y-4" onSubmit={e => { e.preventDefault(); router.push('/requestor') }}>
          <div>
            <label className="form-label">Email Address</label>
            <input type="email" className="form-input" placeholder="you@example.com" />
          </div>
          <div>
            <label className="form-label">Password</label>
            <input type="password" className="form-input" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary w-full justify-center">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-brand-600 font-medium hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  )
}
