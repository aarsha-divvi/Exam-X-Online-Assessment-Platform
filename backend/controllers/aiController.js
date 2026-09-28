const { GoogleGenAI } = require("@google/genai");

const generateQuestions = async (req, res) => {
  try {
    const {
      topic,
      difficulty,
      numberOfQuestions,
    } = req.body;

    if (!topic || !difficulty || !numberOfQuestions) {
      return res.status(400).json({
        success: false,
        message:
          "Topic, difficulty and number of questions are required",
      });
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `
Generate ${numberOfQuestions} ${difficulty} level multiple-choice questions on the topic "${topic}".

Return ONLY valid JSON.

The JSON must be an array of objects with exactly these fields:

[
  {
    "question": "Question text",
    "options": [
      "Option 1",
      "Option 2",
      "Option 3",
      "Option 4"
    ],
    "correctAnswer": "Correct option"
  }
]

Do not include markdown.
Do not include code fences.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const responseText = response.text;

    const cleanJson = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const questions = JSON.parse(cleanJson);

    return res.status(200).json({
      success: true,
      questions,
    });
  } catch (error) {
    console.error("AI question generation error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  generateQuestions,
};