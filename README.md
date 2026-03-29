# PulseCircle / PulseHackathon

This repository now contains both:

- the original PulseHackathon product specification files
- the deployable PulseCircle frontend MVP web app

## Repository contents

### Product specs

- `00_shared_project_spec.md`
- `01_patient_app_spec.md`
- `02_care_circle_spec.md`
- `03_ai_backend_spec.md`
- `04_clinician_dashboard_spec.md`

### PulseCircle app

PulseCircle is a frontend-first hackathon MVP for a home cardiac rehabilitation companion. It is built for fast demos, safe healthcare-adjacent framing, and easy deployment to GitHub and Vercel.

## App stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style component primitives
- lucide-react
- Framer Motion

## App features

- Patient onboarding with mocked medical-record upload and simulated OCR parsing
- Patient home page with iPhone-first layout, itinerary list, and progress tracking
- Persistent Nurse Clara assistant UI with chat and voice-mode shell
- Guided focus-mode exercise flow with timer and pulsing heart
- Five-question post-session check-in with safe escalation state
- Encouragement feed for friends, family, and approved volunteers
- Volunteer submission and moderation review flows
- Lightweight care team dashboard

## Mocked demo data

The app currently mocks:

- Record parsing / OCR extraction
- Patient profile and rehab plan
- Weekly schedule
- Session summaries
- Wearable metrics
- Encouragement feed
- Volunteer moderation outcomes
- Care-team alert state

All mock data lives in `data/mock-data.ts`.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Start the development server:

```bash
npm run dev
```

4. Open `http://localhost:3000`

## Scripts

- `npm run dev` starts the local dev server
- `npm run build` builds the production app
- `npm run start` serves the production build
- `npm run lint` runs Next.js linting
- `npm run typecheck` runs TypeScript checks

## Route map

### Patient

- `/`
- `/onboarding/upload`
- `/onboarding/review`
- `/onboarding/complete`
- `/home`
- `/session/[id]`
- `/checkin/[id]`
- `/community`
- `/encouragement`
- `/assistant`
- `/personal-info`

### Support / volunteer

- `/supporters`
- `/volunteer`
- `/volunteer/review`

### Care team

- `/care-team`

## Vercel deployment

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the GitHub repo.
3. Framework preset should auto-detect as **Next.js**.
4. Add environment variables from `.env.example` if you want them configured in Vercel.
5. Deploy.

No custom Vercel configuration is required for this MVP.

## Future production integrations

- OCR / record parsing: replace mocked extraction with a secure document pipeline and structured clinician-reviewed parsing.
- Wearable integration: connect Apple Health, Fitbit, or device SDKs with patient consent and clear metric provenance.
- Moderation service: move volunteer review into a policy-backed moderation service with human oversight and audit logging.
- Care team notification service: integrate secure alerts into the care workflow through EHR messaging, task queues, or a care coordination platform.

## Safety note

PulseCircle is a support experience, not a diagnostic product. Nurse Clara is explicitly framed as a warm companion who explains, encourages, summarizes, asks check-in questions, and escalates concerns. She does not diagnose, prescribe, or independently modify the care plan.
