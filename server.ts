import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Mock / Fallback Market Data
const generateMockTrends = (base: number) =>
  Array.from({ length: 7 }, (_, i) => ({
    time: `Day ${i + 1}`,
    value: Math.round((base + Math.random() * (base * 0.04) - base * 0.02) * 100) / 100,
  }));

const defaultMarketSnapshot = {
  ngx: {
    index: '104,820.65',
    change: '+382.40',
    percentChange: '+0.37%',
    topGainers: [
      { ticker: 'DANGCEM', change: '+3.4%' },
      { ticker: 'GTCO', change: '+2.1%' },
      { ticker: 'SEPLAT', change: '+1.9%' },
      { ticker: 'MTNN', change: '+1.4%' },
    ],
  },
  global: {
    sAndP: '5,284.10 (+0.32%)',
    nasdaq: '16,512.80 (+0.44%)',
    ftse: '8,180.20 (+0.18%)',
  },
  news: [
    {
      title: 'NGX Capitalization Crosses Historical Milestone Amid Industrial Surge',
      summary: 'Heavyweight industrial and tier-1 banking equities lift market cap above ₦59 trillion as domestic institutional allocators increase equity weightings.',
      sentiment: 'positive',
    },
    {
      title: 'CBN Sustains FX Liquidity Interventions; NGN Strengthens at NAFEM Window',
      summary: 'Central Bank of Nigeria reported increased autonomous market inflows, reducing volatility in cross-border import settlements.',
      sentiment: 'positive',
    },
    {
      title: 'West African Hydrocarbon & Transition Assets Draw Institutional Consortiums',
      summary: 'Multinational private equity syndicates evaluate $1.8B in Midstream and Liquefied Natural Gas projects across the Gulf of Guinea.',
      sentiment: 'neutral',
    },
  ],
  trends: {
    ngx: generateMockTrends(104820),
    sAndP: generateMockTrends(5284),
    nasdaq: generateMockTrends(16512),
    ftse: generateMockTrends(8180),
  },
};

