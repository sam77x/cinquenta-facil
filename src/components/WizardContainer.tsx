import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ProgressBar } from './ProgressBar';
import { Step1Preparation } from './steps/Step1';
import { Step2AccountCreation } from './steps/Step2';
import { Step3Verification } from './steps/Step3';
import { Step4Deposit } from './steps/Step4';
import { Step5Final } from './steps/Step5';

const TOTAL_STEPS = 5; // Referência da sua imagem (Etapa 1 de 04)

export function WizardContainer() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    document.title = `Cinquenta Fácil | Passo ${currentStep}/${TOTAL_STEPS}`;
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="h-[100dvh] flex flex-col w-full relative overflow-hidden">


      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-xl mx-auto px-5 py-4 short:py-3 xshort:py-2 flex flex-col z-10 relative">
        <div className="w-full flex flex-col flex-1">
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} onBack={handleBack} />

          <div className="relative w-full flex-1 flex flex-col">
            <AnimatePresence mode="wait">
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
