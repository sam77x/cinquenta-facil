import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ExternalLink, ShieldCheck } from 'lucide-react';
import { useConfig } from '../../hooks/useConfig';

interface Step4DepositProps {
  onNext: () => void;
}

export function Step4Deposit({ onNext }: Step4DepositProps) {
  const [showModal, setShowModal] = useState(false);
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
        <div className="mb-4 short:mb-3">
          <h1 className="text-xl font-bold tracking-tight mb-1">
            Movimentando a Conta
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Essa é uma etapa <span className="text-primary font-semibold">crucial</span> e também a que vai garantir o recebimento dos <span className="text-primary font-semibold">R$ 50</span>.
          </p>
        </div>

        {/* Passos instrucionais */}
        <div className="rounded-xl border border-white/5 overflow-hidden mb-4 xshort:mb-2">
          {/* Passo 1 */}
          <div className="flex items-center gap-3 px-4 py-3.5 short:py-2.5 xshort:py-2.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              1
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Abra o link e selecione <span className="text-primary font-semibold">PIX</span>
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="flex items-center gap-3 px-4 py-3.5 short:py-2.5 xshort:py-2.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              2
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Aceite os termos e aperte em <span className="text-primary font-semibold">Continuar</span>
              </p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="flex items-center gap-3 px-4 py-3.5 short:py-2.5 xshort:py-2.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              3
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Digite <span className="text-primary font-semibold">R$ 60</span> e continuar novamente
              </p>
            </div>
          </div>

          {/* Passo 4 */}
          <div className="flex items-start gap-3 px-4 py-3.5 short:py-2.5 xshort:py-2.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
              4
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Copie o código PIX e pague no seu banco
              </p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                O depósito cai de forma instantânea na sua conta.
              </p>
            </div>
          </div>

          {/* Passo 5 */}
          <div className="flex flex-col gap-1 px-4 py-3.5 short:py-2.5 xshort:py-2.5 bg-surface">
            <div className="flex items-center gap-3">
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary">
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
              <p className="text-sm font-medium text-text leading-snug flex-1">
                Seu dinheiro continua <span className="text-primary font-semibold">sendo seu</span>
              </p>
            </div>
            <p className="text-xs text-text-muted leading-relaxed pl-9">
              Você pode sacar a qualquer momento. Isso é apenas uma movimentação para resgatar os seus R$ 50.
            </p>
          </div>
        </div>

        {/* CTA de redirecionamento */}
        <a
          id="step4-deposit-cta"
          href={config.deposit_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all active:scale-[0.98] glow-primary mb-4 short:mb-3 xshort:mb-2"
        >
          <ExternalLink className="w-4 h-4" />
          Movimentar a conta
        </a>

      </div>

      {/* Botão de avanço (agora abre o modal) */}
      <div className="pt-4 short:pt-2 pb-2">
        <button
          id="step4-next-btn"
          onClick={() => setShowModal(true)}
          className="w-full font-bold text-base py-3.5 rounded-xl border border-white flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] cursor-pointer"
        >
          Falta só um passo
        </button>
      </div>

      {/* Modal de Confirmação */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showModal && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-full max-w-sm bg-background rounded-2xl p-6 shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-white mb-2">Você realizou o depósito na conta?</h3>
                <p className="text-sm text-text-muted mb-6 leading-relaxed">
                  Prossiga somente após concluir essa etapa, erros aqui comprometem o recebimento dos R$ 50.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      onNext();
                    }}
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all active:scale-[0.98] glow-primary"
                  >
                    Já depositei
                  </button>

                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-3.5 rounded-xl bg-surface border border-white/5 hover:border-white/10 hover:bg-white/5 text-text font-medium text-sm transition-all active:scale-[0.98]"
                  >
                    Estou fazendo agora
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
