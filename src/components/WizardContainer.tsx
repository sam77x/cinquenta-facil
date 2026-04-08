import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';
import { WelcomeScreen } from './WelcomeScreen';
import { Step1Preparation } from './steps/Step1';
import { Step2AccountCreation } from './steps/Step2';
import { Step3Verification } from './steps/Step3';
import { Step4Deposit } from './steps/Step4';
import { Step5Final } from './steps/Step5';

const TOTAL_STEPS = 5;

export function WizardContainer() {
  const [currentStep, setCurrentStep] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const step = parseInt(params.get('step') || '0', 10);
    return isNaN(step) ? 0 : Math.max(0, Math.min(step, TOTAL_STEPS));
  });

  // Sincroniza o estado inicial com a URL e gerencia botões Voltar/Avançar do navegador (History API)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!params.has('step') && currentStep === 0) {
      window.history.replaceState({ step: 0 }, '', window.location.pathname);
    } else {
      window.history.replaceState({ step: currentStep }, '', `?step=${currentStep}`);
    }

    const handlePopState = () => {
      const currentParams = new URLSearchParams(window.location.search);
      const step = parseInt(currentParams.get('step') || '0', 10);
      setCurrentStep(isNaN(step) ? 0 : Math.max(0, Math.min(step, TOTAL_STEPS)));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []); // Executa apenas na montagem

  useEffect(() => {
    if (currentStep === 0) {
      document.title = 'Cinquenta Fácil | Bem-vindo';
    } else {
      document.title = `Cinquenta Fácil | Passo ${currentStep}/${TOTAL_STEPS}`;
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      window.history.pushState({ step: nextStep }, '', `?step=${nextStep}`);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      window.history.pushState({ step: prevStep }, '', prevStep === 0 ? window.location.pathname : `?step=${prevStep}`);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col w-full relative overflow-hidden">


      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-xl mx-auto px-5 py-4 short:py-3 xshort:py-2 flex flex-col z-10 relative">
        <div className="w-full flex flex-col flex-1">
          {currentStep > 0 && (
            <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} onBack={handleBack} />
          )}

          <div className="relative w-full flex-1 flex flex-col">
            <AnimatePresence mode="wait">
              {currentStep === 0 && <WelcomeScreen key="welcome" onStart={handleNext} />}
              {currentStep === 1 && <Step1Preparation key="step1" onNext={handleNext} />}
              {currentStep === 2 && <Step2AccountCreation key="step2" onNext={handleNext} />}
              {currentStep === 3 && <Step3Verification key="step3" onNext={handleNext} />}
              {currentStep === 4 && <Step4Deposit key="step4" onNext={handleNext} />}
              {currentStep === 5 && <Step5Final key="step5" onNext={handleNext} />}
              {/* Future steps will be conditionally rendered here */}
              {currentStep > 5 && (
                <div key="placeholder" className="flex flex-col items-center justify-center text-text-secondary mt-12 w-full">
                  Passo {currentStep} em construção...

                  {currentStep < TOTAL_STEPS && (
                    <button
                      onClick={handleNext}
                      className="mt-8 bg-surface-highlight border border-white/5 py-2 px-6 rounded-lg text-sm font-medium"
                    >
                      Avançar para Preview
                    </button>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>



      {/* Background gradients for extra premium feel */}
      <div className="fixed top-0 inset-x-0 h-64 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
    </div>
  );
}
