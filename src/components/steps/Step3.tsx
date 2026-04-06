import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ScanFace, Camera } from 'lucide-react';
import { useConfig } from '../../hooks/useConfig';

interface Step3VerificationProps {
  onNext: () => void;
}

export function Step3Verification({ onNext }: Step3VerificationProps) {
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
        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight mb-1">
            Verificando a Conta
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Abra o link abaixo e siga os passos para verificar sua identidade.
          </p>
        </div>

        {/* Passos instrucionais */}
        <div className="rounded-xl border border-white/5 overflow-hidden mb-4">
          {/* Passo 1 */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              1
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Clique em <span className="text-primary font-semibold">Verificar minha identidade</span>
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              2
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Insira o código enviado no seu e-mail
              </p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              3
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Preencha os <span className="text-primary font-semibold">dados</span> solicitados
              </p>
            </div>
          </div>

          {/* Passo 4 */}
          <div className="flex items-start gap-3 px-4 py-3.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
              4
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Conclua a verificação do documento
              </p>
              {/* Dica CNH vs RG */}
              <div className="mt-2 flex flex-col gap-1.5">
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <ScanFace className="w-3.5 h-3.5 flex-shrink-0 text-primary/70" />
                  <span><strong className="text-text-secondary font-medium">CNH</strong> → só reconhecimento facial</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-text-muted">
                  <Camera className="w-3.5 h-3.5 flex-shrink-0 text-primary/70" />
                  <span><strong className="text-text-secondary font-medium">RG</strong> → foto frente e verso</span>
                </div>
              </div>
            </div>
          </div>

          {/* Passo 5 */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-surface">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              5
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text leading-snug">
                Aguarde até <span className="text-primary font-semibold">10 minutos</span> para a verificação ser concluída
              </p>
            </div>
          </div>
        </div>

        {/* Área de CTAs */}
        <div className="mb-4">
          <a
            id="step3-kyc-cta"
            href={config.kyc_link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all active:scale-[0.98] glow-primary mb-3"
          >
            <ExternalLink className="w-4 h-4" />
            Abrir verificação de identidade
          </a>

          <div className="text-center">
            <a
              id="step3-status-cta"
              href={config.kyc_status_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] font-medium text-text-muted hover:text-text transition-colors inline-flex items-center justify-center"
            >
              Verificou? <span className="ml-1 text-primary/80 decoration-primary/30 underline underline-offset-2">Consultar status</span>
            </a>
          </div>
        </div>
      </div>

      {/* Botão de avanço (agora abre o modal de confirmação primeiro) */}
      <div className="pt-4 pb-2">
        <button
          id="step3-next-btn"
          onClick={() => setShowModal(true)}
          className="w-full font-bold text-base py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-black glow-primary-strong active:scale-[0.98] cursor-pointer"
        >
          Próximo passo
        </button>
      </div>

      {/* Modal de Confirmação Amigável */}
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
              <h3 className="text-lg font-bold text-white mb-2">Sua conta está com status de verificada?</h3>
              <p className="text-sm text-text-muted mb-6 leading-relaxed">
                Antes de continuar, dá uma conferida no status da sua conta.
              </p>

              <div className="flex flex-col gap-3">
                <button
                  onClick={() => {
                    setShowModal(false);
                    onNext();
                  }}
                  className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all active:scale-[0.98] glow-primary"
                >
                  Sim, está tudo certo
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="w-full py-3.5 rounded-xl bg-surface border border-white/5 hover:border-white/10 hover:bg-white/5 text-text font-medium text-sm transition-all active:scale-[0.98]"
                >
                  Ainda está em análise
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
