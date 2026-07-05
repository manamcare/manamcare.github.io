import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/lib/supabase/server'

const NAV_ITEMS = [
  { label: 'Overview', href: '/admin', icon: '📊' },
  { label: 'Requestors', href: '/admin/requestors', icon: '👨‍👩‍👧‍👦' },
  { label: 'Caretakers', href: '/admin/caretakers', icon: '🤝' },
  { label: 'Plans & Orders', href: '/admin/plans', icon: '📋' },
  { label: 'Visits', href: '/admin/visits', icon: '📅' },
  { label: 'Uploads', href: '/admin/uploads', icon: '📁' },
  { label: 'Ride Requests', href: '/admin/rides', icon: '🚗' },
  { label: 'Billing', href: '/admin/billing', icon: '💳' },
  { label: 'Emergency Log', href: '/admin/emergency', icon: '🆘' },
  { label: 'Reports', href: '/admin/reports', icon: '📈' },
]

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user?.id).single()

  return (
    <DashboardLayout navItems={NAV_ITEMS} portalName="Admin Dashboard" userName={profile?.full_name}>
      {children}
    </DashboardLayout>
  )
}
