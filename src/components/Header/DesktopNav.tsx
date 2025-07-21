'use client'

import Link from 'next/link'
import { Home, BookOpen, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LogoutButton from './LogoutButton'
import type { Session } from '@supabase/supabase-js'

const DesktopNav = ({

  session,
  isActive,

}: {

  session: Session | null
  isActive: (path: string) => boolean

}) => (
  <nav className="hidden md:flex items-center gap-2">
    <Link href="/">
      <Button variant={isActive('/') ? 'default' : 'ghost'} className="flex items-center gap-2">
        <Home className="w-4 h-4" />
        検索
      </Button>
    </Link>

    <Link href="/wordbook">
      <Button
        variant={isActive('/wordbook') ? 'default' : 'ghost'}
        className="flex items-center gap-2"
      >
        <BookOpen className="w-4 h-4" />
        単語帳
      </Button>
    </Link>

    {session?.user ? (

      <LogoutButton />

    ) : (

      <Link href="/login">
        <Button variant={isActive('/login') ? 'default' : 'ghost'} className="flex items-center gap-2">
          <User className="w-4 h-4" />
          ログイン
        </Button>
      </Link>

    )}

  </nav>
)

export default DesktopNav