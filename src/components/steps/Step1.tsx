import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Smartphone, ShieldCheck, Landmark, IdCard, CheckCircle2, Download, Clock } from 'lucide-react';

function getStoreUrl(ios: string, android: string): string {
  const ua = navigator.userAgent;
  if (/iPad|iPhone|iPod/.test(ua)) return ios;
  if (/android/i.test(ua)) return android;
  // Desktop: abre Play Store como fallback universal
  return android;
}

interface Step1PreparationProps {
  onNext: () => void;
}

type DocType = 'cnh' | 'rg' | null;

export function Step1Preparation({ onNext }: Step1PreparationProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocType>(null);

  const canProceed = selectedDoc !== null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col flex-1"
    >
      <div className="flex-1">
        {/* Cabeçalho minimalista */}
        <div className="mb-5">
          <h1 className="text-xl font-bold tracking-tight mb-1">
            Antes de começar
          </h1>
          <p className="text-text-muted text-sm leading-relaxed">
            Separe esses itens para garantir seus{' '}
            <strong className="text-primary font-bold">R$ 50</strong> sem problemas.
          </p>
        </div>

        {/* Checklist — lista leve com divisores */}
        <div className="rounded-xl border border-white/5 overflow-hidden mb-3">
          <ChecklistItem
            icon={<Mail className="w-4 h-4 text-primary" />}
            title="E-mail"
            description="Para receber o código de verificação"
          />
          <ChecklistItem
            icon={<Smartphone className="w-4 h-4 text-primary" />}
            title="App da Binance"
            optional
            downloadUrl={getStoreUrl(
              'https://apps.apple.com/app/binance-buy-bitcoin-crypto/id1436799971',
              'https://play.google.com/store/apps/details?id=com.binance.dev'
            )}
          />
          <ChecklistItem
            icon={<ShieldCheck className="w-4 h-4 text-primary" />}
            title="Google Authenticator"
            optional
            downloadUrl={getStoreUrl(
              'https://apps.apple.com/app/google-authenticator/id388497605',
              'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
            )}
          />
          <ChecklistItem
            icon={<Landmark className="w-4 h-4 text-primary" />}
            title="Conta Digital"
            description="No seu nome, para receber o dinheiro"
            last
          />
        </div>

        {/* Seleção de documento */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <IdCard className="w-3.5 h-3.5 text-text-muted" />
              <span className="text-xs font-medium text-text-muted uppercase tracking-wider">Documento | Selecione para continuar</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-2">
            {/* CNH */}
            <button
              onClick={() => setSelectedDoc('cnh')}
              className={`relative flex items-center justify-center rounded-xl px-3 py-3 transition-all duration-200 outline-none border
                ${selectedDoc === 'cnh'
                  ? 'bg-white/10 border-white/40'
                  : 'bg-surface border-white/5 hover:border-white/15'
                }`}
            >
              <span className="absolute -top-2 right-2 text-[10px] font-bold bg-primary text-black px-1.5 py-0.5 rounded-full leading-tight whitespace-nowrap">
                Mais Rápido
              </span>
              {selectedDoc === 'cnh' && (
                <CheckCircle2 className="absolute top-1.5 left-1.5 w-3.5 h-3.5 text-text-secondary" />
              )}
              <span className="text-sm font-semibold text-text">CNH</span>
            </button>

            {/* Identidade (RG) */}
            <button
              onClick={() => setSelectedDoc('rg')}
              className={`relative flex items-center justify-center rounded-xl px-3 py-3 transition-all duration-200 outline-none border
                ${selectedDoc === 'rg'
                  ? 'bg-white/10 border-white/40'
                  : 'bg-surface border-white/5 hover:border-white/15'
                }`}
            >
              {selectedDoc === 'rg' && (
                <CheckCircle2 className="absolute top-1.5 left-1.5 w-3.5 h-3.5 text-text-secondary" />
              )}
              <span className="text-sm font-semibold text-text">Identidade (RG)</span>
            </button>
          </div>
        </div>
      </div>

      <div className="pt-4 pb-2">
        <div className="flex items-center justify-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-primary/10">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span className="text-[11px] font-medium text-primary/90">
              É rápido! Leva de <strong className="font-bold text-primary">5 a 10 minutos</strong>
            </span>
          </div>
        </div>
        <button
          onClick={canProceed ? onNext : undefined}
          disabled={!canProceed}
          className={`w-full font-bold text-base py-3.5 rounded-xl border flex items-center justify-center gap-2
            ${canProceed
              ? 'bg-primary border-primary hover:bg-primary-hover text-black glow-primary-strong active:scale-[0.98] cursor-pointer'
              : 'bg-surface border-white/5 text-text-muted cursor-not-allowed'
            }`}
        >
          Tenho tudo em mãos
        </button>
      </div>
    </motion.div>
  );
}

function ChecklistItem({
  icon,
  title,
  description,
  downloadUrl,
  last = false,
  optional = false,
}: {
  icon: React.ReactNode;
  title: string;
  description?: string;
  downloadUrl?: string;
  last?: boolean;
  optional?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 px-3 py-3 bg-surface ${!last ? 'border-b border-white/5' : ''}`}>
      <div className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-primary/10">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text leading-tight">{title}</p>
        {optional && (
          <p className="text-[11px] text-primary/50 mt-0.5">Opcional</p>
        )}
        {description && (
          <p className="text-xs text-text-muted mt-0.5">{description}</p>
        )}
      </div>
      {downloadUrl && (
        <a
          href={downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex-shrink-0 flex items-center gap-1 text-[11px] font-semibold text-primary border border-primary/40 bg-primary/10 hover:bg-primary/20 active:scale-95 transition-all duration-150 rounded-lg px-2.5 py-1"
        >
          <Download className="w-3 h-3" />
          Baixar
        </a>
      )}
    </div>
  );
}
