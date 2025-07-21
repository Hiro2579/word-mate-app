import { render, screen, fireEvent } from '@testing-library/react'
import SearchInput from './SearchInput'
import '@testing-library/jest-dom'

describe('SearchInput', () => {
  const setSearchTerm = jest.fn()
  const onSearch = jest.fn()

  beforeEach(() => {
    //空のモック関数
    setSearchTerm.mockClear()
    onSearch.mockClear()
  })

  it('検索フィールドとボタンが表示される', () => {
    render(
      <SearchInput
        searchTerm=""
        setSearchTerm={setSearchTerm}
        isLoading={false}
        onSearch={onSearch}
      />
    )

    expect(screen.getByPlaceholderText('英単語を入力してください...')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '検索する' })).toBeInTheDocument()
  })

  it('入力で setSearchTerm が呼ばれる', () => {
    render(
      <SearchInput
        searchTerm=""
        setSearchTerm={setSearchTerm}
        isLoading={false}
        onSearch={onSearch}
      />
    )

    fireEvent.change(screen.getByPlaceholderText('英単語を入力してください...'), {
      target: { value: 'apple' },
    })

    expect(setSearchTerm).toHaveBeenCalledWith('apple')
  })

  it('検索ボタンをクリックすると onSearch が呼ばれる', () => {
    render(
      <SearchInput
        searchTerm="banana"
        setSearchTerm={setSearchTerm}
        isLoading={false}
        onSearch={onSearch}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: '検索する' }))
    expect(onSearch).toHaveBeenCalled()
  })

  it('Enterキー押下で onSearch が呼ばれる', () => {
    render(
      <SearchInput
        searchTerm="cat"
        setSearchTerm={setSearchTerm}
        isLoading={false}
        onSearch={onSearch}
      />
    )

    fireEvent.keyDown(screen.getByPlaceholderText('英単語を入力してください...'), {
      key: 'Enter',
      code: 'Enter',
    })

    expect(onSearch).toHaveBeenCalled()
  })

  it('isLoading が true のときボタンは無効で「検索中...」と表示される', () => {
    render(
      <SearchInput
        searchTerm="dog"
        setSearchTerm={setSearchTerm}
        isLoading={true}
        onSearch={onSearch}
      />
    )

    const button = screen.getByRole('button', { name: '検索中...' })
    expect(button).toBeDisabled()
  })
})