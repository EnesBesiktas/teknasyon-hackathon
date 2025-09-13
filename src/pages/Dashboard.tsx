import React from 'react';
import { Users, Clock, Ban } from 'lucide-react';
import { KPICard } from '../components/dashboard/KPICard';
import { StatCard } from '../components/dashboard/StatCard';
import { SpendChart } from '../components/dashboard/SpendChart';
import { FilterBar } from '../components/dashboard/FilterBar';
import type { KPIMetric, StatCard as StatCardType, ChartDataPoint } from '../types/dashboard';

export const Dashboard: React.FC = () => {
  // Mock data - gerçek uygulamada API'den gelecek
  const kpiMetrics: KPIMetric[] = [
    {
      title: 'Total Spend (USD)',
      value: '$58.29K',
      change: '2.6%',
      changeType: 'positive',
      subMetric: {
        label: 'CPI',
        value: '$0.020'
      }
    },
    {
      title: 'Impressions',
      value: '257,29K',
      change: '0.4%',
      changeType: 'negative',
      subMetric: {
        label: 'CPI',
        value: '$0.020'
      }
    },
    {
      title: 'Clicks',
      value: '39,8K',
      change: '2.6%',
      changeType: 'positive',
      subMetric: {
        label: 'CPC',
        value: '$0.131'
      }
    },
    {
      title: 'Conversion',
      value: '1267',
      change: '0.4%',
      changeType: 'negative',
      subMetric: {
        label: 'CPA',
        value: '$0.020'
      }
    }
  ];

  const statCards: StatCardType[] = [
    {
      icon: 'users',
      value: '72',
      label: 'Active ad accounts',
      progress: 78
    },
    {
      icon: 'clock',
      value: '3',
      label: 'Pending requests'
    },
    {
      icon: 'ban',
      value: '16',
      label: 'Disabled ad accounts'
    }
  ];

  const chartData: ChartDataPoint[] = [
    { name: 'Jan', value: 0.4 },
    { name: 'Feb', value: 0.6 },
    { name: 'Mar', value: 9.2 },
    { name: 'Apr', value: 7.8 },
    { name: 'May', value: 6.2 },
    { name: 'Jun', value: 0.8 },
    { name: 'Jul', value: 1.2 },
    { name: 'Aug', value: 4.8 },
    { name: 'Sep', value: 5.8 },
    { name: 'Oct', value: 6.2 },
    { name: 'Nov', value: 2.8 },
    { name: 'Dec', value: 3.2 }
  ];

  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="w-6 h-6 text-blue-600" />;
      case 'clock':
        return <Clock className="w-6 h-6 text-green-600" />;
      case 'ban':
        return <Ban className="w-6 h-6 text-gray-600" />;
      default:
        return <Users className="w-6 h-6 text-blue-600" />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <FilterBar />
      
      <div className="p-6">
        {/* KPI Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpiMetrics.map((metric, index) => (
            <KPICard key={index} metric={metric} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div className="lg:col-span-2">
            <SpendChart data={chartData} />
          </div>

          {/* Stat Cards */}
          <div className="space-y-6">
            {statCards.map((stat, index) => (
              <StatCard 
                key={index} 
                stat={stat} 
                iconComponent={getStatIcon(stat.icon)} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
