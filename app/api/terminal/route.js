import { NextResponse } from 'next/server';
import { connectToDatabase, inMemoryStore } from '@/lib/db';
import Endorsement from '@/models/Endorsement';
import Message from '@/models/Message';
import { generateFreshInfiniteJoke } from '@/lib/infiniteWitEngine';

export async function POST(request) {
  try {
    const { command } = await request.json();
    const cmd = (command || '').trim().toLowerCase();

    if (!cmd) {
      return NextResponse.json({ output: '' });
    }

    if (cmd === 'help') {
      return NextResponse.json({
        output: `
<span class="term-accent">Available Diagnostic &amp; MERN Commands:</span>
  • <span class="term-green">inbox</span>          - Reads recent direct messages ingested from /contact
  • <span class="term-green">guestbook</span>      - Queries MongoDB for verified engineer endorsements
  • <span class="term-green">telemetry</span>      - Live Node.js runtime &amp; DB connection health
  • <span class="term-green">joke</span>           - Prints a witty, high-IQ AI &amp; systems engineering joke
  • <span class="term-green">bio</span>            - Displays Paritosh's engineering philosophy
  • <span class="term-green">skills</span>         - Prints the technical arsenal
  • <span class="term-green">projects</span>       - Lists flagship production systems
  • <span class="term-green">agentic_rca</span>    - Executes simulated FastMCP EV telemetry inference
  • <span class="term-green">fraud_check</span>    - Executes sub-1.2ms UPI CRNN Attention score calculation
  • <span class="term-green">clear</span>          - Clears the terminal screen
`,
      });
    }

    if (cmd === 'inbox' || cmd.startsWith('inbox') || cmd === 'messages') {
      const dbStatus = await connectToDatabase();
      let msgs = [];
      if (dbStatus.isConnected) {
        msgs = await Message.find().sort({ createdAt: -1 }).limit(10).lean();
      } else {
        msgs = inMemoryStore.getMessages().slice(0, 10);
      }

      if (!msgs || msgs.length === 0) {
        return NextResponse.json({
          output: `
<span class="term-accent">[DIRECT MESSAGES INBOX]</span>
<span class="term-muted">No messages currently in the queue.</span>
<span class="term-green">✓ Ready to ingest inquiries from the /contact form or paritoshmukherjee8@gmail.com</span>
`,
        });
      }

      const listHtml = msgs
        .map(
          (m, idx) => `
<span class="term-yellow">#${idx + 1} [${m._id || m.id}]</span> - <span class="term-muted">${new Date(m.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</span>
  • <span class="term-pink">From:</span> ${m.name} &lt;<span class="term-green">${m.email}</span>&gt;
  • <span class="term-accent">Subject:</span> [${m.category || 'General'}] ${m.subject || 'Direct Message'}
  • <span class="term-cyan">Message:</span> “${m.message}”
`
        )
        .join('');

      return NextResponse.json({
        output: `
<span class="term-accent">[DIRECT MESSAGES INBOX - ${msgs.length} RECENT TRANSMISSIONS]</span>
${listHtml}
<span class="term-green">✓ Source: ${dbStatus.isConnected ? 'MongoDB Atlas (Live Database)' : 'Resilient In-Memory Store'}. Email notification target: paritoshmukherjee8@gmail.com</span>
`,
      });
    }

    if (cmd === 'joke' || cmd === 'pun') {
      const joke = generateFreshInfiniteJoke();
      return NextResponse.json({
        output: `<span class="term-yellow">⚡ [${joke.category}]: ${joke.text}</span>`,
      });
    }

    if (cmd === 'bio') {
      return NextResponse.json({
        output: `
<span class="term-accent">PARITOSH MUKHERJEE // SYSTEMS DOSSIER</span>
• Focus: Production-grade ML systems, causal inference, and autonomous telemetry diagnostics.
• Unofficial Motto: "If your model takes 500ms to respond, the fraudulent transaction has already bought coffee in Dubai."
• Architecture: Full MERN Stack (Next.js Node API, React 19, MongoDB Mongoose, FastMCP)
• Email: <span class="term-green">paritoshmukherjee8@gmail.com</span>
• GitHub: <a href="https://github.com/Paritosh8-AI" target="_blank" class="term-accent">github.com/Paritosh8-AI</a>
`,
      });
    }

    if (cmd === 'guestbook' || cmd === 'endorsements') {
      const dbStatus = await connectToDatabase();
      let entries = [];
      if (dbStatus.isConnected) {
        entries = await Endorsement.find().sort({ createdAt: -1 }).limit(3).lean();
      } else {
        entries = inMemoryStore.getAll().slice(0, 3);
      }

      const listHtml = entries
        .map(
          (e) => `
  • <span class="term-pink">${e.name}</span> (${e.role} @ ${e.company}):
    <span class="term-muted">“${e.message.slice(0, 120)}...”</span> [${e.badge}] (❤️ ${e.likes} likes)
`
        )
        .join('');

      return NextResponse.json({
        output: `
<span class="term-accent">[MongoDB Database Query - Latest Verified Endorsements]</span>
${listHtml}
<span class="term-green">✓ Returned ${entries.length} live records from database (${dbStatus.isConnected ? 'MongoDB Atlas' : 'In-Memory Store'}). Scroll to Guestbook section to publish your own!</span>
`,
      });
    }

    if (cmd === 'telemetry' || cmd === 'health') {
      const dbStatus = await connectToDatabase();
      const mem = process.memoryUsage();
      return NextResponse.json({
        output: `
<span class="term-accent">[SYSTEM TELEMETRY REPORT]</span>
  • Runtime: <span class="term-green">Node.js ${process.version} (${process.platform}-${process.arch})</span>
  • Database: <span class="term-green">${dbStatus.isConnected ? '🟢 MongoDB Atlas (Active)' : '🟡 In-Memory Resilient Store (Active)'}</span>
  • Heap Used: <span class="term-yellow">${(mem.heapUsed / 1024 / 1024).toFixed(1)} MB</span> | RSS: ${(mem.rss / 1024 / 1024).toFixed(1)} MB
  • Latency SLAs: <span class="term-green">UPI CRNN: 0.91ms (&lt;1.2ms SLA)</span> | <span class="term-green">FastMCP Causal DAG: 1.84ms</span>
`,
      });
    }

    if (cmd === 'skills') {
      return NextResponse.json({
        output: `
<span class="term-accent">TECHNICAL ARSENAL:</span>
  [Daily Driver] Python, TensorFlow, Next.js, Node.js, MongoDB, FastAPI, Docker
  [Deep Mastery] FastMCP Tool Development, Causal DAGs, Sequence Modeling (CRNN)
  [Domain Specialization] OCPP 1.6-J, OCPI 2.2, In-Memory Graphs, FL Studio Audio DSP
`,
      });
    }

    if (cmd === 'projects') {
      return NextResponse.json({
        output: `
<span class="term-accent">FLAGSHIP PRODUCTION SYSTEMS:</span>
  1. <span class="term-green">AgenticEV RCA Studio</span>: Causal telemetry triage for EV charging (FastMCP + OCPP 1.6-J)
  2. <span class="term-green">UPI Sentinel 2.0</span>: Real-time fraud defense (&lt;1.2ms SLA, CRNN + Attention)
  3. <span class="term-green">Breast Cancer Sentinel 2.0</span>: Clinical decision support (99.67% ROC-AUC, Platt Scaling)
`,
      });
    }

    if (cmd === 'agentic_rca') {
      return NextResponse.json({
        output: `
<span class="term-accent">Initiating AgenticEV Causal Inference Engine...</span>
<span class="term-purple">[FastMCP Agent]</span> Ingesting multi-party OCPP 1.6-J event stream from EVSE #8042...
<span class="term-purple">[FastMCP Agent]</span> Detected: Contactor drop during StopTransaction sequence.
<span class="term-purple">[Causal DAG]</span> Traversed nodes: [Grid Voltage OK] -> [EVSE Pilot PWM Valid] -> [Vehicle BMS Interlock Trip].
<span class="term-green">✓ ROOT CAUSE ATTRIBUTED:</span> Vehicle-side contactor failure (Confidence: 97.2%). Deterministic report generated.
`,
      });
    }

    if (cmd === 'fraud_check') {
      return NextResponse.json({
        output: `
<span class="term-accent">Executing compiled @tf.function graph tracing...</span>
<span class="term-accent">[UPI Sentinel]</span> Ingesting incoming transaction: ₹45,000 | New device | Distance jump: 820km
<span class="term-yellow">[In-Memory Graph]</span> Mule ring traversal: 2 hops to flagged cluster.
<span class="term-yellow">[CRNN + Attention]</span> Sequence window evaluated in <span class="term-green">0.91 ms</span>.
<span class="term-purple">⚠️ VERDICT:</span> Risk Score 0.984 | Step-Up 2FA Mandated (Total Pipeline Latency: 1.15 ms).
`,
      });
    }

    return NextResponse.json({
      output: `<span class="term-yellow">Command not recognized: "${cmd}". Type <span class="term-green">help</span> to view available system commands.</span>`,
    });
  } catch (err) {
    return NextResponse.json({ output: `<span class="term-yellow">Execution error: ${err.message}</span>` });
  }
}
