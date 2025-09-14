import React, { useState, useCallback, useEffect } from 'react';

import { DragonIcon } from '../components/ui/DragonIcon';
import { VideoUploadForm } from '../components/iron-bank/VideoUploadForm';
import { WorkflowStepper } from '../components/iron-bank/WorkflowStepper';
import { AnalysisResults } from '../components/iron-bank/AnalysisResults';
import { LocalizationWorkspace } from '../components/iron-bank/LocalizationWorkspace';
import { MarketingCampaigns } from '../components/iron-bank/MarketingCampaigns';
import type { IronBankState, WorkflowStep, Country } from '../types/iron-bank';

export const IronBank: React.FC = () => {
  const [state, setState] = useState<IronBankState>({
    currentStep: 'upload',
    videoFile: null,
    targetCountries: [],
    analysisData: null,
    localizationProgress: null,
    campaignData: [],
    isLoading: false,
    error: null,
  });

  const updateState = useCallback((updates: Partial<IronBankState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Add Iron Bank class to body when component mounts
  useEffect(() => {
    document.body.classList.add('iron-bank-page');
    return () => {
      document.body.classList.remove('iron-bank-page');
    };
  }, []);

  const handleVideoUpload = useCallback(async (file: File, countries: Country[]) => {
    updateState({
      isLoading: true,
      error: null,
      videoFile: file,
      targetCountries: countries
    });

    try {
      // Simulate API call for analysis
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock analysis data
      const mockAnalysis = {
        culturalScore: 85,
        contentSuitability: 92,
        marketPotential: 78,
        recommendations: [
          'Reklamda kullanılan müzik tarzı hedef ülkelerde popüler',
          'Görsel içerik kültürel normlara uygun',
          'Renk paleti pozitif çağrışım yapıyor'
        ],
        riskFactors: [
          'Bazı jest ve mimikler yanlış anlaşılabilir',
          'Metinlerdeki argo ifadeler dikkat gerektirir'
        ],
        targetAudience: '18-35 yaş arası, teknoloji ilgilisi kentli bireyler'
      };

      updateState({
        analysisData: mockAnalysis,
        currentStep: 'analysis',
        isLoading: false
      });
    } catch (error) {
      updateState({
        error: 'Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.',
        isLoading: false
      });
    }
  }, [updateState]);

  const handleStepChange = useCallback((step: WorkflowStep) => {
    updateState({ currentStep: step });
  }, [updateState]);

  const renderCurrentStep = () => {
    switch (state.currentStep) {
      case 'upload':
        return (
          <VideoUploadForm
            onUpload={handleVideoUpload}
            isLoading={state.isLoading}
            error={state.error}
          />
        );
      case 'analysis':
        return (
          <AnalysisResults
            analysisData={state.analysisData}
            targetCountries={state.targetCountries}
            onContinue={() => handleStepChange('localization')}
            isLoading={state.isLoading}
          />
        );
      case 'localization':
        return (
          <LocalizationWorkspace
            targetCountries={state.targetCountries}
            localizationProgress={state.localizationProgress}
            onContinue={() => handleStepChange('marketing')}
            onUpdateProgress={(progress) => updateState({ localizationProgress: progress })}
          />
        );
      case 'marketing':
        return (
          <MarketingCampaigns
            targetCountries={state.targetCountries}
            campaignData={state.campaignData}
            onUpdateCampaigns={(campaigns) => updateState({ campaignData: campaigns })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-black min-h-screen relative overflow-hidden dragon-fire-bg iron-bank-page">
      <div className="p-4 relative z-10">
        <div className="w-full">
          {/* Header */}
          <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-orange-500/50 p-6 mb-6 hover-flames">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <DragonIcon className="w-12 h-12 text-orange-400" size={48} />
                <div>
                  <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                    Rockads Iron Bank
                  </h1>
                  <p className="text-orange-200 drop-shadow-lg">
                    AI destekli reklam yerelleştirme platformu
                  </p>
                </div>
              </div>
            </div>

            {/* Workflow Stepper */}
            <div className="mt-6">
              <WorkflowStepper
                currentStep={state.currentStep}
                onStepClick={handleStepChange}
                completedSteps={(['upload', 'analysis', 'localization'] as WorkflowStep[]).slice(0,
                  (['upload', 'analysis', 'localization', 'marketing'] as WorkflowStep[]).indexOf(state.currentStep)
                )}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-black/40 backdrop-blur-sm rounded-lg border border-orange-500/30 min-h-[600px] hover-flames">
            {renderCurrentStep()}
          </div>
        </div>
      </div>
    </div>
  );
};