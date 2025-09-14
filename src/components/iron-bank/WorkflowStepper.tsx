import React from 'react';
import { Upload, BarChart3, Globe2, Megaphone, CheckCircle, Circle } from 'lucide-react';
import type { WorkflowStep } from '../../types/iron-bank';

interface WorkflowStepperProps {
  currentStep: WorkflowStep;
  onStepClick: (step: WorkflowStep) => void;
  completedSteps: WorkflowStep[];
}

const STEPS = [
  {
    id: 'upload' as WorkflowStep,
    title: 'Video Yükle',
    description: 'Video ve hedef ülkeler',
    icon: Upload,
  },
  {
    id: 'analysis' as WorkflowStep,
    title: 'Kültürel Analiz',
    description: 'AI uygunluk raporu',
    icon: BarChart3,
  },
  {
    id: 'localization' as WorkflowStep,
    title: 'Yerelleştirme',
    description: 'Dublaj ve çeviri',
    icon: Globe2,
  },
  {
    id: 'marketing' as WorkflowStep,
    title: 'Pazarlama',
    description: 'Kampanya içerikleri',
    icon: Megaphone,
  },
];

export const WorkflowStepper: React.FC<WorkflowStepperProps> = ({
  currentStep,
  onStepClick,
  completedSteps,
}) => {
  const currentStepIndex = STEPS.findIndex(step => step.id === currentStep);

  const getStepStatus = (stepIndex: number, stepId: WorkflowStep) => {
    if (completedSteps.includes(stepId)) {
      return 'completed';
    } else if (stepIndex === currentStepIndex) {
      return 'current';
    } else if (stepIndex < currentStepIndex) {
      return 'available';
    } else {
      return 'upcoming';
    }
  };

  const getStepStyles = (status: string) => {
    switch (status) {
      case 'completed':
        return {
          container: 'cursor-pointer hover-flames bg-black/40 border-green-500/70 backdrop-blur-sm',
          circle: 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-400 text-white shadow-lg shadow-green-500/30',
          title: 'text-green-300 font-bold drop-shadow-lg',
          description: 'text-green-200',
          connector: 'bg-gradient-to-r from-green-500 to-emerald-500',
        };
      case 'current':
        return {
          container: 'hover-flames bg-black/50 border-orange-500/80 backdrop-blur-sm flame-border',
          circle: 'bg-gradient-to-r from-purple-600 to-orange-600 border-orange-400 text-white animate-pulse shadow-lg shadow-orange-500/40',
          title: 'text-orange-300 font-bold drop-shadow-lg',
          description: 'text-orange-200',
          connector: 'bg-gradient-to-r from-purple-500 to-orange-500',
        };
      case 'available':
        return {
          container: 'cursor-pointer hover-flames bg-black/30 border-gray-500/50 backdrop-blur-sm',
          circle: 'bg-gradient-to-r from-gray-600 to-slate-600 border-gray-500 text-gray-200 shadow-lg',
          title: 'text-gray-300 drop-shadow-lg',
          description: 'text-gray-400',
          connector: 'bg-gradient-to-r from-gray-500 to-slate-500',
        };
      default: // upcoming
        return {
          container: 'opacity-60 bg-black/20 border-gray-600/30',
          circle: 'bg-gradient-to-r from-gray-700 to-slate-700 border-gray-600 text-gray-400',
          title: 'text-gray-500',
          description: 'text-gray-600',
          connector: 'bg-gradient-to-r from-gray-600 to-slate-600',
        };
    }
  };

  return (
    <div className="w-full relative overflow-hidden dragon-fire-bg p-6 rounded-lg">
      <div className="flex items-center justify-between relative">
        {STEPS.map((step, index) => {
          const status = getStepStatus(index, step.id);
          const styles = getStepStyles(status);
          const Icon = step.icon;
          const isClickable = status === 'completed' || status === 'available' || status === 'current';

          return (
            <React.Fragment key={step.id}>
              {/* Step */}
              <div
                className={`
                  relative flex flex-col items-center min-w-0 flex-1 px-4 py-3 rounded-lg border-2 border-transparent transition-all duration-200
                  ${styles.container}
                `}
                onClick={() => isClickable && onStepClick(step.id)}
              >
                {/* Step Circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-200 mb-3
                    ${styles.circle}
                  `}
                >
                  {status === 'completed' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : status === 'current' ? (
                    <Icon className="w-5 h-5" />
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </div>

                {/* Step Content */}
                <div className="text-center min-w-0 w-full">
                  <h3
                    className={`
                      text-sm font-medium transition-colors duration-200 mb-1 truncate
                      ${styles.title}
                    `}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={`
                      text-xs transition-colors duration-200 leading-tight
                      ${styles.description}
                    `}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Step Number Badge */}
                <div
                  className={`
                    absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shadow-lg
                    ${status === 'completed'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/50'
                      : status === 'current'
                        ? 'bg-gradient-to-r from-purple-600 to-orange-600 text-white shadow-orange-500/50 flame-pulse'
                        : 'bg-gradient-to-r from-gray-600 to-slate-600 text-gray-200'
                    }
                  `}
                >
                  {index + 1}
                </div>
              </div>

              {/* Connector Line */}
              {index < STEPS.length - 1 && (
                <div className="flex-shrink-0 w-8 h-0.5 mx-2">
                  <div
                    className={`
                      h-full transition-colors duration-300
                      ${status === 'completed' ? 'bg-green-500' : 'bg-gray-300'}
                    `}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Dragon Fire Progress Bar */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-orange-200 mb-2 font-semibold drop-shadow-lg">
          <span>İlerleme</span>
          <span>{Math.round(((currentStepIndex + 1) / STEPS.length) * 100)}%</span>
        </div>
        <div className="w-full bg-gradient-to-r from-gray-800 to-slate-800 rounded-full h-3 shadow-inner">
          <div
            className="bg-gradient-to-r from-purple-600 via-orange-500 to-red-600 h-3 rounded-full transition-all duration-500 ease-out shadow-lg relative overflow-hidden"
            style={{
              width: `${((currentStepIndex + 1) / STEPS.length) * 100}%`,
              boxShadow: '0 0 20px rgba(255, 140, 0, 0.5), 0 0 40px rgba(255, 69, 0, 0.3)'
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Epic Current Step Description */}
      <div className="mt-4 p-4 bg-black/60 rounded-lg border border-orange-500/50 backdrop-blur-sm hover-flames">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg shadow-orange-500/30 flame-pulse">
            <Circle className="w-4 h-4 text-white fill-current" />
          </div>
          <div>
            <p className="text-sm font-bold text-orange-300 drop-shadow-lg">
              ⚔️ Şu anda: {STEPS.find(s => s.id === currentStep)?.title}
            </p>
            <p className="text-xs text-orange-200">
              {STEPS.find(s => s.id === currentStep)?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};