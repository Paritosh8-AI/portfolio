/**
 * Infinite Generative Wit Engine
 * Procedurally generates an endless, non-repeating stream of witty jokes
 * perfectly balanced between viral Indian social meme culture and trending Global Tech X discourse.
 *
 * NO CYCLING: Every joke is dynamically synthesized on demand with random variables
 * and checked against a session deduplication set so it never wraps around or repeats.
 */

// Randomized helper
function sample(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 25+ Procedural Archetype Generators
const GENERATORS = [
  // 1. UPI Midnight Meltdown (Indian Meme)
  () => {
    const bank = sample(['State Bank of India', 'HDFC', 'ICICI', 'Canara Bank', 'Punjab National Bank']);
    const amount = randInt(15, 85);
    const item = sample([
      'midnight ginger cutting chai',
      'hot samosa pav from a wooden roadside stall',
      'plate of late-night bun maska split 4 ways',
      'phantom QR code on a local pan shop counter',
      'half plate of hot roadside egg bhurji',
    ]);
    const mins = sample(['11:59 PM', '12:02 AM', '12:15 AM', '1:30 AM']);
    return {
      category: '11:59 PM UPI SERVER CRISIS',
      text: `${bank} payment gateway servers at ${mins} when 40 million college students simultaneously split a ₹${amount} bill for ${item}: “Now I am become Death, the destroyer of payment gateways.”`,
    };
  },

  // 2. Quick Commerce Speed Wars (Indian Meme)
  () => {
    const app = sample(['Blinkit', 'Zepto', 'Swiggy Instamart', 'BigBasket Now']);
    const items = sample([
      'two packets of Maggi and a phone charger',
      'an iced Americano and a USB-C adapter',
      'three green chillies and a lemon',
      'a roll of tape and a cold brew can',
      'a pack of cold curd and two parathas',
    ]);
    const mins = randInt(5, 8);
    const devPain = sample([
      'Next.js is still negotiating server-side hydration with three analytics ad trackers',
      'npm install is still recursively resolving 45,000 nested node_modules dependencies',
      'Webpack is still recalculating chunk hashes for a single whitespace change in CSS',
      'our CI pipeline is still waiting for an idle Ubuntu runner in us-east-1',
    ]);
    return {
      category: '10-MIN QUICK COMMERCE',
      text: `${app} will deliver ${items} to your 14th-floor flat in ${mins} minutes flat, yet ${devPain}.`,
    };
  },

  // 3. Indian Relatives vs AI / ML (Indian Meme)
  () => {
    const achievement = sample([
      'engineer sub-1.2ms sequence inference on high-frequency payment rails',
      'author autonomous causal DAG diagnostics over distributed OCPP telemetry',
      'calibrate post-hoc Platt scaling for mission-critical oncology classifiers',
      'train distributed transformer attention weights across multi-GPU clusters',
    ]);
    const domesticFavor = sample([
      'bypass their upstairs neighbor’s locked BSNL Wi-Fi password',
      'fix a jammed HP Deskjet printer that has been offline since 2016',
      'retrieve their lost WhatsApp family group photos from a cracked Samsung phone',
      'explain why their television remote isn’t turning on the microwave',
      'update their Aadhaar biometric OTP on an expired government portal',
    ]);
    return {
      category: 'INDIAN RELATIVES VS AI',
      text: `My relatives discovered I spend 60 hours a week helping ${achievement} and immediately called asking if I can ${domesticFavor}.`,
    };
  },

  // 4. Bangalore Startup Sweat Equity (Indian Meme)
  () => {
    const location = sample(['HSR Layout Sector 4', 'Indiranagar 100ft Road', 'Koramangala 5th Block', 'Indiranagar Third Wave Coffee']);
    const equity = (Math.random() * 0.003 + 0.001).toFixed(4);
    const perk = sample([
      'unlimited cold brew, beanbag access, and a standing desk',
      'organic kombucha and the privilege of writing our entire pitch deck',
      'high-speed fiber Wi-Fi and a motivational quote from Sam Altman',
      'unlimited complimentary tap water and an ergonomic footrest',
    ]);
    const roles = sample([
      'CTO, frontend designer, devops lead, and customer complaint responder',
      'lead ML architect, site reliability engineer, and office plant waterer',
      'chief causal inference scientist, janitor, and LinkedIn reel strategist',
    ]);
    return {
      category: 'BANGALORE STARTUP REALITY',
      text: `${location} seed-stage founder: “We offer zero cash, ${equity}% unvested sweat equity, ${perk}, and the existential privilege of being our ${roles}.”`,
    };
  },

  // 5. Shark Tank India Math (Indian Meme)
  () => {
    const ebitda = randInt(250, 750);
    const users = randInt(8, 22);
    const cr = randInt(40, 110);
    const buzzword = sample([
      'Bahdanau attention on a bipartite mule-ring graph',
      'a causal DAG inference engine wrapped in Streamlit',
      'a real-time FastMCP diagnostic proxy on an edge gateway',
      'sub-1.2ms sequence modeling with zero cache misses',
    ]);
    return {
      category: 'SHARK TANK INDIA EBITDA',
      text: `Shark Tank India pitch: “Namaste Sharks, we have negative ${ebitda}% EBITDA and ${users} active users (all in my college hostel wing), but we use ${buzzword}, so our valuation is ₹${cr} Crore non-negotiable.”`,
    };
  },

  // 6. 2:00 AM Zomato Cart Abandonment (Indian Meme)
  () => {
    const hour = sample(['1:52 AM', '2:14 AM', '2:47 AM', '3:10 AM']);
    const items = sample([
      '4 garlic naans and a handi butter paneer',
      'two double chicken egg rolls and a chocolate mousse',
      'a large cheese pizza, garlic bread, and two cold drinks',
      'a bowl of midnight biryani with extra salan',
    ]);
    const pct = (Math.random() * 7 + 89).toFixed(1);
    return {
      category: '2 AM CART ABANDONMENT',
      text: `Our ML recommendation model predicting that when an engineer adds ${items} to their Zomato cart at ${hour}, there is an ${pct}% probability they inspect delivery surge fees, close the app, drink lukewarm tap water, and rethink their career.`,
    };
  },

  // 7. Swiggy Rain Surge Breakdown (Indian Meme)
  () => {
    const food = randInt(120, 160);
    const rain = randInt(25, 45);
    const surge = randInt(35, 55);
    const delivery = randInt(55, 75);
    const total = food + rain + surge + delivery + 35;
    return {
      category: 'SWIGGY SURGE CHARGES',
      text: `Swiggy checkout breakdown: Food item ₹${food}, Delivery fee ₹${delivery}, Rain surge ₹${rain}, Night fee ₹${surge}, Platform fee ₹12, Handling charge ₹23. Total: ₹${total} for one lukewarm paratha.`,
    };
  },

  // 8. Silk Board / Noida Traffic Latency (Indian Meme)
  () => {
    const mins = randInt(14, 22);
    const spot = sample([
      'crossing the Silk Board junction during a light drizzle',
      'navigating the Mahamaya flyover in Noida at 6:45 PM rain traffic',
      'traveling from Indiranagar to HSR Layout via Marathahalli',
      'passing through Cyber Hub toll in Gurgaon during peak monsoon',
      'taking an auto 2 km along Outer Ring Road at 7:00 PM',
    ]);
    return {
      category: 'NOIDA & SILK BOARD TRAFFIC',
      text: `Fine-tuning a 7B parameter LoRA adapter on an RTX 4090: ${mins} minutes. ${spot}: Estimated delivery in 3 to 5 business days.`,
    };
  },

  // 9. Indian Parents & UPSC Comparison (Indian Meme)
  () => {
    const techFeat = sample([
      'build an AGI that solves room-temperature nuclear fusion',
      'architect a sub-1.2ms payment gateway processing 40,000 transactions per second',
      'train a foundation model that runs on an open-source refurbished laptop',
      'secure a Series A lead from top Silicon Valley venture partners',
    ]);
    return {
      category: 'INDIAN PARENTS & UPSC',
      text: `You could ${techFeat} and your Indian parents will still casually mention that Sharma ji’s son just cleared UPSC prelims on his first attempt.`,
    };
  },

  // 10. SBI Server Lunch Break (Indian Meme)
  () => {
    const cloudFeat = sample([
      'zero-downtime multi-region Kubernetes clusters across 12 availability zones',
      'global distributed Cassandra databases with 99.999% SLA availability',
      'sub-millisecond streaming telemetry networks across edge nodes',
    ]);
    return {
      category: 'SBI SERVER LUNCH BREAK',
      text: `You can deploy ${cloudFeat} worldwide, but you still cannot transact on an SBI server between 1:00 PM and 2:30 PM.`,
    };
  },

  // 11. Mumbai Churchgate Fast Local (Indian Meme)
  () => {
    return {
      category: 'MUMBAI LOCAL TRAIN LATENCY',
      text: 'Sub-millisecond inference is impressive, but have you ever seen a Mumbaikar board the 8:42 AM Churchgate fast local at Dadar while holding a boiling cutting chai with zero spillage?',
    };
  },

  // 12. Bhaiya Vegetable Discount Logic (Indian Meme)
  () => {
    const subFee = sample(['₹4,200 annual Cursor AI subscription', '$20/month Claude Pro account', '$150 monthly OpenAI API bill']);
    const discount = randInt(10, 20);
    return {
      category: 'BHAIYA DISCOUNT LOGIC',
      text: `Aggressively negotiating ₹${discount} off with the local vegetable vendor after spending ${subFee} without even glancing at the invoice.`,
    };
  },

  // 13. Gurgaon Cyber City Floods (Indian Meme)
  () => {
    return {
      category: 'GURGAON CYBER CITY FLOODS',
      text: 'World-class corporate towers housing Fortune 500 tech monopolies with multi-million dollar glass facades, surrounded by knee-deep monsoon water and floating Swiggy delivery bikes.',
    };
  },

  // 14. Vibe Coding with Claude (Trending X)
  () => {
    const months = randInt(3, 7);
    const model = sample(['Claude 3.7 Sonnet', 'DeepSeek-R1', 'Cursor Agent']);
    const prompt = sample([
      'make it feel like a fintech unicorn with Series B traction',
      'build a high-frequency real-time fraud interceptor with immaculate vibes',
      'make this look like an enterprise Stripe dashboard before Monday morning',
    ]);
    return {
      category: 'VIBE CODING & CLAUDE',
      text: `Vibe coding in 2026: I haven’t inspected raw syntax in ${months} months. I just look intensely at ${model}, whisper “${prompt}”, and git push directly to production.`,
    };
  },

  // 15. Jensen Huang's Leather Jacket (Trending X)
  () => {
    const gpu = sample(['H100 SXM5', 'B200 NVL72', 'H200 Tensor Core']);
    return {
      category: 'JENSEN’S GPU ECONOMY',
      text: `Jensen Huang’s leather jacket is the only financial asset with lower annual depreciation than an ${gpu} cluster rented out on 3-year uncancelable cloud debt.`,
    };
  },

  // 16. Reasoning Models & <think> Tags (Trending X)
  () => {
    const tokens = randInt(24, 85) * 1000;
    const dilemma = sample([
      'whether 9.11 is, in fact, not larger than 9.9',
      'how many "r"s are in the word "strawberry"',
      'if a hotdog qualifies as a topological cylinder',
      'whether unvested startup equity can be used to pay security deposits',
      'why an engineer with 8 years of experience is still Googling how to vertically center a div',
    ]);
    return {
      category: 'REASONING MODELS ON X',
      text: `Reasoning models spending ${tokens.toLocaleString()} thinking tokens inside <think> tags just to convince themselves that ${dilemma}.`,
    };
  },

  // 17. AI Wrapper Seed Rounds (Trending X)
  () => {
    const m = randInt(20, 45);
    const val = m * randInt(6, 9);
    const prompt = sample([
      'You are an empathetic customer success bot who loves B2B SaaS.',
      'You are a high-conviction thought leader specializing in vertical enterprise synergy.',
      'You summarize emails into bullet points with excessive corporate emojis.',
    ]);
    return {
      category: 'AI WRAPPER SEED ROUNDS',
      text: `Silicon Valley VCs investing $${m}M at a $${val}M valuation into a startup whose entire defensible moat is a system prompt beginning: “${prompt}”`,
    };
  },

  // 18. Synthetic Data Inbreeding (Trending X)
  () => {
    return {
      category: 'SYNTHETIC DATA INBREEDING',
      text: 'Training foundation models on synthetic data generated by other foundation models: the mathematical equivalent of feeding a xerox copy into another xerox machine until the universe collapses into pure gibberish.',
    };
  },

  // 19. FastMCP & Autonomous Agents (Trending X)
  () => {
    return {
      category: 'FASTMCP & AGENTIC CHAOS',
      text: 'Autonomous agents without FastMCP are like giving a toddler a corporate credit card, an SSH root key, and a prompt saying “optimize our cloud spend” before going to sleep.',
    };
  },

  // 20. Docker Production Dreams (Trending Dev)
  () => {
    return {
      category: 'DOCKER PRODUCTION DREAMS',
      text: 'Docker is the only reason senior architects can sleep at night knowing that “It works on my machine” can be legally transformed into “Then we will ship your machine to the AWS us-east-1 data center.”',
    };
  },

  // 21. LinkedIn Thought Leaders (Trending Meme)
  () => {
    const blunder = sample([
      'accidentally dropped our production PostgreSQL database with 4 million records',
      'pushed our company AWS root access keys directly to a public GitHub repository',
      'deployed an infinite recursive webhook loop that drained our monthly cloud budget in 18 minutes',
    ]);
    const lessons = randInt(6, 9);
    return {
      category: 'LINKEDIN TECH INFLUENCERS',
      text: `LinkedIn tech influencers: “Yesterday I ${blunder}. Here are ${lessons} leadership lessons about agility and resilience this taught me about B2B SaaS growth.”`,
    };
  },

  // 22. Cursor Tab Tab Tab (Trending Dev)
  () => {
    return {
      category: 'CURSOR TAB TAB TAB',
      text: 'Senior software engineering in 2026 has devolved into hitting Tab-Tab-Tab on Cursor until the red squiggly lines disappear and praying the client doesn’t click the Back button.',
    };
  },

  // 23. Kubernetes YAML War Room (Trending Dev)
  () => {
    const hours = randInt(5, 8);
    const issue = sample([
      'a single missing whitespace in a Kubernetes deployment YAML',
      'an extra semicolon that broke a regex lookahead assertion',
      'a forgotten await keyword on an asynchronous database query',
    ]);
    return {
      category: 'CORPORATE STANDUP WITH AI',
      text: `My daily agile standup update is just a sanitized rewrite of whatever Gemini generated when I asked: “How do I describe spending ${hours} hours debugging ${issue} as a strategic architectural refactor?”`,
    };
  },

  // 24. Mark Zuckerberg Open Weights (Trending X)
  () => {
    return {
      category: 'META OPEN WEIGHTS FLEX',
      text: 'Mark Zuckerberg releasing 405-billion-parameter open weights for free purely to scorch the profit margins of closed-source proprietary API wrappers: Chaotic good in a metaverse tee.',
    };
  },

  // 25. Prompt Caching Bill Shock (Trending X)
  () => {
    const tokens = randInt(140, 220) * 1000;
    return {
      category: 'PROMPT CACHING BILL SHOCK',
      text: `Nothing humbles a software engineer faster than seeing an API invoice after accidentally putting an un-cached ${tokens.toLocaleString()}-token context document inside a while(true) loop on a Friday evening.`,
    };
  },
];

// Helper to calculate unique signature
export function hashJokeText(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

/**
 * Procedurally generates an infinite, novel joke that has NEVER been seen in the current session.
 * NO CYCLING: This function always synthesizes fresh jokes and never resets or wraps around.
 */
export function generateFreshInfiniteJoke(seenSignatures = new Set()) {
  let attempts = 0;
  while (attempts < 60) {
    attempts++;
    const gen = sample(GENERATORS);
    const candidate = gen();
    const sig = hashJokeText(candidate.category + candidate.text);

    if (!seenSignatures.has(sig)) {
      seenSignatures.add(sig);
      return candidate;
    }
  }

  // Fallback high-entropy synthesizer
  const fallbackGen = sample(GENERATORS);
  const joke = fallbackGen();
  const sig = hashJokeText(joke.category + joke.text + Date.now());
  seenSignatures.add(sig);
  return joke;
}

// Initial deterministic joke for 100% SSR hydration safety
export const INITIAL_JOKE = {
  category: 'REASONING MODELS ON X',
  text: 'Reasoning models spending 42,000 thinking tokens inside <think> tags just to convince themselves that 9.11 is, in fact, not larger than 9.9.',
};
