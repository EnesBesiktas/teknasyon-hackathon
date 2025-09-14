import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

interface VisionAwakenButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary';
}

export const VisionAwakenButton: React.FC<VisionAwakenButtonProps> = ({
  onClick,
  disabled = false,
  loading = false,
  className = '',
  variant = 'primary',
}) => {
  const baseClasses = `
    relative group px-8 py-4 rounded-xl font-bold text-lg
    transition-all duration-300 transform
    hover:scale-105 hover:shadow-2xl
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    focus:outline-none focus:ring-4 focus:ring-yellow-500/50
    overflow-hidden
  `;

  const variantClasses = variant === 'primary'
    ? `
      bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500
      text-black shadow-lg hover:shadow-yellow-500/25
      border-2 border-transparent hover:border-yellow-300
    `
    : `
      bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500
      text-white shadow-lg hover:shadow-gray-500/25
      border-2 border-gray-600 hover:border-gray-400
    `;

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />

      {/* Sparkle Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <Sparkles className="absolute top-1 right-1 h-4 w-4 text-yellow-300 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:animate-pulse" />
        <Sparkles className="absolute bottom-1 left-1 h-3 w-3 text-orange-300 opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:animate-pulse" />
      </div>

      <div className="relative flex items-center justify-center space-x-3">
        <Crown className={`h-6 w-6 transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:rotate-12'}`} />
        <span className="tracking-wide">
          {loading ? 'AWAKENING...' : 'VISION AWAKEN'}
        </span>
        <Crown className={`h-6 w-6 transition-transform duration-300 ${loading ? 'animate-spin' : 'group-hover:-rotate-12'}`} />
      </div>

      {/* Bottom Glow Effect */}
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full blur-sm" />
    </button>
  );
};