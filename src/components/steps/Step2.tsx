import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Check } from 'lucide-react';
import { useConfig } from '../../hooks/useConfig';

interface Step2AccountCreationProps {
  onNext: () => void;
}

/* ─── Ícones SVG ─── */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.83z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function TelegramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

/* ─── Componente principal ─── */
export function Step2AccountCreation({ onNext }: Step2AccountCreationProps) {
  const [accountCreated, setAccountCreated] = useState(false);
  const { config } = useConfig();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col flex-1"
    >
      <div className="flex-1">
        {/* Cabeçalho */}
        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight mb-1">
            Criando a Conta
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Clique no botão abaixo e siga os passos na página da Binance.
          </p>
        </div>

        {/* Passos instrucionais */}
        <div className="rounded-xl border border-white/5 overflow-hidden mb-4">
          {/* Passo 1 */}
          <div className="flex items-start gap-3 px-4 py-3.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
              1
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Escolha como criar a conta
              </p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-white/5 rounded-lg px-2 py-1">
                  <GoogleIcon className="w-3.5 h-3.5" />
                  Google
                  <span className="flex items-center gap-0.5 text-[9px] font-bold text-black bg-primary px-1.5 py-px rounded-full leading-tight ml-0.5">
                    Melhor
                  </span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-white/5 rounded-lg px-2 py-1">
                  <AppleIcon className="w-3.5 h-3.5" />
                  Apple
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-white/5 rounded-lg px-2 py-1">
                  <TelegramIcon className="w-3.5 h-3.5" />
                  Telegram
                </span>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-text-secondary bg-white/5 rounded-lg px-2 py-1">
                  ✉️ E-mail
                </span>
              </div>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              2
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Aceite os termos marcando a caixinha
              </p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="flex items-start gap-3 px-4 py-3.5 bg-surface">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
              3
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Aperte em <span className="text-primary font-semibold">Continuar</span>
              </p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Pronto! Depois volte aqui para o próximo passo.
              </p>
            </div>
          </div>
        </div>

        {/* CTA de redirecionamento */}
        <a
          id="step2-referral-cta"
          href={config.referral_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all active:scale-[0.98] glow-primary mb-4"
        >
          <ExternalLink className="w-4 h-4" />
          Abrir página de cadastro
        </a>

        {/* Confirmação */}
        <label
          htmlFor="account-created-checkbox"
          className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-all duration-200
            ${accountCreated
              ? 'bg-primary/10 border-primary/30'
              : 'bg-surface border-white/5 hover:border-white/15'
            }
          `}
        >
          <div className="relative flex-shrink-0 mt-0.5">
            <input
              id="account-created-checkbox"
              type="checkbox"
              checked={accountCreated}
              onChange={(e) => setAccountCreated(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200
              ${accountCreated
                ? 'bg-primary border-primary'
                : 'bg-transparent border-white/20'
              }
            `}>
              {accountCreated && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-3.5 h-3.5 text-black" />
                </motion.div>
              )}
            </div>
          </div>
          <p className="text-xs text-text-muted leading-relaxed">
            Já criei minha conta na Binance seguindo os passos acima.
          </p>
        </label>
      </div>

      {/* Botão de avanço */}
      <div className="pt-4 pb-2">
        <button
          id="step2-next-btn"
          onClick={accountCreated ? onNext : undefined}
          disabled={!accountCreated}
          className={`w-full font-bold text-base py-3.5 rounded-xl border flex items-center justify-center gap-2
            ${accountCreated
              ? 'bg-primary border-primary hover:bg-primary-hover text-black glow-primary-strong active:scale-[0.98] cursor-pointer'
              : 'bg-surface border-white/5 text-text-muted cursor-not-allowed'
            }`}
        >
          Próximo passo
        </button>
      </div>
    </motion.div>
  );
}
