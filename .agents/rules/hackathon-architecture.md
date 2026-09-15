---
description: Hackathon architecture principles, rapid MVP delivery, dynamic UI design, and presentation readiness.
trigger: always_on
---

# Hackathon Velocity & Design Constraints

Hackathons require balancing **speed-to-value** with **high-impact presentation polish**. A project with brilliant backend logic will fail if the UI looks unpolished, feels sluggish, or crashes during a live demo.

---

## 1. Hackathon Design Principles

1. **Modern Dynamic Aesthetics**:
   - Clean, modern design system using fluid typography and CSS variables.
   - Glassmorphism / subtle card shadows (`box-shadow: 0 4px 20px rgba(0,0,0,0.08)`).
   - High contrast, pleasant color palette (Dark & Light mode toggle included).
   - Smooth, accessible CSS transitions (micro-interactions on hover, focus, button active states).
2. **Instant Visual Feedback**:
   - Every user interaction (button click, filter change, submission) must immediately update the UI or display a loading indicator.
   - Use dynamic optimistic updates with fallback on error.
3. **Demo Resilience & Failsafes**:
   - **Never allow an unhandled API outage to break the demo**: If an external service or database is unavailable, fall back seamlessly to realistic seeded mock data.
   - Include a "Seed Demo Data" or "Quick Demo Action" button for judges to test realistic workflows without manual typing.
4. **Hero Feature Focus**:
   - Highlight the 1–2 unique differentiating features prominently on the landing dashboard.
   - Avoid generic, empty, or placeholder "Lorem Ipsum" text; use meaningful domain-relevant content.

---

## 2. Velocity Rules for the Agent

- **Component Reusability**: Build reusable UI components (e.g. Card, StatBadge, AccessibleModal, AlertBanner, DataGrid) rather than reinventing styles per page.
- **Fast Startup**: Keep dependencies lean. Avoid heavy build steps (e.g., webpack / complex compilers) for simple hackathon frontends; use native ESM, modern CSS, and Vite/Express for instant live-reload.
- **Zero Console Warnings**: Keep browser console clean during live demonstrations.
