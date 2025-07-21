'use client'

import WordItem from './WordItem'

type Word = {
  id: number
  word: string
  created_at: string
}

const WordList = ({
  words,
  setWords,
}: {
  words: Word[]
  setWords: React.Dispatch<React.SetStateAction<Word[]>>
}) => {
  return (
    <div className="space-y-4">
      {words.map((word) => (
        <WordItem key={word.id} word={word} setWords={setWords} />
      ))}
    </div>
  )
}

export default WordList