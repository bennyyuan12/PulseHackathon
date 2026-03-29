# PulseCircle — Team Member 2 Spec: Care Circle / Supporter Experience

## Mission
Build the engagement hook that keeps Maria motivated at Week 8: a small Care Circle that sees milestones and sends encouragement.

## What you own
- `/supporter/feed`
- supporter invite UI
- reaction/comment components
- missed-session encouragement state

## Product framing
This is **not** social media. It is a small, intentional support loop.

## Screens to build

### 1. Care Circle invite block
Can live on patient home or as a modal.
Must include:
- invite 1–3 supporters
- relationship label: daughter / spouse / friend / sibling
- success confirmation

### 2. Supporter feed
Must include:
- recent patient milestones
- one-tap reactions
- short comment box
- missed-session nudge card

### 3. Encouragement card states
Build these cards:
- “Maria completed today’s walk”
- “Maria hit a 3-day streak”
- “Maria paused today’s session”
- “Maria missed today’s walk — send a nudge?”

## Supported actions
- react with heart / proud / keep going
- leave a short encouragement comment
- send a nudge after missed session

## Acceptance criteria
- supporter can see at least 3 sample feed cards
- supporter can react and comment
- supporter can nudge after missed session
- feed feels emotionally warm and motivating
- can demo in under 30 seconds

## What not to build
- messaging threads
- follower graph
- public community
- complicated notification settings

## Design notes
- Elegant, warm UI
- Keep copy short and emotionally resonant
- Optimize for persuasion during demo
- Make cards beautiful and readable quickly

## Recommended components
- `SupporterFeedPage`
- `InviteSupporterModal`
- `MilestoneCard`
- `ReactionBar`
- `CommentComposer`
- `MissedSessionNudgeCard`

## Prompt to paste into AI coding tool
```text
Build the supporter / family engagement experience for a hackathon app called PulseCircle using Next.js + TypeScript + Tailwind.

Goal:
Create the "Care Circle" feature that keeps a cardiac rehab patient motivated through encouragement from 1-3 loved ones.

Pages / components:
1. /supporter/feed
2. invite supporters modal or component
3. encouragement cards
4. reaction buttons
5. comment composer
6. missed-session nudge card

Product rules:
- This should feel intimate and caring, not like social media.
- Supporters only see meaningful moments:
  - completed session
  - streak milestone
  - paused session
  - missed session
- Supporters can:
  - react with heart / proud / keep-going
  - write a short encouraging comment
  - send a nudge after a missed session

Design requirements:
- elegant, warm UI
- simple cards
- short, emotionally resonant copy
- make it demo-friendly and visually persuasive

Use mocked data with one patient, Maria, and 2 supporters.

Please generate:
- the supporter feed page
- reusable components for reactions/comments
- local mocked state
- tasteful empty states and confirmations
- components easy to integrate with a real backend later
```
