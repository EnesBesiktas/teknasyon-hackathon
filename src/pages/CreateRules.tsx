import React, { useState } from 'react';
import { Plus, Settings, Trash2, Copy } from 'lucide-react';
import type { FilterCondition, RuleAction } from '../types/dashboard';

export const CreateRules: React.FC = () => {
  const [selectedAdAccount] = useState<string>('Ad Account 1');
  const [conditions, setConditions] = useState<FilterCondition[]>([
    { field: 'Spend', operator: 'Today', value: '$0' }
  ]);
  const [action] = useState<RuleAction>({
    type: 'Increase Budget',
    value: '+10 Percent',
    maxBudget: 'Max Budget $1.000',
    frequency: 'Once in 3 days'
  });

  const addCondition = () => {
    setConditions([...conditions, { field: '', operator: '', value: '' }]);
  };

  const addGroup = () => {
    // Add group logic here
  };

  const removeCondition = (index: number) => {
    setConditions(conditions.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Ad Account Selector */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Ad Account 1</span>
                <button className="p-1 hover:bg-gray-100 rounded">
                  <Plus className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">Filter</h2>
              <p className="text-sm text-gray-600">
                Apply rule to campaigns, ad sets, or ads. 
                <button className="text-blue-600 hover:text-blue-700 ml-1">Learn more</button>
              </p>
            </div>

            {/* Ad Sets Selector */}
            <div className="mb-6">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Settings className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Ad Sets</span>
                <Plus className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            {/* Add Filter Group */}
            <div className="mb-6">
              <button 
                onClick={addGroup}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add filter group</span>
              </button>
            </div>
          </div>

          {/* Conditions Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Conditions</h2>

            <div className="space-y-4">
              {conditions.map((condition, index) => (
                <div key={index} className="flex items-center space-x-4">
                  {/* Field Selector */}
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Spend">Spend</option>
                    <option value="Clicks">Clicks</option>
                    <option value="Impressions">Impressions</option>
                    <option value="Conversions">Conversions</option>
                  </select>

                  {/* Operator Selector */}
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="Today">Today</option>
                    <option value="Yesterday">Yesterday</option>
                    <option value="Last 7 days">Last 7 days</option>
                    <option value="Last 30 days">Last 30 days</option>
                  </select>

                  {/* Comparison Operator */}
                  <select className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value=">">{'>'}</option>
                    <option value="<">{'<'}</option>
                    <option value="=">=</option>
                    <option value=">=">{'>='}</option>
                    <option value="<=">{'<='}</option>
                  </select>

                  {/* Value Input */}
                  <input
                    type="text"
                    placeholder="$0"
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    defaultValue="$0"
                  />

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Settings className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => removeCondition(index)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-gray-100 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Condition and Group Buttons */}
            <div className="flex items-center space-x-4 mt-6">
              <button 
                onClick={addCondition}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Condition</span>
              </button>
              <button 
                onClick={addGroup}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Group</span>
              </button>
            </div>

            {/* Preview and Description */}
            <div className="flex justify-end space-x-4 mt-6">
              <button className="text-blue-600 hover:text-blue-700 text-sm">Preview</button>
              <button className="text-blue-600 hover:text-blue-700 text-sm">Description</button>
            </div>
          </div>

          {/* Actions Section */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Actions</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Action Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Action type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="Increase Budget">Increase Budget</option>
                  <option value="Decrease Budget">Decrease Budget</option>
                  <option value="Pause Campaign">Pause Campaign</option>
                  <option value="Enable Campaign">Enable Campaign</option>
                </select>
              </div>

              {/* Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Value
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="+10 Percent">+10 Percent</option>
                  <option value="+20 Percent">+20 Percent</option>
                  <option value="+50 Percent">+50 Percent</option>
                  <option value="Fixed Amount">Fixed Amount</option>
                </select>
              </div>

              {/* Max Budget */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Budget
                </label>
                <input
                  type="text"
                  placeholder="Max Budget $1.000"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue="Max Budget $1.000"
                />
              </div>

              {/* Frequency */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Frequency
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="Once in 3 days">Once in 3 days</option>
                  <option value="Once a day">Once a day</option>
                  <option value="Once a week">Once a week</option>
                  <option value="Once a month">Once a month</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Save Rule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
