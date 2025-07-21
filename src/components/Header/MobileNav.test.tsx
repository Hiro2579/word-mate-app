import { render, screen} from '@testing-library/react'
import MobileNav from './MobileNav'
import '@testing-library/jest-dom'
import type { Session } from '@supabase/supabase-js'

// LogoutButton をモック（isMobile prop に反応）
jest.mock('./LogoutButton', () => ({
  __esModule: true,
  default: ({ isMobile }: { isMobile?: boolean }) => (
    <button>{isMobile ? 'モバイルログアウト' : 'ログアウト'}</button>
  ),
}))

describe('MobileNav', () => {
  const closeMenu = jest.fn()

  it('ログインしていない場合、Login ボタンが表示される', () => {
    render(
      <MobileNav
        session={null}
        isActive={(path) => path === '/'}
        closeMenu={closeMenu}
      />
    )

    expect(screen.getByText('検索')).toBeInTheDocument()
    expect(screen.getByText('単語帳')).toBeInTheDocument()
    expect(screen.getByText('Login')).toBeInTheDocument()

  })

  it('ログイン済みの場合、LogoutButton が表示される', () => {
    const mockSession = {
      user: { id: '123' },
    } as Session

    render(
      <MobileNav
        session={mockSession}
        isActive={() => false}
        closeMenu={closeMenu}
      />
    )

    expect(screen.getByText('モバイルログアウト')).toBeInTheDocument()
  })
})
