# Hotel & Spa Omnichannel Feedback & Fleet Reliability Platform

## Functional & Non-Functional Requirements Specification

**Document Version:** 1.0.0  
**Status:** Approved Requirements Specification  
**Scope:** Multi-Hotel Luxury Hospitality & Spa Operations

---

## 1. Business Context & Strategic Objectives

The hotel and spa enterprise operates across multiple luxury properties with shared operational equipment (e.g., fitness machines, commercial espresso units, spa wellness beds, HVAC systems). Guest feedback has historically been disjointed—divided across front desk paper notes, sporadic verbal complaints, email threads, and third-party review sites.

### Key Objectives

1. **Centralized Guest Feedback**: Consolidate all feedback into a unified database accessible by staff, technicians, and leadership.
2. **Accountability & Verifiable Maintenance**: Ensure every physical maintenance or service intervention is mapped to a specific authenticated staff member with verified completion sign-off.
3. **Personalized Rapid Service Recovery**: Automatically route critical queries to on-duty managers for high-touch, in-person resolution before checkout.
4. **Data-Driven Equipment Procurement**: Detect systemic equipment reliability issues across multiple hotels to make informed fleet maintenance and vendor decisions.
5. **Universal Accessibility (WCAG 2.1/2.2 AA)**: Provide an inclusive interface usable by guests of all physical, sensory, and cognitive abilities.

---

## 2. User Personas

| Persona                             | Role                          | Primary Goals                                                                                                          | Key Pain Points                                                                                           |
| :---------------------------------- | :---------------------------- | :--------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| **Elena (Guest / Spa Client)**      | Hotel & Spa Guest             | Effortlessly report issues (e.g. coffee machine out of milk, room too hot) without long phone queues or app downloads. | Unclear how to report broken items; doesn't want to download bulky apps; wants rapid resolution.          |
| **Marcus (Maintenance Tech)**       | On-site Engineering           | Clearly see outstanding maintenance tickets, claim tickets to prevent duplicate work, log parts used.                  | Disjointed paper notes; unclear who is working on what; blamed for unresolved issues worked on by others. |
| **Sophia (Duty / Shift Manager)**   | Operations & Guest Experience | Receive immediate alerts when a guest has a negative experience or urgent query so she can visit and resolve it.       | Finds out about guest issues too late (at checkout or on TripAdvisor); lacks context on guest history.    |
| **David (Director of Procurement)** | Group Fleet Operations        | Identify equipment models that consistently break across multiple hotel properties.                                    | Properties report issues in isolation; no multi-hotel trend data to challenge vendor warranties.          |

---

## 3. Functional Requirements (FR)

### FR-1: Centralized Omnichannel Ingestion

- **FR-1.1**: The system **MUST** provide a unified database schema accepting feedback from multiple sources:
  - Communal touchscreen kiosks/tablets.
  - Appliance-specific contextual QR codes.
  - Direct web portal / mobile responsive browser.
  - Front desk manual entry for verbal complaints.
- **FR-1.2**: Every feedback entry **MUST** record timestamp, source channel, property/hotel ID, zone/room ID, appliance ID (if applicable), category, sentiment, and optional guest contact details.
- **FR-1.3**: The system **MUST** normalize input data so all feedback streams are queryable through a single unified API and management view.

### FR-2: Ultra-Simple, Accessible Guest Interface (Hybrid Model)

- **FR-2.1**: The guest interface **MUST** be zero-friction: no login, no registration, and no native app installation required.
- **FR-2.2**: The interface **MUST** support general open feedback ("Report anything") allowing guests to describe any experience (e.g., room temperature too hot/cold, noise, housekeeping compliments, spa ambience).
- **FR-2.3**: Communal tablets (e.g. iPads in lobbies, spa lounges, gym entrances) **MUST** feature large touch targets ($\ge 48\times48\text{px}$), high contrast, and automatic session reset after 30 seconds of inactivity.

### FR-3: Appliance-Specific QR Codes & Pre-Seeded Prompt Trees

- **FR-3.1**: Each common appliance (e.g., in-room coffee machines, gym spin bikes, sauna control panels) **MUST** feature a unique QR code encoding its metadata (`hotelId`, `zoneId`, `applianceId`, `model`).
- **FR-3.2**: Scanning an appliance QR code **MUST** dynamically load pre-seeded, one-tap prompt options specific to that appliance category (e.g., Coffee Machine: "Out of milk", "Out of pods", "Leaking", "Not heating").
- **FR-3.3**: The pre-seeded prompt screen **MUST** always provide a freeform text input and optional photo attachment for unlisted issues.

### FR-4: Staff Authentication & Maintenance Audit Trail

- **FR-4.1**: The backend **MUST** provide an authenticated staff login portal with role-based access control (`staff`, `maintenance`, `manager`, `admin`).
- **FR-4.2**: The system **MUST** record an audit event whenever a staff member claims ("picks up") a ticket, capturing:
  - Staff User ID and Full Name.
  - Timestamp of claim.
  - Device/IP metadata.
- **FR-4.3**: When maintenance is completed, the assigned technician **MUST** submit completion notes and sign-off.
- **FR-4.4**: The system **MUST** maintain an append-only, tamper-evident audit log ensuring every ticket can be traced back to the exact staff member who executed the work.

### FR-5: Manager Escalation & Personalised Service Recovery

- **FR-5.1**: Guests **MUST** have the option to request a manager callback or room visit ("Request Manager Attention").
- **FR-5.2**: The system **MUST** automatically flag high-urgency queries (safety, severe temperature failure, repeated complaints) and escalate them to duty managers in real time.
- **FR-5.3**: The Manager Portal **MUST** allow managers to review escalated tickets, view guest room number, and log personalized recovery actions (e.g., in-person visit, room upgrade, courtesy amenities).

