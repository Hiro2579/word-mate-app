import { render, screen, fireEvent } from '@testing-library/react'
import WordItem from '@/components/Wordbook/WordItem'
import '@testing-library/jest-dom'

const mockWord = {
  id: 1,
  word: 'example',
  created_at: new Date('2024-01-01').toISOString(),
}

const mockSetWords = jest.fn()
const mockDelete = jest.fn().mockResolvedValue(undefined)

jest.mock('@/app/lib/wordbook', () => ({
  wordRepository: {
    delete: (...args: unknown[]) => mockDelete(...args),
  },
}))

jest.mock('@/components/Wordbook/DeleteWordButton', () => ({
  __esModule: true,
  default: ({ onDelete }: { onDelete: () => void }) => (
    <button onClick={onDelete}>削除</button>
  ),
}))

describe('WordItem', () => {
  beforeEach(() => {
    mockSetWords.mockClear()
    mockDelete.mockClear()
  })

  it('単語と作成日が表示される', () => {
    render(<WordItem word={mockWord} setWords={mockSetWords} />)
    expect(screen.getByText('example')).toBeInTheDocument()
  })

  it('削除ボタンを押すと delete  が呼ばれる', () => {
    render(<WordItem word={mockWord} setWords={mockSetWords} />)
    fireEvent.click(screen.getByText('削除'))
    expect(mockDelete).toHaveBeenCalledWith(mockWord.id)
  })
})