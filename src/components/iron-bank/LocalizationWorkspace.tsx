import React, { useState, useEffect } from 'react';
import { Globe2, Mic, FileText, ArrowRight, Clock, AlertCircle, CheckCircle, Play, Download } from 'lucide-react';
import type { Country, LocalizationProgress } from '../../types/iron-bank';
import { Button } from '../ui/Button';
import { LocalizationApi } from '../../services/api/localization';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface LocalizationWorkspaceProps {
  targetCountries: Country[];
  localizationProgress: LocalizationProgress | null;
  onContinue: () => void;
  onUpdateProgress: (progress: LocalizationProgress) => void;
  videoId?: number | null;
  initialLocalizationResult?: any;
}

export const LocalizationWorkspace: React.FC<LocalizationWorkspaceProps> = ({
  targetCountries,
  localizationProgress,
  onContinue,
  onUpdateProgress,
  videoId,
  initialLocalizationResult
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [localizationResults, setLocalizationResults] = useState<Record<string, any>>({});

  // Initialize localization results with initial result if available
  useEffect(() => {
    if (initialLocalizationResult && targetCountries.length > 0) {
      const firstCountry = targetCountries[0];
      setLocalizationResults(prev => ({
        ...prev,
        [firstCountry.code]: initialLocalizationResult
      }));
    }
  }, [initialLocalizationResult, targetCountries]);

  const storage = useLocalStorage();
  const localizationApi = new LocalizationApi(storage);

  // Initialize progress if not exists
  useEffect(() => {
    if (!localizationProgress) {
      const initialProgress: LocalizationProgress = {
        dubbing: targetCountries.map(country => ({
          status: 'pending',
          progress: 0,
          language: country.language
        })),
        translation: targetCountries.map(country => ({
          status: 'pending',
          progress: 0,
          language: country.language
        })),
        adaptation: {
          status: 'pending',
          progress: 0,
          changes: []
        }
      };
      onUpdateProgress(initialProgress);
    }
  }, [targetCountries, localizationProgress, onUpdateProgress]);

  // FAST single-country localization processing - Backend deaktif edildi
  const startLocalization = async (country: Country) => {
    if (!videoId) {
      console.error('No video ID provided for localization');
      return;
    }

    setIsProcessing(true);
    try {
      console.log(`Starting FAST localization for ${country.name} (${country.code})`);

      // Backend bağlantısı geçici olarak deaktif edildi - geliştirme için
      // const result = await localizationApi.fastLocalize({
      //   video_id: videoId,
      //   country_code: country.code,
      //   force_local_tts: false,
      // });

      // console.log(`FAST localization result for ${country.code}:`, result);

      // Simulated result for development
      const result = {
        status: 'completed',
        final_video_url: `https://example.com/localized_${country.code}.mp4`,
        country_code: country.code
      };

      console.log(`Simulated localization result for ${country.code}:`, result);

      setLocalizationResults(prev => ({
        ...prev,
        [country.code]: result
      }));

      // Update progress for this country
      const newProgress = { ...localizationProgress } as LocalizationProgress;
      if (newProgress && newProgress.dubbing) {
        const dubbingIndex = newProgress.dubbing.findIndex(d => d.language === country.language);
        if (dubbingIndex !== -1) {
          newProgress.dubbing[dubbingIndex] = {
            status: result.status === 'completed' ? 'completed' : 'processing',
            progress: result.status === 'completed' ? 100 : 75,
            language: country.language
          };
        }
      }

      if (newProgress && newProgress.translation) {
        const translationIndex = newProgress.translation.findIndex(t => t.language === country.language);
        if (translationIndex !== -1) {
          newProgress.translation[translationIndex] = {
            status: result.status === 'completed' ? 'completed' : 'processing',
            progress: result.status === 'completed' ? 100 : 80,
            language: country.language
          };
        }
      }

      if (newProgress && newProgress.dubbing && newProgress.translation) {
        onUpdateProgress(newProgress);
      }
    } catch (error) {
      console.error(`Localization failed for ${country.code}:`, error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Simulate processing for demo purposes
  useEffect(() => {
    if (!localizationProgress) return;

    const timer = setInterval(() => {
      const newProgress = { ...localizationProgress };
      let hasUpdates = false;

      // Update dubbing progress
      newProgress.dubbing = newProgress.dubbing.map(item => {
        if (item.status === 'processing' && item.progress < 100) {
          hasUpdates = true;
          return { ...item, progress: Math.min(100, item.progress + Math.random() * 15 + 5) };
        } else if (item.status === 'processing' && item.progress >= 100) {
          hasUpdates = true;
          return { ...item, status: 'completed', progress: 100 };
        }
        return item;
      });

      // Update translation progress
      newProgress.translation = newProgress.translation.map(item => {
        if (item.status === 'processing' && item.progress < 100) {
          hasUpdates = true;
          return { ...item, progress: Math.min(100, item.progress + Math.random() * 20 + 8) };
        } else if (item.status === 'processing' && item.progress >= 100) {
          hasUpdates = true;
          return { ...item, status: 'completed', progress: 100 };
        }
        return item;
      });

      // Update adaptation progress
      if (newProgress.adaptation.status === 'processing' && newProgress.adaptation.progress < 100) {
        hasUpdates = true;
        newProgress.adaptation.progress = Math.min(100, newProgress.adaptation.progress + Math.random() * 12 + 6);

        if (newProgress.adaptation.progress >= 100) {
          newProgress.adaptation.status = 'completed';
          newProgress.adaptation.changes = [
            'Renk tonları Asya pazarı için uyarlandı',
            'Müzik tempolu sürümle değiştirildi',
            'Metin boyutu okunabilirlik için artırıldı'
          ];
        }
      }

      if (hasUpdates) {
        onUpdateProgress(newProgress);
      }
    }, 500);

    return () => clearInterval(timer);
  }, [localizationProgress, onUpdateProgress]);

  const startAllProcessing = async () => {
    if (!localizationProgress || !videoId) return;

    setIsProcessing(true);

    try {
      // Backend bağlantısı geçici olarak deaktif edildi - geliştirme için
      // Start real localization for each country that isn't already completed
      // for (const country of targetCountries) {
      //   // Check if this country is already completed
      //   const dubbingStatus = localizationProgress.dubbing.find(d => d.language === country.language);
      //   const translationStatus = localizationProgress.translation.find(t => t.language === country.language);

      //   if (dubbingStatus?.status === 'completed' && translationStatus?.status === 'completed') {
      //     console.log(`Skipping ${country.name} - already completed`);
      //     continue;
      //   }

      //   console.log(`Starting localization for ${country.name}...`);
      //   await startLocalization(country);
      // }

      // Simulated processing for development
      console.log('Starting simulated localization for all countries...');
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate results for all countries
      const simulatedResults = {};
      targetCountries.forEach(country => {
        simulatedResults[country.code] = {
          status: 'completed',
          final_video_url: `https://example.com/localized_${country.code}.mp4`,
          country_code: country.code
        };
      });
      
      setLocalizationResults(simulatedResults);

      // Update adaptation status after all localizations
    const newProgress = { ...localizationProgress };
    if (newProgress.adaptation.status === 'pending') {
      newProgress.adaptation = {
        ...newProgress.adaptation,
          status: 'completed',
          progress: 100,
          changes: [
            'Kültürel referanslar yerel pazara uyarlandı',
            'Renk paletleri hedef ülke tercihlerine göre düzenlendi',
            'Müzik ve ses efektleri optimize edildi'
          ]
        };
        onUpdateProgress(newProgress);
      }
    } catch (error) {
      console.error('Localization failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusIcon = (status: 'pending' | 'processing' | 'completed' | 'failed') => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'processing':
        return <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };


  const isAllCompleted = Boolean(localizationProgress &&
    localizationProgress.dubbing.every(item => item.status === 'completed') &&
    localizationProgress.translation.every(item => item.status === 'completed') &&
    localizationProgress.adaptation.status === 'completed');

  // Reset processing state when all tasks are completed
  useEffect(() => {
    if (isAllCompleted && isProcessing) {
      setIsProcessing(false);
    }
  }, [isAllCompleted, isProcessing]);

  if (!localizationProgress) {
    return <div className="p-8 text-center text-orange-200 drop-shadow-lg">⚔️ Yükleniyor...</div>;
  }

  return (
    <div className="p-6">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe2 className="w-8 h-8 text-orange-400" />
            <h2 className="text-3xl font-bold text-white drop-shadow-lg">
              Akıllı Yerelleştirme
            </h2>
          </div>
          <p className="text-orange-200 text-lg drop-shadow-lg">
            Videonuz seçili dillere çevriliyor ve yerel kültürlere uyarlanıyor
          </p>
        </div>

        {/* Start Button */}
        <div className="text-center mb-8">
          <Button
            onClick={startAllProcessing}
            disabled={isProcessing || isAllCompleted}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 text-white text-lg font-semibold rounded-lg hover:from-purple-700 hover:to-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 hover-flames"
          >
            {isProcessing ? '⚔️ Yerelleştirme Devam Ediyor...' : isAllCompleted ? '✅ Yerelleştirme Tamamlandı' : '⚔️ Uyarlamayı Başlat'}
          </Button>
          <p className="text-orange-200 mt-3 drop-shadow-lg">
            {!isProcessing && !isAllCompleted && 'Tüm yerelleştirme işlemleri otomatik olarak başlatılacak'}
            {isProcessing && 'Dublaj, çeviri ve kültürel uyarlama işlemleri devam ediyor'}
            {isAllCompleted && 'Tüm yerelleştirme işlemleri başarıyla tamamlandı'}
          </p>
        </div>

        {/* Progress Overview - Panel Layout */}
        {(isProcessing || isAllCompleted) && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Dubbing Panel */}
            <div className="bg-black/50 backdrop-blur-sm border border-green-500/50 rounded-lg overflow-hidden hover-flames">
              <div className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-b border-green-500/30 p-4">
                <div className="flex items-center gap-3">
                  <Mic className="w-6 h-6 text-green-400" />
                  <h3 className="text-lg font-semibold text-white drop-shadow-lg">Ses Dublajı</h3>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {localizationProgress.dubbing.map((item, index) => {
                  const country = targetCountries[index];
                  return (
                    <div key={country.code} className="border border-gray-600/30 rounded-lg p-3 bg-black/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{country.flag}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-white">{country.name}</p>
                          <p className="text-xs text-gray-300">{item.language}</p>
                        </div>
                          {getStatusIcon(item.status)}
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-300 mb-1">
                          <span>İlerleme</span>
                          <span>{Math.round(item.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              item.status === 'completed' ? 'bg-green-500' : 'bg-green-400'
                            }`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                      {item.status === 'completed' && (
                        <div className="flex gap-2">
                          {localizationResults[country.code]?.final_video_url ? (
                            <>
                              <Button
                                onClick={() => window.open(localizationResults[country.code].final_video_url, '_blank')}
                                className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-green-600 text-white border border-green-500 rounded text-xs hover:bg-green-700"
                              >
                                <Play className="w-3 h-3" />
                                İzle
                          </Button>
                              <Button
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = localizationResults[country.code].final_video_url;
                                  link.download = `localized_${country.code}.mp4`;
                                  link.click();
                                }}
                                className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-600 text-white border border-blue-500 rounded text-xs hover:bg-blue-700"
                              >
                                <Download className="w-3 h-3" />
                            İndir
                          </Button>
                            </>
                          ) : (
                            <div className="text-xs text-gray-400">Video işleniyor...</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Translation Panel */}
            <div className="bg-black/50 backdrop-blur-sm border border-blue-500/50 rounded-lg overflow-hidden hover-flames">
              <div className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-b border-blue-500/30 p-4">
                <div className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white drop-shadow-lg">Metin Çevirisi</h3>
                </div>
              </div>
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {localizationProgress.translation.map((item, index) => {
                  const country = targetCountries[index];
                  return (
                    <div key={country.code} className="border border-gray-600/30 rounded-lg p-3 bg-black/30">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-lg">{country.flag}</span>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-white">{country.name}</p>
                          <p className="text-xs text-gray-300">{item.language}</p>
                        </div>
                          {getStatusIcon(item.status)}
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs text-gray-300 mb-1">
                          <span>İlerleme</span>
                          <span>{Math.round(item.progress)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              item.status === 'completed' ? 'bg-blue-500' : 'bg-blue-400'
                            }`}
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                      </div>
                      {item.status === 'completed' && (
                        <div className="space-y-2">
                          <div className="bg-gray-800/50 rounded p-2">
                            <p className="text-xs text-gray-200">"Yeni ürünümüzü keşfedin - hayatınızı değiştirecek teknoloji..."</p>
                          </div>
                          <Button className="w-full flex items-center justify-center gap-1 px-2 py-1 bg-blue-600 text-white border border-blue-500 rounded text-xs hover:bg-blue-700">
                            <Download className="w-3 h-3" />
                            SRT İndir
                          </Button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Cultural Adaptation Panel */}
            <div className="bg-black/50 backdrop-blur-sm border border-purple-500/50 rounded-lg overflow-hidden hover-flames">
              <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-b border-purple-500/30 p-4">
                <div className="flex items-center gap-3">
                  <Globe2 className="w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-semibold text-white drop-shadow-lg">Kültürel Uyarlama</h3>
                </div>
              </div>
              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-semibold text-white">Otomatik Uyarlama</h4>
                    {getStatusIcon(localizationProgress.adaptation.status)}
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-300 mb-1">
                    <span>İlerleme</span>
                    <span>{Math.round(localizationProgress.adaptation.progress)}%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        localizationProgress.adaptation.status === 'completed' ? 'bg-purple-500' : 'bg-purple-400'
                      }`}
                      style={{ width: `${localizationProgress.adaptation.progress}%` }}
                    />
                  </div>
                </div>
                {localizationProgress.adaptation.status === 'completed' && (
                  <div>
                    <h5 className="font-medium text-white mb-2 text-sm">Yapılan Değişiklikler:</h5>
                    <ul className="space-y-1">
                      {localizationProgress.adaptation.changes.map((change, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-200 text-xs">{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

          </div>
        )}

        {/* Single Video Area - Compact */}
        {isAllCompleted && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Sol: Yerelleştirilmiş Video */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-orange-500/50 p-4 hover-flames">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                  🎬 Yerelleştirilmiş Video
                </h3>
                <p className="text-orange-200 text-sm">
                  Hazır videonuzu izleyin ve indirin
                </p>
              </div>
              
              {/* Compact Video Player */}
              <div className="bg-black/50 rounded-lg border border-gray-600/50 overflow-hidden">
                {/* Video Player */}
                <div className="relative bg-black aspect-video">
                  {/* Show actual video if available */}
                  {Object.values(localizationResults).length > 0 && Object.values(localizationResults)[0].final_video_url ? (
                    <video
                      controls
                      className="w-full h-full rounded-lg"
                      src={Object.values(localizationResults)[0].final_video_url}
                      poster="/placeholder-video-poster.jpg"
                    >
                      <source src={Object.values(localizationResults)[0].final_video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/80 to-orange-600/80">
                        <div className="text-center text-white">
                          <span className="text-4xl mb-2 block">🎬</span>
                          <p className="text-lg font-medium">
                            {isProcessing ? 'Yerelleştirme Devam Ediyor...' : 'Yerelleştirilmiş Video'}
                          </p>
                          <p className="text-xs opacity-80">
                            {isProcessing ? 'Video hazırlanıyor' : 'Tüm dillerde hazır'}
                          </p>
                        </div>
                      </div>
                      {!isProcessing && (
                        <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all shadow-lg">
                            <Play className="w-8 h-8 text-purple-600 ml-1" />
                          </div>
                        </button>
                      )}
                    </>
                  )}
                </div>
                
                {/* Video Info */}
                <div className="p-4">
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-bold text-white mb-1">Yerelleştirme Tamamlandı</h4>
                    <p className="text-gray-300 text-sm">
                      Video tüm seçili dillere başarıyla çevrildi
                    </p>
                  </div>
                  
                  {/* Language Flags */}
                  <div className="flex justify-center gap-3 mb-4">
                    {targetCountries.map((country) => (
                      <div key={country.code} className="text-center">
                        <span className="text-2xl block mb-1">{country.flag}</span>
                        <p className="text-xs text-gray-300">{country.language}</p>
                      </div>
                    ))}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                    {Object.values(localizationResults).length > 0 && Object.values(localizationResults)[0].final_video_url ? (
                      <>
                        <Button
                          onClick={() => window.open(Object.values(localizationResults)[0].final_video_url, '_blank')}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
                        >
                          <Play className="w-4 h-4" />
                          Yeni Sekmede İzle
                        </Button>
                        <Button
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = Object.values(localizationResults)[0].final_video_url;
                            link.download = `localized_${targetCountries[0]?.code || 'video'}.mp4`;
                            link.click();
                          }}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors shadow-lg"
                        >
                          <Download className="w-4 h-4" />
                          İndir
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button disabled className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-gray-300 text-sm rounded-lg cursor-not-allowed">
                          <Play className="w-4 h-4" />
                          {isProcessing ? 'Hazırlanıyor...' : 'İzle'}
                        </Button>
                        <Button disabled className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-gray-300 text-sm rounded-lg cursor-not-allowed">
                          <Download className="w-4 h-4" />
                          İndir
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ: Güçlendirilmiş Video ve Görsel Alanı */}
            <div className="bg-black/60 backdrop-blur-sm rounded-lg border border-orange-500/50 p-4 hover-flames">
              <div className="text-center mb-4">
                <h3 className="text-lg font-bold text-white mb-1 drop-shadow-lg">
                  ⚔️ Güçlendirilmiş Medya
            </h3>
                <p className="text-orange-200 text-sm">
                  AI destekli video ve görsel işleme
                </p>
              </div>
              
              {/* 2 Video + 4 Görsel Layout */}
              <div className="space-y-3">
                {/* Üst Satır - 2 Video */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Video 1 */}
                  <div className="bg-black/50 rounded-lg border border-gray-600/50 overflow-hidden group hover:scale-105 transition-transform duration-300">
                    <div className="relative bg-black aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-600/80 to-red-600/80 group-hover:from-orange-500/90 group-hover:to-red-500/90 transition-all duration-300">
                        <div className="text-center text-white group-hover:scale-110 transition-transform duration-300">
                          <span className="text-2xl mb-2 block group-hover:text-3xl transition-all duration-300">⚔️</span>
                          <p className="text-sm font-medium group-hover:text-base transition-all duration-300">Ana Video</p>
                          <p className="text-xs opacity-80 group-hover:text-sm group-hover:opacity-100 transition-all duration-300">AI ile optimize edildi</p>
                        </div>
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-12 group-hover:h-12 transition-all duration-300 shadow-lg">
                          <Play className="w-5 h-5 text-orange-600 ml-1 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
                        </div>
                      </button>
                      <div className="absolute top-2 right-2 group-hover:top-3 group-hover:right-3 transition-all duration-300">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-1 rounded-full text-xs font-bold group-hover:px-3 group-hover:py-1.5 group-hover:text-sm transition-all duration-300">
                          AI
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Video 2 */}
                  <div className="bg-black/50 rounded-lg border border-gray-600/50 overflow-hidden group hover:scale-105 transition-transform duration-300">
                    <div className="relative bg-black aspect-video">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/80 to-orange-600/80 group-hover:from-purple-500/90 group-hover:to-orange-500/90 transition-all duration-300">
                        <div className="text-center text-white group-hover:scale-110 transition-transform duration-300">
                          <span className="text-2xl mb-2 block group-hover:text-3xl transition-all duration-300">🎬</span>
                          <p className="text-sm font-medium group-hover:text-base transition-all duration-300">Video 2</p>
                          <p className="text-xs opacity-80 group-hover:text-sm group-hover:opacity-100 transition-all duration-300">AI ile optimize edildi</p>
                        </div>
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                        <div className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-12 group-hover:h-12 transition-all duration-300 shadow-lg">
                          <Play className="w-5 h-5 text-purple-600 ml-1 group-hover:w-6 group-hover:h-6 transition-all duration-300" />
                        </div>
                      </button>
                      <div className="absolute top-2 right-2 group-hover:top-3 group-hover:right-3 transition-all duration-300">
                        <div className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold group-hover:px-3 group-hover:py-1.5 group-hover:text-sm transition-all duration-300">
                          AI
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alt Satır - 4 Görsel Koyma Alanı */}
                <div className="grid grid-cols-4 gap-2">
                  {/* Görsel 1 */}
                  <div className="bg-black/50 rounded-lg border border-gray-600/50 overflow-hidden group hover:scale-110 transition-transform duration-300">
                    <div className="relative bg-black aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-600/80 to-blue-600/80 group-hover:from-green-500/90 group-hover:to-blue-500/90 transition-all duration-300">
                        <div className="text-center text-white group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg mb-1 block group-hover:text-xl transition-all duration-300">🖼️</span>
                          <p className="text-xs font-medium group-hover:text-sm transition-all duration-300">Görsel 1</p>
                        </div>
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-8 group-hover:h-8 transition-all duration-300 shadow-lg">
                          <div className="w-3 h-3 text-green-600 group-hover:w-4 group-hover:h-4 transition-all duration-300">👁️</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Görsel 2 */}
                  <div className="bg-black/50 rounded-lg border border-gray-600/50 overflow-hidden group hover:scale-110 transition-transform duration-300">
                    <div className="relative bg-black aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-600/80 to-orange-600/80 group-hover:from-yellow-500/90 group-hover:to-orange-500/90 transition-all duration-300">
                        <div className="text-center text-white group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg mb-1 block group-hover:text-xl transition-all duration-300">📸</span>
                          <p className="text-xs font-medium group-hover:text-sm transition-all duration-300">Görsel 2</p>
                        </div>
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-8 group-hover:h-8 transition-all duration-300 shadow-lg">
                          <div className="w-3 h-3 text-yellow-600 group-hover:w-4 group-hover:h-4 transition-all duration-300">👁️</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Görsel 3 */}
                  <div className="bg-black/50 rounded-lg border border-gray-600/50 overflow-hidden group hover:scale-110 transition-transform duration-300">
                    <div className="relative bg-black aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-600/80 to-pink-600/80 group-hover:from-red-500/90 group-hover:to-pink-500/90 transition-all duration-300">
                        <div className="text-center text-white group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg mb-1 block group-hover:text-xl transition-all duration-300">🎨</span>
                          <p className="text-xs font-medium group-hover:text-sm transition-all duration-300">Görsel 3</p>
                        </div>
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-8 group-hover:h-8 transition-all duration-300 shadow-lg">
                          <div className="w-3 h-3 text-red-600 group-hover:w-4 group-hover:h-4 transition-all duration-300">👁️</div>
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Görsel 4 */}
                  <div className="bg-black/50 rounded-lg border border-gray-600/50 overflow-hidden group hover:scale-110 transition-transform duration-300">
                    <div className="relative bg-black aspect-square">
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/80 to-blue-600/80 group-hover:from-purple-500/90 group-hover:to-blue-500/90 transition-all duration-300">
                        <div className="text-center text-white group-hover:scale-110 transition-transform duration-300">
                          <span className="text-lg mb-1 block group-hover:text-xl transition-all duration-300">🖼️</span>
                          <p className="text-xs font-medium group-hover:text-sm transition-all duration-300">Görsel 4</p>
                        </div>
                      </div>
                      <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                        <div className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-8 group-hover:h-8 transition-all duration-300 shadow-lg">
                          <div className="w-3 h-3 text-purple-600 group-hover:w-4 group-hover:h-4 transition-all duration-300">👁️</div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* AI Güçlendirmesi ve Action Buttons - Aşağıda */}
                <div className="grid grid-cols-2 gap-3 mt-3">
                  {/* AI Güçlendirmesi */}
                  <div className="bg-black/30 rounded-lg border border-gray-600/50 overflow-hidden">
                    <div className="p-3 h-full flex flex-col justify-center">
                      <div className="text-center mb-3">
                        <h4 className="text-sm font-bold text-white mb-1">AI Güçlendirmesi</h4>
                        <p className="text-gray-300 text-xs">
                          Tüm video ve görseller AI ile optimize edildi
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-black/40 rounded p-2 text-center">
                          <div className="text-orange-400 text-sm mb-1">🎯</div>
                          <p className="text-xs text-white">Kalite</p>
                        </div>
                        <div className="bg-black/40 rounded p-2 text-center">
                          <div className="text-orange-400 text-sm mb-1">⚡</div>
                          <p className="text-xs text-white">Hız</p>
                        </div>
                        <div className="bg-black/40 rounded p-2 text-center">
                          <div className="text-orange-400 text-sm mb-1">🔊</div>
                          <p className="text-xs text-white">Ses</p>
                        </div>
                        <div className="bg-black/40 rounded p-2 text-center">
                          <div className="text-orange-400 text-sm mb-1">🎨</div>
                          <p className="text-xs text-white">Görsel</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="bg-black/30 rounded-lg border border-gray-600/50 overflow-hidden">
                    <div className="p-3 h-full flex flex-col justify-center">
                      <div className="space-y-3">
                        <Button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-600 to-red-600 text-white text-sm rounded-lg hover:from-orange-700 hover:to-red-700 transition-colors shadow-lg">
                          <Play className="w-4 h-4" />
                          Tümünü İzle
                        </Button>
                        <Button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-600 to-orange-600 text-white text-sm rounded-lg hover:from-purple-700 hover:to-orange-700 transition-colors shadow-lg">
                          <Download className="w-4 h-4" />
                          Tümünü İndir
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Epic Continue Button */}
        {isAllCompleted && (
          <div className="text-center">
            <Button
              onClick={onContinue}
              className="hover-flames px-8 py-4 bg-gradient-to-r from-purple-600 to-orange-600 text-white font-bold rounded-lg hover:from-purple-700 hover:to-orange-700 transition-all duration-200 flex items-center gap-3 mx-auto shadow-lg shadow-orange-500/30"
            >
              ⚔️ Pazarlama Kampanyalarını Oluştur
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};