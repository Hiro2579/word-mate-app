'use client'

import Link from 'next/link'
import { Home, BookOpen, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LogoutButton from './LogoutButton'
import type { Session } from '@supabase/supabase-js'

const MobileNav = ({
  session,
  isActive,
  closeMenu,
}: {
  session: Session | null
  isActive: (path: string) => boolean
  closeMenu: () => void
}) => (
  <nav className="md:hidden mt-4 pb-4 border-t pt-4 flex flex-col gap-2">
    <Link href="/" onClick={closeMenu}>
      <Button variant={isActive('/') ? 'default' : 'ghost'} className="w-full justify-start gap-2">
        <Home className="w-4 h-4" />
        検索
      </Button>
    </Link>
    <Link href="/wordbook" onClick={closeMenu}>
      <Button
        variant={isActive('/wordbook') ? 'default' : 'ghost'}
        className="w-full justify-start gap-2"
      >
        <BookOpen className="w-4 h-4" />
        単語帳
      </Button>
    </Link>
    {session?.user ? (
      <div onClick={closeMenu}>
        <LogoutButton isMobile />
      </div>
    ) : (
      <Link href="/login" onClick={closeMenu}>
        <Button variant={isActive('/login') ? 'default' : 'ghost'} className="w-full justify-start gap-2">
          <User className="w-4 h-4" />
          Login
        </Button>
      </Link>
    )}
  </nav>
)

export default MobileNav