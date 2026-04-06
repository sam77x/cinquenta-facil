import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Hook que calcula um fator de escala para que o conteúdo caiba
 * perfeitamente dentro do container pai sem gerar scroll.
 * 
 * Usa transform: scale() — sem reflow, performático, e mantém proporção.
 * 
 * @param deps - Dependências extras que forçam recálculo (ex: currentStep)
 */
export function useViewportScale(deps: unknown[] = []) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const recalculate = useCallback(() => {
    const el = contentRef.current;
    if (!el || !el.parentElement) return;

    // Reseta a escala para medir o tamanho real do conteúdo
    el.style.transform = 'none';
    el.style.height = '';

    // Aguarda dois frames para garantir layout estável após reset
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!el || !el.parentElement) return;

        const parentHeight = el.parentElement.clientHeight;
        const contentHeight = el.scrollHeight;
        const overflow = contentHeight - parentHeight;

        // Só escala se o overflow for significativo (> 20px)
        // Evita false positives em steps que cabem "quase certinho"
        if (overflow > 20 && parentHeight > 0) {
          // Escala mínima de 0.7 para manter legibilidade
          const newScale = Math.max(0.7, parentHeight / contentHeight);
          setScale(newScale);
        } else {
          setScale(1);
        }
      });
    });
  }, []);

  useEffect(() => {
    // Delay para garantir que animações de troca de step finalizaram
    const timeout = setTimeout(recalculate, 400);

    window.addEventListener('resize', recalculate);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', recalculate);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recalculate, ...deps]);

  return { contentRef, scale };
}
