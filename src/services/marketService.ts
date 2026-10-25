export interface ChartDataPoint {
  time: string;
  value: number;
}

export interface MarketSnapshot {
  ngx: {
    index: string;
    change: string;
    percentChange: string;
    topGainers: { ticker: string; change: string }[];
  };
  global: {
    sAndP: string;
    nasdaq: string;
    ftse: string;
  };
  news: {
    title: string;
    summary: string;
    sentiment: "positive" | "neutral" | "negative";
  }[];
  trends: {
    ngx: ChartDataPoint[];
    sAndP: ChartDataPoint[];
    nasdaq: ChartDataPoint[];
    ftse: ChartDataPoint[];
  };
}

export interface FinancialNewsItem {
  id: string;
  title: string;
  category: string;
  sentiment: 'bullish' | 'bearish' | 'neutral';
  timestamp: string;
  summary: string;
  strategicImpact: string;
  affectedSectors: string[];
  source: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
  modelUsed?: string;
}

// Fallbacks for offline / instant render
const mockTrend = (base: number) => Array.from({ length: 7 }, (_, i) => ({
  time: `Day ${i + 1}`,
  value: Math.round((base + Math.random() * (base * 0.04) - (base * 0.02)) * 100) / 100
}));

export const fallbackMarketData: MarketSnapshot = {
  ngx: {
    index: "104,820.65",
    change: "+382.40",
    percentChange: "+0.37%",
    topGainers: [
      { ticker: "DANGCEM", change: "+3.4%" },
      { ticker: "GTCO", change: "+2.1%" },
      { ticker: "SEPLAT", change: "+1.9%" },
      { ticker: "MTNN", change: "+1.4%" }
    ]
  },
  global: {
    sAndP: "5,284.10 (+0.32%)",
    nasdaq: "16,512.80 (+0.44%)",
    ftse: "8,180.20 (+0.18%)"
  },
  news: [
    { title: "NGX Capitalization Crosses Historical Milestone Amid Industrial Surge", summary: "Heavyweight industrial and tier-1 banking equities lift market cap above ₦59 trillion.", sentiment: "positive" },
    { title: "CBN Sustains FX Liquidity Interventions; NGN Strengthens at NAFEM Window", summary: "Central Bank of Nigeria reported increased autonomous market inflows.", sentiment: "positive" },
    { title: "West African Hydrocarbon & Transition Assets Draw Institutional Consortiums", summary: "Multinational private equity syndicates evaluate $1.8B in Gulf of Guinea assets.", sentiment: "neutral" }
  ],
  trends: {
    ngx: mockTrend(104820),
    sAndP: mockTrend(5284),
    nasdaq: mockTrend(16512),
    ftse: mockTrend(8180)
  }
};

export const fallbackNewsItems: FinancialNewsItem[] = [
  {
    id: 'news-1',
    title: 'Dangote Refinery escalates output to 650k bpd; boosts West African fuel exports',
    category: 'ENERGY & INFRA',
    sentiment: 'bullish',
    timestamp: '2m ago',
    summary: 'The mega-refinery complex in Lekki Free Zone has commenced widespread commercial distribution of PMS and Euro-V diesel, drastically shrinking regional import dependencies.',
    strategicImpact: 'Curtails foreign exchange outflows for refined petroleum imports while generating sovereign foreign currency reserves through regional West African exports.',
    affectedSectors: ['Oil & Gas', 'Manufacturing', 'Logistics', 'Maritime'],
    source: 'Udom Energy Intelligence Desk'
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
    source: 'CBN Financial Markets Bulletin'
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
    source: 'NGX Market Wire'
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
    source: 'Global Energy Desk'
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
    source: 'Development Finance Monitor'
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
    source: 'Debt Management Office & Udom Research'
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
    source: 'Africa Tech Review'
  }
];

export async function fetchMarketData(): Promise<MarketSnapshot> {
  try {
    const res = await fetch('/api/market');
    if (!res.ok) {
      throw new Error(`Market fetch failed: ${res.statusText}`);
    }
    const data = await res.json();
    return data && data.ngx ? data : fallbackMarketData;
  } catch (error) {
    console.warn('Using client fallback for market data:', error);
    return fallbackMarketData;
  }
}

export async function fetchFinancialNews(): Promise<FinancialNewsItem[]> {
  try {
    const res = await fetch('/api/news');
    if (!res.ok) {
      throw new Error(`News fetch failed: ${res.statusText}`);
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : fallbackNewsItems;
  } catch (error) {
    console.warn('Using fallback news items:', error);
    return fallbackNewsItems;
  }
}

export async function sendChatMessage(
  message: string,
  history: { role: 'user' | 'model'; text: string }[],
  model: string = 'gemini-3.8-flash',
  persona: string = 'Chief Strategist'
): Promise<{ reply: string; model: string }> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history, model, persona })
  });

  if (!res.ok) {
    const errData = await res.json().catch(() => ({}));
    throw new Error(errData.details || errData.error || `Advisory chat failed with status ${res.status}`);
  }

  return await res.json();
}
