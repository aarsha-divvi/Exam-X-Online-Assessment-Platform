import { Router } from 'express';
import { generateAIQuestions } from '../controllers/geminiController.js';

const router = Router();

// POST /api/ai/generate-questions
// Body: { topic, difficulty, count }
router.post('/generate-questions', generateAIQuestions);

export default router;