const defaultHeadlines = [
  {
    id: 'news-1',
    title: 'Dangote Refinery escalates output to 650k bpd; boosts West African fuel exports',
    category: 'ENERGY & INFRA',
    sentiment: 'bullish',
    timestamp: '2m ago',
    summary: 'The mega-refinery complex in Lekki Free Zone has commenced widespread commercial distribution of PMS and Euro-V diesel, drastically shrinking regional import dependencies.',
    strategicImpact: 'Curtails foreign exchange outflows for refined petroleum imports while generating sovereign foreign currency reserves through regional West African exports.',
    affectedSectors: ['Oil & Gas', 'Manufacturing', 'Logistics', 'Maritime'],
    source: 'Udom Energy Intelligence Desk',
  },
  {
    id: 'news-2',
    title: 'Central Bank of Nigeria (CBN) maintains MPC stance; yields firm on 364-day T-Bills',
    category: 'FX & CBN',
    sentiment: 'neutral',
    timestamp: '8m ago',
    summary: 'Monetary Policy Committee signals ongoing hawkish commitment to anchor core inflation and foster foreign portfolio investment (FPI) inflows into fixed income assets.',
    strategicImpact: 'Elevated sovereign yields sustain attractive short-term carry trades for international institutional investors while incentivizing corporate issuers toward debt capital markets.',
    affectedSectors: ['Banking', 'Fixed Income', 'Treasury', 'Asset Management'],
    source: 'CBN Financial Markets Bulletin',
  },
  {
    id: 'news-3',
    title: 'NGX All-Share Index tests new highs as Tier-1 Banks accelerate capital recapitalization',
    category: 'NGX EQUITIES',
    sentiment: 'bullish',
    timestamp: '15m ago',
    summary: 'Commercial lenders accelerate rights issues and private placements to satisfy regulatory capital thresholds ahead of Q3 statutory milestones.',
    strategicImpact: 'Fortified bank balance sheets expand domestic underwriting capability for syndications exceeding $500M in infrastructure and manufacturing.',
    affectedSectors: ['Commercial Banking', 'Capital Markets', 'Securities'],
    source: 'NGX Market Wire',
  },
  {
    id: 'news-4',
    title: 'Brent Crude holds steady at $85.40/bbl as OPEC+ reiterates production discipline',
    category: 'COMMODITIES',
    sentiment: 'bullish',
    timestamp: '22m ago',
    summary: 'Tight physical crude differentials in the Atlantic Basin and steady Asia-Pacific demand support spot valuations above $85 per barrel.',
    strategicImpact: 'Bolsters Nigerian upstream hydrocarbon fiscal receipts and foreign exchange accretion into external reserves.',
    affectedSectors: ['Upstream Exploration', 'Sovereign Debt', 'FX Reserves'],
    source: 'Global Energy Desk',
  },
  {
    id: 'news-5',
    title: 'African Development Bank approves $450M facility for regional green logistics corridors',
    category: 'AFRICA M&A',
    sentiment: 'bullish',
    timestamp: '35m ago',
    summary: 'Blended concessional and commercial capital mobilized to connect deep-sea ports with landlocked manufacturing hubs across ECOWAS member states.',
    strategicImpact: 'Reduces interstate transit lead times by 38% under the AfCFTA framework, unlocking private equity co-investment pipelines.',
    affectedSectors: ['Infrastructure', 'Logistics', 'Supply Chain', 'Private Equity'],
    source: 'Development Finance Monitor',
  },
  {
    id: 'news-6',
    title: 'Federal Government concludes sovereign domestic dollar bond subscription; 180% oversubscribed',
    category: 'GLOBAL MACRO',
    sentiment: 'bullish',
    timestamp: '48m ago',
    summary: 'Strong domestic and diaspora institutional appetite reflects confidence in structural fiscal reforms and long-dated debt sustainability.',
    strategicImpact: 'Deepens the onshore foreign currency capital market and sets a benchmark for top-tier corporate USD issuance.',
    affectedSectors: ['Wealth Management', 'Debt Capital Markets', 'Sovereign Advisory'],
    source: 'Debt Management Office & Udom Research',
  },
  {
    id: 'news-7',
    title: 'Fintech & Digital Infrastructure deals hit $1.2B in H1 across Lagos and Nairobi corridors',
    category: 'TECH & FINTECH',
    sentiment: 'neutral',
    timestamp: '1h ago',
    summary: 'Venture growth debt and strategic corporate buyouts take precedence over early-stage equity, signaling market maturity and focus on positive EBITDA.',
    strategicImpact: 'Mergers and acquisitions velocity expected to increase as tier-1 payment gateways acquire cross-border FX rail licenses.',
    affectedSectors: ['Fintech', 'Telecommunications', 'Payments'],
    source: 'Africa Tech Review',
  },
];

let cachedMarketSnapshot = { ...defaultMarketSnapshot };
let cachedHeadlines = [...defaultHeadlines];

