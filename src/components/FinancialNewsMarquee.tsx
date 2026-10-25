import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Radio, 
  ExternalLink, 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Clock, 
  Sparkles, 
  X, 
  RefreshCw,
  Building2,
  ChevronRight,
  ShieldCheck,
  Compass
} from 'lucide-react';
import { FinancialNewsItem, fetchFinancialNews } from '../services/marketService';

interface FinancialNewsMarqueeProps {
  onAskAI?: (prompt: string) => void;
}

export default function FinancialNewsMarquee({ onAskAI }: FinancialNewsMarqueeProps) {
  const [news, setNews] = useState<FinancialNewsItem[]>([]);
  const [selectedNews, setSelectedNews] = useState<FinancialNewsItem | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('Just now');

  const loadNews = async () => {
    setIsRefreshing(true);
    const items = await fetchFinancialNews();
    setNews(items);
    setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    setIsRefreshing(false);
  };

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 3 * 60 * 1000); // 3 minutes refresh
    return () => clearInterval(interval);
  }, []);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ENERGY & INFRA':
        return 'border-amber-500/30 text-amber-300 bg-amber-500/10';
      case 'FX & CBN':
        return 'border-emerald-500/30 text-emerald-300 bg-emerald-500/10';
      case 'NGX EQUITIES':
        return 'border-udom-gold/40 text-udom-gold bg-udom-gold/10';
      case 'COMMODITIES':
        return 'border-orange-500/30 text-orange-300 bg-orange-500/10';
      case 'AFRICA M&A':
        return 'border-blue-500/30 text-blue-300 bg-blue-500/10';
      case 'GLOBAL MACRO':
        return 'border-purple-500/30 text-purple-300 bg-purple-500/10';
      default:
        return 'border-teal-500/30 text-teal-300 bg-teal-500/10';
    }
  };

  const getSentimentBadge = (sentiment: 'bullish' | 'bearish' | 'neutral') => {
    if (sentiment === 'bullish') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400 font-medium">
          <TrendingUp className="w-3 h-3" />
          Bullish
        </span>
      );
    }
    if (sentiment === 'bearish') {
      return (
        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-rose-400 font-medium">
          <TrendingDown className="w-3 h-3" />
          Bearish
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-white/50 font-medium">
        <Minus className="w-3 h-3" />
        Neutral
      </span>
    );
  };

  if (!news || news.length === 0) return null;

  // Tripled for smooth uninterrupted marquee scroll loop
  const displayItems = [...news, ...news, ...news];

  return (
    <>
      <div 
        className="relative bg-black/90 border-b border-white/10 text-white overflow-hidden select-none group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Left Fixed Badge / Anchor */}
        <div className="absolute left-0 top-0 bottom-0 z-20 flex items-center gap-3 bg-gradient-to-r from-black via-black/95 to-transparent pl-6 pr-10">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-udom-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-udom-gold"></span>
            </span>
            <div className="flex flex-col">
              <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-udom-gold uppercase whitespace-nowrap">
                Live Financial News
              </span>
              <span className="text-[8px] font-mono text-white/30 tracking-wider">
                WIRE • {lastUpdated}
              </span>
            </div>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              loadNews();
            }}
            disabled={isRefreshing}
            className="p-1 hover:text-udom-gold text-white/40 transition-colors"
            title="Refresh news feed"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-udom-gold' : ''}`} />
          </button>

          <div className="h-5 w-[1px] bg-white/10 ml-1"></div>
        </div>

        {/* Scrolling Track */}
        <div className="py-2.5 overflow-hidden whitespace-nowrap flex items-center">
          <motion.div
            animate={{ x: isPaused ? undefined : [0, -3200] }}
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="inline-flex items-center gap-12 pl-64"
          >
            {displayItems.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                onClick={() => setSelectedNews(item)}
                className="inline-flex items-center gap-3.5 cursor-pointer py-1 px-3 rounded hover:bg-white/[0.04] transition-all group/item"
              >
                {/* Category Pill */}
                <span className={`text-[9px] font-mono uppercase tracking-widest px-2 py-0.5 rounded border ${getCategoryColor(item.category)}`}>
                  {item.category}
                </span>

                {/* Headline Text */}
                <span className="text-xs text-white/90 font-sans tracking-normal group-hover/item:text-udom-gold transition-colors font-normal">
                  {item.title}
                </span>

                {/* Sentiment & Timestamp */}
                <div className="flex items-center gap-2 ml-1 text-white/40">
                  {getSentimentBadge(item.sentiment)}
                  <span className="text-[10px] font-mono text-white/30">• {item.timestamp}</span>
                </div>

                {/* Subtle inspect icon */}
                <ChevronRight className="w-3 h-3 text-white/20 group-hover/item:text-udom-gold transition-colors" />

                {/* Separator diamond */}
                <span className="text-white/20 text-xs ml-4">✦</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right Fade Gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent pointer-events-none z-10"></div>
      </div>

      {/* Intelligence Briefing Modal */}
      <AnimatePresence>
        {selectedNews && (
          <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-udom-dark border border-white/15 max-w-2xl w-full p-6 md:p-8 relative shadow-2xl overflow-hidden"
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-udom-gold via-emerald-500 to-transparent"></div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedNews(null)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-1"
                aria-label="Close intelligence card"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header Meta */}
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded border ${getCategoryColor(selectedNews.category)}`}>
                  {selectedNews.category}
                </span>
                <span className="text-xs font-mono text-white/40 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedNews.timestamp}
                </span>
                <div className="ml-auto pr-8">
                  {getSentimentBadge(selectedNews.sentiment)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-serif text-white font-normal leading-snug mb-5">
                {selectedNews.title}
              </h3>

              {/* Source */}
              <div className="text-[11px] font-mono text-udom-gold/80 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-udom-gold" />
                Intelligence Feed: {selectedNews.source}
              </div>

              {/* Body Briefing */}
              <div className="space-y-4 mb-6 text-sm text-white/80 leading-relaxed border-y border-white/10 py-5">
                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-1.5">Executive Summary</h4>
                  <p className="font-light">{selectedNews.summary}</p>
                </div>

                <div>
                  <h4 className="text-[10px] font-mono uppercase tracking-widest text-udom-gold mb-1.5">Strategic Market Impact</h4>
                  <p className="font-light text-white/90">{selectedNews.strategicImpact}</p>
                </div>

                {selectedNews.affectedSectors && selectedNews.affectedSectors.length > 0 && (
                  <div>
                    <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40 mb-2">Affected Sectors</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedNews.affectedSectors.map((sector, i) => (
                        <span key={i} className="text-[11px] font-mono px-2.5 py-1 bg-white/5 border border-white/10 text-white/70">
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
                <div className="text-[10px] font-mono text-white/40 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Verified Institutional Advisory Feed
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const prompt = `Please provide a strategic advisory deep-dive on the headline: "${selectedNews.title}". What are the portfolio positioning, capital allocation, and risk management implications for institutional investors in Nigeria and West Africa?`;
                      setSelectedNews(null);
                      if (onAskAI) {
                        onAskAI(prompt);
                      }
                    }}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 bg-udom-gold text-udom-black hover:bg-zinc-200 transition-colors font-medium text-xs tracking-wider uppercase font-sans font-bold"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    Deep-Dive with Udom AI
                  </button>
                  <button
                    onClick={() => setSelectedNews(null)}
                    className="px-4 py-2.5 text-xs text-white/60 hover:text-white border border-white/10 hover:border-white/20 transition-colors uppercase tracking-wider"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
