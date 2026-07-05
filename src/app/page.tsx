import Link from 'next/link'
import { SERVICES } from '@/types'

const TIERS = [
  {
    name: 'Basic Safety',
    price: '₹999 – ₹1,999',
    period: '/month',
    description: 'Peace of mind with regular check-ins',
    features: ['Weekly check-in visit', 'SOS emergency button monitoring', 'Monthly summary report', 'Phone support'],
    highlight: false,
  },
  {
    name: 'Care Plan',
    price: '₹3,000 – ₹7,000',
    period: '/month',
    description: 'Comprehensive daily care support',
    features: ['All Basic features', 'Medicine reminders & tracking', 'Doctor appointment support', 'Weekly visits', 'Basic errands support', 'Photo/video updates'],
    highlight: true,
  },
  {
    name: 'Full Care + Lifestyle',
    price: '₹8,000 – ₹20,000',
    period: '/month',
    description: 'Complete care with companionship',
    features: ['All Care Plan features', 'Companion visits', 'Hospital escort', 'Grocery & errands', 'Emergency response', 'Festival care support', 'Property monitoring (add-on)'],
    highlight: false,
  },
]

const STEPS = [
  { step: '01', title: 'Register & Add Parent Profile', desc: 'Create your account, add your parent\'s details, health records, doctor info, and insurance.' },
  { step: '02', title: 'Choose Your Services', desc: 'Pick from our modular services. System calculates your monthly cost automatically.' },
  { step: '03', title: 'We Assign a Caretaker', desc: 'A verified caretaker accepts your plan and begins visits — you track everything in real time.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-brand-600">MANAM</span>
              <span className="hidden sm:block text-xs text-gray-500 border-l border-gray-200 pl-2">Elder Care Platform</span>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="btn-primary text-sm py-2 px-4">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-brand-600/20 text-brand-300 text-sm px-4 py-1.5 rounded-full mb-6 border border-brand-600/30">
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse"></span>
            Serving families across Andhra Pradesh
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold text-white leading-tight mb-6">
            Your Parents Deserve<br />
            <span className="text-brand-400">Personal Care</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            We will personally take care of your parents like your extended family —
            with <span className="text-white font-medium">proof of every visit</span>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-primary text-base py-3.5 px-8">
              Start Care Plan →
            </Link>
            <Link href="#services" className="btn-secondary text-base py-3.5 px-8">
              Explore Services
            </Link>
          </div>
          {/* Trust indicators */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { label: 'Families Served', value: '200+' },
              { label: 'Verified Caretakers', value: '50+' },
              { label: 'Cities in AP', value: '12' },
              { label: 'Visits Completed', value: '5,000+' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live update preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">What You See Every Day</h2>
            <p className="text-gray-500 mt-2">Open the app and see real-time updates from your parent's caretaker</p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 max-w-sm mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs text-gray-500">Today's Updates</p>
                <p className="font-semibold text-gray-900">Ramarao Garu, Vijayawada</p>
              </div>
              <span className="badge bg-green-100 text-green-800">All Good</span>
            </div>
            <div className="space-y-3">
              {[
                { icon: '✅', text: 'BP checked — 120/80 (Normal)', time: '9:15 AM' },
                { icon: '💊', text: 'Morning medicines given', time: '9:20 AM' },
                { icon: '🛒', text: 'Groceries delivered', time: '11:00 AM' },
                { icon: '📸', text: '3 photos uploaded', time: '11:05 AM' },
                { icon: '🩺', text: 'Doctor visit completed', time: '2:30 PM' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <span className="text-base">{item.icon}</span>
                  <span className="flex-1 text-gray-700">{item.text}</span>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Modular Care Services</h2>
            <p className="text-gray-500 mt-2 max-w-xl mx-auto">Choose exactly what your parent needs. Mix and match — pay only for what you select.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map(service => (
              <div key={service.id} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{service.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
                      <span className="text-xs font-medium text-brand-600">₹{service.monthly_cost}/mo</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{service.description}</p>
                    <span className="mt-2 inline-block text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{service.category}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">Get started in 3 simple steps</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map(step => (
              <div key={step.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-brand-600 text-white text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h2>
            <p className="text-gray-500 mt-2">Choose a base plan or build your own with individual services</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TIERS.map(tier => (
              <div key={tier.name} className={`rounded-2xl p-8 border-2 ${tier.highlight ? 'border-brand-500 shadow-xl relative' : 'border-gray-200'}`}>
                {tier.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-xs font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="font-bold text-xl text-gray-900 mb-1">{tier.name}</h3>
                <div className="text-3xl font-bold text-brand-600 mb-1">{tier.price}<span className="text-base font-normal text-gray-500">{tier.period}</span></div>
                <p className="text-sm text-gray-500 mb-6">{tier.description}</p>
                <ul className="space-y-2.5 mb-8">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5 shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className={tier.highlight ? 'btn-primary w-full justify-center' : 'btn-outline w-full justify-center'}>
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-navy-950 to-brand-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Your parents are waiting. So are we.</h2>
          <p className="text-gray-300 text-lg mb-8">Join 200+ NRI families who trust MANAM to care for their parents every day.</p>
          <Link href="/register" className="btn-primary text-base py-4 px-10">
            Register Your Family Today →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="text-2xl font-bold text-white mb-1">MANAM</div>
              <div className="text-sm">Elder Care & Family Support Platform</div>
            </div>
            <div className="flex gap-8 text-sm">
              <Link href="/login" className="hover:text-white transition-colors">Family Login</Link>
              <Link href="/login?role=caretaker" className="hover:text-white transition-colors">Caretaker Login</Link>
              <Link href="/login?role=admin" className="hover:text-white transition-colors">Admin</Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs">
            © {new Date().getFullYear()} MANAM. All rights reserved. Serving families across Andhra Pradesh.
          </div>
        </div>
      </footer>
    </div>
  )
}
