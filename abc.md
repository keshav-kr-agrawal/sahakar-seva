# SAHAKAR SEVA: Abstract

## Cooperative-Owned Operating System for Fair, Transparent, and Trusted Household & Community Services

**SAHAKAR SEVA** ("Helpful Service") is a cooperative-owned digital marketplace and workforce operating system that transforms how India's informal service workers, including electricians, plumbers, domestic helpers, caregivers, carpenters, painters, drivers, gardeners, cleaners, and technicians, connect with households and institutions. Unlike extractive private platforms that capture 20–30% commissions with opaque algorithms and minimal worker welfare, SAHAKAR SEVA is governed by Labour Cooperative Federations and Labour Cooperative Societies, ensuring fair wages, transparent earnings, portable trust, and worker-first safety.

## The Problem

India's informal service economy comprises hundreds of millions of skilled workers. According to the Periodic Labour Force Survey (PLFS) 2023–24, of India's 634 million employed workers, nearly 550 million (87%) are informally employed, with approximately 260 million informal workers outside agriculture distributed almost equally between services and industry. Despite near-universal smartphone penetration, cooperative workers remain structurally underutilized because they lack the distribution infrastructure private platforms have built.

Five interconnected problems define the challenge:

### Worker Underutilization Despite Skills

Millions of cooperative-verified skilled workers lack a structured digital bridge to customers, resulting in lost income and unmet demand.

### Wage Exploitation and Opacity

Private platforms extract 20–30% commissions with zero transparency. Rate-setting is algorithmic and opaque, with no collective bargaining ability.

### Trust Deficit and Verification Burden

Customers hesitate to book unverified workers. Cooperatives possess local social capital that remains unformalized.

### Safety Gaps and Worker Rights

Especially for women workers, no platform has built accountability for harassment, protective mechanisms, or collective representation. Research reveals women gig workers are more likely to encounter unsafe situations than their counterparts.

### Fragmented, Costly Multi-Service Demand

Households needing multiple services face high costs and coordination overhead when booking separately, making essential services unaffordable.

# The Solution

SAHAKAR SEVA converts existing smartphone infrastructure into a worker-empowered, transparent, safety-focused marketplace that maintains cooperative principles and prevents extractive patterns. The platform is built on three core innovations:

## Innovation 1: Flexible Service Units

Instead of selling isolated tasks, SAHAKAR SEVA sells structured, trustworthy units of help.

### A. Outcome-Based Service Packs

Predefined, cooperative-designed packs for common scenarios, such as Festival-Ready Home, New Home Move-In, Elder Care Weekly, and Small Office Maintenance. Each pack is sold as an outcome, not just a service list, with transparent pricing and wage breakdown. Customers customize via a Pack Studio.

### B. Pre-Formed Multi-Skill Crews

Crews are formed at the cooperative level based on skill complementarity, past collaboration, and geographic proximity. Each crew has a team lead, defined service scope, and standard rate card. Total amount and split among workers are visible. Crews offer response time guarantees and quality standards for institutional clients.

### C. Hourly Time Blocks (Instahelp)

Fixed time blocks, such as 2-hour Handyman, 3-hour Home Helper, and 4-hour Office Support, with allowed task categories, explicit exclusions, and minimum guaranteed earnings. Workers see duration, categories, and minimum earnings. The platform enforces minimum hourly rate and overtime rules.

## Innovation 2: Welfare-Constrained Fair Matching with Explainable AI (XAI)

The matching engine optimizes for service quality, worker earnings, travel time, and fair workload distribution, subject to constraints such as skill requirements, worker consent, maximum travel radius, safety and time restrictions, daily-hour limits, minimum rate rules, and high-value job distribution.

The platform employs SHAP (SHapley Additive exPlanations) and LIME (Local Interpretable Model-agnostic Explanations) to explain every assignment decision.

Example:

> "Worker A was selected because: (1) certified for elder care (+0.32 SHAP value), (2) available during requested shift (+0.28), (3) 1.8 km away (+0.15), (4) has not exceeded weekly workload (+0.12)."

A **Fairness Console** displays average earnings, jobs per worker, travel time, acceptance rate, high-value-job distribution, gender and safety constraints, algorithmic explanations with SHAP values, and appeal history.

## Innovation 3: Cooperative Worker Passport with Federated Learning

