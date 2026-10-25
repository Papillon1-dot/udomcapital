import { motion } from 'motion/react';
import { 
  Briefcase, 
  Building2, 
  Merge, 
  ShieldCheck, 
  BookOpen,
  ChevronRight
} from 'lucide-react';

const services = [
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Investment Banking & Capital Raising",
    description: "Structuring and executing debt and equity transactions for corporations, governments, and development-oriented enterprises.",
    highlights: ["Debt Structuring", "Equity Capital Markets", "Development Finance Instruments"]
  },
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Project Finance & Industrial Advisory",
    description: "Specialists in the financial architecture of large-scale infrastructure and industrial projects across Africa.",
    highlights: ["Techno-Economic Studies", "Integrated Project Finance", "Agro-Industrial Finance"]
  },
  {
    icon: <Merge className="w-8 h-8" />,
    title: "Mergers, Acquisitions & Restructuring",
    description: "Strategic advice for boards and management teams through the full M&A lifecycle—from rationale to integration.",
    highlights: ["Buy-Side & Sell-Side Advisory", "Corporate Valuation", "Post-Merger Strategy"]
  },
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Wealth Management & Family Office",
    description: "Sophisticated wealth preservation and growth strategies for high-net-worth individuals and family offices.",
    highlights: ["Portfolio Construction", "Generational Wealth Planning", "Alternative Investments"]
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Financial Research & Capacity Building",
    description: "Industrial-grade financial research on Nigerian and African capital markets, macro-trends, and sector intelligence.",
    highlights: ["Macroeconomic Reports", "Executive Training", "Valuation Masterclasses"]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 bg-udom-black overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-udom-gold"></div>
              <span className="text-udom-gold font-bold uppercase tracking-[0.3em] text-[10px] block">
                Expertise & Capabilities
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1]">
              Strategic Solutions for <br />
              <span className="italic text-white/50">Exceptional</span> Growth.
            </h2>
          </div>
          <p className="text-white/30 max-w-sm text-sm font-light leading-relaxed italic">
            UdomCapital operates across integrated service verticals, addressing every dimension of institutional financial architecture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/5">
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`group p-10 border-white/5 hover:bg-white/[0.02] transition-all duration-700 flex flex-col h-[450px] ${
                idx % 3 !== 2 ? 'lg:border-r' : ''
              } ${idx < 3 ? 'border-b' : ''}`}
            >
              <div className="text-white/20 mb-12 group-hover:text-udom-gold transition-colors duration-500">
                {service.icon}
              </div>
              <h3 className="text-2xl font-serif mb-6 flex-grow tracking-tight text-white/90">
                {service.title}
              </h3>
              <p className="text-xs font-light mb-10 text-white/40 leading-relaxed max-w-[280px]">
                {service.description}
              </p>
              <div className="space-y-4 pt-8 border-t border-white/5">
                {service.highlights.slice(0, 1).map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] font-bold text-white/20 group-hover:text-udom-gold transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
          
          <div className="lg:col-span-1 p-10 bg-white flex flex-col justify-center items-center text-center text-udom-black relative overflow-hidden group">
            <h3 className="text-4xl font-serif italic mb-8 font-light">Join the vanguard.</h3>
            <p className="text-xs font-medium text-udom-black/60 mb-10 max-w-xs uppercase tracking-widest leading-loose">
              Direct access to our proprietary research and investment network.
            </p>
            <a href="#invest" className="bg-udom-black text-white px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-800 transition-all">
              Invest Now
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
