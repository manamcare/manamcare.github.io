import Link from 'next/link'
import Logo from '@/components/Logo'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-950 via-navy-900 to-brand-900 flex flex-col">
      <div className="p-6">
        <Link href="/">
          <Logo size={36} darkBg />
        </Link>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        {children}
      </div>
    </div>
  )
}
