# ⚡ Paritosh Mukherjee — AI & ML Systems Engineer Portfolio (MERN Full-Stack)

[![Next.js 15+](https://img.shields.io/badge/Next.js%2015+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![Vercel Deployed](https://img.shields.io/badge/Vercel-Deployed-blue?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

> **Full-Stack MERN Architecture**: Production-grade machine learning systems portfolio featuring sub-1.2ms inference pipelines, FastMCP autonomous causal telemetry diagnostics, interactive MongoDB peer endorsements, and real-time Web Audio API signal processing.

---

### 📋 Recommended GitHub Repository "About" Configuration

When viewing your repository on GitHub, click the **⚙️ (cog icon)** next to "About" on the right sidebar and paste these details:

- **Description**:  
  `Full-Stack MERN (MongoDB, Next.js Node API, React 19) portfolio featuring sub-1.2ms sequence modeling, FastMCP autonomous causal telemetry diagnostics, and real-time MongoDB peer endorsements.`
- **Website**:  
  `https://portfolio-rouge-rho-25.vercel.app`
- **Topics / Tags**:  
  `mern-stack`, `nextjs`, `react19`, `mongodb`, `mongoose`, `nodejs`, `fastmcp`, `machine-learning`, `deep-learning`, `low-latency`, `webaudio`

---

## 🧩 MERN Stack Concepts & Architecture Breakdown

This application is built from the ground up using core **MERN** patterns:

### 1. 🍃 M — MongoDB & Mongoose (Data Persistence Layer)
- **Object Data Modeling (ODM)**: Fully structured Mongoose schemas implemented in [`models/Endorsement.js`](file:///e:/portfolio%20website/models/Endorsement.js) and [`models/Message.js`](file:///e:/portfolio%20website/models/Message.js) with strict typing, enum validations, and character bounds.
- **Connection Caching**: Production connection pool manager in [`lib/db.js`](file:///e:/portfolio%20website/lib/db.js) utilizing `global.mongoose` caching to prevent serverless connection exhaustion.
- **Atomic Operations**: Atomic like/clap counter increments executed via database-level operators (`/api/endorsements/[id]/like`).
- **Resilient Zero-Setup Fallback**: Automatically connects to MongoDB Atlas if `MONGODB_URI` is supplied; gracefully falls back to an in-memory data store with atomic operations when running in standalone preview mode.

### 2. ⚡ E — Express-Equivalent Next.js Node REST API (Controller Layer)
- **RESTful Endpoints**: Built with Next.js App Router route handlers:
  - `GET /api/endorsements`: Supports query filtering (`?badge=...`) and sorting (`?sort=top` or `?sort=newest`).
  - `POST /api/endorsements`: Input sanitization, validation, and database insertion.
  - `POST /api/endorsements/[id]/like`: Route param parsing (`context.params`) and atomic like increments.
  - `GET /api/telemetry`: Asynchronously queries Node.js runtime stats and returns live health telemetry.
  - `POST /api/terminal`: Command parser evaluating terminal queries (`telemetry`, `guestbook`, `agentic_rca`, `fraud_check`).
  - `POST /api/contact`: Form transmission pipeline with unique message ID generation.
- **Serverless & Edge Ready**: Zero-overhead API handlers compiled into serverless endpoints with unified single-port routing (no CORS configuration required).

### 3. ⚛️ R — React 19 (Dynamic Frontend & User Experience)
- **Server & Client Components**: Seamless separation of static server components and high-interaction client components (`'use client'`).
- **Modern React Hooks**:
  - `useState`, `useEffect` for asynchronous REST API lifecycle management.
  - `useRef` for persistent canvas animation frames and Web Audio API contexts.
  - `useCallback` for memoized audio oscillator node triggers.
  - `useMemo` for client-side search query filtering.
- **Interactive Web Audio API Synthesizer**: [`components/SonicLabSynth.jsx`](file:///e:/portfolio%20website/components/SonicLabSynth.jsx) with real-time waveform selection, physical keyboard event listeners (`A` through `J`), and a real-time `<canvas>` oscilloscope rendering live time-domain audio signals.
- **Optimistic UI Updates**: Immediate client-side like counter responses with background synchronization.

### 4. 🟢 N — Node.js (Runtime & System Telemetry)
- **Node.js Diagnostics**: The `/api/telemetry` route directly queries Node.js process internals:
  - `process.memoryUsage().heapUsed` & `rss`
  - `process.uptime()`
  - `process.version` & `process.platform`
- **Dynamic Script Execution**: Direct Node.js asynchronous event loop management under heavy concurrent request loads.

---

## 🚀 Live REST API Specification

| Endpoint | Method | Status | Description |
| :--- | :---: | :---: | :--- |
| `/api/endorsements` | `GET` | `200 OK` | Retrieve verified endorsements with category filter & sort. |
| `/api/endorsements` | `POST` | `201 Created` | Create new peer endorsement with MongoDB persistence. |
| `/api/endorsements/[id]/like` | `POST` | `200 OK` | Atomic increment of claps/likes. |
| `/api/endorsements/[id]` | `DELETE` | `200 OK` | Endorsement moderation endpoint. |
| `/api/telemetry` | `GET` | `200 OK` | Real-time Node.js heap consumption & sub-1.2ms inference SLAs. |
| `/api/terminal` | `POST` | `200 OK` | Interactive command line diagnostic parser. |
| `/api/contact` | `POST` | `201 Created` | Ingest collaboration messages into MongoDB queue. |

---

## 📱 Pages & Features

1. **[Overview (`/`)](file:///e:/portfolio%20website/app/page.jsx)**: Kinetic Hero section, KPI counters, REST terminal, Flagship Systems switcher, and live Peer Endorsements.
2. **[Flagship Systems (`/projects`)](file:///e:/portfolio%20website/app/projects/page.jsx)**: Deep-dive blueprints for AgenticEV, UPI Sentinel (with interactive sub-1.2ms fraud simulator), and Cancer Sentinel.
3. **[Technical Arsenal (`/skills`)](file:///e:/portfolio%20website/app/skills/page.jsx)**: Skill matrix with instant search and dynamic domain filtering without arbitrary percentage meters.
4. **[Interests & Innovations Lab (`/interests`)](file:///e:/portfolio%20website/app/interests/page.jsx)**: Clean EV mobility schematics, FastMCP Causal DAGs, and interactive Sonic Lab synthesizer.
5. **[Engineering Journey (`/experience`)](file:///e:/portfolio%20website/app/experience/page.jsx)**: Production timeline, engineering axioms, and live Node.js telemetry metrics.
6. **[Guestbook (`/guestbook`)](file:///e:/portfolio%20website/app/guestbook/page.jsx)**: Dedicated peer endorsements wall where real colleagues and friends can post authenticated reviews.
7. **[Contact & Collaboration (`/contact`)](file:///e:/portfolio%20website/app/contact/page.jsx)**: Verified direct channels (Email, GitHub, LinkedIn, Instagram) and unified message transmission form.

---

## 🛠️ Local Development & Deployment

### 1. Running Locally
```powershell
# Install dependencies
npm install

# Start Next.js development server
npm run dev
```
Open **`http://localhost:3000`** in your browser.

### 2. Connecting MongoDB Atlas (Optional)
Add your MongoDB connection string in `.env.local`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority
```

### 3. Deploying to Vercel
```powershell
git add .
git commit -m "feat: complete MERN stack architecture"
git push origin main
```
Vercel automatically detects Next.js, compiles all client/server routes, and deploys the unified full-stack application.
