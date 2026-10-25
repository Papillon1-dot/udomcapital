import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  X,
  Minimize2,
  Maximize2,
  Trash2,
  Copy,
  Check,
  Bot,
  User,
  Shield,
  HelpCircle,
  Cpu,
  Layers,
  ChevronDown
} from 'lucide-react';
import { sendChatMessage, ChatMessage } from '../services/marketService';

interface GeminiAdvisorChatProps {
  externalPrompt?: string | null;
  onClearExternalPrompt?: () => void;
  isOpen: boolean;
  onToggleOpen: () => void;
}

const DEFAULT_SUGGESTIONS = [
  "Analyze NGX Banking Recapitalization Impact",
  "Structure a $50M Project Finance Facility in Nigeria",
  "FX Hedging Strategy for NGN/USD Exposure",
  "AfCFTA Cross-Border Trade & Tariffs Guide"
];

const PERSONAS = [
  { id: 'Chief Strategist', name: 'Chief Strategist', label: 'Macro & Asset Allocation' },
  { id: 'M&A Partner', name: 'M&A Partner', label: 'Valuation & Deal Structuring' },
  { id: 'Project Finance Lead', name: 'Project Finance Lead', label: 'Infra, Energy & PPP' },
  { id: 'Risk & FX Strategist', name: 'Risk & FX Strategist', label: 'CBN, Treasury & Carry' }
];

const MODELS = [
  { id: 'gemini-3.8-flash', name: 'Gemini 3.8 Flash', tag: 'General Intelligence (Recommended)' },
  { id: 'gemini-3.1-flash-lite', name: 'Gemini 3.1 Flash Lite', tag: 'Low Latency Fast Analysis' },
  { id: 'gemini-4-argon', name: 'Gemini 4 Argon', tag: 'Complex Reasoning & Math' }
];

