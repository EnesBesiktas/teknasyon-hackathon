import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from './layouts/DashboardLayout';
import { Dashboard } from './pages/Dashboard';
import { AdsAccount } from './pages/AdsAccount';
import { CreateRules } from './pages/CreateRules';
import { IronBank } from './pages/IronBank';

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const getPageTitle = (pathname: string): string => {
    switch (pathname) {
      case '/':
        return 'Dashboard';
      case '/ads-account':
        return 'Ads Account';
      case '/create-rules':
        return 'Create Rules';
      case '/reports':
        return 'Reports';
      case '/billing':
        return 'Billing';
      case '/iron-bank':
        return 'Iron Bank';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <DashboardLayout 
      title={getPageTitle(location.pathname)}
      currentPath={location.pathname}
      onNavigate={handleNavigate}
    >
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/ads-account" element={<AdsAccount />} />
        <Route path="/create-rules" element={<CreateRules />} />
        <Route path="/reports" element={<div className="p-6">Reports Page - Coming Soon</div>} />
        <Route path="/billing" element={<div className="p-6">Billing Page - Coming Soon</div>} />
        <Route path="/iron-bank" element={<IronBank />} />
        <Route path="/settings" element={<div className="p-6">Settings Page - Coming Soon</div>} />
      </Routes>
    </DashboardLayout>
  );
}

export default App
