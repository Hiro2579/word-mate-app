import { render, screen } from '@testing-library/react'
import WordList from '@/components/Wordbook/WordList'
import '@testing-library/jest-dom'

// WordItemをモックして呼び出し確認をする（props確認も可能）
jest.mock('@/components/Wordbook/WordItem', () => ({
  __esModule: true,
  default: ({ word }: { word: { id: number; word: string } }) => (
    <div data-testid="word-item">{word.word}</div>
  ),
}))

describe('WordList', () => {
  const mockWords = [
    { id: 1, word: 'apple', created_at: '2024-01-01' },
    { id: 2, word: 'banana', created_at: '2024-01-02' },
    { id: 3, word: 'cherry', created_at: '2024-01-03' },
  ]

  it('propsの words の数だけ WordItem がレンダリングされる', () => {
    render(<WordList words={mockWords} setWords={jest.fn()} />)

    const items = screen.getAllByTestId('word-item')
    expect(items).toHaveLength(3)
    expect(items[0]).toHaveTextContent('apple')
    expect(items[1]).toHaveTextContent('banana')
    expect(items[2]).toHaveTextContent('cherry')
  })

  it('words が空配列の場合、WordItem は表示されない', () => {
    render(<WordList words={[]} setWords={jest.fn()} />)
    expect(screen.queryByTestId('word-item')).not.toBeInTheDocument()
  })
})