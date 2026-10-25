import { motion } from 'motion/react';
import { ArrowDown } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden bg-udom-black border-none">
      {/* Refined Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-white/[0.03] to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/[0.02] rounded-full rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-4 mb-10 overflow-hidden">
            <div className="h-[1px] w-12 bg-white/20"></div>
            <span className="text-white/40 font-bold uppercase tracking-[0.4em] text-[10px]">
              Premier Financial Partners
            </span>
            <div className="h-[1px] w-12 bg-white/20"></div>
          </div>
          
          <h1 className="text-7xl md:text-9xl lg:text-[11rem] font-serif leading-[1] tracking-tighter mb-12 max-w-6xl font-light">
            Unlocking <br className="hidden md:block" />
            <span className="italic text-white">Value</span> In Africa.
          </h1>
          
          <p className="text-white/40 text-lg md:text-xl max-w-2xl font-light leading-relaxed mb-16 italic">
            Advanced wealth architecture and advisory tailored for institutional and private investors globally.
          </p>

          <div className="flex flex-col sm:flex-row gap-8 items-center">
            <a 
              href="#contact" 
              className="px-14 py-5 bg-white text-udom-black font-bold uppercase tracking-widest hover:bg-zinc-200 transition-all text-xs transition-colors"
            >
              Book Strategy Session
            </a>
            <div className="flex items-center gap-4 group cursor-pointer">
               <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-udom-black transition-all">
                <ArrowDown className="w-4 h-4" />
               </div>
               <span className="text-[11px] uppercase tracking-widest font-bold text-white/40 group-hover:text-white transition-colors">Our Services</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
