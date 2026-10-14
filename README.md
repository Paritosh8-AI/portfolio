# ⚡ Paritosh Mukherjee — AI & ML Systems Engineer Portfolio (MERN Full-Stack)

> **High-Performance Full-Stack MERN Portfolio Application** showcasing production-grade machine learning systems, autonomous telemetry diagnostics, low-latency deep learning architectures, audio synthesis, and interactive MongoDB-backed peer endorsements.

---

## 🌟 MERN Stack Architecture & Features

This portfolio has been completely architected using modern **MERN (MongoDB, Express/Next.js Node API, React 19, Node.js)** concepts:

### 1. Unified Full-Stack Architecture
- **Frontend (React 19 + Next.js App Router)**: High-performance server and client components, fluid CSS transitions, interactive simulators, and zero layout shift.
- **Backend (Node.js REST API)**: Clean serverless route handlers handling asynchronous telemetry, peer endorsements, like counter transactions, command parsing, and message ingestion.
- **Database (MongoDB & Mongoose)**:
  - Real Mongoose schemas for `Endorsement` and `Message`.
  - **Zero-Setup In-Memory Resilient Fallback**: Automatically connects to MongoDB Atlas if `MONGODB_URI` is supplied in `.env.local`; seamlessly falls back to a resilient in-memory data store with instant atomic updates if no database is configured.

---

## 🚀 Live REST API Endpoints

| Endpoint | Method | Description |
| :--- | :---: | :--- |
| `/api/endorsements` | `GET` | Retrieve peer endorsements with category filter (`badge`) & sort (`newest` / `top`). |
| `/api/endorsements` | `POST` | Create a new peer endorsement with validation & MongoDB persistence. |
| `/api/endorsements/[id]/like` | `POST` | Atomically increment claps / likes on an endorsement. |
| `/api/endorsements/[id]` | `DELETE` | Moderation route to remove an endorsement. |
| `/api/telemetry` | `GET` | Real-time Node.js server health, heap memory footprint, and ML inference SLAs. |
| `/api/terminal` | `POST` | Execute interactive diagnostic commands (`telemetry`, `guestbook`, `agentic_rca`, `fraud_check`). |
| `/api/contact` | `POST` | Ingest and store client collaboration inquiries and messages. |

---

## 📱 Pages & Interactive Components

1. **[Overview (`/`)](file:///e:/portfolio%20website/app/page.jsx)**:
   - Dynamic Hero section with rotating sub-titles, live KPI telemetry metrics, and Paritosh's systems engineering quips.
   - **Interactive Terminal Console**: REST-backed terminal executing live diagnostics against Node.js.
   - **Flagship Systems Preview Switcher**: Interactive thumbnail previewer for AgenticEV, UPI Sentinel, and Breast Cancer Sentinel.
   - **Live Peer Endorsements**: MongoDB-backed engineering guestbook cards with instant like counts.

2. **[Flagship Systems (`/projects`)](file:///e:/portfolio%20website/app/projects/page.jsx)**:
   - **AgenticEV RCA Studio**: FastMCP protocol and causal directed acyclic graphs for distributed EV charging telemetry.
   - **UPI Sentinel 2.0 Real-Time Simulator**: Interactive inference slider allowing visitors to simulate velocity bursts, travel distances, and measure sub-1.2ms inference latency.
   - **Breast Cancer Sentinel 2.0**: Platt-calibrated 99.67% ROC-AUC clinical ensemble.

3. **[Technical Arsenal (`/skills`)](file:///e:/portfolio%20website/app/skills/page.jsx)**:
   - Real capabilities with zero arbitrary percentages.
   - Dynamic domain filters (ML, FastMCP, Low-Latency Backend, EV Protocols, DevOps, Audio DSP).
   - Real-time instant search bar.
   - Verified Technology Cloud tags.

4. **[Interests & Innovations Lab (`/interests`)](file:///e:/portfolio%20website/app/interests/page.jsx)**:
   - Clean EV mobility & OCPP 1.6-J / OCPI 2.2 interactive schematics.
   - FastMCP Causal DAG with Pearlian $do(X)$ calculus breakdown.
   - **Sonic Lab Synthesizer**: In-browser musical synthesizer (Web Audio API) with 7 playable keys (`A` through `J`), multiple waveforms, and a real-time `<canvas>` oscilloscope!

5. **[Engineering Journey (`/experience`)](file:///e:/portfolio%20website/app/experience/page.jsx)**:
   - Production deployment timeline and core engineering axioms.
   - Live Node.js `/api/telemetry` server status widget.
   - Public GitHub telemetry cards from `@Paritosh8-AI`.

6. **[Guestbook (`/guestbook`)](file:///e:/portfolio%20website/app/guestbook/page.jsx)**:
   - Dedicated full-page engineering endorsements wall.
   - Interactive submission modal with role, company, verified badge selection, and 5-star ratings.
   - Instant like/clap counters with optimistic UI updates.

7. **[Contact & Collaboration (`/contact`)](file:///e:/portfolio%20website/app/contact/page.jsx)**:
   - One-click email copy pill (`paritoshmukherjee8@gmail.com`).
   - Verified communication channels (GitHub, LinkedIn, Instagram).
   - **Live Message Transmission Form**: Persists inquiries directly into MongoDB via `/api/contact`.

---

## 🛠️ Local Development & Deployment

### 1. Running Locally
```powershell
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Visit **`http://localhost:3000`** in your browser.

### 2. Optional: Connecting MongoDB Atlas
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```
*(If omitted, the application automatically runs in resilient in-memory mode).*

### 3. Deploying to Vercel
Deploy seamlessly to Vercel with zero extra configuration:
1. Push your repository to GitHub:
   ```powershell
   git add .
   git commit -m "feat: complete MERN stack architecture and interactive guestbook"
   git push origin main
   ```
2. Import the project in the [Vercel Dashboard](https://vercel.com).
3. (Optional) Add your `MONGODB_URI` environment variable under Project Settings.
4. Deploy!
