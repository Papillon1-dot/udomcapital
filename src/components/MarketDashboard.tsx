import { motion } from 'motion/react';
import { MarketSnapshot, ChartDataPoint } from '../services/marketService';
import { 
  BarChart3, 
  Newspaper, 
  TrendingUp, 
  Globe2, 
  ArrowUpRight,
  RefreshCcw,
  BadgeAlert
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface MarketDashboardProps {
  data: MarketSnapshot | null;
  loading: boolean;
  onRefresh: () => void;
}

const MinimalChart = ({ data, color }: { data: ChartDataPoint[] | undefined, color: string }) => {
  if (!data) return <div className="h-24 flex items-center justify-center text-white/10 text-[10px] uppercase tracking-widest font-bold">Loading Trend...</div>;
  
  return (
    <div className="h-24 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0E0E0E', 
              border: '1px solid rgba(255,255,255,0.1)',
              fontSize: '10px',
              fontFamily: 'monospace',
              color: '#fff',
              padding: '8px'
            }}
            itemStyle={{ color: color }}
            labelStyle={{ display: 'none' }}
            cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            strokeWidth={1.5} 
            dot={false}
            activeDot={{ r: 3, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default function MarketDashboard({ data, loading, onRefresh }: MarketDashboardProps) {
  return (
    <section id="market" className="py-32 bg-udom-black text-white relative border-y border-white/5">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-udom-gold"></div>
              <span className="text-udom-gold text-[10px] font-bold tracking-[0.3em] uppercase">Intelligence Desk</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-serif italic mb-4 font-light leading-tight">Insight <span className="text-white/50">Powers</span> Excellence.</h2>
          </div>
          <button 
            onClick={onRefresh}
            className="flex items-center gap-3 border border-white/10 px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/5 transition-all text-white/60 hover:text-white"
          >
            <RefreshCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh Signals
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-0 border border-white/5">
          {/* Main Ticker Block */}
          <div className="lg:col-span-4 p-12 border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.01]">
            <div className="flex justify-between items-center mb-10">
               <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">NGX Snapshot</span>
               <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            
            <div className="mb-12">
              <div className="text-7xl font-serif mb-4 leading-none tracking-tighter">{data?.ngx.index?.split('.')[0] || '---'}<span className="text-3xl text-white/20">.{data?.ngx.index?.split('.')[1] || '00'}</span></div>
              <div className={`text-xs font-mono flex items-center gap-2 ${data?.ngx.change.includes('+') ? 'text-udom-emerald' : 'text-rose-400'}`}>
                {data?.ngx.change} ({data?.ngx.percentChange})
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            <div className="mb-12">
              <MinimalChart data={data?.trends.ngx} color="#10B981" />
            </div>

            <div className="space-y-6 pt-10 border-t border-white/5">
              <span className="text-[9px] text-white/20 uppercase tracking-[0.3em] block font-bold mb-4">Volume Leaders</span>
              {data?.ngx.topGainers.map((g, i) => (
                <div key={i} className="flex justify-between items-center py-2 border-b border-white/[0.02]">
                  <span className="text-xs font-mono text-white/40">{g.ticker}</span>
                  <span className="text-xs font-mono text-udom-emerald">{g.change}</span>
                </div>
              ))}
            </div>
          </div>

          {/* News & Global */}
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-0">
            <div className="p-12 border-b md:border-b-0 md:border-r border-white/5">
              <div className="flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                <Globe2 className="w-4 h-4" />
                Global Markets
              </div>
              <div className="space-y-12">
                {[
                  { name: 'S&P 500', data: data?.global.sAndP, trend: data?.trends.sAndP },
                  { name: 'NASDAQ', data: data?.global.nasdaq, trend: data?.trends.nasdaq },
                  { name: 'FTSE 100', data: data?.global.ftse, trend: data?.trends.ftse }
                ].map((market, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex-1">
                        <span className="text-[10px] text-white/20 block mb-2 uppercase tracking-widest font-bold font-mono">{market.name}</span>
                        <div className="flex justify-between items-end pr-8">
                          <span className="text-2xl font-serif group-hover:text-udom-gold transition-colors">{market.data?.split(' ')[0]}</span>
                          <span className={`text-[11px] font-mono ${market.data?.includes('+') ? 'text-udom-emerald' : 'text-rose-400'}`}>
                            {market.data?.split(' ')[1]}
                          </span>
                        </div>
                      </div>
                      <div className="w-24">
                        <MinimalChart data={market.trend} color={market.data?.includes('+') ? '#10B981' : '#f87171'} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-12 flex flex-col">
              <div className="flex items-center gap-3 text-white/30 text-[10px] font-bold uppercase tracking-[0.3em] mb-12">
                <Newspaper className="w-4 h-4" />
                Key Updates
              </div>
              <div className="space-y-10 flex-grow">
                {data?.news.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-3">
                       <div className={`w-1.5 h-1.5 rounded-full ${
                         item.sentiment === 'positive' ? 'bg-udom-emerald' : 
                         item.sentiment === 'negative' ? 'bg-rose-500' : 'bg-amber-500'
                       } shadow-[0_0_8px_rgba(16,185,129,0.3)]`} />
                       <span className="text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold font-mono">{item.sentiment} Signal</span>
                    </div>
                    <h4 className="text-sm font-serif group-hover:text-udom-gold transition-colors mb-2 leading-relaxed">{item.title}</h4>
                    <p className="text-[10px] font-light text-white/30 leading-relaxed uppercase tracking-widest">{item.summary.slice(0, 80)}...</p>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-16 p-6 bg-udom-emerald/10 border border-udom-emerald/20">
                <p className="text-[10px] text-udom-emerald/80 italic font-medium leading-relaxed tracking-wider">
                  "Institutional capital inflow into West African infrastructure projects is projected to surge by 14% this quarter."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
