# Goal Description
Criar uma Single-Page Application (SPA) estilo Wizard Interativo para guiar usuários por uma campanha CPA da Binance. O objetivo é maximizar conversão guiando o "lead" em 5 etapas claras de onboarding sem causar confusão, focando primariamente em dispositivos móveis.

**O sistema baseia-se em:**
- Design Mobile-First, responsivo e focado na facilidade de uso (Polegar amigável).
- Estética premium com paleta Black and Yellow (`#181A20` como fundo e `#FCD535` como destaques) focada em Dark Mode e Neon UI.
- Uso de animações de transição suaves (micro-interações) entre cada tela usando a biblioteca `framer-motion`.

## Análise e Pesquisa
Consultei o **Perplexity AI** para as melhores práticas de UX para Crypto Onboarding:
- **Indicador de Progresso:** É crucial ter um painel ("Passo 2 de 5") que retenha a pessoa visualmente, provando que é um processo curto.
- **Divisão do KYC (Know Your Customer):** Como cripto normalmente exige muita burocracia, dividir as explicações como "Envie CNH ou RG frente e verso + facial" como pequenos sub-passos alivia a carga cognitiva.
- **Dicas Visuais de Confiança:** Adicionar um aviso em algumas telas de que a Binance é a plataforma com a qual o usuário está trabalhando traz confiança e segurança, importante já que R$60 serão depositados.

Também consultei o **Context7** para as implementações via `framer-motion` que garantirão as transições laterais sedosas na troca de cada um dos passos (como cards arrastáveis ou componentes que dão fade in/out no estado visual da sua landing page).

---

## User Review Required

> [!IMPORTANT]
> **Links e Vídeos:** Para algumas partes descritas (como "onde clicar na aba spot" e "como sacar o dinheiro"), recomendo colocarmos pequenos GIFs ou vídeos em loop do celular (screencasts curtos demonstrando a ação real no App da Binance). Você consegue gravar a tela do seu app para colocarmos nessas áreas?

> [!WARNING]
> **Políticas do CPA Binance:** O design requer que sejamos extremamente claros, mas devemos manter o uso da marca Binance e das garantias de "Saque instantâneo" e "Bônus de $10" dentro dos termos que eles não considerem propaganda enganosa (se for tráfego pago). O layout refletirá esse equilíbrio de alta conversão vs credibilidade.

---

## Proposed Changes

A stack que iremos utilizar é a orientada pelas skills fornecidas: **React + Vite (TypeScript) e TailwindCSS** (para um estilo customizado rápido sem componentes genéricos), utilizando a abordagem PWA/Mobile-First. 

### Foundation / Setup

#### [NEW] Vite Config & App Root
Inicializar projeto via `npx create-vite@latest ./ --template react-ts`.

#### [NEW] Design System Tokens (`index.css` e `tailwind.config.js`)
Configurar o `tailwind.config.js` com a identidade visual (Cores da escala Gray/Zinc para dark mode escuro) e o amarelo vibrante da Binance (`#FCD535`).
Habilitar a configuração de fontes no documento, como usar `Inter` ou `Outfit` do Google Fonts. E implementar a skill *dark-mode-implementer* e *tailwindcss-animations*.

### Components (Core Wizard)

#### [NEW] `src/components/WizardContainer.tsx`
O orquestrador principal da página. Vai gerenciar o estado global do fluxo `const [currentStep, setCurrentStep] = useState(1)` e o componente *Framer Motion* `<AnimatePresence>` que gerencia a entrada e a saída animada dos passos.

#### [NEW] `src/components/ProgressBar.tsx`
Ui visual de progresso dinâmico que ficará engatado no topo da página ou logo acima dos *cards* de conteúdo para engajar o usuário a chegar aos 100%.

### Wizard Steps (Iterative Flow)

O plano aborda o exato *funil de 5 etapas* projetado, porém a **execução será iterativa**. Construiremos a fundação e a **Etapa 1**, e então pausaremos para que você possa revisar, personalizar e adicionar detalhes específicos antes de prosseguirmos para a **Etapa 2**, e assim sucessivamente.

#### [NEW] `src/components/steps/Step1Registration.tsx`
Focado no "Hook". Um botão enorme amarelo levando para o seu link. Haverá instruções de que o usuário precisa confirmar/adicionar o ID do seu convite ao registrar via versão Web na nova aba.

#### [NEW] `src/components/steps/Step2AppSetup.tsx`
Pede para o usuário instalar dois apps: o "Binance App" e o "Google Authenticator" (providenciando os ícones/links das lojas de App). Instrui o login no App.

#### [NEW] `src/components/steps/Step3KYC.tsx`
Quebra as barreiras de "preguiça" no fluxo do KYC. Explica a facilidade (CNH dispensa o verso + facial), e instrui que sem a CNH requer foto frente e trás plus facial. Dita o tempo de espera estimado (aprox. 5 min).

#### [NEW] `src/components/steps/Step4DepositTrade.tsx`
O "Corpo da CPA". 
- Passo (A): Pix para depósito (Instruir "Exatos R$60").
- Passo (B): Como acessar Spot (Comprar USDT com o Saldo Max BRL).
- Passo (C): Esperar de 15 a 30s.
- Passo (D): Vender os USDTs recém comprados.

#### [NEW] `src/components/steps/Step5WithdrawalSetup.tsx`
Garante a recompensa do indicado (The Reward Drop).
Mostra como acessar a aba "Ativos" -> "Retirar". Instruir a vinculação do Google Authenticator. Explicar o Tripé de Segurança para sacar (Email Code, Authenticator Code, Facial Check) listando instantaneidade no resgate e a janela de 24h para o drop dos dez dólares.

---

## Open Questions

1. **Textos Finais:** Você já possui os textos de copy final escritos por inteiro ou posso gerar as explicações dos passos com palavras que geram conversão usando meu próprio julgamento baseado na sua explicação?
2. **Imagens:** Posso utilizar emojis/ícones de vetor como placeholders de luxo enquanto não providenciamos screenshots reais do aplicativo da Binance?
3. **URL/Link de CPA:** Você já quer fornecer o seu link para embutirmos no projeto?

## Verification Plan

### Automated Tests
- Build do Vite (`npm run build`) para assegurar que não haja dependências circulares.
- Linting do Tailwind/TypeScript.

### Manual Verification
- O usuário deve confirmar que a renderização PWA / Responsiva em um formato de iPhone vertical parece robusta, com as tipografias perfeitamente legíveis.
- Verificação de click-through: o usuário avança do passo 1 ao passo 5 visualmente para checar se as interações de fade-in e drag-gesture se comportam no modelo premium desejado.
