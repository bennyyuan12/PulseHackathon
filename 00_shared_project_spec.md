# PulseCircle — Shared Project Spec

## Product name
**PulseCircle**

## One-line pitch
A home cardiac rehab companion that helps patients complete clinician-prescribed rehab through AI-guided check-ins, fast symptom escalation, and encouragement from a small Care Circle of loved ones.

## Core demo loop
This is the only thing everyone should build around:

1. Patient opens app and sees today’s prescribed walk.
2. Patient starts session.
3. AI coach checks in during the walk.
4. Demo path A: patient completes the session and gets positive reinforcement.
5. Demo path B: patient feels anxious/tired or skipped a session and the AI helps re-engage.
6. Demo path C: patient reports a red-flag symptom and the system alerts the care team.
7. Care Circle sees progress and can react/comment.

## Non-negotiable constraints
- Do **not** make the AI sound like a doctor.
- The AI can support, encourage, summarize, and escalate.
- The AI cannot prescribe, diagnose, or change the rehab plan.
- Build for one activity type only: **walking**.
- Keep the engagement hook small and intentional: **Care Circle**, not a big social network.

## Roles
- **Patient**
- **Care Circle member** (family / close friend)
- **Clinician / care team**

## Shared data objects
Use these exact objects across the app.

### User
```ts
export type UserRole = "patient" | "supporter" | "clinician";

export type User = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
};
```

### Care plan
```ts
export type CarePlan = {
  id: string;
  patientId: string;
  activityType: "walk";
  durationMinutes: number;
  intensityLabel: "easy" | "moderate";
  notes?: string;
  prescribedBy: string;
};
```

### Session
```ts
export type SessionStatus = "scheduled" | "active" | "completed" | "paused" | "aborted";

export type Session = {
  id: string;
  patientId: string;
  carePlanId: string;
  status: SessionStatus;
  startedAt?: string;
  endedAt?: string;
  elapsedSeconds: number;
  steps?: number;
  avgHeartRate?: number;
  exertionScore?: number; // 1-10
  moodScore?: number; // 1-5
};
```

### Check-in
```ts
export type RiskLevel = "green" | "yellow" | "red";

export type SymptomFlags = {
  chestPain: boolean;
  dizziness: boolean;
  shortnessOfBreath: boolean;
  nausea: boolean;
  racingHeartbeat: boolean;
};

export type Checkin = {
  id: string;
  sessionId: string;
  timestamp: string;
  symptomFlags: SymptomFlags;
  exertionScore: number;
  patientText?: string;
  aiMessage: string;
  riskLevel: RiskLevel;
  action: "continue" | "pause" | "stop_and_alert";
};
```

### Encouragement
```ts
export type Encouragement = {
  id: string;
  patientId: string;
  sessionId?: string;
  supporterId: string;
  reactionType: "heart" | "proud" | "keep-going";
  commentText?: string;
  createdAt: string;
};
```

### Alert
```ts
export type AlertSeverity = "yellow" | "red";

export type Alert = {
  id: string;
  patientId: string;
  sessionId: string;
  severity: AlertSeverity;
  triggerReason: string;
  summaryText: string;
  acknowledged: boolean;
  createdAt: string;
};
```

## Shared routes

### Frontend routes
- `/login`
- `/patient/home`
- `/patient/session/[id]`
- `/patient/complete/[id]`
- `/supporter/feed`
- `/clinician/dashboard`
- `/clinician/patient/[id]`

### API routes
- `GET /api/today-plan`
- `POST /api/session/start`
- `POST /api/session/checkin`
- `POST /api/session/end`
- `POST /api/supporters/invite`
- `POST /api/encouragement`
- `GET /api/alerts`
- `GET /api/patient/:id/summary`

## Global UI tone
- calm
- warm
- non-clinical but trustworthy
- no scary jargon unless alerting
- gentle positive reinforcement

Suggested palette:
- off-white background
- muted blue / teal for trust
- soft green for progress
- amber for warning
- red for urgent escalation

## Seed data
Use one patient:

```json
{
  "id": "patient-maria",
  "name": "Maria",
  "role": "patient"
}
```

Use one care plan:

```json
{
  "id": "plan-1",
  "patientId": "patient-maria",
  "activityType": "walk",
  "durationMinutes": 20,
  "intensityLabel": "easy",
  "notes": "Comfortable pace. Stop if symptoms occur.",
  "prescribedBy": "Dr. Chen"
}
```

## Shared copy snippets
### AI win line
> You finished today’s walk — that consistency is what recovery looks like.

### AI wall line
> It’s normal to have hard days. Want to restart with just 5 minutes so today still counts?

### AI red-flag line
> Stop activity now. These symptoms need human follow-up. I’m notifying your care team.

### Supporter card
> Maria completed today’s walk 🎉 Send a quick note to keep her going.

### Dashboard alert
> Red flag during home rehab session: dizziness reported at minute 10. Session stopped and requires follow-up.

## Shared build order
### First 15 minutes
Everyone align on:
- type definitions
- route names
- API response shapes
- one seeded patient: Maria
- one care plan: 20-minute easy walk

### Then parallelize
- Person 1 builds patient flow
- Person 2 builds Care Circle
- Person 3 builds AI + triage endpoints
- Person 4 builds clinician dashboard + deploy skeleton

### Merge priority
1. patient start session works
2. check-in endpoint works
3. red-flag alert appears on clinician dashboard
4. session completion shows on supporter feed
5. polish

## What everyone should avoid
- do not build extra auth complexity
- do not build real-time sockets unless already easy
- do not build more than one rehab activity
- do not build a general-purpose chatbot
- do not let the AI improvise medical advice

## Final merge definition of done
You are done when the deployed product can show, in under 3 minutes:

1. Maria starts a prescribed walk.
2. AI checks in.
3. Demo path A: Maria completes the session and gets encouragement.
4. Demo path B: Maria reports a concerning symptom and the clinician dashboard shows an alert.
5. Care Circle visibly reacts to progress.
6. The architecture diagram matches the product.
