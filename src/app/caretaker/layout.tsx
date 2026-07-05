import DashboardLayout from '@/components/layout/DashboardLayout'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/caretaker', icon: '🏠' },
  { label: 'My Assignments', href: '/caretaker/assignments', icon: '👴' },
  { label: "Today's Visits", href: '/caretaker/visits', icon: '📅' },
  { label: 'Timeline View', href: '/caretaker/timeline', icon: '🕐' },
  { label: 'Uploads', href: '/caretaker/uploads', icon: '📸' },
  { label: 'Ride Requests', href: '/caretaker/rides', icon: '🚗' },
]

export default function CaretakerLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={NAV_ITEMS} portalName="Caretaker Portal">
      {children}
    </DashboardLayout>
  )
}
