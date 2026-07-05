import DashboardLayout from '@/components/layout/DashboardLayout'
import { createClient } from '@/lib/supabase/server'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/caretaker', icon: '🏠' },
  { label: 'My Assignments', href: '/caretaker/assignments', icon: '👴' },
  { label: 'Today\'s Visits', href: '/caretaker/visits', icon: '📅' },
  { label: 'Timeline View', href: '/caretaker/timeline', icon: '🕐' },
  { label: 'Uploads', href: '/caretaker/uploads', icon: '📸' },
  { label: 'Ride Requests', href: '/caretaker/rides', icon: '🚗' },
]

export default async function CaretakerLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user?.id).single()

  return (
    <DashboardLayout navItems={NAV_ITEMS} portalName="Caretaker Portal" userName={profile?.full_name}>
      {children}
    </DashboardLayout>
  )
}
