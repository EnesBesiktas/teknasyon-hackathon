import React from 'react';
import { Bell, RotateCcw, HelpCircle, User } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Notification Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          {/* Refresh Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          
          {/* Help Icon */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5" />
          </button>
          
          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
