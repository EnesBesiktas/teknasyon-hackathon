import React, { useState, useEffect } from 'react';
import { Globe2, Mic, FileText, ArrowRight, Clock, AlertCircle, CheckCircle, Play, Download } from 'lucide-react';
import type { Country, LocalizationProgress } from '../../types/iron-bank';
import { Button } from '../ui/Button';

interface LocalizationWorkspaceProps {
  targetCountries: Country[];
  localizationProgress: LocalizationProgress | null;
  onContinue: () => void;
  onUpdateProgress: (progress: LocalizationProgress) => void;
}

export const LocalizationWorkspace: React.FC<LocalizationWorkspaceProps> = ({
  targetCountries,
  localizationProgress,
  onContinue,
  onUpdateProgress
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Simulate processing
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

  const startAllProcessing = () => {
    if (!localizationProgress) return;

    setIsProcessing(true);

    const newProgress = { ...localizationProgress };

    // Start dubbing for all countries
    newProgress.dubbing = newProgress.dubbing.map(item => ({
      ...item,
      status: item.status === 'pending' ? 'processing' : item.status,
      progress: item.status === 'pending' ? 5 : item.progress
    }));

    // Start translation for all countries
    newProgress.translation = newProgress.translation.map(item => ({
      ...item,
      status: item.status === 'pending' ? 'processing' : item.status,
      progress: item.status === 'pending' ? 3 : item.progress
    }));

    // Start adaptation
    if (newProgress.adaptation.status === 'pending') {
      newProgress.adaptation = {
        ...newProgress.adaptation,
        status: 'processing',
        progress: 2
      };
    }

    onUpdateProgress(newProgress);
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
    return <div className="p-8 text-center">Yükleniyor...</div>;
  }

  return (
    <div className="p-6">
      <div className="w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe2 className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">
              Akıllı Yerelleştirme
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Videonuz seçili dillere çevriliyor ve yerel kültürlere uyarlanıyor
          </p>
        </div>

        {/* Start Button */}
        <div className="text-center mb-8">
          <Button
            onClick={startAllProcessing}
            disabled={isProcessing || isAllCompleted}
            className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isProcessing ? 'Yerelleştirme Devam Ediyor...' : isAllCompleted ? 'Yerelleştirme Tamamlandı' : 'Uyarlamayı Başlat'}
          </Button>
          <p className="text-gray-600 mt-3">
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
                          <Button className="flex-1 flex items-center justify-center gap-1 px-2 py-1 bg-green-600 text-white border border-green-500 rounded text-xs hover:bg-green-700">
                            <Play className="w-3 h-3" />
                            Dinle
                          </Button>
                          <Button className="flex items-center justify-center gap-1 px-2 py-1 bg-blue-600 text-white border border-blue-500 rounded text-xs hover:bg-blue-700">
                            <Download className="w-3 h-3" />
                            İndir
                          </Button>
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
          <div className="flex justify-center mb-6">
            <div className="w-full max-w-2xl bg-black/60 backdrop-blur-sm rounded-lg border border-orange-500/50 p-4 hover-flames">
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
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-purple-600/80 to-orange-600/80">
                    <div className="text-center text-white">
                      <span className="text-4xl mb-2 block">🎬</span>
                      <p className="text-lg font-medium">Yerelleştirilmiş Video</p>
                      <p className="text-xs opacity-80">Tüm dillerde hazır</p>
                    </div>
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center group hover-flames">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-all shadow-lg">
                      <Play className="w-8 h-8 text-purple-600 ml-1" />
                    </div>
                  </button>
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
                    <Button className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors shadow-lg">
                      <Play className="w-4 h-4" />
                      İzle
                    </Button>
                    <Button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors shadow-lg">
                      <Download className="w-4 h-4" />
                      İndir
                    </Button>
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