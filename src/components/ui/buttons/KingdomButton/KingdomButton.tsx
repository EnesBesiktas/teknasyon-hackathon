import React from 'react';
import { ArrowRight } from 'lucide-react';

export type PlatformType = 'instagram' | 'facebook' | 'twitter';

interface KingdomButtonProps {
  platform: PlatformType;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

// Platform Logo Components
const InstagramLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  </div>
);

const FacebookLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-8 h-8 rounded-lg bg-[#1877F2] flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  </div>
);

const XLogo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`w-8 h-8 rounded-lg bg-black flex items-center justify-center ${className}`}>
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  </div>
);

const platformConfig = {
  instagram: {
    name: 'The Visual Kingdom',
    description: 'Instagram Realm',
    logoComponent: InstagramLogo,
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    hoverGradient: 'from-pink-400 via-red-400 to-yellow-400',
    borderColor: 'border-pink-500',
    shadowColor: 'shadow-pink-500/25',
    textColor: 'text-white',
  },
  facebook: {
    name: 'The Social Realm',
    description: 'Facebook Kingdom',
    logoComponent: FacebookLogo,
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    hoverGradient: 'from-blue-500 via-blue-400 to-blue-300',
    borderColor: 'border-blue-500',
    shadowColor: 'shadow-blue-500/25',
    textColor: 'text-white',
  },
  twitter: {
    name: 'The News Empire',
    description: 'X Kingdom',
    logoComponent: XLogo,
    gradient: 'from-gray-800 via-gray-700 to-black',
    hoverGradient: 'from-gray-700 via-gray-600 to-gray-800',
    borderColor: 'border-gray-600',
    shadowColor: 'shadow-gray-500/25',
    textColor: 'text-white',
  },
};

export const KingdomButton: React.FC<KingdomButtonProps> = ({
  platform,
  onClick,
  disabled = false,
  className = '',
}) => {
  const config = platformConfig[platform];
  const LogoComponent = config.logoComponent;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative group w-full p-6 rounded-2xl
        bg-gradient-to-br ${config.gradient}
        hover:bg-gradient-to-br hover:${config.hoverGradient}
        border-2 ${config.borderColor}
        shadow-lg hover:${config.shadowColor} hover:shadow-2xl
        transition-all duration-300 transform
        hover:scale-105 hover:-translate-y-1
        active:scale-95
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0
        focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500/50
        overflow-hidden
        ${className}
      `}
    >
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-2 right-2 w-4 h-4 border border-white/30 rotate-45 animate-pulse" />
        <div className="absolute bottom-4 left-4 w-3 h-3 border border-white/20 rotate-12 animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 bg-gradient-to-r ${config.hoverGradient} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="relative flex flex-col items-center text-center space-y-3">
        {/* Logo at the top */}
        <div className="group-hover:scale-110 transition-transform duration-300">
          <LogoComponent />
        </div>

        {/* Text content in the middle */}
        <div className="space-y-1">
          <h3 className={`text-lg font-bold ${config.textColor} group-hover:text-white transition-colors duration-300`}>
            {config.name}
          </h3>
          <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
            {config.description}
          </p>
        </div>

        {/* Enter Kingdom button at the bottom */}
        <div className="flex items-center space-x-2">
          <span className="text-white/80 text-sm font-medium group-hover:text-white transition-colors duration-300">
            Enter Kingdom
          </span>
          <div className="p-2 bg-white/10 rounded-lg group-hover:bg-white/20 transition-all duration-300 group-hover:translate-x-1">
            <ArrowRight className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Bottom Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
        <div className="h-full bg-white/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </div>
    </button>
  );
};