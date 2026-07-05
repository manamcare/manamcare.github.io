import DashboardLayout from '@/components/layout/DashboardLayout'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/requestor', icon: '🏠' },
  { label: 'Parent Profile', href: '/requestor/parent-profile', icon: '👴' },
  { label: 'My Services', href: '/requestor/services', icon: '📋' },
  { label: 'Timeline', href: '/requestor/timeline', icon: '📅' },
  { label: 'Health Records', href: '/requestor/health-records', icon: '🏥' },
  { label: 'Ride Requests', href: '/requestor/rides', icon: '🚗' },
  { label: 'Billing', href: '/requestor/billing', icon: '💳' },
]

export default function RequestorLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={NAV_ITEMS} portalName="Family Portal">
      {children}
    </DashboardLayout>
  )
}
