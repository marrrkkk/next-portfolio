# Requo: Full-Stack Business Management Platform

## Overview

Requo is an owner-focused platform for service businesses that manage inbound customer requests and custom quotes. It is designed to bring the workflow into one place: capture an inquiry, qualify it, prepare a quote, share or send it, follow up consistently, and track the customer response.

## What I Built

- Public inquiry pages, configurable forms, and manual inquiry entry
- A business-scoped inbox with qualification, duplicate detection, notes, attachments, and status tracking
- Quote editing with reusable Products, line items, revisions, public quote pages, and response tracking
- Quote delivery through public links or Requo email, with configurable templates
- Follow-up scheduling, reminders, and AI-assisted message drafting
- Conversion and workflow analytics, CSV export, notifications, audit logs, and business membership
- AI-assisted quote drafting grounded in business knowledge files and the Products library
- Guided onboarding templates, multi-business accounts, and business-scoped plan entitlements

## Engineering

Requo uses a feature-oriented Next.js App Router architecture with a server-first data flow. Routes stay focused on composition and request handling, while validation, queries, mutations, and product logic live in `features/`; provider integrations and shared infrastructure live in `lib/`.

The application is backed by PostgreSQL and Drizzle ORM, with Better Auth for authentication and business-scoped authorization. Supabase handles private file storage and realtime notification plumbing. Transactional email is centralized behind Resend with Mailtrap and Brevo fallbacks. AI requests are routed server-side across multiple providers through a shared AI layer, and Inngest handles background and event-driven work. Polar manages business subscriptions, with idempotent webhook processing and a single subscription service keeping plan state consistent.

I also implemented cache tagging and invalidation, public-route rate limiting, audit logging, entitlement checks, and a layered test suite spanning unit, component, integration, and Playwright smoke coverage. The main challenge was keeping a broad workflow product coherent while preserving strict business data boundaries and narrow provider responsibilities.

## Outcome

Requo demonstrates my ability to take a product from workflow definition through a working full-stack implementation: shaping the domain model, designing feature boundaries, building user-facing flows, integrating external services, and enforcing authorization and plan rules across the stack. It also reflects an emphasis on maintainable architecture and operational correctness rather than a collection of disconnected demos.

## Status

Requo is actively developed. Its current focus remains the inquiry-to-quote workflow and the supporting infrastructure around delivery, follow-up, analytics, AI assistance, and business administration.
