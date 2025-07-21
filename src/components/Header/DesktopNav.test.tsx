// __tests__/DesktopNav.test.tsx
import { render, screen } from '@testing-library/react'
import DesktopNav from './DesktopNav'
import '@testing-library/jest-dom'
import type { Session } from '@supabase/supabase-js'

// LogoutButton をモック
jest.mock('./LogoutButton', () => ({
  __esModule: true,
  default: () => <button>ログアウト</button>,
}))

describe('DesktopNav', () => {
  const mockIsActive = (path: string) => path === '/'


  it('未ログイン状態でログインボタンが表示される', () => {
    render(<DesktopNav session={null} isActive={mockIsActive} />)
    expect(screen.getByText('ログイン')).toBeInTheDocument()
  })


  it('ログイン状態でログアウトボタンが表示される', () => {
    const mockSession = {
      user: { id: 'user_id' },
    } as Session

    render(<DesktopNav session={mockSession} isActive={mockIsActive} />)
    expect(screen.getByText('ログアウト')).toBeInTheDocument()
  })
})