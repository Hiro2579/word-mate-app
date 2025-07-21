import { render, screen } from '@testing-library/react'
import Login from './Login'
import '@testing-library/jest-dom'

// AuthTabs をモック（isLoading / setIsLoading を受け取るだけ）
jest.mock('./AuthTabs', () => ({
  __esModule: true,
  default: ({ isLoading }: { isLoading: boolean }) => (
    <div data-testid="auth-tabs">AuthTabs: {isLoading ? 'Loading' : 'Idle'}</div>
  ),
}))

describe('Login', () => {
  it('ロゴとタイトルと説明が表示される', () => {
    render(<Login />)

    expect(screen.getByText('WordMate')).toBeInTheDocument()
    expect(
      screen.getByText('単語帳を利用するためにはログインしてください')
    ).toBeInTheDocument()
  })

  it('AuthTabs が表示される', () => {
    render(<Login />)
    expect(screen.getByTestId('auth-tabs')).toHaveTextContent('AuthTabs: Idle')
  })

  it('「← Homeに戻る」リンクが表示される', () => {
    render(<Login />)

    const link = screen.getByText('← Homeに戻る')
    expect(link).toBeInTheDocument()
    expect(link.getAttribute('href')).toBe('/')
  })
})