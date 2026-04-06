import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';
import {
  LogOut,
  Save,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Loader2,
  RefreshCw,
  Settings,
  Link as LinkIcon,
  KeyRound
} from 'lucide-react';

interface ConfigRow {
  key: string;
  value: string;
}

const LINK_LABELS: Record<string, { label: string; description: string; icon: any; isReferral?: boolean }> = {
  referral_link: {
    label: 'Referral ID (Binance)',
    description: 'Insira APENAS o seu ID numérico. O sistema gera a URL completa com o bônus "mystery-box" automaticamente.',
    icon: KeyRound,
    isReferral: true
  },
  kyc_link: {
    label: 'Página de KYC',
    description: 'Página onde o usuário inicia a verificação de identidade.',
    icon: LinkIcon,
  },
  kyc_status_link: {
    label: 'Status do KYC',
    description: 'Página para consultar se os documentos foram aprovados.',
    icon: LinkIcon,
  },
  deposit_link: {
    label: 'Link de Depósito BRL',
    description: 'Página de depósito via PIX.',
    icon: LinkIcon,
  },
  spot_link: {
    label: 'Link Trade Spot',
    description: 'Book de ofertas USDT/BRL para realizar a compra.',
    icon: LinkIcon,
  },
};

const KEY_ORDER = ['referral_link', 'kyc_link', 'kyc_status_link', 'deposit_link', 'spot_link'];

function isValidUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === 'https:' || url.protocol === 'http:';
  } catch {
    return false;
  }
}

function extractRefId(val: string): string {
  if (!val) return '';
  try {
    const url = new URL(val);
    return url.searchParams.get('ref') || val;
  } catch {
    // Se falhar ao fazer parse como URL, retornamos o próprio valor (pode ser o ID puro já digitado)
    return val;
  }
}

