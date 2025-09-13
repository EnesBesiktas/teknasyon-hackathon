import React from 'react';
import { Bell, RotateCcw, HelpCircle, User } from 'lucide-react';

interface HeaderProps {
  title: string;
  withSidebar?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ title, withSidebar = false }) => {
  return (
    <header className={`bg-white border-b border-gray-200 px-4 py-2.5 ${withSidebar ? 'ml-16' : ''}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {/* Notification Icon */}
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-4 h-4" />
          </button>
          
          {/* Refresh Icon */}
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
          
          {/* Help Icon */}
          <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-7 h-7 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-3.5 h-3.5 text-gray-600" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
