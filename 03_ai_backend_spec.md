# PulseCircle — Team Member 3 Spec: AI Coach + Triage Backend

## Mission
Build the logic layer that powers the demo: AI coaching, check-ins, green/yellow/red classification, session summaries, and clinician alerts.

## What you own
- AI prompts
- session orchestration logic
- check-in endpoint
- triage rules
- alert generation
- summary generation

## Functional responsibilities

### 1. Start-of-session coach message
Generate something like:
- “You’re starting today’s 20-minute easy walk prescribed by your care team.”
- “I’ll check in every 10 minutes.”
- “If you feel chest pain, dizziness, severe shortness of breath, nausea, or a racing heartbeat, stop and tell me right away.”

### 2. Mid-session check-in
Input:
- exertion score
- symptom flags
- optional patient free text

Output:
- empathetic AI response
- risk level
- action
- optional clinician alert creation

### 3. End-of-session summary
Generate:
- positive reinforcement
- short adherence summary
- 1-line supporter-facing summary
- clinician-facing summary if needed

## Risk rules
Do not leave these probabilistic. Hardcode them.

### Red
If any of these are true:
- chestPain
- dizziness
- shortnessOfBreath
- nausea
- racingHeartbeat

Then:
- `riskLevel = "red"`
- `action = "stop_and_alert"`

### Yellow
If:
- exertionScore >= 8
- user says anxious / tired / overwhelmed
- user skipped previous session
- user wants to pause

Then:
- `riskLevel = "yellow"`
- `action = "pause"`

### Green
If none of the above:
- `riskLevel = "green"`
- `action = "continue"`

## AI tone rules
- supportive
- short
- calm
- no diagnosis
- no treatment advice
- no changing the plan
- always defer safety concerns to the care team

## Required API shape

### POST /api/session/start
Returns:
```json
{
  "sessionId": "session-123",
  "initialMessage": "..."
}
```

### POST /api/session/checkin
Request:
```json
{
  "sessionId": "session-123",
  "symptomFlags": {
    "chestPain": false,
    "dizziness": false,
    "shortnessOfBreath": false,
    "nausea": false,
    "racingHeartbeat": false
  },
  "exertionScore": 4,
  "patientText": "I feel okay"
}
```

Response:
```json
{
  "riskLevel": "green",
  "action": "continue",
  "aiMessage": "You're doing well. Let's keep a comfortable pace.",
  "alertCreated": false
}
```

### POST /api/session/end
Response:
```json
{
  "summary": "Maria completed her 20-minute walk at easy intensity with no red-flag symptoms.",
  "supporterSummary": "Maria completed today’s walk 🎉",
  "celebrationMessage": "Nice work — consistency like this builds recovery."
}
```

## Acceptance criteria
- can demo “win” response
- can demo “wall” response
- can demo red-flag escalation
- outputs structured JSON
- easy for frontend to integrate
- no unsafe copy

## What not to build
- perfect agent orchestration
- medical reasoning engine
- complex memory
- long conversational chatbot

## Suggested backend structure
- `lib/triage.ts`
- `lib/coachPrompts.ts`
- `lib/alerts.ts`
- `app/api/session/start/route.ts`
- `app/api/session/checkin/route.ts`
- `app/api/session/end/route.ts`

## Prompt to paste into AI coding tool
```text
Build the backend orchestration and AI logic for a healthcare hackathon app called PulseCircle.

Tech assumptions:
- Next.js API routes or server actions
- TypeScript
- OpenAI API for text generation
- mocked persistence is acceptable if needed

Goal:
Support a clinician-prescribed 20-minute walking rehab session with:
1. AI coach start message
2. AI check-ins
3. green / yellow / red risk classification
4. session completion summary
5. clinician alert generation for red flags

Important safety rules:
- The AI is not a doctor.
- It cannot prescribe, diagnose, or change the rehab plan.
- If any of the following symptoms are reported, classify as red and tell the patient to stop activity immediately and notify the care team:
  - chest pain
  - dizziness
  - severe shortness of breath
  - nausea
  - racing or irregular heartbeat

Required endpoints:
- POST /api/session/start
- POST /api/session/checkin
- POST /api/session/end

Required outputs:
- structured JSON with riskLevel, action, aiMessage, and alertCreated
- clean summaries for patient, supporter, and clinician views

Also generate:
- prompt templates for the AI coach
- deterministic triage logic
- TypeScript types
- mocked alert creation helpers
- example unit-testable functions for classification
```
