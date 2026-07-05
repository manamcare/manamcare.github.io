import DashboardLayout from '@/components/layout/DashboardLayout'

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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout navItems={NAV_ITEMS} portalName="Admin Dashboard">
      {children}
    </DashboardLayout>
  )
}
