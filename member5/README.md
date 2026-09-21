# ExamX — Member 5 Handover

## Scope
Member 5 owns the **AI Question Generator** and **Monaco Coding Editor** modules.

### Deliverables
- Gemini API service for generating structured MCQs.
- Express controller + route for the AI generator.
- Reusable React `CodingEditor` component using Monaco.
- Integration documentation.

## 1. Backend integration

Copy these files into the main Express backend:

```text
backend/services/geminiService.js
backend/controllers/geminiController.js
backend/routes/geminiRoutes.js
```

Register the route in the main Express app:

```js
import geminiRoutes from './routes/geminiRoutes.js';
app.use('/api/ai', geminiRoutes);
```

Then the endpoint is:

```text
POST /api/ai/generate-questions
```

Request:

```json
{
  "topic": "Data Structures",
  "difficulty": "Medium",
  "count": 5
}
```

Response shape:

```json
{
  "success": true,
  "model": "...",
  "questions": [
    {
      "question": "...",
      "type": "MCQ",
      "options": ["...", "...", "...", "..."],
      "correctAnswer": "...",
      "difficulty": "Medium",
      "topic": "Data Structures"
    }
  ]
}
```

### Environment variables

Add the values from `.env.example` to the backend `.env`. Keep the real Gemini key server-side and out of Git.

Node.js 18+ is recommended because the service uses the built-in `fetch` API.

## 2. Frontend integration

Copy:

```text
frontend/components/CodingEditor.jsx
```

Install Monaco in the React project:

```bash
npm install @monaco-editor/loader
```

Use it in the Student Coding Exam page:

```jsx
import CodingEditor from './components/CodingEditor';

<CodingEditor
  language="javascript"
  onChange={(code) => setSourceCode(code)}
/>
```

The component is intentionally only the editor. Actual execution should happen through the backend and a sandboxed code-execution service such as Judge0.

## 3. ExamX flow

### AI question generation

```text
Faculty Dashboard
      ↓
AI Question Generator
      ↓
POST /api/ai/generate-questions
      ↓
Gemini API
      ↓
Generated MCQs
      ↓
Faculty Review / Edit
      ↓
Questions Collection
      ↓
Exam Creation
```

### Coding assessment

```text
Student Exam
      ↓
CodingEditor (Monaco)
      ↓
Source Code
      ↓
ExamX Backend
      ↓
Judge0 / sandboxed executor
      ↓
Visible + Hidden Test Cases
      ↓
Score
      ↓
Submission / Results
```

## 4. Important merge notes

- Member 1 should merge the backend route into the existing Express app.
- Member 3 should call the AI endpoint from the Faculty Question Bank / Create Exam UI.
- Member 2 should place `CodingEditor` in the Student coding-exam page.
- The generated AI questions should be reviewed by faculty before being saved to the main `Questions` collection.
- Do not execute arbitrary student code directly with Node.js `eval`, `Function`, `child_process`, or a normal server process. Use an isolated execution service.
- Do not commit `.env` or expose the Gemini key in React.

## 5. Suggested Questions collection mapping

The AI response maps directly to the existing project model:

```text
question       -> question
"MCQ"         -> type
options        -> options
correctAnswer  -> correctAnswer
difficulty     -> difficulty
topic          -> topic
faculty user   -> createdBy
```

## 6. Handover checklist

- [ ] Backend Gemini service copied
- [ ] Gemini route registered
- [ ] `.env` configured by team lead
- [ ] Faculty UI connected to `/api/ai/generate-questions`
- [ ] AI questions reviewed before database insertion
- [ ] Monaco dependency installed
- [ ] CodingEditor added to student exam page
- [ ] Judge0/sandbox integration handled by the team when coding execution is implemented
- [ ] `.env` and API keys excluded from Git
