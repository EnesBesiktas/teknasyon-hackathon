import React from 'react';
import { BarChart3, TrendingUp, AlertTriangle, Users, CheckCircle, ArrowRight, Globe } from 'lucide-react';
import type { AnalysisResult, Country } from '../../types/iron-bank';
import { Button } from '../ui/Button';

interface AnalysisResultsProps {
  analysisData: AnalysisResult | null;
  targetCountries: Country[];
  onContinue: () => void;
  isLoading: boolean;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  analysisData,
  targetCountries,
  onContinue,
  isLoading
}) => {
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
              ⚔️ Kültürel Uygunluk Raporu
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

        {/* Action Buttons */}
        <div className="text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Button
              onClick={onContinue}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-orange-700 transition-all duration-200 flex items-center gap-3 hover-flames"
            >
              ⚔️ Yerelleştirmeye Başla
              <ArrowRight className="w-5 h-5" />
            </Button>

            <button className="px-8 py-4 border-2 border-orange-500/50 text-orange-200 font-semibold rounded-lg hover:border-orange-400 hover:bg-black/30 transition-all duration-200">
              📄 Raporu İndir
            </button>
          </div>

          <p className="text-orange-200 text-sm mt-4 drop-shadow-lg">
            Bir sonraki adımda videonuz seçili dillere çevrilecek ve yerel kültürlere uyarlanacak.
          </p>
        </div>
      </div>
    </div>
  );
};