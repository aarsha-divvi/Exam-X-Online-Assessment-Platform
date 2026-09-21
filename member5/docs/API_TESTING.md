# API Testing — Member 5

## Generate AI questions

Method: `POST`

URL: `/api/ai/generate-questions`

Headers:

```text
Content-Type: application/json
```

Body:

```json
{
  "topic": "Binary Trees",
  "difficulty": "Easy",
  "count": 3
}
```

Test with Postman after the main backend is running and `GEMINI_API_KEY` is configured.

Expected result: HTTP 200 with `success: true` and a `questions` array.

## Error cases

- Missing topic → HTTP 500 with an explanatory message from the current controller.
- Missing API key → HTTP 500 with `GEMINI_API_KEY is not configured.`
- Gemini failure → HTTP 500 with the provider error message.

The main project can later replace the generic 500 responses with centralized validation/error middleware.
