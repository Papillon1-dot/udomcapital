import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-udom-black pt-32 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-10 group cursor-pointer text-white">
              <div className="w-8 h-8 border border-white/40 flex items-center justify-center font-serif text-lg italic group-hover:border-white transition-colors">
                U
              </div>
              <span className="text-lg font-serif tracking-[0.2em] font-medium">UDOM CAPITAL</span>
            </div>
            <p className="text-[11px] font-light text-white/30 leading-relaxed mb-10 max-w-[240px] uppercase tracking-widest">
              Architecting industrial renaissance through strategic capital and excellence in financial architecture.
            </p>
            <div className="flex gap-8">
              {['LinkedIn', 'Twitter'].map(social => (
                <a key={social} href="#" className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors">
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-10">Solutions</h4>
            <ul className="space-y-6">
              {['Investment Banking', 'Project Finance', 'M&A Advisory', 'Asset Management'].map(link => (
                <li key={link}>
                  <a href="#services" className="text-xs font-light text-white/40 hover:text-white transition-colors tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-10">Company</h4>
            <ul className="space-y-6">
              {['Strategy', 'Market Intelligence', 'Investor Relations', 'Governance'].map(link => (
                <li key={link}>
                  <a href="#" className="text-xs font-light text-white/40 hover:text-white transition-colors tracking-widest">{link}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 mb-10">Access</h4>
            <p className="text-xs font-light text-white/30 mb-8 tracking-widest leading-relaxed">Secure terminal for authorized institutional partners.</p>
            <a href="#" className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-white group">
              Investor Portal
              <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-udom-gold" />
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center sm:text-left">
          <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10">
            © {currentYear} UdomCapital Limited. RC 1827364.
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 hover:text-white transition-colors">Disclosures</a>
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/10 hover:text-white transition-colors">Regulatory</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