function generateReferralLink(refId: string) {
  if (!refId) return '';
  const cleanId = refId.trim();
  const returnToUrl = `https://www.binance.com/pt-BR/referral/mystery-box/r1latammb/claim?ref=${cleanId}`;
  const returnToBase64 = btoa(returnToUrl);
  return `https://accounts.binance.com/pt-BR/register?ref=${cleanId}&return_to=${returnToBase64}`;
}

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [configs, setConfigs] = useState<ConfigRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [focusedKey, setFocusedKey] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const fetchConfigs = useCallback(async () => {
    if (!supabase) return;
    setLoading(true);

    const { data, error } = await supabase
      .from('site_config')
      .select('key, value');

    if (error) {
      setFeedback({ type: 'error', message: 'Erro ao carregar configurações.' });
    } else if (data) {
      setConfigs(data);
      const d: Record<string, string> = {};
      for (const row of data) {
        d[row.key] = row.value;
      }
      setDrafts(d);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchConfigs();
  }, [fetchConfigs]);

  async function handleSave(key: string) {
    if (!supabase) return;

    const isReferral = LINK_LABELS[key]?.isReferral;
    const newValue = drafts[key]?.trim();

    if (!newValue) {
      setFeedback({ type: 'error', message: 'O valor não pode ficar vazio.' });
      return;
    }

    if (!isReferral && !isValidUrl(newValue)) {
      setFeedback({ type: 'error', message: 'URL inválida. Use um link válido (https://...).' });
      return;
    }

    if (isReferral && !/^\d+$/.test(extractRefId(newValue))) {
      setFeedback({ type: 'error', message: 'O ID de indicação deve conter apenas números.' });
      return;
    }

    // Verifica se mudou
    const original = configs.find((c) => c.key === key)?.value;
    if (original === newValue) {
      setFeedback({ type: 'success', message: 'Nenhuma alteração detectada.' });
      return;
    }

    setSaving(key);
    setFeedback(null);

    const { error } = await supabase
      .from('site_config')
      .update({ value: newValue, updated_at: new Date().toISOString() })
      .eq('key', key);

    if (error) {
      setFeedback({ type: 'error', message: `Erro ao salvar: ${error.message}` });
    } else {
      setFeedback({ type: 'success', message: `${LINK_LABELS[key]?.label || key} atualizado com sucesso!` });
      setConfigs((prev) =>
        prev.map((c) => (c.key === key ? { ...c, value: newValue } : c))
      );
    }

    setSaving(null);

    setTimeout(() => setFeedback(null), 3000);
  }

  function hasChanged(key: string) {
    const original = configs.find((c) => c.key === key)?.value;
    return drafts[key]?.trim() !== original;
  }

  const sortedConfigs = [...configs].sort((a, b) => {
    const ai = KEY_ORDER.indexOf(a.key);
    const bi = KEY_ORDER.indexOf(b.key);
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  });

  return (
    <div className="min-h-[100dvh] bg-[#0A0A0A] text-white selection:bg-primary/30 pb-20">
      {/* Header Premium */}
      <header className="sticky top-0 z-50 bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.3)]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(240,185,11,0.1)]">
              <Settings className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide uppercase text-white/90">Painel de Controle</h1>
              <p className="text-[11px] text-primary/80 font-medium truncate max-w-[180px]">
                {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchConfigs}
              className="p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 text-text-muted hover:text-white transition-all active:scale-95"
              title="Recarregar"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/30 hover:bg-red-500/10 text-white/70 hover:text-red-400 text-xs font-semibold transition-all active:scale-95"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-10">
          <h2 className="text-3xl font-extrabold tracking-tight mb-3 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
            Links Dinâmicos
          </h2>
          <p className="text-sm text-text-muted leading-relaxed">
            Configure os links que os usuários acessarão durante o fluxo do Cinquenta Fácil.
            As alterações feitas aqui refletem em tempo real no app.
          </p>
        </div>

        {feedback && (
          <div
            className={`flex items-center gap-3 text-sm rounded-2xl px-4 py-4 mb-8 transition-all border shadow-lg animate-in fade-in slide-in-from-top-4 ${feedback.type === 'success'
              ? 'bg-green-500/10 border-green-500/20 text-green-400 shadow-green-500/5'
              : 'bg-red-500/10 border-red-500/20 text-red-400 shadow-red-500/5'
              }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 space-y-4">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
            <p className="text-sm text-text-muted animate-pulse">Carregando configurações...</p>
          </div>
        ) : sortedConfigs.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-white/5 bg-surface/50">
            <Settings className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/70 text-sm mb-2 font-medium">Nenhuma configuração encontrada.</p>
            <p className="text-white/40 text-xs">A tabela <code className="bg-black/30 px-1.5 py-0.5 rounded text-primary/70">site_config</code> não possui registros.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {sortedConfigs.map((row) => {
              const meta = LINK_LABELS[row.key];
              const isReferral = meta?.isReferral;
              const changed = hasChanged(row.key);
              const isSaving = saving === row.key;
              const isActive = focusedKey === row.key || changed;
              const Icon = meta?.icon || LinkIcon;

              // Como exibimos e editamos
              const displayValue = isReferral
                ? extractRefId(drafts[row.key] ?? row.value)
                : (drafts[row.key] ?? row.value);

              const handleChange = (val: string) => {
                if (isReferral) {
                  // Se for referral, o valor digitado (ID) é convertido logo p/ a URL de rascunho
                  setDrafts((prev) => ({ ...prev, [row.key]: generateReferralLink(val) }));
                } else {
                  setDrafts((prev) => ({ ...prev, [row.key]: val }));
                }
              };

              return (
                <div
                  key={row.key}
                  className={`flex flex-col h-full rounded-2xl border transition-all duration-300 overflow-hidden ${isReferral ? 'xl:col-span-2' : ''} ${isActive
                    ? 'bg-gradient-to-b from-[#151515] to-[#0A0A0A] border-primary/20 shadow-[0_4px_30px_rgba(240,185,11,0.05)] ring-1 ring-primary/10'
                    : 'bg-[#111] border-white/5 hover:border-white/10'
                    }`}
                >
                  <div className="p-5 md:p-6 flex flex-col md:flex-row md:items-start justify-between gap-6 flex-1">
                    {/* INFO ESQUERDA */}
                    <div className="md:w-5/12 flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 border ${isActive
                          ? 'bg-primary/10 border-primary/30 text-primary'
                          : 'bg-white/5 border-white/5 text-white/50'
                          }`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-2">
                           <h3 className={`text-base font-bold transition-colors duration-300 ${isActive ? 'text-primary' : 'text-white/90'}`}>
                             {meta?.label || row.key}
                           </h3>
                           <a
                              href={drafts[row.key] || row.value}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md hover:bg-white/10 text-white/30 hover:text-primary transition-all flex-shrink-0"
                              title="Testar link atual"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                        </div>
                      </div>
                      
                      {meta?.description && (
                         <p className="text-[13px] text-white/50 leading-relaxed md:pr-4">
                           {meta.description}
                         </p>
                      )}
                    </div>

                    {/* INPUT DIREITA */}
                    <div className="md:w-7/12 w-full">
                       <div className="relative group">
                          {isReferral && (
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <span className="text-white/30 text-sm font-mono">ID:</span>
                            </div>
                          )}
                          <input
                            type="text"
                            value={displayValue}
                            onChange={(e) => handleChange(e.target.value)}
                            onFocus={() => setFocusedKey(row.key)}
                            onBlur={() => setFocusedKey(null)}
                            placeholder={isReferral ? "Digite apenas os números..." : "https://..."}
                            className={`w-full px-4 py-3.5 rounded-xl bg-black/50 border text-sm transition-all outline-none font-mono placeholder:text-white/20 ${isReferral ? 'pl-11' : ''} ${isActive
                              ? 'border-primary/50 text-white focus:border-primary/80 bg-black/80 ring-2 ring-primary/10'
                              : 'border-white/10 text-white/80 focus:border-white/30 focus:bg-black/60 hover:bg-black/40 hover:border-white/20'
                              }`}
                          />
                       </div>
                    </div>
                  </div>

                  {/* FOOTER AÇÕES */}
                  <div className={`mt-auto px-5 md:px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t transition-colors duration-300 ${isActive ? 'bg-primary/5 border-primary/10' : 'bg-white/5 border-white/5'}`}>
                      <div className="text-[11px] font-mono text-white/30 truncate max-w-full sm:max-w-md" title={drafts[row.key] || row.value}>
                        {isReferral && displayValue ? 'Automático: ' + (drafts[row.key] || row.value) : (drafts[row.key] || row.value)}
                      </div>

                      <button
                        onClick={() => handleSave(row.key)}
                        disabled={!changed || isSaving}
                        className={`flex items-center justify-center sm:justify-start gap-2 px-6 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shrink-0 ${changed && !isSaving
                          ? 'bg-primary hover:bg-primary-hover text-black cursor-pointer active:scale-95 shadow-primary/20 hover:shadow-primary/40'
                          : 'bg-white/10 text-white/30 cursor-not-allowed shadow-none'
                          }`}
                      >
                        {isSaving ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-current opacity-70" />
                            Gravando...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            {changed ? 'Salvar Setup' : 'Salvo'}
                          </>
                        )}
                      </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
