import React, { useState, useRef } from 'react';
import type { DragEvent } from 'react';
import { Upload, Film, AlertCircle, Globe } from 'lucide-react';
import type { Country } from '../../types/iron-bank';
import { AVAILABLE_COUNTRIES } from '../../types/iron-bank';
import { Button } from '../ui/Button';
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

export const VideoUploadForm: React.FC<VideoUploadFormProps> = ({
  onUpload,
  isLoading,
  error,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        return [...prev, country];
      }
    });
  };

  const handleSubmit = () => {
    if (selectedFile && selectedCountries.length > 0) {
      onUpload(selectedFile, selectedCountries);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-8 relative overflow-hidden dragon-fire-bg">
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
              cursor-pointer
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${isDragOver
                ? 'border-orange-400 bg-gradient-to-br from-orange-900/30 to-red-900/30 backdrop-blur-sm'
                : selectedFile
                  ? 'border-orange-400 bg-gradient-to-br from-orange-900/20 to-red-900/20 backdrop-blur-sm'
                  : 'border-gray-600 hover:border-orange-400 hover:bg-gradient-to-br hover:from-orange-900/10 hover:to-red-900/10 hover:backdrop-blur-sm'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
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
                {/* Dragon Fire Video Frame */}
                <div className="relative mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 p-1 flame-pulse">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                    <Film className="w-10 h-10 text-orange-400" />
                  </div>
                </div>
                
                {/* Epic Success Message */}
                <div className="text-center">
                  <p className="text-xl font-bold text-orange-400 drop-shadow-lg mb-2">
                    🐉 VIDEO HAZIR! 🐉
                  </p>
                  <p className="text-white font-semibold drop-shadow-lg">
                    <strong>{selectedFile.name}</strong>
                  </p>
                  <p className="text-orange-200 text-sm mt-1">
                    {formatFileSize(selectedFile.size)} • Conquest Ready
                  </p>
                </div>
                
                {/* Epic Change Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                  }}
                  className="hover-flames bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg mx-auto block"
                >
                  ⚔️ Başka Video Seç
                </button>
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
              ({selectedCountries.length} seçildi)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {AVAILABLE_COUNTRIES.map((country) => {
              const isSelected = selectedCountries.some(c => c.code === country.code);
              const isTurkey = country.code === 'TR';
              const isUS = country.code === 'US';
              const isDE = country.code === 'DE';
              const isES = country.code === 'ES';
              const isIT = country.code === 'IT';
              const isBR = country.code === 'BR';
              const isCN = country.code === 'CN';
              const hasSpecialBackground = isTurkey || isUS || isDE || isES || isIT || isBR || isCN;
              
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
              } else if (isBR) {
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
            <p className="text-orange-300 text-sm mt-3 flex items-center gap-2 drop-shadow-lg">
              <AlertCircle className="w-4 h-4" />
              En az bir hedef ülke seçmelisiniz
            </p>
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

        {/* Submit Button */}
        <div className="text-center">
          <Button
            onClick={handleSubmit}
            disabled={!selectedFile || selectedCountries.length === 0 || isLoading}
            className={`
              hover-flames px-8 py-4 text-lg font-semibold rounded-lg transition-all duration-200
              ${!selectedFile || selectedCountries.length === 0 || isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg hover:shadow-xl'
              }
            `}
          >
            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Feth Ediliyor...
              </div>
            ) : (
              'Fethet'
            )}
          </Button>

          {selectedFile && selectedCountries.length > 0 && (
            <p className="text-orange-200 text-sm mt-4 drop-shadow-lg">
              Video {selectedCountries.length} ülke için analiz edilecek
            </p>
          )}
        </div>
      </div>
    </div>
  );
};