A portable, worker-owned profile containing verified skills, aggregated ratings, work history, welfare entitlements, and separate service-quality and safety ratings. The passport combines government IDs such as Aadhaar and e-Shram, NSDC and state skill certificates, community attestations, and on-platform micro-tests.

### Federated Learning for Worker Behavior Models

Worker behavior data, including acceptance patterns, cancellation reasons, preferred hours, and skill demonstrations, remains on the worker's device. Only model parameter updates, or gradients, are sent to the central server for aggregation, ensuring:

**Privacy:** Raw behavioral data never leaves the device.

**Security:** Differential privacy and secure aggregation prevent reconstruction attacks.

**Personalization:** Each worker benefits from globally improved models while retaining local customization.

### Graph-Based Worker-Skill-Trust Network

A heterogeneous graph contains worker nodes (W), skill nodes (S), and trust or attestation nodes (T). A Graph Neural Network (GNN) learns latent representations using message-passing.

Gap detection operates through link prediction. For each worker-skill pair where no proficiency edge exists, the system computes predicted probability. When probability exceeds the default threshold of 0.7 but the edge is absent, the system generates skill-gap records and recommends targeted upskilling.

Trust evaluation uses GNN-aided models to propagate trust among multi-hop neighbours, detecting fraud rings and adversarial attacks.

# Additional Core Features

## Minimum Earnings Guarantee (MEG) + Dynamic Allocation

Using AI-based demand forecasting and cross-cooperative workload sharing, SAHAKAR SEVA aims to guarantee each active worker a minimum monthly income of ₹8,000–₹12,000 depending on city and role.

Funding can come from platform commission, institutional contracts, and possible government or CSR co-funding.

If projected earnings fall below MEG, the system prioritizes high-probability jobs, suggests upskilling, and allocates gap-filling tasks. During crises such as monsoon or lockdown periods, allocation shifts to vulnerability-weighted ranking, protecting the most vulnerable workers first.

## One-Click Enrolment + Usage-Based Micro-Insurance

Automatic welfare enrolment can be triggered when workers complete a specified number of jobs or earn above a defined threshold.

Potential benefits include:

* Accident insurance through micro-premiums, possibly subsidized.
* Health insurance tie-ups through state schemes and private micro-plans.
* Savings instruments through small auto-savings per transaction.

### Usage-Based Micro-Insurance

Premiums are proportional to hours worked or earnings.

### Parametric Micro-Insurance

Income protection can be provided during disruptions such as heavy rainfall, dangerous pollution, or curfews. Payouts are triggered automatically when a verified disruption is detected, without claim forms or waiting periods. Lost income can be credited directly to the worker's UPI within minutes.

### One-Click Enrolment

Workers can register on e-Shram and obtain a UAN. The platform can support Ayushman Bharat PM-JAY enrollment through Aadhaar-based e-KYC, generating an insurance card through a simplified process.

## Voice-First, Multilingual Access

The entire app is accessible through native-language voice interaction powered by Digital India BHASHINI APIs for ASR, TTS, and translation.

Example voice intents include:

> "Mujhe kal subah 10 baje cleaning book karni hai."

> "Aaj ke kitne rupaye aaye?"

Supported languages include Hindi, Kannada, Tamil, Telugu, Bengali, Marathi, Gujarati, Malayalam, Odia, and Punjabi.

The system falls back to text or IVR when ASR confidence is low.

## Offline-Resilient Design with Edge AI

SAHAKAR SEVA follows a local-first architecture. Booking and wage ledger entries are created locally, while payments are recorded as "pending" with cryptographic proof.

The system is designed to align with UPI Lite and offline tap-to-pay capabilities once certified terminals and applicable standards support the required workflows.

### Edge + Offline AI

Lightweight ML models run on-device for:

* Skill verification through image and video analysis.
* Basic fraud detection through booking-pattern anomaly detection.
* Local demand forecasting through time-series models.
* Voice intent recognition through on-device ASR.

This ensures functionality in low-connectivity environments.

# Open API & Protocol Design

SAHAKAR SEVA is designed as an open network inspired by ONDC (Open Network for Digital Commerce).

### Open APIs

Documented through OpenAPI and Swagger, allowing other cooperatives, platforms, and institutions to integrate.

### Interoperability

Worker passports, skill certifications, and ratings can be shared across participating platforms with worker consent.

