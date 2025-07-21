export const translateWithDeepL = async (

  text: string,
  targetLang: string = 'JA',
  sourceLang?: string

): Promise<string> => {

  const res = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, targetLang, sourceLang }),
  });

  if (!res.ok) { throw new Error('Translation failed'); }

  const data = await res.text();
  return data;
}