// Market Data Endpoint (Instant cache + background refresh)
app.get('/api/market', async (req, res) => {
  const shouldRefresh = req.query.refresh === 'true';

  if (!shouldRefresh) {
    return res.json(cachedMarketSnapshot);
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json(cachedMarketSnapshot);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents:
        'Return a real-time institutional snapshot of the Nigerian Stock Exchange (NGX ASI) and Global Markets (S&P 500, NASDAQ, FTSE 100), top volume gainers, 3 key market headlines, and 7 sequential numerical trend data points for each index.',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ngx: {
              type: Type.OBJECT,
              properties: {
                index: { type: Type.STRING },
                change: { type: Type.STRING },
                percentChange: { type: Type.STRING },
                topGainers: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      ticker: { type: Type.STRING },
                      change: { type: Type.STRING },
                    },
                    required: ['ticker', 'change'],
                  },
                },
              },
              required: ['index', 'change', 'percentChange', 'topGainers'],
            },
            global: {
              type: Type.OBJECT,
              properties: {
                sAndP: { type: Type.STRING },
                nasdaq: { type: Type.STRING },
                ftse: { type: Type.STRING },
              },
              required: ['sAndP', 'nasdaq', 'ftse'],
            },
            news: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  summary: { type: Type.STRING },
                  sentiment: { type: Type.STRING, enum: ['positive', 'neutral', 'negative'] },
                },
                required: ['title', 'summary', 'sentiment'],
              },
            },
            trends: {
              type: Type.OBJECT,
              properties: {
                ngx: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      value: { type: Type.NUMBER },
                    },
                    required: ['time', 'value'],
                  },
                },
                sAndP: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      value: { type: Type.NUMBER },
                    },
                    required: ['time', 'value'],
                  },
                },
                nasdaq: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      value: { type: Type.NUMBER },
                    },
                    required: ['time', 'value'],
                  },
                },
                ftse: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING },
                      value: { type: Type.NUMBER },
                    },
                    required: ['time', 'value'],
                  },
                },
              },
              required: ['ngx', 'sAndP', 'nasdaq', 'ftse'],
            },
          },
          required: ['ngx', 'global', 'news', 'trends'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    if (parsed && parsed.ngx) {
      cachedMarketSnapshot = parsed;
    }
    return res.json(cachedMarketSnapshot);
  } catch (error) {
    console.error('Error in /api/market refresh:', error);
    return res.json(cachedMarketSnapshot);
  }
});

// Live Financial News Headlines Endpoint (Instant cache + on-demand refresh)
app.get('/api/news', async (req, res) => {
  const shouldRefresh = req.query.refresh === 'true';

  if (!shouldRefresh) {
    return res.json(cachedHeadlines);
  }

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.json(cachedHeadlines);
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents:
        'Generate 7 high-impact live financial news headlines focusing on Nigeria, African markets, commodities (crude oil, gold, gas), FX, central banking, and global institutional investment. Return as structured JSON.',
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              category: { type: Type.STRING },
              sentiment: { type: Type.STRING, enum: ['bullish', 'bearish', 'neutral'] },
              timestamp: { type: Type.STRING },
              summary: { type: Type.STRING },
              strategicImpact: { type: Type.STRING },
              affectedSectors: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              source: { type: Type.STRING },
            },
            required: ['id', 'title', 'category', 'sentiment', 'timestamp', 'summary', 'strategicImpact', 'affectedSectors', 'source'],
          },
        },
      },
    });

    const parsed = JSON.parse(response.text || '[]');
    if (Array.isArray(parsed) && parsed.length > 0) {
      cachedHeadlines = parsed;
    }
    return res.json(cachedHeadlines);
  } catch (error) {
    console.error('Error in /api/news refresh:', error);
    return res.json(cachedHeadlines);
  }
});

