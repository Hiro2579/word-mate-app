"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { createClient } from "../../app/lib/supabase/client";
import { wordRepository } from "../../app/lib/wordbook";
import SearchInput from "./SearchInput";
import WordActions from "./WordActions";
import WordDetailCard from "./WordDetailCard";
import { Search } from "lucide-react";

interface WordResult {
  definition: string;
  partOfSpeech: string;
  synonyms: string[];
  typeOf: string[];
  hasTypes: string[];
  derivation: string[];
  examples: string[];
}

interface SearchResult {
  word: string;
  pronunciation: {
    all: string;
  };
  frequency: number;
  syllables: {
    count: number;
    list: string[];
  };
  results: WordResult[];
}

const supabase = createClient();

const Panel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [formWord, setFormWord] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUserId(data.session?.user?.id ?? null);
    });
  }, []);

  const getWordDetails = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://wordsapiv1.p.rapidapi.com/words/${searchTerm}`,
        {
          headers: {
            "X-RapidAPI-Host": "wordsapiv1.p.rapidapi.com",
            "X-RapidAPI-Key": process.env.NEXT_PUBLIC_WORDS_API_KEY!,
          },
        }
      );

      setFormWord(searchTerm);
      setSearchResult(response.data);

      if (userId != null) {
        const { data: existingWords, error } = await supabase
          .from("words")
          .select("id")
          .eq("user_id", userId)
          .eq("word", searchTerm);

        if (error) console.error(error);

        setIsSaved(!!existingWords?.length); //真偽値に変換。データベースに同じ単語が存在すればtrue。
      }
    } catch {
      setSearchResult(null);
      setIsSaved(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveWord = async () => {
    if (!userId) return;
    await wordRepository.create(searchTerm, userId);
    setIsSaved(true);
  };

  return (
    <>
      {/* 左パネル */}
      <div className="w-full lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            英語の単語を検索する
          </h1>
          <p className="text-gray-600 mb-8">
            英語の単語を入力すると、詳細な定義と例文が表示されます。
          </p>

          <SearchInput
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isLoading={isLoading}
            onSearch={getWordDetails}
          />

          {searchResult && userId != null && (
            <WordActions
              isSaved={isSaved}
              onSave={handleSaveWord}
              searchTerm={searchTerm}
              formWord={formWord}
              hasUser={!!userId}
            />
          )}
        </div>
      </div>

      {/* 右パネル */}
      <div className="w-full lg:w-1/2 bg-white p-6 overflow-y-auto">
        {searchResult ? (
          <div className="max-w-2xl mx-auto space-y-6">
            {searchResult.results.map((r, i) => (
              <WordDetailCard
                key={i}
                word={searchResult.word}
                pronunciation={searchResult.pronunciation.all}
                result={r}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600 mb-2">
                英語の単語を検索する
              </h3>
              <p className="text-gray-500">
                英語の単語を入力すると、詳細な定義と例文が表示されます。
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Panel;
