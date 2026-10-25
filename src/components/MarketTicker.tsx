import { motion } from 'motion/react';
import { TrendingUp, TrendingDown, Globe } from 'lucide-react';
import { MarketSnapshot } from '../services/marketService';

interface MarketTickerProps {
  data: MarketSnapshot | null;
}

export default function MarketTicker({ data }: MarketTickerProps) {
  if (!data) return null;

  const items = [
    { label: 'NGX ASI', value: data.ngx.index, change: data.ngx.percentChange, isUp: data.ngx.change.includes('+') },
    { label: 'S&P 500', value: data.global.sAndP.split(' ')[0], change: data.global.sAndP.split(' ')[1] || '', isUp: data.global.sAndP.includes('+') },
    { label: 'NASDAQ', value: data.global.nasdaq.split(' ')[0], change: data.global.nasdaq.split(' ')[1] || '', isUp: data.global.nasdaq.includes('+') },
    { label: 'FTSE 100', value: data.global.ftse.split(' ')[0], change: data.global.ftse.split(' ')[1] || '', isUp: data.global.ftse.includes('+') },
    ...data.ngx.topGainers.map(g => ({ label: g.ticker, value: '', change: g.change, isUp: true }))
  ];

  // Double the items for seamless loop
  const tickerItems = [...items, ...items, ...items];

  return (
    <div className="bg-udom-dark text-white py-3 border-b border-white/5 overflow-hidden whitespace-nowrap relative">
      <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 flex items-center gap-4 bg-udom-dark pr-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-udom-emerald shadow-[0_0_12px_rgba(16,185,129,0.4)]"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Market Live</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10"></div>
      </div>
      
      <motion.div 
        animate={{ x: [0, -2000] }}
        transition={{ 
          duration: 50, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="inline-flex gap-16 items-center pl-48"
      >
        {tickerItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 py-1">
            <span className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{item.label}</span>
            <span className="font-mono text-[11px] font-medium tracking-tight">{item.value}</span>
            <span className={`flex items-center gap-1 font-mono text-[11px] ${item.isUp ? 'text-udom-emerald' : 'text-rose-400'}`}>
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
