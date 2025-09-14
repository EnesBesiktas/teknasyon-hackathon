import React, { useState, useCallback, useEffect } from 'react';

import { DragonIcon } from '../components/ui/DragonIcon';
import { VideoUploadForm } from '../components/iron-bank/VideoUploadForm';
import { WorkflowStepper } from '../components/iron-bank/WorkflowStepper';
import { AnalysisResults } from '../components/iron-bank/AnalysisResults';
import { LocalizationWorkspace } from '../components/iron-bank/LocalizationWorkspace';
import { MarketingCampaigns } from '../components/iron-bank/MarketingCampaigns';
import type { IronBankState, WorkflowStep, Country, LocalizationProgress } from '../types/iron-bank';
import { useVideo } from '../hooks/useVideo';
import { LocalizationApi } from '../services/api/localization';
import { useLocalStorage } from '../hooks/useLocalStorage';

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

  const [uploadedVideoId, setUploadedVideoId] = useState<number | null>(null);
  const [localizationResult, setLocalizationResult] = useState<any>(null);

  const updateState = useCallback((updates: Partial<IronBankState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  const videoApi = useVideo();
  const storage = useLocalStorage();
  const localizationApi = new LocalizationApi(storage);

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
      // Backend bağlantısı geçici olarak deaktif edildi - geliştirme için
      // Step 1: Upload video to backend
      // console.log('Uploading video to backend...');
      // const uploadResponse = await videoApi.uploadVideo(file, 'Iron Bank video upload');
      // const videoId = uploadResponse.video.id;
      // setUploadedVideoId(videoId);

      // Simulated video ID for development
      const videoId = Math.floor(Math.random() * 1000000);
      setUploadedVideoId(videoId);

      console.log('Simulated video upload, ID:', videoId);

      // Step 2: Start transcription process
      // console.log('Starting transcription...');
      // await videoApi.transcribeVideo(videoId);

      console.log('Simulated transcription completed');

      // Step 3: Direct localization for the first selected country (no polling!)
      const firstCountry = countries[0];
      console.log('Starting SIMULATED localization for:', firstCountry.code);

      // Backend bağlantısı geçici olarak deaktif edildi - geliştirme için
      // Use direct localization API - this processes everything immediately
      // const localizationResult = await localizationApi.directLocalize({
      //   video_id: videoId,
      //   country_code: firstCountry.code,
      //   use_local_tts: false,
      //   music_only_background: true
      // });

      // Simulated localization result for development
      const localizationResult = {
        status: 'completed',
        final_video_url: `https://example.com/localized_${firstCountry.code}.mp4`,
        country_code: firstCountry.code,
        video_id: videoId
      };

      console.log('Simulated localization completed:', localizationResult);

      // Store localization result
      setLocalizationResult(localizationResult);

      // Step 4: Run cultural analysis for the first selected country
      console.log('Running SIMULATED cultural analysis for:', firstCountry.code);

      // Simulated analysis response for development
      const analysisResponse = {
        results: [{
          scores: {
            cultural_fit_percent: 85,
            content_suitability_percent: 92,
            market_potential_percent: 78
          },
          strengths: [
            'Güçlü görsel hikaye anlatımı',
            'Evrensel duygusal bağlantı',
            'Yüksek üretim kalitesi'
          ],
          weaknesses: [
            'Yerel kültürel referanslar eksik',
            'Dil uyarlaması gerekli'
          ],
          recommendations: [
            'Yerel kültürel öğeler ekleyin',
            'Dil çevirisi yapın',
            'Yerel müzik kullanın'
          ]
        }]
      };

      // Step 5: Transform backend analysis to frontend format
      const analysis = analysisResponse.results[0];
      const transformedAnalysis = {
        culturalScore: analysis?.scores?.cultural_fit_percent || 85,
        contentSuitability: analysis?.scores?.content_suitability_percent || 92,
        marketPotential: analysis?.scores?.market_potential_percent || 78,
        recommendations: analysis?.strengths || [
          'Video content shows positive cultural alignment',
          'Visual elements are appropriate for target market',
          'Message resonates well with local audience'
        ],
        riskFactors: analysis?.risks || [
          'Minor cultural sensitivity adjustments recommended',
          'Some expressions may need localization'
        ],
        targetAudience: analysis?.target_audience?.demographics?.join(', ') || '18-35 yaş arası, teknoloji ilgilisi kentli bireyler'
      };

      // Step 6: Initialize localization progress with completed state since we already have the result
      const initialProgress: LocalizationProgress = {
        dubbing: countries.map(country => ({
          status: country.code === firstCountry.code ? 'completed' : 'pending',
          progress: country.code === firstCountry.code ? 100 : 0,
          language: country.language
        })),
        translation: countries.map(country => ({
          status: country.code === firstCountry.code ? 'completed' : 'pending',
          progress: country.code === firstCountry.code ? 100 : 0,
          language: country.language
        })),
        adaptation: {
          status: 'completed',
          progress: 100,
          changes: [
            'Kültürel referanslar yerel pazara uyarlandı',
            'Ses dublajı otomatik olarak oluşturuldu',
            'Video başarıyla yerelleştirildi'
          ]
        }
      };

      updateState({
        analysisData: transformedAnalysis,
        localizationProgress: initialProgress,
        currentStep: 'analysis',
        isLoading: false
      });
    } catch (error) {
      console.error('Video upload and analysis failed:', error);
      let errorMessage = 'Video yükleme ve analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.';

      if (error instanceof Error) {
        if (error.message.includes('timeout')) {
          errorMessage = 'Video işleme zaman aşımına uğradı. Lütfen daha küçük bir video dosyası deneyin veya internet bağlantınızı kontrol edin.';
        } else if (error.message.includes('Upload timeout')) {
          errorMessage = 'Video yükleme zaman aşımına uğradı. Lütfen daha küçük bir dosya seçin veya internet bağlantınızı kontrol edin.';
        } else if (error.message.includes('File too large')) {
          errorMessage = 'Video dosyası çok büyük. Lütfen maksimum 500MB boyutunda bir dosya seçin.';
        } else {
          errorMessage = error.message;
        }
      }

      updateState({
        error: errorMessage,
        isLoading: false
      });
    }
  }, [updateState, videoApi, localizationApi]);

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
            videoId={uploadedVideoId || undefined}
          />
        );
      case 'localization':
        return (
          <LocalizationWorkspace
            targetCountries={state.targetCountries}
            localizationProgress={state.localizationProgress}
            onContinue={() => handleStepChange('marketing')}
            onUpdateProgress={(progress) => updateState({ localizationProgress: progress })}
            videoId={uploadedVideoId || undefined}
            initialLocalizationResult={localizationResult}
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