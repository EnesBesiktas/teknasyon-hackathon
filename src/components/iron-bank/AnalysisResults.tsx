import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Users, CheckCircle, ArrowRight, Globe, Target, MessageCircle, Shield, PieChart, Eye, EyeOff } from 'lucide-react';
import type { AnalysisResult, Country } from '../../types/iron-bank';
import { Button } from '../ui/Button';
import { LocalizationApi } from '../../services/api/localization';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface AnalysisResultsProps {
  analysisData: AnalysisResult | null;
  targetCountries: Country[];
  onContinue: () => void;
  isLoading: boolean;
  videoId?: number;
}

interface DetailedCulturalAnalysis {
  country_code: string;
  strengths?: string[];
  risks?: string[];
  adaptations?: string[];
  messaging?: {
    cta_examples: string[];
  };
  compliance?: string[];
  kpi_hypotheses?: string[];
  scores?: {
    cultural_fit_percent: number;
    content_suitability_percent: number;
    market_potential_percent: number;
  };
  target_audience?: {
    demographics: string[];
    interests: string[];
    channels: string[];
    messaging_tone: string;
    price_sensitivity: string;
  };
  error?: string;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysisData,
  targetCountries,
  onContinue,
  isLoading,
  videoId
}) => {
  const [detailedAnalysis, setDetailedAnalysis] = useState<DetailedCulturalAnalysis[]>([]);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [showDetailedView, setShowDetailedView] = useState(false);
  const storage = useLocalStorage();
  const localizationApi = new LocalizationApi(storage);

  // Load detailed cultural analysis
  useEffect(() => {
    if (videoId && targetCountries.length > 0 && !isLoadingDetails && detailedAnalysis.length === 0) {
      loadDetailedAnalysis();
    }
  }, [videoId, targetCountries]);

  const loadDetailedAnalysis = async () => {
    if (!videoId) return;

    setIsLoadingDetails(true);
    try {
      const response = await localizationApi.analyzeCulture({
        video_id: videoId,
        country_codes: targetCountries.map(c => c.code)
      });
      setDetailedAnalysis(response.results);
    } catch (error) {
      console.error('Failed to load detailed cultural analysis:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };
  if (isLoading || !analysisData) {
    return (
      <div className="p-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
            ⚔️ AI Analizi Devam Ediyor...
          </h2>
          <p className="text-orange-200 drop-shadow-lg">
            Videonuz kültürel uygunluk açısından analiz ediliyor. Bu işlem 1-2 dakika sürebilir.
          </p>
        </div>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };


  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <BarChart3 className="w-8 h-8 text-orange-400" />
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Kültürel Uygunluk Raporu
            </h2>
          </div>
          <p className="text-orange-200 text-lg drop-shadow-lg">
            AI analizi tamamlandı. İşte videonuzun hedef ülkelerdeki performans öngörüsü:
          </p>
        </div>

        {/* Target Countries */}
        <div className="mb-8 p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 hover-flames">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Hedef Ülkeler</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {targetCountries.map((country) => (
              <span
                key={country.code}
                className="inline-flex items-center gap-2 px-3 py-1 bg-black/40 rounded-full border border-orange-500/50"
              >
                <span className="text-lg">{country.flag}</span>
                <span className="text-sm font-medium text-white">{country.name}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Cultural Score */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 p-6 hover-flames">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-6 h-6 ${getScoreColor(analysisData.culturalScore)}`} />
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">Kültürel Uyum</h3>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(analysisData.culturalScore)} drop-shadow-lg`}>
                {analysisData.culturalScore}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  analysisData.culturalScore >= 80 ? 'bg-green-500' :
                  analysisData.culturalScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisData.culturalScore}%` }}
              />
            </div>
            <p className="text-sm text-orange-200">
              Hedef kültürlerde içeriğin ne kadar doğal karşılanacağını gösterir.
            </p>
          </div>

          {/* Content Suitability */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 p-6 hover-flames">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <CheckCircle className={`w-6 h-6 ${getScoreColor(analysisData.contentSuitability)}`} />
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">İçerik Uygunluğu</h3>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(analysisData.contentSuitability)} drop-shadow-lg`}>
                {analysisData.contentSuitability}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  analysisData.contentSuitability >= 80 ? 'bg-green-500' :
                  analysisData.contentSuitability >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisData.contentSuitability}%` }}
              />
            </div>
            <p className="text-sm text-orange-200">
              İçeriğin hedef pazarlardaki yasal ve sosyal normlara uygunluğu.
            </p>
          </div>

          {/* Market Potential */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 p-6 hover-flames">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className={`w-6 h-6 ${getScoreColor(analysisData.marketPotential)}`} />
                <h3 className="text-lg font-semibold text-white drop-shadow-lg">Pazar Potansiyeli</h3>
              </div>
              <span className={`text-2xl font-bold ${getScoreColor(analysisData.marketPotential)} drop-shadow-lg`}>
                {analysisData.marketPotential}%
              </span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mb-3">
              <div
                className={`h-3 rounded-full transition-all duration-300 ${
                  analysisData.marketPotential >= 80 ? 'bg-green-500' :
                  analysisData.marketPotential >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${analysisData.marketPotential}%` }}
              />
            </div>
            <p className="text-sm text-orange-200">
              Hedef pazarlarda öngörülen başarı ve etki düzeyi.
            </p>
          </div>
        </div>

        {/* Target Audience */}
        <div className="mb-8 p-6 bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 hover-flames">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white drop-shadow-lg">Hedef Kitle Analizi</h3>
          </div>
          <p className="text-orange-200 font-medium drop-shadow-lg">{analysisData.targetAudience}</p>
        </div>

        {/* Recommendations and Risks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Recommendations */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 p-6 hover-flames">
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">Güçlü Yönler</h3>
            </div>
            <ul className="space-y-3">
              {analysisData.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <span className="text-orange-200">{recommendation}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Factors */}
          <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-orange-500/50 p-6 hover-flames">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <h3 className="text-xl font-semibold text-white drop-shadow-lg">Dikkat Edilmesi Gerekenler</h3>
            </div>
            <ul className="space-y-3">
              {analysisData.riskFactors.map((risk, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="text-orange-200">{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

         {/* Action Buttons - Three buttons side by side, equal width */}
         <div className="text-center mb-8">
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
             {/* Detaylı Kültürel Analizi Görüntüle */}
             <Button
               onClick={() => setShowDetailedView(!showDetailedView)}
               disabled={isLoadingDetails}
               className="px-4 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-red-700 disabled:bg-gray-400 transition-all duration-200 flex items-center justify-center gap-2 hover-flames relative overflow-hidden w-full"
               style={{
                 color: 'white !important',
                 textShadow: '2px 2px 4px rgba(0,0,0,0.8) !important',
                 zIndex: 10
               }}
             >
               <div className="relative z-20 flex items-center justify-center gap-2">
                 {showDetailedView ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                 <span className="text-white font-bold drop-shadow-lg text-xs text-center">
                   {isLoadingDetails ? 'Detaylar Yükleniyor...' :
                    showDetailedView ? 'Detaylı Analizi Gizle' : 'Detaylı Kültürel Analizi Görüntüle'}
                 </span>
               </div>
               
               {/* Dragon Fire Effects - Behind text */}
               {!isLoadingDetails && (
                 <>
                   <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg animate-pulse"></div>
                   <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                   <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 to-red-600/5 rounded-lg animate-pulse"></div>
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-40 animate-pulse"></div>
                   <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-40 animate-pulse"></div>
                 </>
               )}
             </Button>

             {/* Yerelleştirmeye Başla */}
             <Button
               onClick={onContinue}
               className="px-4 py-4 bg-gradient-to-r from-purple-600 to-orange-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-orange-700 transition-all duration-200 flex items-center justify-center gap-2 hover-flames w-full"
             >
               ⚔️ Yerelleştirmeye Başla
               <ArrowRight className="w-4 h-4" />
             </Button>

             {/* Raporu İndir */}
             <button className="px-2 py-2 border-2 border-orange-500/50 text-orange-200 font-semibold rounded-lg hover:border-orange-400 hover:bg-black/30 transition-all duration-200 flex items-center justify-center gap-2 w-full">
               📄 Raporu İndir
             </button>
           </div>
         </div>

        {/* Detailed Cultural Analysis */}
        {showDetailedView && detailedAnalysis.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white text-center mb-6 drop-shadow-lg">
              🌍 Detaylı Kültürel Analiz Raporu
            </h2>

            {detailedAnalysis.map((analysis) => {
              const country = targetCountries.find(c => c.code === analysis.country_code);
              if (!country || analysis.error) return null;

              return (
                <div key={analysis.country_code} className="mb-8 p-6 bg-black/60 backdrop-blur-sm rounded-lg border border-blue-500/50 hover-flames">
                  {/* Country Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{country.flag}</span>
                    <h3 className="text-xl font-bold text-white drop-shadow-lg">
                      {country.name} Pazarı İçin Detaylı Analiz
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Strengths */}
                    {analysis.strengths && analysis.strengths.length > 0 && (
                      <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <h4 className="font-semibold text-white">Güçlü Yönler</h4>
                        </div>
                        <ul className="space-y-2">
                          {analysis.strengths.map((strength, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-green-200">
                              <span className="text-green-400 mt-1">•</span>
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Risks */}
                    {analysis.risks && analysis.risks.length > 0 && (
                      <div className="p-4 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <AlertTriangle className="w-5 h-5 text-amber-400" />
                          <h4 className="font-semibold text-white">Riskler & Dikkat Edilecekler</h4>
                        </div>
                        <ul className="space-y-2">
                          {analysis.risks.map((risk, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-amber-200">
                              <span className="text-amber-400 mt-1">•</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Adaptations */}
                    {analysis.adaptations && analysis.adaptations.length > 0 && (
                      <div className="p-4 bg-purple-900/20 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <Target className="w-5 h-5 text-purple-400" />
                          <h4 className="font-semibold text-white">Önerilen Uyarlamalar</h4>
                        </div>
                        <ul className="space-y-2">
                          {analysis.adaptations.map((adaptation, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-purple-200">
                              <span className="text-purple-400 mt-1">•</span>
                              {adaptation}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Messaging & CTA Examples */}
                    {analysis.messaging?.cta_examples && analysis.messaging.cta_examples.length > 0 && (
                      <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center gap-2 mb-3">
                          <MessageCircle className="w-5 h-5 text-blue-400" />
                          <h4 className="font-semibold text-white">CTA Örnekleri</h4>
                        </div>
                        <div className="space-y-2">
                          {analysis.messaging.cta_examples.map((cta, idx) => (
                            <div key={idx} className="p-2 bg-blue-800/30 rounded text-sm text-blue-100 font-medium">
                              "{cta}"
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Target Audience */}
                  {analysis.target_audience && (
                    <div className="mt-6 p-4 bg-indigo-900/20 border border-indigo-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-5 h-5 text-indigo-400" />
                        <h4 className="font-semibold text-white">Hedef Kitle Analizi</h4>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {analysis.target_audience.demographics && analysis.target_audience.demographics.length > 0 && (
                          <div>
                            <span className="text-indigo-300 font-medium">Demografik:</span>
                            <div className="text-indigo-200">{analysis.target_audience.demographics.join(', ')}</div>
                          </div>
                        )}
                        {analysis.target_audience.interests && analysis.target_audience.interests.length > 0 && (
                          <div>
                            <span className="text-indigo-300 font-medium">İlgi Alanları:</span>
                            <div className="text-indigo-200">{analysis.target_audience.interests.join(', ')}</div>
                          </div>
                        )}
                        {analysis.target_audience.channels && analysis.target_audience.channels.length > 0 && (
                          <div>
                            <span className="text-indigo-300 font-medium">Kanallar:</span>
                            <div className="text-indigo-200">{analysis.target_audience.channels.join(', ')}</div>
                          </div>
                        )}
                        {analysis.target_audience.messaging_tone && (
                          <div>
                            <span className="text-indigo-300 font-medium">Mesaj Tonu:</span>
                            <div className="text-indigo-200">{analysis.target_audience.messaging_tone}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* KPI Hypotheses */}
                  {analysis.kpi_hypotheses && analysis.kpi_hypotheses.length > 0 && (
                    <div className="mt-6 p-4 bg-teal-900/20 border border-teal-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <PieChart className="w-5 h-5 text-teal-400" />
                        <h4 className="font-semibold text-white">KPI Öngörüleri</h4>
                      </div>
                      <ul className="space-y-2">
                        {analysis.kpi_hypotheses.map((kpi, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-teal-200">
                            <span className="text-teal-400 mt-1">•</span>
                            {kpi}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Compliance */}
                  {analysis.compliance && analysis.compliance.length > 0 && (
                    <div className="mt-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="w-5 h-5 text-red-400" />
                        <h4 className="font-semibold text-white">Uyumluluk & Güvenlik</h4>
                      </div>
                      <ul className="space-y-2">
                        {analysis.compliance.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-red-200">
                            <span className="text-red-400 mt-1">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Info Text */}
        <div className="text-center">
          <p className="text-orange-200 text-sm mt-4 drop-shadow-lg">
            Bir sonraki adımda videonuz seçili dillere çevrilecek ve yerel kültürlere uyarlanacak.
          </p>
        </div>
      </div>
    </div>
  );
};