# PulseCircle — Team Member 1 Spec: Patient App

## Mission
Build the main patient experience: see today’s rehab plan, start a session, interact with the AI coach, and complete or stop the session.

## What you own
- `/patient/home`
- `/patient/session/[id]`
- `/patient/complete/[id]`
- shared patient-side components

## Screens to build

### 1. Patient Home
Must include:
- greeting
- today’s rehab plan card
- duration and intensity
- “Start Session” button
- streak/progress card
- mini Care Circle preview

### 2. Live Session
Must include:
- timer
- current activity card
- AI coach chat panel
- quick symptom buttons
- exertion slider 1–10
- pause / stop buttons

### 3. Completion screen
Must include:
- celebration message
- elapsed time
- maybe steps / heart rate if mocked
- confidence / mood input
- “shared with Care Circle” confirmation

## States to support
- not started
- active
- paused
- completed
- red-flag stopped

## Acceptance criteria
- user can start a walking session
- timer visibly runs
- AI messages display in chat
- user can submit exertion + symptom input
- user can end a normal session
- user can trigger a red-flag stop state
- flow looks polished enough for demo

## What not to build
- full auth
- real wearable integration
- complex profile setup
- multiple rehab activities

## Engineering notes
- Use the shared types from `00_shared_project_spec.md`.
- Assume mocked patient Maria and care plan `plan-1`.
- It is okay to use local component state or mocked API calls initially.
- Optimize for mobile-first layout.
- Use sticky bottom controls on the live session screen.

## Recommended components
- `PlanCard`
- `SessionTimer`
- `CoachMessageList`
- `SymptomQuickActions`
- `ExertionSlider`
- `SessionControls`
- `CompletionSummaryCard`

## Red-flag interaction behavior
If the user taps any red-flag symptom:
- show a clear urgent state
- visually emphasize “stop activity now”
- call the backend check-in handler
- disable normal continue flow until resolved

## Prompt to paste into AI coding tool
```text
Build the patient-facing frontend for a hackathon app called PulseCircle using Next.js + TypeScript + Tailwind.

Goal:
Create a calm, polished patient flow for home cardiac rehab.

Pages:
1. /patient/home
2. /patient/session/[id]
3. /patient/complete/[id]

Main flow:
- Show today's clinician-prescribed walking plan: 20-minute easy walk.
- User taps Start Session.
- On the live session page, show:
  - a running timer
  - AI coach message panel
  - quick symptom buttons
  - exertion slider from 1 to 10
  - pause / stop / end session controls
- On completion, show a celebratory summary screen and confirm the result was shared with the Care Circle.

Design requirements:
- warm, trustworthy healthcare consumer app
- minimal, modern UI
- soft colors, good spacing, mobile-first
- simple cards, sticky bottom controls on session screen

Important behavior:
- If user taps a red-flag symptom button, show a clear "stop activity now" state and call a backend handler.
- Do not make the AI sound like a doctor.

Use mocked data for now:
- patient Maria
- care plan: 20-minute easy walk prescribed by Dr. Chen

Please generate:
- the route components
- reusable patient UI components
- mocked local state or API stubs
- good loading and empty states
- clean TypeScript types
```
