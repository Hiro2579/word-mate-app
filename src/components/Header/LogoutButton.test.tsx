import { render, screen, fireEvent } from '@testing-library/react'
import LogoutButton from './LogoutButton'
import '@testing-library/jest-dom'


// authRepository のモック
const mockSignOut = jest.fn().mockResolvedValue(undefined)

jest.mock('@/app/lib/auth', () => ({
  authRepository: {
    signOut: () => mockSignOut(),
  },
}))

// useRouter のモック
const mockPush = jest.fn()
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}))

describe('LogoutButton', () => {
  beforeEach(() => {
    mockSignOut.mockClear()
    mockPush.mockClear()
  })

  it('モーダルを開いてログアウトアクションを実行できる', async () => {
    render(<LogoutButton />)

    // 最初はモーダルが存在しない
    expect(screen.queryByText('ログアウトを確定する')).not.toBeInTheDocument()

    // ログアウトボタンをクリック
    fireEvent.click(screen.getByText('ログアウト'))

    // モーダルが表示されるか確認
    expect(await screen.findByText('ログアウトを確定する')).toBeInTheDocument()

    // 「ログアウトする」ボタンをクリック
    fireEvent.click(screen.getByText('ログアウトする'))

    // サインアウト関数が呼ばれるか
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })
})