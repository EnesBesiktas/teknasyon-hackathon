import React, { useState } from 'react';
import { Sidebar } from '../components/dashboard/Sidebar';
import { Header } from '../components/dashboard/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  currentPath, 
  onNavigate 
}) => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar onNavigate={onNavigate} currentPath={currentPath} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={title} />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
