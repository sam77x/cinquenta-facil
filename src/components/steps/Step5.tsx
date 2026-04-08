import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ExternalLink, CheckCircle } from 'lucide-react';
import Confetti from 'react-confetti';
import { useConfig } from '../../hooks/useConfig';

interface Step5FinalProps {
  onNext?: () => void;
}

export function Step5Final({ onNext }: Step5FinalProps) {
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
            Etapa Final - Resgate
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Siga exatamente como descrito abaixo para realizar a transação que desbloqueia seus <span className="text-primary font-semibold">R$ 50</span>.
          </p>
        </div>

        {/* Passos instrucionais */}
        <div className="rounded-xl border border-white/5 overflow-hidden mb-4 short:mb-3">
          {/* Passo 1 */}
          <div className="flex items-center gap-3 px-4 py-3.5 short:py-2.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              1
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm short:text-[13px] font-medium text-text leading-snug">
                Acesse o mercado do botão abaixo e aperte em <span className="text-green-500 font-semibold">Comprar</span>
              </p>
            </div>
          </div>

          {/* Passo 2 */}
          <div className="flex items-center gap-3 px-4 py-3.5 short:py-2.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold">
              2
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm short:text-[13px] font-medium text-text leading-snug">
                Na esquerda superior, mude a opção para <span className="text-primary font-semibold">Market Order</span>
              </p>
            </div>
          </div>

          {/* Passo 3 */}
          <div className="flex items-start gap-3 px-4 py-3.5 short:py-2.5 bg-surface border-b border-white/5">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
              3
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm short:text-[13px] font-medium text-text leading-snug">
                No total, arraste a barra para o <span className="text-primary font-semibold">máximo (100%)</span>
              </p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Após arrastar tudo preenchendo o valor, <span className="text-primary font-semibold">conclua a compra</span> e aguarde entre 15 e 30 segundos.
              </p>
            </div>
          </div>

          {/* Passo 4 */}
          <div className="flex items-start gap-3 px-4 py-3.5 short:py-2.5 bg-surface">
            <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-primary/15 text-primary text-xs font-bold mt-0.5">
              4
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-sm short:text-[13px] font-medium text-text leading-snug">
                Aperte em <span className="text-red-500 font-semibold">Vender</span> e arraste pro máximo
              </p>
              <p className="text-xs text-text-muted mt-1 leading-relaxed">
                Repita o processo de arrastar a barra para os 100% novamente para vender tudo.
              </p>
            </div>
          </div>


        </div>

        {/* CTA de redirecionamento */}
        <a
          id="step5-trade-cta"
          href={config.spot_link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all active:scale-[0.98] glow-primary mb-4 short:mb-3 xshort:mb-2"
        >
          <ExternalLink className="w-4 h-4" />
          Acessar mercado USDT/BRL
        </a>

      </div>

      {/* Botão de Feedback / Encerrar */}
      <div className="pt-4 short:pt-2 pb-2">
        <button
          onClick={() => setShowModal(true)}
          className="w-full font-bold text-base py-3.5 rounded-xl border border-white flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] active:scale-[0.98] cursor-pointer"
        >
          Completei tudo
        </button>
      </div>

      {/* Modal de Finalização */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <div className="fixed inset-0 pointer-events-none z-[110]">
                <Confetti
                  width={window.innerWidth}
                  height={window.innerHeight}
                  numberOfPieces={400}
                  gravity={0.15}
                  recycle={false}
                  colors={['#F0B90B', '#FCD535', '#1ECB4F', '#FFFFFF', '#F6465D']}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -100 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -100 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="w-full max-w-sm bg-background border border-white/10 rounded-2xl p-6 shadow-2xl relative z-[120]"
                onClick={(e) => e.stopPropagation()}
              >

                <div className="flex justify-center mb-4 text-primary">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 text-center">Tudo certo!</h3>
                <p className="text-sm text-text-muted mb-6 leading-relaxed text-center">
                  Se você realizou todos os passos corretamente, o valor será creditado dentro de algumas horas, virá em $USDT e daí é só vender como fizemos no último passo.
                </p>

                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                      setShowModal(false);
                      if (onNext) onNext();
                      // Aqui pode colocar lógica extra se houver alguma página pós-sucesso.
                    }}
                    className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-hover text-black font-bold text-sm transition-all active:scale-[0.98] glow-primary"
                  >
                    Entendi
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </motion.div>
  );
}
