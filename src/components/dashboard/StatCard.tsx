import React from 'react';
import type { StatCard as StatCardType } from '../../types/dashboard';

interface StatCardProps {
  stat: StatCardType;
  iconComponent: React.ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ stat, iconComponent }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {stat.value}
          </div>
          <div className="text-sm text-gray-500">
            {stat.label}
          </div>
        </div>
        
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
          {iconComponent}
        </div>
      </div>
      
      {/* Progress Bar */}
      {stat.progress !== undefined && (
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm text-gray-500 mb-1">
            <span>Active ad accounts</span>
            <span>{stat.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${stat.progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