// Gemini Multi-turn Chat Endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], model, persona } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Model selection based on requirements:
    // Use gemini-4-argon for particularly complex tasks, gemini-3.8-flash for general tasks, and gemini-3.1-flash-lite for fast tasks.
    let selectedModel = 'gemini-3.8-flash';
    if (model === 'gemini-4-argon' || model === 'gemini-3.1-flash-lite' || model === 'gemini-3.8-flash') {
      selectedModel = model;
    }

    const personaInstructions: Record<string, string> = {
      'Chief Strategist':
        'You act as the Senior Managing Director and Chief Investment Strategist at UdomCapital. You excel in holistic macroeconomic forecasting, asset allocation, capital markets, and corporate boardroom strategy.',
      'M&A Partner':
        'You act as the Partner in Charge of Mergers, Acquisitions & Corporate Finance at UdomCapital. You specialize in transaction structuring, valuation (DCF, precedent transactions, LBOs), synergy modeling, and regulatory clearances in Africa.',
      'Project Finance Lead':
        'You act as the Head of Project Finance & Infrastructure at UdomCapital. You specialize in non-recourse debt financing, public-private partnerships (PPP), concessional development facilities, EPC contract risk, and off-take agreements.',
      'Risk & FX Strategist':
        'You act as the Head of Treasury Risk and Currency Strategy at UdomCapital. You specialize in NGN/USD foreign exchange hedging, interest rate swaps, liquidity management, and sovereign debt credit default risk.',
    };

    const roleGuidance = persona && personaInstructions[persona] ? personaInstructions[persona] : personaInstructions['Chief Strategist'];

    const systemInstruction = `You are an elite financial strategist and executive intelligence advisor at UdomCapital, a premier African investment banking and financial advisory firm headquartered in Lagos, Nigeria.

Role & Persona:
${roleGuidance}

Firm Profile & Capabilities:
- Firm: UdomCapital (Headquartered in Lagos, Nigeria with pan-African reach).
- Core Advisory Services: Investment Banking, Project & Infrastructure Finance, Mergers & Acquisitions, Debt & Equity Capital Markets (NGX, Eurobonds), Wealth & Asset Management, and Sovereign Advisory.
- Typical Mandate Size: $15 Million to $750 Million+.
- Institutional Clients: Sovereign wealth funds, pension fund administrators (PFAs), multinational conglomerates, high-growth industrial operators, and family offices.

Communication Guidelines:
1. Deliver responses with the intellectual caliber, discretion, and precision of a senior partner at Goldman Sachs, Lazard, or Standard Bank.
2. Structure answers cleanly using markdown: succinct executive overview, key analytical pillars, risk matrix / trade-offs, and actionable next steps.
3. Incorporate relevant real-world African economic context (e.g. CBN monetary dynamics, NGX indices, AfCFTA trade integration, FX management, petroleum & mining value chains).
4. Maintain a multi-turn conversational memory, referencing previous points logically.
5. If the user asks about engaging UdomCapital or booking a consultation, direct them cordially to the firm's advisory consultation desk (WhatsApp or booking channels on the site).`;

    // Map conversation history
    const contents = [
      ...history.map((item: { role: string; text: string }) => ({
        role: item.role === 'model' ? 'model' : 'user',
        parts: [{ text: item.text }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        reply: `### Executive Strategic Summary\n\nThank you for consulting **UdomCapital Advisory** on "${message}".\n\n- **Capital Architecture**: Our investment committee emphasizes robust debt/equity capital structuring aligned with CBN monetary frameworks.\n- **Risk Mitigation**: Rigorous FX exposure hedging and sovereign risk assessment for West African jurisdictions.\n- **Actionable Next Step**: Please connect your API key in **Settings > Secrets** or connect directly with our advisory partners.`,
        model: selectedModel,
      });
    }

    // Call Gemini with a 25s timeout
    const generatePromise = ai.models.generateContent({
      model: selectedModel,
      contents,
      config: {
        systemInstruction,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Advisory intelligence request timed out after 25s')), 25000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const reply = response.text || 'Advisory brief generated without text body.';
    return res.json({ reply, model: selectedModel });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    const errorMessage = error?.message || 'Unknown error occurred';
    
    // Provide a dignified, authoritative institutional fallback response
    return res.json({
      reply: `### Executive Advisory Briefing\n\nRegarding your consultation on **"${req.body?.message || 'Transaction Structure'}"**:\n\n1. **Core Consideration**: Macroeconomic conditions in Nigeria and the broader ECOWAS economic corridor require proactive capital preservation and liquidity buffers.\n2. **Structuring Recommendation**: Align debt tenors with project cash flows, utilizing blended finance or domestic currency syndications to mitigate foreign exchange mismatch.\n3. **Mandate Support**: Our advisory desk is available to structure a customized term sheet or investment prospectus tailored to your institutional criteria.`,
      model: req.body?.model || 'gemini-3.8-flash',
      warning: errorMessage
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: false },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`UdomCapital server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
