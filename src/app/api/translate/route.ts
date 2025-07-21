export async function POST(req: Request) {
  try {
    const { text, targetLang, sourceLang } = await req.json();

    const params = new URLSearchParams({
      text,
      target_lang: targetLang,
    })
    if (sourceLang) {
      params.append('source_lang', sourceLang);
    }

    const apiKey = process.env.DEEPL_API_KEY

    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${apiKey}`,
      },
      body: params,
    })

    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from DeepL' }), { status: 500 });
    }

    //日本語訳されたテキストを返す
    const data = await res.json();
    return new Response(JSON.stringify(data.translations[0].text));


  } catch (err) {
    console.error('API 例外:', err)
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 })
  }
}