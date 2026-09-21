/**
 * Member 5 - Gemini AI service
 * Keeps Gemini API calls on the server. Never expose GEMINI_API_KEY in React.
 */
export async function generateQuestions({ topic, difficulty = 'Medium', count = 5 }) {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  if (!apiKey) throw new Error('GEMINI_API_KEY is not configured.');
  if (!topic?.trim()) throw new Error('Topic is required.');

  const safeCount = Math.min(Math.max(Number(count) || 5, 1), 10);
  const prompt = `You are an exam question generator for ExamX. Generate exactly ${safeCount} multiple-choice questions about "${topic.trim()}" at ${difficulty} difficulty. Return ONLY valid JSON as an array. Each object must contain: question (string), type ("MCQ"), options (exactly 4 strings), correctAnswer (exact text of the correct option), difficulty, topic. Do not use markdown or code fences.`;

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
    method: 'POST',
    headers: { 'x-goog-api-key': apiKey, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.4, responseMimeType: 'application/json' }
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || 'Gemini API request failed.');

  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text || '').join('') || '';
  let questions;
  try { questions = JSON.parse(text); }
  catch { throw new Error('Gemini returned invalid JSON.'); }

  return { model, questions };
}
