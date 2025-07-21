'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Volume2 } from 'lucide-react'
import { translateWithDeepL } from '../../app/lib/deepl'
import { useEffect, useState } from 'react'

interface WordResult {
  definition: string
  partOfSpeech: string
  synonyms: string[]
  typeOf: string[]
  derivation: string[]
  examples: string[]
}

const WordDetailCard = ({ word,pronunciation, result }: { word: string; pronunciation:string;  result: WordResult }) => {

  const [translateDefinition, setTranslateDefinition] = useState<string>('')

  const speakEnglish = () => {
    const message = new SpeechSynthesisUtterance(word)
    message.lang = 'en-US'
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(message)
  }

  useEffect(() => {
    const fetchTranslation = async () => {
      const res = await translateWithDeepL(result.definition, 'JA', 'EN')
      setTranslateDefinition(res)
    }
    fetchTranslation()
  }, [result.definition])


  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-2xl">
          <BookOpen className="w-6 h-6 text-blue-600" />
          {word}
          <Badge variant="secondary" className="text-sm">
            {result.partOfSpeech}
          </Badge>
        </CardTitle>
        <p className="text-gray-500 text-lg">/{pronunciation}/</p>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-700">
        <div>
          <h3 className="font-semibold">意味:</h3>
          <p>{result.definition}</p>
          <p>{translateDefinition}</p>
        </div>
        <div>
          <h3 className="font-semibold">例文:</h3>
          <p className="italic">{result.examples?.join(', ')}</p>
        </div>
        <div>
          <h3 className="font-semibold">類義語:</h3>
          <p className="italic">{result.synonyms?.join(', ')}</p>
        </div>
        <div>
          <h3 className="font-semibold">上位語:</h3>
          <p className="italic">{result.typeOf?.join(', ')}</p>
        </div>
        <div>
          <h3 className="font-semibold">派生語:</h3>
          <p className="italic">{result.derivation?.join(', ')}</p>
        </div>
        <Button onClick={speakEnglish} variant="outline" size="sm" className="flex gap-2">
          <Volume2 className="w-4 h-4" />
          Listen
        </Button>
      </CardContent>
    </Card>
  )
}

export default WordDetailCard