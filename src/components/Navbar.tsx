import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenChat?: () => void;
}

export default function Navbar({ onOpenChat }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Market Info', href: '#market' },
    { name: 'Invest', href: '#invest' },
    { name: 'Company Profile', href: '#about' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-udom-black/95 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-4 group cursor-pointer">
          <div className="w-10 h-10 border border-white/40 flex items-center justify-center font-serif text-xl italic group-hover:border-udom-gold group-hover:text-udom-gold transition-colors">
            U
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-serif tracking-[0.2em] font-medium hidden sm:block">
              UDOM CAPITAL
            </span>
            <span className="text-[8px] font-mono tracking-[0.3em] text-white/40 uppercase hidden sm:block">
              African Institutional Advisory
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] uppercase tracking-[0.2em] font-medium text-white/60 hover:text-white transition-colors"
            >
              {link.name}
            </a>
          ))}

          {/* AI Intelligence Chat Button */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-udom-gold/40 text-udom-gold hover:border-udom-gold hover:bg-udom-gold/10 text-[10px] font-mono uppercase tracking-widest transition-all"
            >
              <Sparkles className="w-3 h-3 text-udom-gold" />
              <span>Advisory AI</span>
            </button>
          )}

          <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
          <a 
            href="#contact"
            className="px-7 py-2.5 bg-white text-udom-black text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-zinc-200 transition-colors"
          >
            Invest Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-3 lg:hidden">
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="p-2 rounded-full border border-udom-gold/40 text-udom-gold"
              title="Open AI Advisor"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          )}
          <button 
            className="p-2 text-white" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-udom-dark border-t border-white/10 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-serif italic text-white/80 hover:text-white border-b border-white/5 pb-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              
              {onOpenChat && (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenChat();
                  }}
                  className="flex items-center justify-center gap-2 py-3 bg-udom-gold/15 border border-udom-gold text-udom-gold font-mono text-xs uppercase tracking-widest font-bold"
                >
                  <Sparkles className="w-4 h-4" />
                  Launch Udom Advisory AI
                </button>
              )}

              <a 
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="bg-white text-udom-black text-center py-4 font-bold uppercase tracking-widest text-xs"
              >
                Book Priority Consultation
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