export default function GeminiAdvisorChat({
  externalPrompt,
  onClearExternalPrompt,
  isOpen,
  onToggleOpen
}: GeminiAdvisorChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      role: 'model',
      text: `Welcome to **UdomCapital Advisory Intelligence**. I am your Senior Executive Advisor and Chief Investment Strategist.\n\nHow may our investment committee assist your corporate finance, cross-border structuring, or African macroeconomic allocations today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      modelUsed: 'gemini-3.8-flash'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState('Chief Strategist');
  const [selectedModel, setSelectedModel] = useState('gemini-3.8-flash');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Handle external prompts (e.g., from Live Financial News Marquee)
  useEffect(() => {
    if (externalPrompt) {
      if (!isOpen) {
        onToggleOpen();
      }
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) {
        onClearExternalPrompt();
      }
    }
  }, [externalPrompt]);

  const handleSendMessage = async (customText?: string) => {
    const textToSend = customText || inputValue.trim();
    if (!textToSend || loading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    if (!customText) {
      setInputValue('');
    }
    setLoading(true);

    try {
      // Build conversation history for multi-turn
      const history = newMessages
        .filter(m => m.id !== userMessage.id && m.id !== 'welcome-1')
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await sendChatMessage(textToSend, history, selectedModel, selectedPersona);

      const botMessage: ChatMessage = {
        id: `model-${Date.now()}`,
        role: 'model',
        text: res.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: res.model || selectedModel
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error: any) {
      const fallbackErrorMessage: ChatMessage = {
        id: `err-${Date.now()}`,
        role: 'model',
        text: `**Strategic Notice**: We encountered a temporary delay communicating with the Gemini Intelligence model. Please verify your GEMINI_API_KEY in Settings > Secrets.\n\n*Technical Detail*: ${error?.message || 'Connection interrupted'}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel
      };
      setMessages(prev => [...prev, fallbackErrorMessage]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const clearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        role: 'model',
        text: `Consultation session refreshed. You are currently speaking with the **${selectedPersona}** using **${selectedModel}**.\n\nPlease state your transaction or investment mandate query.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        modelUsed: selectedModel
      }
    ]);
  };

  // Format markdown paragraphs cleanly
  const renderFormattedText = (text: string) => {
    return text.split('\n\n').map((paragraph, idx) => {
      // Check for bullet lists
      if (paragraph.includes('\n- ') || paragraph.startsWith('- ') || paragraph.startsWith('* ')) {
        const lines = paragraph.split('\n');
        return (
          <ul key={idx} className="list-disc list-outside ml-4 space-y-1.5 my-2">
            {lines.map((line, liIdx) => {
              const cleanLine = line.replace(/^[-*]\s+/, '');
              return (
                <li key={liIdx} className="text-white/80 leading-relaxed">
                  {renderInlineFormatting(cleanLine)}
                </li>
              );
            })}
          </ul>
        );
      }
      return (
        <p key={idx} className="leading-relaxed mb-2.5 last:mb-0 text-white/90 font-light">
          {renderInlineFormatting(paragraph)}
        </p>
      );
    });
  };

  const renderInlineFormatting = (str: string) => {
    // Basic bold and code styling
    const parts = str.split(/(\*\*.*?\*\*|`.*?`)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-semibold text-white">{part.slice(2, -2)}</strong>;
      }
      if (part.startsWith('`') && part.endsWith('`')) {
        return <code key={i} className="bg-white/10 px-1 py-0.5 rounded font-mono text-[11px] text-udom-gold">{part.slice(1, -1)}</code>;
      }
      return part;
    });
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-8 left-8 z-[60]">
        <button
          onClick={onToggleOpen}
          className="group relative flex items-center gap-3 bg-udom-dark border border-udom-gold/40 hover:border-udom-gold px-4 py-3.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:scale-105"
          aria-label="Toggle Udom Financial Intelligence Chat"
        >
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-udom-gold/20 flex items-center justify-center text-udom-gold">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-udom-dark"></span>
          </div>

          <div className="flex flex-col text-left pr-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white group-hover:text-udom-gold transition-colors font-sans">
              Udom Advisory AI
            </span>
            <span className="text-[9px] font-mono text-white/40">
              Executive Multi-Turn Chat
            </span>
          </div>

          {/* Prompt pill preview tooltip on hover */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-black/90 border border-white/15 px-3 py-1.5 rounded whitespace-nowrap text-[10px] font-mono text-white/70">
            Powered by {selectedModel}
          </div>
        </button>
      </div>

      {/* Slide-out / Modal Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={`fixed z-[75] shadow-2xl bg-udom-black border border-white/15 flex flex-col overflow-hidden transition-all duration-300 ${
              isExpanded
                ? 'inset-4 md:inset-10 rounded-xl'
                : 'bottom-24 left-6 right-6 sm:right-auto sm:left-8 sm:w-[460px] h-[640px] max-h-[85vh] rounded-2xl'
            }`}
          >
            {/* Header */}
            <div className="px-5 py-4 bg-udom-dark border-b border-white/10 flex items-center justify-between relative">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-udom-gold/15 border border-udom-gold/30 flex items-center justify-center text-udom-gold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-sans font-bold tracking-wider text-white uppercase">
                      Udom Advisory Desk
                    </h3>
                    <span className="px-1.5 py-0.5 text-[9px] font-mono bg-udom-gold/15 text-udom-gold border border-udom-gold/30 rounded">
                      {selectedPersona}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span className="text-[10px] font-mono text-white/40">
                      Multi-Turn • {selectedModel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Header Actions */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setShowConfig(!showConfig)}
                  className={`p-1.5 rounded hover:bg-white/10 transition-colors ${showConfig ? 'text-udom-gold bg-white/10' : 'text-white/40'}`}
                  title="Configure Model & Persona"
                >
                  <Layers className="w-4 h-4" />
                </button>
                <button
                  onClick={clearChat}
                  className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-rose-400 transition-colors"
                  title="Clear conversation"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors hidden sm:block"
                  title={isExpanded ? 'Collapse' : 'Expand full-screen'}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={onToggleOpen}
                  className="p-1.5 rounded hover:bg-white/10 text-white/40 hover:text-white transition-colors"
                  title="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Model & Persona Configuration Drawer */}
            <AnimatePresence>
              {showConfig && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="bg-black/95 border-b border-white/10 px-5 py-3.5 overflow-hidden text-xs space-y-3"
                >
                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1.5">
                      Advisory Persona
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {PERSONAS.map(p => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setSelectedPersona(p.id);
                            setShowConfig(false);
                          }}
                          className={`text-left p-2 rounded border transition-all text-[11px] ${
                            selectedPersona === p.id
                              ? 'border-udom-gold bg-udom-gold/15 text-white'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20'
                          }`}
                        >
                          <span className="font-semibold block">{p.name}</span>
                          <span className="text-[9px] font-mono text-white/40 block truncate">{p.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] font-mono uppercase tracking-widest text-white/40 block mb-1.5">
                      Gemini Model Engine
                    </label>
                    <div className="space-y-1">
                      {MODELS.map(m => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setSelectedModel(m.id);
                            setShowConfig(false);
                          }}
                          className={`w-full flex items-center justify-between p-2 rounded border transition-all text-[11px] ${
                            selectedModel === m.id
                              ? 'border-emerald-500/50 bg-emerald-500/10 text-white'
                              : 'border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20'
                          }`}
                        >
                          <span className="font-mono">{m.name}</span>
                          <span className="text-[9px] text-white/40">{m.tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Conversation History Thread */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs ${
                    msg.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  {msg.role === 'model' && (
                    <div className="w-7 h-7 rounded bg-udom-gold/20 border border-udom-gold/30 flex items-center justify-center text-udom-gold shrink-0 mt-0.5">
                      <Sparkles className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-xl p-3.5 relative group ${
                      msg.role === 'user'
                        ? 'bg-udom-gold text-udom-black rounded-tr-none font-medium'
                        : 'bg-white/[0.04] border border-white/10 rounded-tl-none text-white'
                    }`}
                  >
                    {/* Role / Model tag for bot */}
                    {msg.role === 'model' && (
                      <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-white/5">
                        <span className="text-[9px] font-mono uppercase tracking-widest text-udom-gold font-semibold">
                          Udom Investment Advisory
                        </span>
                        <div className="flex items-center gap-2 text-[9px] font-mono text-white/30">
                          {msg.modelUsed && <span>{msg.modelUsed}</span>}
                          <span>{msg.timestamp}</span>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="space-y-1">
                      {msg.role === 'model' ? renderFormattedText(msg.text) : (
                        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                      )}
                    </div>

                    {/* Copy action for model answers */}
                    {msg.role === 'model' && (
                      <div className="mt-2.5 pt-1.5 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest">
                          Strictly Institutional & Confidential
                        </span>
                        <button
                          onClick={() => copyToClipboard(msg.text, msg.id)}
                          className="flex items-center gap-1 text-[10px] font-mono text-white/40 hover:text-white transition-colors"
                          title="Copy strategic response"
                        >
                          {copiedId === msg.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  {msg.role === 'user' && (
                    <div className="w-7 h-7 rounded bg-white/10 border border-white/20 flex items-center justify-center text-white shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <div className="flex gap-3 text-xs">
                  <div className="w-7 h-7 rounded bg-udom-gold/20 border border-udom-gold/30 flex items-center justify-center text-udom-gold shrink-0">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="bg-white/[0.04] border border-white/10 rounded-xl rounded-tl-none p-3.5 text-white/60 flex items-center gap-2">
                    <span className="text-[11px] font-mono text-udom-gold">Formulating Advisory Strategy</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-udom-gold animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-udom-gold animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-udom-gold animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompt Chips */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 border-t border-white/5 bg-black/40">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/30 block mb-1.5">
                  Suggested Briefings:
                </span>
                <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {DEFAULT_SUGGESTIONS.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(item)}
                      className="text-[10px] font-mono whitespace-nowrap bg-white/[0.03] hover:bg-white/[0.08] text-white/70 hover:text-white px-2.5 py-1 rounded border border-white/10 transition-colors shrink-0"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Bar */}
            <div className="p-3.5 bg-udom-dark border-t border-white/10">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2 bg-black/60 border border-white/15 focus-within:border-udom-gold rounded-lg px-3 py-1.5 transition-colors"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={`Consult ${selectedPersona} on capital allocation...`}
                  disabled={loading}
                  className="flex-1 bg-transparent text-xs text-white placeholder-white/30 focus:outline-none py-1.5 font-sans"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || loading}
                  className="p-2 bg-udom-gold text-udom-black rounded hover:bg-zinc-200 disabled:opacity-40 disabled:hover:bg-udom-gold transition-colors shrink-0"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <div className="flex items-center justify-between text-[9px] font-mono text-white/30 mt-2 px-1">
                <span>Model: {selectedModel}</span>
                <span>Udom Advisory Engine v2.4</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
