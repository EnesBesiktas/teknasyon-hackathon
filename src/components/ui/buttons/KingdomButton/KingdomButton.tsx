import React from 'react';
import { Crown, ArrowRight, Shield, Zap } from 'lucide-react';

export type PlatformType = 'instagram' | 'facebook' | 'twitter';

interface KingdomButtonProps {
  platform: PlatformType;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const platformConfig = {
  instagram: {
    name: 'The Visual Kingdom',
    description: 'Instagram Realm',
    icon: Crown,
    gradient: 'from-pink-500 via-red-500 to-yellow-500',
    hoverGradient: 'from-pink-400 via-red-400 to-yellow-400',
    borderColor: 'border-pink-500',
    shadowColor: 'shadow-pink-500/25',
    textColor: 'text-white',
  },
  facebook: {
    name: 'The Social Realm',
    description: 'Facebook Kingdom',
    icon: Shield,
    gradient: 'from-blue-600 via-blue-500 to-blue-400',
    hoverGradient: 'from-blue-500 via-blue-400 to-blue-300',
    borderColor: 'border-blue-500',
    shadowColor: 'shadow-blue-500/25',
    textColor: 'text-white',
  },
  twitter: {
    name: 'The News Empire',
    description: 'X Kingdom',
    icon: Zap,
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
  const Icon = config.icon;

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

      <div className="relative flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300">
            <Icon className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-300" />
          </div>

          <div className="text-left">
            <h3 className={`text-xl font-bold ${config.textColor} group-hover:text-white transition-colors duration-300`}>
              {config.name}
            </h3>
            <p className="text-white/70 text-sm group-hover:text-white/90 transition-colors duration-300">
              {config.description}
            </p>
          </div>
        </div>

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