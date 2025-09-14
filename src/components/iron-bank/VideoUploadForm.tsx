import React, { useState, useRef, useEffect } from 'react';
import type { DragEvent } from 'react';
import { Upload, Film, AlertCircle, Globe } from 'lucide-react';
import type { Country } from '../../types/iron-bank';
import { AVAILABLE_COUNTRIES } from '../../types/iron-bank';
import { Button } from '../ui/Button';
import { LocalizationApi } from '../../services/api/localization';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import starkLogo from '../../assets/stark1.png';
import arrynLogo from '../../assets/arryn1.jpg';
import hoaraLogo from '../../assets/house-hoara.jpg';
import lannisterLogo from '../../assets/lannister.jpg';
import durrandonLogo from '../../assets/durrandon.jpg';
import gardenerLogo from '../../assets/gardener.png';
import martellLogo from '../../assets/martell.jpg';

interface VideoUploadFormProps {
  onUpload: (file: File, countries: Country[]) => void;
  isLoading: boolean;
  error: string | null;
}

// Epic workflow animation steps
type EpicStep = {
  id: number;
  title: string;
  icon: string;
  description: string;
  duration: number;
};

const EPIC_WORKFLOW_STEPS: EpicStep[] = [
  { id: 1, title: "Sefere Hazırlanılıyor", icon: "⚔️", description: "Ejderler uyanıyor...", duration: 2000 },
  { id: 2, title: "Yola Çıkılıyor", icon: "🐉", description: "Ateş ve kan yolculuğu başlıyor...", duration: 2500 },
  { id: 3, title: "Hedef Tespit Edildi", icon: "🏰", description: "Düşman kalesi görünümde...", duration: 2000 },
  { id: 4, title: "Saldırı Başlıyor", icon: "⚔️", description: "Ejder ateşi yağıyor...", duration: 3000 },
  { id: 5, title: "Fethedildi!", icon: "🔥", description: "Zafer bizimdir! Dracarys!", duration: 2000 }
];

