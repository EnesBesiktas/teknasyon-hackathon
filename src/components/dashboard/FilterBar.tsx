import React from 'react';
import { Calendar, Plus, ChevronRight } from 'lucide-react';

interface FilterBarProps {
  selectedDate?: string;
  onDateChange?: (date: string) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ 
  selectedDate = "Select Date", 
  onDateChange 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Date Selector */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700">{selectedDate}</span>
          </button>
          
          {/* More Filters */}
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <span className="text-sm text-gray-700">More Filters</span>
            <Plus className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
};
