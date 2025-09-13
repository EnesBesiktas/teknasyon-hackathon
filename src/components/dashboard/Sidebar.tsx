import React from 'react';
import { 
  BarChart3, 
  Users, 
  Settings, 
  FileText, 
  Target, 
  CreditCard
} from 'lucide-react';
import { DragonIcon } from '../ui/DragonIcon';
import { LogoIcon } from '../ui/LogoIcon';

interface SidebarItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  isActive?: boolean;
}

interface SidebarProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ onNavigate, currentPath }) => {
  const sidebarItems: SidebarItem[] = [
    {
      icon: <BarChart3 className="w-5 h-5" />,
      label: 'Dashboard',
      path: '/',
      isActive: currentPath === '/'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Ads Account',
      path: '/ads-account',
      isActive: currentPath === '/ads-account'
    },
    {
      icon: <Target className="w-5 h-5" />,
      label: 'Create Rules',
      path: '/create-rules',
      isActive: currentPath === '/create-rules'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Reports',
      path: '/reports',
      isActive: currentPath === '/reports'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Billing',
      path: '/billing',
      isActive: currentPath === '/billing'
    },
    {
      icon: <DragonIcon className="w-5 h-5 text-purple-600" />,
      label: 'Iron Bank',
      path: '/iron-bank',
      isActive: currentPath === '/iron-bank'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      path: '/settings',
      isActive: currentPath === '/settings'
    }
  ];

  return (
    <div className="fixed left-0 top-0 w-16 bg-white border-r border-gray-200 h-full z-10 sidebar">
      {/* Logo */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex justify-center">
          <LogoIcon size={32} className="drop-shadow-sm" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-2">
        <div className="space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.path}
              onClick={() => onNavigate(item.path)}
              title={item.label}
              className={`
                w-full h-10 flex items-center justify-center rounded-lg transition-colors group relative nav-item
                ${item.isActive 
                  ? 'bg-blue-50 text-blue-700 active' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              {item.icon}
              {item.isActive && (
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-blue-600 rounded-r"></div>
              )}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};
