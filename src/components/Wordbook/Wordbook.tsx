'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../app/lib/supabase/client'
import { wordRepository } from '../../app/lib/wordbook'
import WordList from './WordList'
import { BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import WordbookInfo from './WordbookInfo'
import Pagination from "./Pagination"


const WORDS_PER_PAGE = 20

type Word = {
  id: number
  word: string
  created_at: string
}

const Wordbook = () => {
  const [words, setWords] = useState<Word[]>([]);
  const supabase = createClient();
  const router = useRouter();


  const [currentPage, setCurrentPage] = useState(1);
  const totalWords = words.length;
  const totalPages = Math.ceil(totalWords / WORDS_PER_PAGE);
  const startIndex = (currentPage - 1) * WORDS_PER_PAGE;
  const endIndex = startIndex + WORDS_PER_PAGE;
  const currentWords = words.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // 画面トップにスムーズに遷移
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/')
      }
    }
    checkSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const fetchWords = async () => {
      const { data } = await supabase.auth.getSession()
      const userId = data.session?.user?.id
      if (!userId) return
      const vocabulary = await wordRepository.find(userId)
      if (vocabulary) {
        setWords(vocabulary)
      }
    }
    fetchWords()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push('/login')
      }
    })
    return () => listener.subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])







  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">My Wordbook</h1>
          <p className="text-gray-600">保存した語彙の確認と管理ができます</p>
        </div>

        {currentWords.length > 0 ? (
          <>
            <WordbookInfo wordsLength={words.length}/>
            <WordList words={currentWords} setWords={setWords} />
            {/* ページネーション */}
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}//
                totalItems={totalWords}//
                itemsPerPage={WORDS_PER_PAGE}
                onPageChange={handlePageChange}//
              />
            </div>
          </>
        ) : (
          <Card className="shadow-md">
            <CardContent className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">あなたの単語帳にまだ単語がありません。</h3>
              <p className="text-gray-500">単語の検索と保存をし、語彙力を伸ばしましょう！</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

export default Wordbook