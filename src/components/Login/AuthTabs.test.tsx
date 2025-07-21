import { render, screen} from '@testing-library/react'
import AuthTabs from './AuthTabs'
import '@testing-library/jest-dom'

// LoginForm / SignupForm をモック
jest.mock('./LoginForm', () => ({
  __esModule: true,
  default: ({ isLoading }: { isLoading: boolean }) => (
    <div>ログインフォーム - {isLoading ? '読み込み中' : '待機中'}</div>
  ),
}))

jest.mock('./SignupForm', () => ({
  __esModule: true,
  default: ({ isLoading }: { isLoading: boolean }) => (
    <div>サインアップフォーム - {isLoading ? '読み込み中' : '待機中'}</div>
  ),
}))

describe('AuthTabs', () => {
  const mockSetIsLoading = jest.fn()

  it('LoginとSign Upタブが表示される', () => {
    render(<AuthTabs isLoading={false} setIsLoading={mockSetIsLoading} />)

    expect(screen.getByText('Login')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  it('初期表示はログインフォーム', () => {
    render(<AuthTabs isLoading={false} setIsLoading={mockSetIsLoading} />)

    expect(screen.getByText('ログインフォーム - 待機中')).toBeInTheDocument()
  })
})