### Data Cooperative

Workers and cooperatives collectively own data. Aggregate and anonymized data can inform government policy, guide training programs, attract CSR funding, and support impact investment.

# Technology Stack

## Frontend

* React Native (Expo) for cross-platform mobile applications with offline-first SQLite.
* Next.js 14 with TypeScript for the web administration dashboard.
* Tailwind CSS and shadcn/ui for accessible and responsive design.

## Backend

* FastAPI (Python) for asynchronous REST and WebSocket APIs.
* JWT and Firebase Auth for secure, phone-first OTP verification.
* Celery and Redis for asynchronous task processing.

## Database

* PostgreSQL + PostGIS for relational and geospatial data.
* Redis for caching.
* Neo4j or Amazon Neptune for worker-skill-trust graphs.
* Materialized views for analytics.

## AI/ML

* OR-Tools for constrained assignment.
* TensorFlow Federated or PySyft for federated learning.
* PyTorch Geometric or DGL for GNNs.
* SHAP and LIME for explainability.
* BHASHINI APIs for voice interaction.
* TensorFlow Lite or ONNX Runtime for edge AI.

## Payments

* Razorpay for UPI, card, and net-banking payments.
* Local-first recording with Bluetooth and NFC, aligned with applicable NPCI offline UPI standards.
* Parametric insurance payouts through verified disruption signals such as weather APIs and AQI feeds.

## Infrastructure

* Vercel for frontend hosting.
* Railway or Render for backend infrastructure.
* Cloudflare or AWS CloudFront CDN.
* GitHub Actions for CI/CD.
* Sentry and Better Uptime for monitoring.

# Safety and Governance

## Gender-First Safety Module

Features include:

* Women-only verified badges.
* Harassment escalation to a cooperative legal cell.
* Safe-time scheduling with the ability to disable bookings after 8 PM.
* Peer buddy system.
* Separate customer safety behavior ratings.

## Safety Signal Engine

The platform monitors customer cancellations, booking patterns, feedback, and social graphs.

When safety signals accumulate, the system notifies the worker, escalates the case to the cooperative federation, and requires human review before external escalation.

## Worker Appeal System

Workers who are deprioritized by the algorithm can appeal to a cooperative arbitration panel consisting of 3 senior workers and 1 administrator.

The panel reviews the case, votes on the outcome, and can override the algorithm. The decision is logged for future algorithm tuning.

## Data Privacy

SAHAKAR SEVA follows a local-first architecture with selective cloud synchronization, role-based access control, federated learning privacy guarantees, and compliance with data protection frameworks covering data minimization, purpose limitation, transparent consent, and data subject control.

# Implementation and Pilot

## Seven-Stage Methodology

1. **Requirements Study:** Week 1–2
2. **System Design:** Week 2–3
3. **Development:** Week 3–8
4. **Integration:** Week 8–10
5. **Testing:** Week 10–12
6. **Pilot:** Week 12–20
7. **Deployment:** Week 20+

## Pilot Scope

**Location:** Bengaluru

**Cooperatives:** 2–3 cooperative federations

**Workers:** 50–100 workers

**Bookings:** 200–500 bookings over 8–12 weeks

**Initial services:**

* Domestic cleaning
* Elder care
* Home maintenance

**Potential institutional partners:**

* 3–5 housing societies
* 2–3 clinics or old-age homes

# Success Metrics

| Metric                                |           Target |
| ------------------------------------- | ---------------: |
| Worker earnings per active day        |  20–30% increase |
| Completed jobs per worker             |  15–25% increase |
| Travel time per job                   | 15–20% reduction |
| Repeat booking rate                   |           40–50% |
| Assignment fairness, Gini coefficient |            < 0.3 |
| Dispute resolution time               |       < 48 hours |
| Customer satisfaction                 |            4.5/5 |
| Digital payment completion            |             90%+ |
| Voice interface usage                 |             60%+ |
| Offline booking usage                 |           10–15% |
| Federated learning participation      |             80%+ |
| GNN trust evaluation accuracy         |             85%+ |
| XAI explanation satisfaction          |            4.0/5 |
| MEG uptake                            |             70%+ |
| Micro-insurance enrolment             |             60%+ |

# Feasibility and Impact

## Technical Feasibility

