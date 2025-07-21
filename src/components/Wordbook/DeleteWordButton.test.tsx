import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import DeleteWordButton from './DeleteWordButton'
import '@testing-library/jest-dom'

describe('DeleteWordButton', () => {
  const mockOnDelete = jest.fn()

  beforeEach(() => {
    mockOnDelete.mockClear()
  })

  it('削除アイコンボタンが表示される', () => {
    render(<DeleteWordButton word="apple" onDelete={mockOnDelete} />)

    // 削除アイコンが含まれるボタンが存在するか
    const iconButton = screen.getByRole('button')
    expect(iconButton).toBeInTheDocument()
  })

  it('ボタンを押すと確認ダイアログが開く', async () => {
    render(<DeleteWordButton word="apple" onDelete={mockOnDelete} />)

    fireEvent.click(screen.getByRole('button'))

    await waitFor(() => {
      expect(screen.getByText('単語を削除する')).toBeInTheDocument()
    })
  })

  it('削除ボタンを押すと onDelete が呼ばれる', async () => {
    render(<DeleteWordButton word="apple" onDelete={mockOnDelete} />)

    fireEvent.click(screen.getByRole('button'))

    const deleteButton = await screen.findByText('削除')
    fireEvent.click(deleteButton)

    expect(mockOnDelete).toHaveBeenCalledTimes(1)
  })

  it('キャンセルボタンを押すとダイアログが閉じる', async () => {
    render(<DeleteWordButton word="banana" onDelete={mockOnDelete} />)

    fireEvent.click(screen.getByRole('button'))

    const cancelButton = await screen.findByText('キャンセル')
    fireEvent.click(cancelButton)

    await waitFor(() => {
      expect(screen.queryByText('単語を削除する')).not.toBeInTheDocument()
    })
  })
})