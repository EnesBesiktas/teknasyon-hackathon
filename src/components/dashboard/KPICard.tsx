import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { KPIMetric } from '../../types/dashboard';

interface KPICardProps {
  metric: KPIMetric;
}

export const KPICard: React.FC<KPICardProps> = ({ metric }) => {
  const isPositive = metric.changeType === 'positive';
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      {/* Title */}
      <div className="text-sm font-medium text-gray-500 mb-2">
        {metric.title}
      </div>
      
      {/* Value */}
      <div className="text-3xl font-bold text-gray-900 mb-3">
        {metric.value}
      </div>
      
      {/* Change and Sub Metric */}
      <div className="flex items-center justify-between">
        {/* Change */}
        <div className={`flex items-center space-x-1 text-sm ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}>
          {isPositive ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
          <span className="font-medium">{metric.change}</span>
        </div>
        
        {/* Sub Metric */}
        {metric.subMetric && (
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500">
              {metric.subMetric.label}
            </div>
            <div className="text-sm font-bold text-gray-900">
              {metric.subMetric.value}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