SAHAKAR SEVA is built using mature technologies such as React Native, FastAPI, PostgreSQL, Razorpay, BHASHINI, TensorFlow Federated, and PyTorch Geometric. Federated learning is an established approach for privacy-preserving machine learning, while GNNs are used for graph-based trust prediction.

## Economic Feasibility

The platform does not require mandatory recurring cloud costs at the individual worker level. Potential revenue sources include:

* Transaction fees of 5–8%.
* SaaS subscriptions.
* B2B contracts.
* Data analytics.
* Parametric micro-insurance premiums.

## Scalability

The marginal cost of expanding to additional federations remains low.

**Year 2 target:**

* 30+ cities.
* 100,000+ workers.
* 1 million+ bookings per month.
* 500+ institutional contracts.

## Analog: Bharat Taxi

Bharat Taxi, a cooperative-owned ride-hailing platform, had nearly 8 lakh drivers and 41 lakh customers as of July 2026, demonstrating the potential for cooperative platforms to scale nationally.

## Social Impact

SAHAKAR SEVA aims to bridge the economic participation gap, empower women workers, formalize informal income, and stabilize income volatility through MEG.

## Economic Impact

Workers can retain 95–98% of revenue compared with approximately 70–85% on private platforms. The platform can also improve access to credit, insurance, and social benefits.

## Educational Impact

GNN-based skill-gap detection enables targeted upskilling and helps workers identify opportunities to improve their employability.

## Environmental Impact

The platform can minimize paper usage and reduce transport inefficiency through optimized job allocation and batch optimization.

# Alignment with National Priorities

## Ministry of Cooperation

Strengthens cooperative institutions by providing technological infrastructure and digital capabilities.

## Bharat Taxi

Extends the cooperative model from mobility services to the broader household and community services market.

## BHASHINI

Aligns with the Digital India initiative for regional-language digital access.

## Social Security for Gig Workers

Supports government measures related to accident insurance, health benefits, maternity benefits, e-Shram, and Ayushman Bharat under the broader social-security framework.

# Research Foundation

* **PLFS 2023–24:** Approximately 550 million informal workers, representing around 87% of employed workers.
* **Gendered gig work research:** Women workers face higher safety risks in gig-work environments.
* **Federated Learning:** Privacy-preserving machine-learning framework with defenses against model-poisoning attacks.
* **Graph Neural Networks:** Used for trust prediction and resilience against adversarial attacks.
* **Explainable AI:** SHAP and LIME support transparency, interpretability, and algorithmic trust.
* **Minimum Earnings Guarantee:** Income stabilization approaches can provide welfare benefits for workers.
* **Usage-Based Micro-Insurance:** Emerging models provide low-premium protection for gig workers.
* **Offline UPI:** NPCI is developing offline payment capabilities, including tap-to-pay mechanisms for supported use cases.
* **Voice-First Platforms:** WhatsApp, voice notes, IVR, and ASR demonstrate the potential of voice-based interfaces for blue-collar workers.

# Conclusion

SAHAKAR SEVA directly answers the Ministry of Cooperation's problem statement by converting existing smartphone infrastructure into a worker-empowered, transparent, and safety-focused marketplace.

Its integrated innovations include **Flexible Service Units, Welfare-Constrained Fair Matching with XAI, Cooperative Worker Passport with Federated Learning, Graph-Based Worker-Skill-Trust Network, Minimum Earnings Guarantee, One-Click Enrolment, Usage-Based Micro-Insurance, Voice-First Multilingual Access, Offline-Resilient Design with Edge AI, and Open API & Protocol Design.**

Together, these components transform SAHAKAR SEVA from a conventional consumer gig platform into a comprehensive worker empowerment and enterprise workforce solutions system.

## Year 2 Targets

* **100,000+** workers formalized.
* **500,000+** households served.
* **1,000,000+** bookings per month.
* **₹200+ crore** GMV.
* **₹100+ crore** worker earnings.
* **50,000** women workers with safety protections.
* **30+** cooperatives strengthened.
* **80%+** federated learning participation.
* **85%+** GNN accuracy.
* **60%+** micro-insurance enrolment.
* **70%+** MEG uptake.

**SAHAKAR SEVA enables millions of skilled workers to reclaim dignity, agency, and fair economic value. This is not just a business opportunity; it is a social movement to democratize India's service economy.**
