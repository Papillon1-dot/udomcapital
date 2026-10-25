import { motion } from 'motion/react';
import { Phone, Mail, MapPin, MessageSquare, Clock, ArrowRight } from 'lucide-react';

export default function Contact() {
  const whatsappNumber = "+2349162771042";
  const message = "Hello UdomCapital, I would like to book a strategy session regarding...";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(message)}`;

  return (
    <section id="contact" className="py-32 bg-udom-black relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-24">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[1px] w-8 bg-udom-gold"></div>
              <span className="text-udom-gold font-bold uppercase tracking-[0.3em] text-[10px] block">
                Direct Engagement
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif text-white leading-[1.1] mb-10 font-light">
              Transform your <br />
              <span className="italic text-white/50">Capital</span> Reality.
            </h2>
            <p className="text-white/40 font-light leading-relaxed mb-16 max-w-sm italic">
              Connect with our master advisors today. Every mandate is personal. Every outcome is sacred.
            </p>

            <div className="space-y-12">
              <div className="flex items-center gap-8 group">
                <div className="w-14 h-14 bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-udom-gold transition-colors">
                  <Phone className="w-5 h-5 text-udom-gold" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold mb-1">Priority Line</span>
                  <a href={`tel:${whatsappNumber}`} className="text-xl font-serif text-white/80 hover:text-white">{whatsappNumber}</a>
                </div>
              </div>
              
              <div className="flex items-center gap-8 group">
                <div className="w-14 h-14 bg-white/[0.02] border border-white/5 flex items-center justify-center group-hover:border-udom-gold transition-colors">
                  <Mail className="w-5 h-5 text-udom-gold" />
                </div>
                <div>
                  <span className="block text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold mb-1">Advisory Desk</span>
                  <a href="mailto:info@udomcapital.com" className="text-xl font-serif text-white/80 hover:text-white">info@udomcapital.com</a>
                </div>
              </div>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="p-1 border border-white/10"
          >
            <div className="bg-white/[0.02] p-12 h-full flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-serif mb-6 italic font-light">Secure Strategy Session</h3>
                <p className="text-white/30 font-light text-sm mb-12 leading-relaxed">
                  Confidential initial consultation with senior management. Direct access via encrypted channels.
                </p>

                <div className="space-y-8 mb-12">
                   <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Operational Hours</span>
                    <div className="h-[1px] flex-grow bg-white/5"></div>
                    <span className="text-[10px] font-mono text-udom-emerald">24/7 Global</span>
                   </div>
                   <div className="flex items-center gap-4">
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/20">Response Time</span>
                    <div className="h-[1px] flex-grow bg-white/5"></div>
                    <span className="text-[10px] font-mono text-white/60">~45 Minutes</span>
                   </div>
                </div>
              </div>

              <a 
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white text-udom-black py-6 flex items-center justify-center gap-4 font-bold uppercase tracking-[0.3em] hover:bg-zinc-200 transition-all group text-xs"
              >
                Connect on WhatsApp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
