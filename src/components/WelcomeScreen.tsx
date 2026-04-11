import { motion } from 'framer-motion';
import { ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
}

// Logo SVG oficial da Binance para transmitir credibilidade imediata
const BinanceIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className={className}>
    <g fill="none">
      <circle cx="16" cy="16" r="16" fill="#F3BA2F" />
      <path fill="#FFF" d="M12.116 14.404L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26-2.26L10.52 16l-2.26 2.26L6 16zm6.116 1.596L16 21.48l3.886-3.886 2.26 2.259L16 26l-6.144-6.144-.003-.003 2.263-2.257zM21.48 16l2.26-2.26L26 16l-2.26 2.26L21.48 16zm-3.188-.002h.002V16L16 18.294l-2.291-2.29-.004-.004.004-.003.401-.402.195-.195L16 13.706l2.293 2.293z" />
    </g>
  </svg>
);

const trustSignals = [
  {
    icon: CheckCircle2,
    label: 'Custo Zero',
    detail: 'Processo 100% gratuito',
  },
  {
    icon: ShieldCheck,
    label: 'Oficial',
    detail: 'Ambiente rastreado',
  },
  {
    icon: Zap,
    label: 'Instantâneo',
    detail: 'Conclusão em 10 minutos',
  },
];

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col flex-1"
    >
      <div className="flex-1 flex flex-col items-center justify-center pt-4">
        {/* Top Badge */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="bg-primary/10 border border-primary/20 text-primary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold tracking-wide uppercase mb-8 md:mb-10 flex items-center gap-1.5 shadow-[0_0_15px_rgba(252,213,53,0.15)]"
        >
          <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" />
          Guia de Acesso Oficial
        </motion.div>

        {/* Corporate Centerpiece */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: 'easeOut' }}
          className="w-full max-w-sm md:max-w-md relative mb-8 md:mb-10"
        >
          {/* Subtle backdrop glow */}
          <div className="absolute -inset-4 bg-primary/5 blur-xl rounded-full" />

          <div className="relative glass-card bg-surface/80 border-white/10 p-6 md:p-8 flex flex-col items-center text-center">
            <div className="flex -space-x-3 mb-4 md:mb-6">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-[3px] border-surface bg-surface flex items-center justify-center z-10 shadow-lg glow-primary">
                <BinanceIcon className="w-10 h-10 md:w-11 md:h-11" />
              </div>
            </div>

            <p className="text-text-muted text-xs md:text-sm font-medium uppercase tracking-widest mb-1 md:mb-2">
              Valor Disponível
            </p>
            <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2 md:mb-3 flex items-baseline justify-center gap-1">
              <span className="text-2xl md:text-3xl text-text-secondary font-medium">R$</span>
              50,00
            </div>
            <p className="text-sm md:text-base text-primary/90 font-medium">
              Aguardando seu resgate
            </p>
          </div>
        </motion.div>

        {/* Informative Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="text-center mb-8 md:mb-10 px-2"
        >
          <h2 className="text-lg md:text-xl font-semibold text-text mb-2 md:mb-3">
            Acompanhamento Autorizado
          </h2>
          <p className="text-text-secondary text-sm md:text-base leading-relaxed max-w-[300px] md:max-w-[400px] mx-auto">
            Siga nosso assistente passo a passo para configurar sua conta diretamente na{' '}
            <strong className="text-text font-semibold">Binance</strong> e validar seu prêmio.
          </p>
        </motion.div>

        {/* Trust Signals */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="grid grid-cols-3 gap-2 md:gap-4 w-full max-w-sm md:max-w-md mb-6 md:mb-8"
        >
          {trustSignals.map(({ icon: Icon, label, detail }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-1.5 md:gap-2 px-2 md:px-3 py-3 md:py-4 rounded-xl bg-surface/50 border border-white/5"
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary/80" />
              <div>
                <p className="text-[11px] md:text-xs font-semibold text-text leading-tight">{label}</p>
                <p className="text-[9px] md:text-[10px] text-text-muted leading-tight mt-0.5 md:mt-1">{detail}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* CTA Bottom Lock */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="pt-2 pb-2 w-full max-w-sm md:max-w-md mx-auto"
      >
        <button
          onClick={onStart}
          className="w-full font-bold text-base md:text-lg py-3.5 md:py-4 rounded-xl border flex items-center justify-center gap-2 bg-primary border-primary hover:bg-primary-hover text-black glow-primary-strong active:scale-[0.98] transition-all duration-200"
        >
          Iniciar
        </button>
        <p className="text-center text-[10px] md:text-xs text-primary mt-3 md:mt-4">
          Links e transações processados pela plataforma oficial.
        </p>
      </motion.div>
    </motion.div>
  );
}
