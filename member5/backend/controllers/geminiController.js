import { generateQuestions } from '../services/geminiService.js';

export async function generateAIQuestions(req, res) {
  try {
    const result = await generateQuestions(req.body);
    res.status(200).json({ success: true, ...result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
