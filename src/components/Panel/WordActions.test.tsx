import { render, screen, fireEvent } from '@testing-library/react'
import WordActions from './WordActions'
import '@testing-library/jest-dom'

describe('WordActions', () => {
  //空の関数をモック
  const mockOnSave = jest.fn()
  //itが走るたびに初期化
  beforeEach(() => {
    mockOnSave.mockClear()
  })

  it('「単語帳に保存」ボタンが表示され、有効である', () => {
    render(
      <WordActions
        isSaved={false}
        onSave={mockOnSave}
        searchTerm="apple"
        formWord="apple"
        hasUser={true}
      />
    )

    const button = screen.getByRole('button', { name: '単語帳に保存' })
    expect(button).toBeInTheDocument()
    expect(button).toBeEnabled()

    fireEvent.click(button)
    expect(mockOnSave).toHaveBeenCalledTimes(1)
  })

  it('保存済みの状態ではボタンが無効で「保存しました！」と表示される', () => {
    render(
      <WordActions
        isSaved={true}
        onSave={mockOnSave}
        searchTerm="apple"
        formWord="apple"
        hasUser={true}
      />
    )

    const button = screen.getByRole('button', { name: '保存しました！' })
    expect(button).toBeDisabled()
  })

  it('ユーザーがいない場合はボタンが無効', () => {
    render(
      <WordActions
        isSaved={false}
        onSave={mockOnSave}
        searchTerm="apple"
        formWord="apple"
        hasUser={false}
      />
    )

    const button = screen.getByRole('button', { name: '単語帳に保存' })
    expect(button).toBeDisabled()
  })

  it('searchTerm と formWord が一致しない場合はボタンが無効', () => {
    render(
      <WordActions
        isSaved={false}
        onSave={mockOnSave}
        searchTerm="banana"
        formWord="apple"
        hasUser={true}
      />
    )

    const button = screen.getByRole('button', { name: '単語帳に保存' })
    expect(button).toBeDisabled()
  })
})