import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import MarketTicker from './components/MarketTicker';
import FinancialNewsMarquee from './components/FinancialNewsMarquee';
import GeminiAdvisorChat from './components/GeminiAdvisorChat';
import Hero from './components/Hero';
import Services from './components/Services';
import MarketDashboard from './components/MarketDashboard';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { fetchMarketData, MarketSnapshot } from './services/marketService';

export default function App() {
  const [marketData, setMarketData] = useState<MarketSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [externalPrompt, setExternalPrompt] = useState<string | null>(null);

  const loadMarketData = async () => {
    setLoading(true);
    const data = await fetchMarketData();
    setMarketData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadMarketData();
    
    // Auto refresh every 5 minutes
    const interval = setInterval(loadMarketData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAskAI = (prompt: string) => {
    setExternalPrompt(prompt);
    setIsChatOpen(true);
  };

  return (
    <main className="min-h-screen relative bg-udom-black text-white selection:bg-udom-gold selection:text-black">
      <Navbar onOpenChat={() => setIsChatOpen(true)} />
      
      {/* Top Continuous Intelligence Flow: Market Indices Ticker + Live Financial News Marquee */}
      <div className="pt-24 md:pt-28">
        <MarketTicker data={marketData} />
        <FinancialNewsMarquee onAskAI={handleAskAI} />
      </div>

      <Hero />
      
      <Services />

      <MarketDashboard 
        data={marketData} 
        loading={loading} 
        onRefresh={loadMarketData} 
      />

      <section id="invest" className="py-32 bg-udom-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="border border-white/10 p-12 md:p-24 relative overflow-hidden bg-white/[0.01]">
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop')] bg-cover grayscale"></div>
            <div className="relative z-10 max-w-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[1px] w-8 bg-udom-gold"></div>
                <span className="text-udom-gold font-bold uppercase tracking-[0.3em] text-[10px] block">Institutional Partnership</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-10 font-light">
                Join the <br />
                <span className="italic text-white/50">Industrial</span> Vanguard.
              </h2>
              <p className="text-white/40 font-light text-lg mb-14 leading-relaxed italic max-w-lg">
                Exclusive deployment opportunities for institutional partners seeking high-impact industrial assets, infrastructure debt, and private equity in growing African markets.
              </p>
              <div className="flex flex-wrap gap-8 items-center">
                <a href="#contact" className="bg-white text-udom-black px-12 py-5 font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all text-xs">
                  Request Prospectus
                </a>
                <button
                  onClick={() => handleAskAI('What are the current private equity and infrastructure co-investment mandates available at UdomCapital?')}
                  className="px-8 py-5 border border-white/20 hover:border-udom-gold text-white hover:text-udom-gold font-mono text-xs uppercase tracking-widest transition-all"
                >
                  Ask Advisory AI
                </button>
                <div className="text-[10px] uppercase tracking-[0.3em] text-white/20 font-bold border-l border-white/10 pl-8">
                  Typical Size: $15M — $750M
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      
      <Footer />

      {/* Gemini Multi-Turn Advisory Chat */}
      <GeminiAdvisorChat
        isOpen={isChatOpen}
        onToggleOpen={() => setIsChatOpen(!isChatOpen)}
        externalPrompt={externalPrompt}
        onClearExternalPrompt={() => setExternalPrompt(null)}
      />

      {/* Floating Action for Immediate WhatsApp Booking */}
      <a 
        href={`https://wa.me/2349162771042?text=${encodeURIComponent("Hello UdomCapital, I would like to book a priority strategy session.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] bg-emerald-500 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform group"
        title="Chat on WhatsApp"
        aria-label="Direct WhatsApp Consultation"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.284l-.539 2.012 2.035-.533c.961.551 1.942.943 3.253.943 3.181 0 5.767-2.586 5.768-5.766 0-3.18-2.587-5.766-5.768-5.766zm3.443 8.353c-.158.445-.916.815-1.258.865-.323.047-.739.028-1.188-.118-.332-.108-.752-.257-1.3-.493-2.12-.916-3.486-3.076-3.591-3.216-.106-.14-.853-1.135-.853-2.164 0-1.03.535-1.536.726-1.745.19-.209.414-.261.553-.261s.277.008.397.013c.128.005.3.003.471.411.171.41.585 1.426.635 1.529.051.103.085.222.017.359-.068.136-.102.222-.204.341-.102.119-.214.266-.307.357-.103.103-.21.216-.09.423.12.207.532.877 1.141 1.419.784.698 1.442.915 1.649 1.018.207.103.328.089.449-.052.121-.141.517-.601.656-.807.139-.207.278-.174.468-.103s1.207.569 1.415.673c.207.103.346.152.397.239.051.086.051.5-.107.944z" />
        </svg>
        <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-udom-navy px-4 py-2 text-xs font-bold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-none">
          Priority Consultation
        </span>
      </a>
    </main>
  );
}
