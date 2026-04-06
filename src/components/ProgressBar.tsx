import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
}

export function ProgressBar({ currentStep, totalSteps, onBack }: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full mb-4">
      <div className="flex justify-between items-center mb-2 h-6">
        <div className="flex items-center gap-2">
          {onBack && currentStep > 1 && (
            <button 
              onClick={onBack}
              className="text-text-secondary hover:text-text p-1 -ml-1 rounded-full transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <span className="text-xs font-bold tracking-wider text-text uppercase mt-0.5">
            Etapa {currentStep.toString().padStart(2, '0')} de {totalSteps.toString().padStart(2, '0')}
          </span>
        </div>
        <span className="text-xs font-medium text-text-secondary mt-0.5">
          {Math.round(progress)}% Completo
        </span>
      </div>
      <div className="h-1.5 w-full bg-surface-highlight rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary glow-primary rounded-full origin-left"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: currentStep / totalSteps }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