### FR-6: Multi-Hotel Fleet Equipment Reliability Analytics

- **FR-6.1**: The system **MUST** track equipment models across all hotel properties within the group.
- **FR-6.2**: The analytics engine **MUST** aggregate failure and repair tickets by equipment brand and model across all properties.
- **FR-6.3**: When an equipment model's failure frequency exceeds predefined thresholds (e.g. >15% breakdown rate over 30 days), the system **MUST** flag a **Reliability Anomaly Alert**.
- **FR-6.4**: The system **MUST** automatically generate a **Reliability Investigation Ticket** for Group Procurement and Facilities Management to evaluate alternative vendors or trigger manufacturer warranties (e.g., investigating a specific brand of gym bike that is repeatedly breaking).

---

## 4. Non-Functional Requirements (NFR)

### NFR-1: Accessibility (WCAG 2.1 & 2.2 AA Compliance)

- **NFR-1.1**: Color contrast ratios **MUST** satisfy at least $4.5:1$ for standard text and $3:1$ for large text and UI components across both Light and Dark themes.
- **NFR-1.2**: All interactive controls **MUST** have visible `:focus-visible` rings and be 100% operable via keyboard (`Tab`, `Enter`, `Space`, `Arrow keys`).
- **NFR-1.3**: Screen reader landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) and ARIA live regions (`aria-live="polite"`) **MUST** announce dynamic state transitions.
- **NFR-1.4**: Touch targets **MUST** be at least $44\times44\text{px}$ ($48\times48\text{px}$ on tablet kiosks).
- **NFR-1.5**: Animations **MUST** respect user OS setting `prefers-reduced-motion: reduce`.

### NFR-2: Security & Data Privacy

- **NFR-2.1**: Guest submissions **MUST NOT** require personal identifiable information (PII) unless voluntarily provided for manager follow-up.
- **NFR-2.2**: Staff credentials and session tokens **MUST** use secure, HTTP-only, SameSite cookies or signed bearer tokens.
- **NFR-2.3**: All public feedback ingestion endpoints **MUST** have rate limiting and input sanitization to prevent spam and XSS attacks.
- **NFR-2.4**: Audit logs **MUST** be immutable; no user role (including admin) may delete or alter historical audit log entries.

### NFR-3: Performance & Load Time

- **NFR-3.1**: QR code scan-to-interactive time **MUST** be under 1.5 seconds on mobile 4G networks.
- **NFR-3.2**: Backend API response time for feedback submission **MUST** be under 200ms at 95th percentile.

### NFR-4: Resilience & Offline Handling

- **NFR-4.1**: Communal tablets **MUST** queue feedback submissions locally if the hotel Wi-Fi connection drops, synchronizing automatically when connectivity resumes.
- **NFR-4.2**: The backend **MUST** feature graceful fallback and in-memory mock seed data for uninterrupted live presentations and demonstrations.

---

## 5. User Stories & Acceptance Criteria

### Story 1: In-Room Coffee Machine Issue (Guest)

> **As an** in-room hotel guest,  
> **I want to** scan a QR code on my coffee machine and quickly tap "Out of milk pods",  
> **So that** housekeeping can restock it immediately without me making a phone call.

- **Acceptance Criteria**:
  - Scanning the QR code opens the feedback web page pre-filtered for the room's coffee machine.
  - "Out of milk / pods" is shown as a primary pre-seeded button.
  - Tapping the button and pressing Submit generates a ticket within 1 second.
  - Confirmation screen displays an accessible reassurance message with an estimated turnaround time.

### Story 2: Claiming and Verifying Maintenance (Technician & Manager)

> **As an** on-site maintenance technician,  
> **I want to** log into the staff portal and claim an HVAC breakdown ticket,  
> **So that** my colleagues know I am handling it and management can audit who completed the repair.

- **Acceptance Criteria**:
  - Staff logs in with valid credentials.
  - Clicking "Claim Ticket" atomically assigns the ticket to their user ID and sets status to `IN_PROGRESS`.
  - An immutable audit log entry is recorded with timestamp and technician ID.
  - When finished, technician logs resolution notes ("Replaced thermistor sensor") and clicks "Complete".
  - The ticket displays the verified completion record and technician identity.

### Story 3: Urgent Guest Experience Escalation (Manager)

> **As a** duty manager,  
> **I want to** receive immediate alerts when a guest reports an unacceptable room condition and requests manager contact,  
> **So that** I can provide a personalized in-person service recovery before the guest checks out.

- **Acceptance Criteria**:
  - A feedback submission with `managerRequested: true` or high-severity category triggers a real-time notification on the Manager Dashboard.
  - Manager sees guest name, room number, submission details, and stay details.
  - Manager can log an in-person visit or amenity credit directly into the ticket record.

### Story 4: Cross-Hotel Equipment Reliability Anomaly (Procurement Director)

> **As the** Group Director of Procurement,  
> **I want to** see cross-hotel equipment failure trends,  
> **So that** I can detect if a specific brand of spin bike is chronically breaking across multiple gyms.

- **Acceptance Criteria**:
  - System aggregates failure tickets for all common equipment models across all hotels.
  - When failure rate of a specific brand/model exceeds defined threshold, a proactive `RELIABILITY_INVESTIGATION` ticket is created.
  - Dashboard displays a breakdown: total failures, affected hotel sites, repair costs, and recommendation.
