import React from 'react';
import { Wifi } from 'lucide-react';
import type { IPhone15ProFrameProps, StatusBarProps } from './types';

const StatusBar: React.FC<StatusBarProps> = ({
  time,
  batteryLevel,
  wifiSignal,
  cellularSignal: _cellularSignal, // unused as per requirements
}) => (
  <div className="flex justify-between items-center px-4 py-2 text-white text-sm font-medium">
    <div className="flex items-center">
      <span className="font-semibold">{time}</span>
    </div>

    <div className="flex items-center space-x-1">
      {/* WiFi Icon */}
      {wifiSignal && (
        <Wifi className="h-3.5 w-3.5" />
      )}

      {/* Battery with percentage */}
      <div className="flex items-center space-x-0.5">
        <span className="text-xs font-medium">{batteryLevel}%</span>
        <div className="relative">
          <div className="w-5 h-2.5 border border-white rounded-sm">
            <div
              className="h-full bg-green-500 rounded-sm transition-all duration-300"
              style={{ width: `${batteryLevel}%` }}
            />
          </div>
          <div className="absolute -right-0.5 top-0.5 w-0.5 h-1.5 bg-white rounded-r-sm" />
        </div>
      </div>
    </div>
  </div>
);

const DynamicIsland: React.FC = () => (
  <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-20">
    <div className="w-32 h-8 bg-black rounded-full shadow-lg border border-gray-800" />
  </div>
);

export const IPhone15ProFrame: React.FC<IPhone15ProFrameProps> = ({
  children,
  className = '',
  showStatusBar = true,
  time = '9:41',
  batteryLevel = 100,
  wifiSignal = true,
  cellularSignal = false, // NO signal bars as specified
}) => {
  return (
    <div className={`relative mx-auto ${className}`}>
      {/* iPhone 15 Pro Frame - More responsive sizing */}
      <div className="relative w-72 max-w-[90vw] h-[600px] max-h-[85vh] bg-black rounded-[3rem] shadow-2xl border-4 border-gray-800 overflow-hidden">
        {/* Dynamic Island */}
        <DynamicIsland />

        {/* Screen Content Container */}
        <div className="absolute inset-3 bg-black rounded-[2.5rem] overflow-hidden flex flex-col">
          {/* Status Bar */}
          {showStatusBar && (
            <div className="flex-shrink-0 relative z-10 bg-black">
              <StatusBar
                time={time}
                batteryLevel={batteryLevel}
                wifiSignal={wifiSignal}
                cellularSignal={cellularSignal}
              />
            </div>
          )}

          {/* Main Content - Made scrollable and contained */}
          <div className="flex-1 bg-black overflow-hidden">
            <div className="h-full overflow-y-auto scrollbar-hide">
              {children}
            </div>
          </div>
        </div>

        {/* Side Buttons */}
        {/* Volume Buttons */}
        <div className="absolute left-0 top-20 w-1 h-8 bg-gray-700 rounded-r-sm" />
        <div className="absolute left-0 top-32 w-1 h-8 bg-gray-700 rounded-r-sm" />

        {/* Power Button */}
        <div className="absolute right-0 top-24 w-1 h-12 bg-gray-700 rounded-l-sm" />

        {/* Action Button */}
        <div className="absolute left-0 top-44 w-1 h-6 bg-gray-700 rounded-r-sm" />
      </div>
    </div>
  );
};