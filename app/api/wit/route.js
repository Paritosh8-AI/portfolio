import { NextResponse } from 'next/server';
import { getNextUniqueJoke, hashJoke, CURATED_WIT } from '@/lib/witEngine';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const excludeParam = searchParams.get('exclude') || '';
    const excludeList = excludeParam ? excludeParam.split(',').filter(Boolean) : [];
    const seenSet = new Set(excludeList);

    // Optional AI generation if GEMINI_API_KEY is configured
    const geminiKey = process.env.GEMINI_API_KEY;
    if (geminiKey && Math.random() > 0.4) {
      try {
        const aiJoke = await fetchGeminiJoke(geminiKey);
        if (aiJoke && aiJoke.text) {
          return NextResponse.json({
            joke: aiJoke,
            hash: hashJoke(aiJoke),
            source: 'gemini',
          });
        }
      } catch (err) {
        console.warn('Gemini wit generation fallback to engine:', err.message);
      }
    }

    // Engine generation (unlimited combinatorial + curated pool)
    const joke = getNextUniqueJoke(seenSet);
    return NextResponse.json({
      joke,
      hash: hashJoke(joke),
      source: 'engine',
    });
  } catch (error) {
    return NextResponse.json(
      {
        joke: CURATED_WIT[0],
        hash: hashJoke(CURATED_WIT[0]),
        source: 'fallback',
      },
      { status: 200 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const excludeList = Array.isArray(body.exclude) ? body.exclude : [];
    const seenSet = new Set(excludeList);

    const joke = getNextUniqueJoke(seenSet);
    return NextResponse.json({
      joke,
      hash: hashJoke(joke),
      source: 'engine',
    });
  } catch (error) {
    return NextResponse.json(
      { joke: CURATED_WIT[0], hash: hashJoke(CURATED_WIT[0]), source: 'fallback' },
      { status: 200 }
    );
  }
}

async function fetchGeminiJoke(apiKey) {
  const prompt = `You are an elite, witty systems engineer and internet humorist.
Generate 1 hilarious, highly original, non-repeating engineering joke blending:
- Trending Global Tech X discourse (e.g., DeepSeek/Claude reasoning tokens, Jensen's GPU cloud debt, vibe coding, synthetic data inbreeding, AI wrappers, FastMCP agentic loops, Docker Virginia shipping).
- OR Trending Indian tech/social meme culture (e.g., 11:59 PM UPI chai bill server meltdowns, Blinkit 10-min speed vs hydration, Bangalore 0.003% unvested sweat equity, Shark Tank India negative EBITDA pitches, Noida/Silk Board peak rain traffic, 2 AM Zomato cart abandonment).

Return STRICT JSON only without markdown formatting:
{
  "category": "UPPERCASE SHORT CATEGORY",
  "text": "The joke text (1-2 sharp, witty, laugh-out-loud sentences)."
}`;

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json', temperature: 0.95 },
      }),
      signal: AbortSignal.timeout(4000),
    }
  );

  if (!res.ok) return null;
  const data = await res.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) return null;
  return JSON.parse(rawText);
}
