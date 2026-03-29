# PulseCircle — Team Member 4 Spec: Clinician Dashboard + Integration + Deploy

## Mission
Build the clinician-facing side and glue the system together so the demo is credible: alerts, patient summary, deploy flow, README, and architecture diagram.

## What you own
- `/clinician/dashboard`
- `/clinician/patient/[id]`
- alert feed
- patient summary panel
- integration between shared endpoints and frontend
- deployment
- README
- architecture diagram

## Screens to build

### 1. Clinician dashboard
Must include:
- alert queue
- patient cards
- severity pills
- latest session summary
- acknowledged/unacknowledged state

### 2. Patient detail view
Must include:
- recent session timeline
- latest alert
- short transcript snippet
- adherence pattern summary
- care plan card

## Integration responsibilities
- ensure patient and supporter flows can hit backend routes
- create stubbed or real DB layer
- populate clinician dashboard from alerts
- connect end-of-session summaries to dashboard if useful

## Deployment responsibilities
- get app live on Vercel
- verify main demo route works
- set up demo seed data
- ensure no broken buttons on demo path

## Documentation responsibilities
README must include:
- project name
- one-paragraph summary
- team members
- public URL
- setup instructions
- env vars
- APIs/models used
- what is mocked vs live

## Acceptance criteria
- clinician dashboard shows at least one red alert and one normal summary
- patient detail page is demoable
- deployed app works
- README is submission-ready
- architecture diagram exists and matches product

## Architecture diagram content
It should show:
- patient app
- optional heart rate / steps input
- session orchestrator
- AI coach
- risk rules engine
- database
- Care Circle notifications
- clinician alert path

## Suggested file outputs
- `app/clinician/dashboard/page.tsx`
- `app/clinician/patient/[id]/page.tsx`
- `README.md`
- `docs/architecture.md`

## Prompt to paste into AI coding tool
```text
Build the clinician dashboard and integration layer for a hackathon app called PulseCircle using Next.js + TypeScript + Tailwind.

Goal:
Make the prototype feel credible to judges by showing where alerts and session summaries reach the care team, while also wiring the app together and preparing it for deployment.

Pages:
1. /clinician/dashboard
2. /clinician/patient/[id]

Dashboard requirements:
- alert queue with severity badges
- latest patient sessions
- acknowledged/unacknowledged state
- simple, readable clinical UI
- one-click path into patient detail

Patient detail requirements:
- care plan summary
- recent session timeline
- latest alert summary
- transcript snippet
- adherence trend summary

Integration responsibilities:
- connect to existing session and alert APIs
- use mocked seed data if needed
- make the dashboard update from generated alerts
- keep the code simple and demo-stable

Also generate:
- a deployment checklist for Vercel
- a README template with:
  - project summary
  - team members
  - env vars
  - setup instructions
  - public URL placeholder
  - third-party APIs/models
  - clear note on what is mocked vs live
- a simple architecture diagram in Mermaid
```
