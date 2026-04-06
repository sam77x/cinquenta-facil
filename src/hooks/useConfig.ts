import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

/**
 * Valores padrão caso o Supabase não esteja configurado ou falhe.
 * Mantém a app funcional mesmo sem backend.
 */
const DEFAULTS: SiteConfig = {
  referral_link:
    'https://accounts.binance.com/pt-BR/register?ref=1046978020&return_to=aHR0cHM6Ly93d3cuYmluYW5jZS5jb20vcHQtQlIvcmVmZXJyYWwvbXlzdGVyeS1ib3gvcjFsYXRhbW1iL2NsYWltP3JlZj0xMDQ2OTc4MDIw',
  kyc_link: 'https://www.binance.com/pt-BR/kyc-center',
  kyc_status_link: 'https://www.binance.com/pt-BR/my/settings/kyc',
  deposit_link: 'https://www.binance.com/pt-BR/fiat/deposit/BRL',
  spot_link: 'https://www.binance.com/pt-BR/trade/USDT_BRL',
};

interface SiteConfig {
  referral_link: string;
  kyc_link: string;
  kyc_status_link: string;
  deposit_link: string;
  spot_link: string;
}

let cachedConfig: SiteConfig | null = null;

export function useConfig() {
  const [config, setConfig] = useState<SiteConfig>(cachedConfig ?? DEFAULTS);
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    if (cachedConfig) return;
    if (!supabase) {
      cachedConfig = DEFAULTS;
      setConfig(cachedConfig);
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchConfig() {
      const { data, error } = await supabase!
        .from('site_config')
        .select('key, value');

      if (cancelled) return;

      if (error || !data) {
        console.warn('[useConfig] Falha ao buscar config, usando defaults:', error);
        cachedConfig = DEFAULTS;
      } else {
        const merged: Record<string, string> = { ...DEFAULTS };
        for (const row of data) {
          merged[row.key] = row.value;
        }
        cachedConfig = merged as unknown as SiteConfig;
      }

      setConfig(cachedConfig);
      setLoading(false);
    }

    fetchConfig();

    return () => {
      cancelled = true;
    };
  }, []);

  return { config, loading };
}