export const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  onUpload,
  isLoading,
  error,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [availableCountries, setAvailableCountries] = useState<Country[]>(AVAILABLE_COUNTRIES);

  // Epic animation states
  const [isEpicAnimationActive, setIsEpicAnimationActive] = useState(false);
  const [currentEpicStep, setCurrentEpicStep] = useState(0);
  const [epicProgress, setEpicProgress] = useState(0);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const epicTimeoutRef = useRef<number | null>(null);

  const storage = useLocalStorage();
  const localizationApi = useRef(new LocalizationApi(storage));

  useEffect(() => {
    // Backend bağlantısı geçici olarak deaktif edildi - geliştirme için
    // const fetchCountries = async () => {
    //   try {
    //     const countries = await localizationApi.current.getCountries(false);

    //     // Map backend countries to frontend format, keeping original order but using backend data
    //     const mappedCountries = AVAILABLE_COUNTRIES.map(frontendCountry => {
    //       const backendCountry = countries.find(bc => bc.country_code === frontendCountry.code);
    //       if (backendCountry) {
    //         return {
    //           ...frontendCountry,
    //           name: backendCountry.country_name,
    //           language: backendCountry.language_name,
    //         };
    //       }
    //       return frontendCountry;
    //     });

    //     setAvailableCountries(mappedCountries);
    //   } catch (error) {
    //     console.warn('Failed to fetch countries from backend, using fallback list');
    //     // Keep using AVAILABLE_COUNTRIES as fallback
    //   }
    // };

    // fetchCountries();
    
    // Şimdilik sadece frontend verilerini kullan
    setAvailableCountries(AVAILABLE_COUNTRIES);
  }, []); // ✅ Empty dependency array - runs only once on mount

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('video/')) {
      setSelectedFile(file);
    } else {
      alert('Lütfen sadece video dosyaları seçin (.mp4, .mov, .avi vb.)');
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleCountryToggle = (country: Country) => {
    setSelectedCountries(prev => {
      const isSelected = prev.some(c => c.code === country.code);
      if (isSelected) {
        return prev.filter(c => c.code !== country.code);
      } else {
        // SINGLE COUNTRY SELECTION: Replace any existing selection
        // This ensures only one country is selected at a time
        return [country];
      }
    });
  };

  const startEpicWorkflow = async () => {
    if (!selectedFile || selectedCountries.length === 0) return;

    setIsEpicAnimationActive(true);
    setCurrentEpicStep(0);
    setEpicProgress(0);

    // Execute each epic step
    for (let i = 0; i < EPIC_WORKFLOW_STEPS.length; i++) {
      setCurrentEpicStep(i);

      // Animate progress bar for current step
      const stepDuration = EPIC_WORKFLOW_STEPS[i].duration;
      const progressInterval = 50; // Update every 50ms
      const progressIncrement = 100 / (stepDuration / progressInterval);

      let currentProgress = 0;
      const progressTimer = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressTimer);
        }
        setEpicProgress(currentProgress);
      }, progressInterval);

      // Wait for step duration
      await new Promise(resolve => {
        epicTimeoutRef.current = setTimeout(resolve, stepDuration);
      });

      clearInterval(progressTimer);
      setEpicProgress(100);

      // Small delay between steps
      if (i < EPIC_WORKFLOW_STEPS.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setEpicProgress(0);
      }
    }

    // Epic animation complete - start actual upload process
    setTimeout(() => {
      setIsEpicAnimationActive(false);
      setCurrentEpicStep(0);
      setEpicProgress(0);
      onUpload(selectedFile, selectedCountries);
    }, 1000);
  };

  const handleSubmit = () => {
    if (selectedFile && selectedCountries.length > 0) {
      startEpicWorkflow();
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (epicTimeoutRef.current) {
        clearTimeout(epicTimeoutRef.current);
      }
    };
  }, []);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`p-8 relative overflow-hidden dragon-fire-bg ${isEpicAnimationActive ? 'pointer-events-none opacity-75' : ''}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
            Video Yükle ve Analiz Et
          </h2>
          <p className="text-orange-200 text-lg drop-shadow-lg">
            Reklamınızı yükleyin ve hedef ülkelerinizi seçin. AI analizi ile kültürel uygunluk raporunuzu alın.
          </p>
        </div>

        {/* File Upload Section */}
        <div className="mb-8">
          <div
            className={`
              ${selectedFile ? 'cursor-default' : 'cursor-pointer'}
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${isDragOver
                ? 'border-orange-400 bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm'
                : selectedFile
                  ? 'border-green-400 bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm'
                  : 'border-gray-600 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-900/10 hover:to-red-900/10 hover:backdrop-blur-sm'
              }
            `}
            onDragOver={selectedFile ? undefined : handleDragOver}
            onDragLeave={selectedFile ? undefined : handleDragLeave}
            onDrop={selectedFile ? undefined : handleDrop}
            onClick={selectedFile ? undefined : () => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileInputChange}
              className="hidden"
            />

            {selectedFile ? (
              <div className="space-y-6 relative">
                {/* Success Video Frame */}
                <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 p-1 animate-pulse">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Film className="w-10 h-10 text-green-400" />
                  </div>
                </div>
                
                {/* Epic Success Message */}
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-3">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-xl font-bold text-green-400 drop-shadow-lg">
                       VIDEO HAZIR! 
                    </p>
                  </div>
                  <p className="text-white font-semibold drop-shadow-lg">
                    <strong>{selectedFile.name}</strong>
                  </p>
                  <p className="text-green-200 text-sm mt-1">
                    {formatFileSize(selectedFile.size)} • Conquest Ready
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex justify-center">
                  {isDragOver ? (
                    <Upload className="w-12 h-12 text-orange-400 animate-bounce" />
                  ) : (
                    <Film className="w-12 h-12 text-gray-300" />
                  )}
                </div>
                <div>
                  <p className="text-lg font-semibold text-white drop-shadow-lg">
                    Video dosyanızı buraya sürükleyin
                  </p>
                  <p className="text-orange-200 mt-2 drop-shadow-lg">
                    veya <span className="text-orange-400 font-medium">dosya seç</span> butonuna tıklayın
                  </p>
                  <p className="text-gray-300 text-sm mt-2">
                    Desteklenen formatlar: MP4, MOV, AVI, WMV (Max 500MB)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Country Selection */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-orange-400" />
            <h3 className="text-xl font-semibold text-white drop-shadow-lg">
              Hedef Ülkeler
            </h3>
            <span className="text-sm text-orange-200 drop-shadow-lg">
              ({selectedCountries.length > 0 ? `${selectedCountries[0].name} seçildi` : 'Ülke seçin'})
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {availableCountries.map((country) => {
              const isSelected = selectedCountries.some(c => c.code === country.code);
              const isTurkey = country.code === 'TR';
              const isUS = country.code === 'US';
              const isDE = country.code === 'DE';
              const isES = country.code === 'ES';
              const isIT = country.code === 'IT';
              const isKP = country.code === 'KP';
              const isCN = country.code === 'CN';
              const hasSpecialBackground = isTurkey || isUS || isDE || isES || isIT || isKP || isCN;
              
              let backgroundStyle = {};
              if (isTurkey) {
                backgroundStyle = {
                  backgroundImage: `url(${starkLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                };
              } else if (isUS) {
                backgroundStyle = {
                  backgroundImage: `url(${arrynLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                };
              } else if (isDE) {
                backgroundStyle = {
                  backgroundImage: `url(${hoaraLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                };
              } else if (isES) {
                backgroundStyle = {
                  backgroundImage: `url(${lannisterLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                };
              } else if (isIT) {
                backgroundStyle = {
                  backgroundImage: `url(${durrandonLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                };
              } else if (isKP) {
                backgroundStyle = {
                  backgroundImage: `url(${gardenerLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                };
              } else if (isCN) {
                backgroundStyle = {
                  backgroundImage: `url(${martellLogo})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                };
              }
              
              return (
                <button
                  key={country.code}
                  onClick={() => handleCountryToggle(country)}
                  className={`
                    p-3 rounded-lg border-2 text-center transition-all duration-200 relative overflow-hidden
                    ${isSelected
                      ? 'border-orange-500 bg-orange-50 text-orange-900 shadow-lg shadow-orange-500/50 flame-border'
                      : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-50'
                    }
                  `}
                  style={backgroundStyle}
                >
                  {hasSpecialBackground && (
                    <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg"></div>
                  )}
                  <div className={`relative z-10 ${hasSpecialBackground ? 'text-white' : ''} ${isSelected && !hasSpecialBackground ? 'text-orange-900' : ''}`}>
                    <div className="text-2xl mb-1">{country.flag}</div>
                    <div className={`text-xs font-medium ${hasSpecialBackground ? 'text-white font-bold' : ''} ${isSelected && !hasSpecialBackground ? 'text-orange-900 font-bold' : ''}`}>
                      {country.name}
                    </div>
                    <div className={`text-xs mt-1 ${hasSpecialBackground ? 'text-gray-200 font-medium' : 'text-gray-500'} ${isSelected && !hasSpecialBackground ? 'text-orange-700 font-medium' : ''}`}>
                      {country.language}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedCountries.length === 0 && (
            <div className="mt-3 p-3 bg-orange-900/30 border border-orange-500/50 rounded-lg">
              <p className="text-orange-300 text-sm flex items-center gap-2 drop-shadow-lg">
                <AlertCircle className="w-4 h-4" />
                <strong>Tek ülke seçimi:</strong> Daha hızlı ve güvenilir işlem için sadece bir hedef ülke seçin
              </p>
            </div>
          )}

          {selectedCountries.length === 1 && (
            <div className="mt-3 p-3 bg-green-900/30 border border-green-500/50 rounded-lg">
              <p className="text-green-200 text-sm flex items-center gap-2 drop-shadow-lg">
                <AlertCircle className="w-4 h-4" />
                <strong>Seçilen ülke:</strong> {selectedCountries[0].name} ({selectedCountries[0].language}) - Doğrudan yerelleştirme hazır
              </p>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 font-medium">Hata</p>
            </div>
            <p className="text-red-600 mt-1">{error}</p>
          </div>
        )}

        {/* Epic Workflow Animation */}
        {isEpicAnimationActive && (
          <div className="fixed inset-0 epic-backdrop flex items-center justify-center z-50">
            <div className="text-center p-8 max-w-lg mx-4 relative">
              {/* Epic Step Display */}
              <div className="mb-8 relative">
                <div className="text-8xl mb-4 animate-dragon-roar relative z-10">
                  {EPIC_WORKFLOW_STEPS[currentEpicStep].icon}
                </div>

                {/* Epic Glow Effect Around Icon */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-radial from-orange-500/30 to-transparent animate-epic-pulse pointer-events-none"></div>

                <h2 className="text-4xl font-bold text-orange-400 mb-2 drop-shadow-2xl animate-fade-in relative z-10">
                  {EPIC_WORKFLOW_STEPS[currentEpicStep].title}
                </h2>
                <p className="text-xl text-orange-200 drop-shadow-lg animate-fade-in relative z-10">
                  {EPIC_WORKFLOW_STEPS[currentEpicStep].description}
                </p>

                {/* Epic Sound Effect Hints */}
                <div className="text-sm text-orange-300/70 mt-2 italic animate-pulse">
                  {currentEpicStep === 0 && "🎵 Ejder uyanma sesleri..."}
                  {currentEpicStep === 1 && "🎵 Kanat çırpma ve ateş nefesi..."}
                  {currentEpicStep === 2 && "🎵 Savaş davulları..."}
                  {currentEpicStep === 3 && "🎵 Epik savaş müziği..."}
                  {currentEpicStep === 4 && "🎵 Zafer fanfarları..."}
                </div>
              </div>

              {/* Epic Progress Bar */}
              <div className="w-full bg-gray-800 rounded-full h-4 mb-4 overflow-hidden shadow-2xl border border-orange-500">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 rounded-full transition-all duration-100 ease-out shadow-lg"
                  style={{ width: `${epicProgress}%` }}
                >
                  <div className="h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                </div>
              </div>

              {/* Dragon Fire Effects */}
              <div className="flex justify-center space-x-2 mb-4">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping"></div>
                <div className="w-3 h-3 bg-red-500 rounded-full animate-ping" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full animate-ping" style={{ animationDelay: '0.4s' }}></div>
              </div>

              {/* Step Progress Indicator */}
              <div className="flex justify-center space-x-2">
                {EPIC_WORKFLOW_STEPS.map((step, index) => (
                  <div
                    key={step.id}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index <= currentEpicStep
                        ? 'bg-orange-500 shadow-lg shadow-orange-500/50'
                        : 'bg-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Epic Particle Effects */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-orange-400 rounded-full animate-float"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`,
                      animationDuration: `${3 + Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || selectedCountries.length === 0 || isLoading || isEpicAnimationActive}
            className={`
              hover-flames px-8 py-4 text-lg font-bold rounded-lg transition-all duration-200 relative overflow-hidden
              ${!selectedFile || selectedCountries.length === 0 || isLoading || isEpicAnimationActive
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transform hover:scale-105 border border-orange-500/50 hover:border-orange-400/70'
              }
            `}
            style={{
              color: !selectedFile || selectedCountries.length === 0 || isLoading || isEpicAnimationActive ? undefined : 'white !important',
              textShadow: !selectedFile || selectedCountries.length === 0 || isLoading || isEpicAnimationActive ? undefined : '2px 2px 4px rgba(0,0,0,0.8) !important'
            }}
          >
            {isEpicAnimationActive ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 relative">
                  <div className="absolute inset-0 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <div className="absolute inset-1 border-2 border-red-500 border-b-transparent rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
                </div>
                <span className="animate-pulse">Ejderler Uçuyor...</span>
              </div>
            ) : isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Fethediliyor...
              </div>
            ) : (
              <span className="flex items-center gap-2 text-white font-bold drop-shadow-lg relative z-10">
                <span className="text-white font-bold opacity-100 !text-white !font-bold" style={{ color: 'white !important', opacity: '1 !important' }}>Fethet</span>
                <span className="text-2xl animate-bounce text-white !text-white" style={{ color: 'white !important' }}>⚔️</span>
              </span>
            )}

            {/* Dragon Fire Button Effects */}
            {!isEpicAnimationActive && !isLoading && selectedFile && selectedCountries.length > 0 && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-red-500/30 rounded-lg animate-pulse"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-red-600/10 rounded-lg animate-pulse"></div>
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-60 animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-60 animate-pulse"></div>
              </>
            )}
          </Button>

        </div>
      </div>
    </div>
  );
};