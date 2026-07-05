import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/lib/supabase/server'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/requestor', icon: '🏠' },
  { label: 'Parent Profile', href: '/requestor/parent-profile', icon: '👴' },
  { label: 'My Services', href: '/requestor/services', icon: '📋' },
  { label: 'Timeline', href: '/requestor/timeline', icon: '📅' },
  { label: 'Health Records', href: '/requestor/health-records', icon: '🏥' },
  { label: 'Ride Requests', href: '/requestor/rides', icon: '🚗' },
  { label: 'Billing', href: '/requestor/billing', icon: '💳' },
]

export default async function RequestorLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user?.id).single()

  return (
    <DashboardLayout navItems={NAV_ITEMS} portalName="Family Portal" userName={profile?.full_name}>
      {children}
    </DashboardLayout>
  )
}
