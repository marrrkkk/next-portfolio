# UpClass: Full-Stack Learning Management System

## Overview

UpClass is a multi-tenant learning management system for teachers and students. It aims to bring the day-to-day work of a classroom into one focused workspace: organizing classes, sharing resources, managing assignments, communicating, and supporting independent study without requiring separate tools for each workflow.

## What I Built

### Teacher workflows

- Create and manage organizations, classes, schedules, announcements, and memberships
- Publish classwork and quizzes, review submissions, and maintain grading and revision history
- Share resources with previews and extracted text for search and AI-assisted questions
- Track deadlines, activity, notifications, and teacher-specific review queues from the dashboard
- Collaborate with students through direct messages, class channels, and Excalidraw whiteboards

### Student workflows

- Join organizations and classes with invitation or enrollment flows
- View class schedules, announcements, resources, assignments, quizzes, and submission status
- Submit work with attachments and revisions, then review grading feedback
- Use private study spaces with editable flashcards, practice quizzes, and spaced review
- Ask questions through resource-focused and organization-scoped AI assistants

## Engineering

- Built the application with Next.js 16 App Router, React 19, TypeScript, Drizzle ORM, and PostgreSQL.
- Designed tenant-scoped routes and server actions around organization membership and role checks, with Zod-based validation for shared server inputs.
- Used Better Auth and Google OAuth for authentication, Supabase Realtime for live messaging and collaboration updates, and Supabase Storage for authenticated uploads.
- Added an offline-first support layer using service-worker caching, background refresh, and an IndexedDB queue for supported mutations. Realtime-only workflows such as whiteboard editing and authenticated uploads remain explicitly online-bound.
- Implemented Excalidraw whiteboards with persisted snapshots, presence, realtime updates, and optimistic concurrency so newer edits are not silently overwritten.
- Built AI features with provider fallbacks, resource text extraction and chunk retrieval, structured outputs, confirmation-gated actions, rate limits, monthly quotas, request deduplication, and output filtering.
- Kept route pages server-first where possible, localized asynchronous loading with Suspense and skeletons, and added Vitest and Testing Library coverage for shared utilities, hooks, UI behavior, and server logic.

## Outcome

UpClass demonstrates my ability to take a broad product problem and turn it into a coherent full-stack system with multiple user roles, persistent data, realtime behavior, offline constraints, file handling, AI integrations, and responsive interface design. It also reflects the engineering tradeoffs required to keep those features within clear ownership, validation, authorization, and testing boundaries.

## Status

**Beta &middot; Active development**
