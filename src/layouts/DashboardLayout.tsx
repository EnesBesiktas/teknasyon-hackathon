import React from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Header } from '../components/dashboard/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
  onNavigate: (path: string) => void;
  isIronBank?: boolean;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  currentPath, 
  onNavigate,
  isIronBank = false
}) => {
  return (
    <div className={`h-screen ${isIronBank ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Sidebar */}
      <Sidebar onNavigate={onNavigate} currentPath={currentPath} />
      
      {/* Main Content */}
      <div className="ml-16 h-full flex flex-col">
        <Header title={title} withSidebar={false} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
