import React, { useState } from 'react';
import { Facebook, Search, Download, ArrowUpRight } from 'lucide-react';
import type { Transaction } from '../types/dashboard';

export const AdsAccount: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('transactions');
  const [dateRange] = useState<string>('8 Agu - 5 Sep 23');

  // Mock data
  const transactions: Transaction[] = [
    {
      orderId: '16304813844201472O0',
      date: '08.08.2023 11:13',
      amount: '256.25 USD',
      paymentType: 'Credit Card',
      requestType: 'Money Loaded',
      status: 'Charged',
      statusCode: '0000001'
    },
    {
      orderId: '16304813844201472O0',
      date: '08.08.2023 11:14',
      amount: '-50 USD',
      paymentType: 'Credit Card',
      requestType: 'Commission',
      status: 'Charged',
      statusCode: '0000001'
    },
    {
      orderId: '16304813844201472O0',
      date: '08.08.2022 11:13',
      amount: '-6.25 USD',
      paymentType: 'Credit Card',
      requestType: 'Commission',
      status: 'Charged',
      statusCode: '0000001'
    }
  ];

  const tabs = [
    { id: 'transactions', label: 'Transactions' },
    { id: 'settings', label: 'Settings' },
    { id: 'members', label: 'Members' },
    { id: 'additional', label: 'Additional info' },
    { id: 'adspend', label: 'Ad Spend' }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
          <span>Ads Account</span>
          <span>/</span>
          <span className="text-gray-900 font-medium">Ad Accounts Settings</span>
        </nav>
        
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Ad Accounts Settings</h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Account Info Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <Facebook className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Ad Account Settings</h2>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Approved
                  </span>
                  <span>ID: 1234567890460</span>
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Credit Account: USD</div>
              <div className="text-sm text-gray-500">ID: 123456</div>
              <button className="mt-2 inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm">
                <span>Go to Credit Account</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Balance */}
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Current balance</div>
              <div className="text-3xl font-bold text-gray-900">99.00$</div>
              <button className="text-blue-600 hover:text-blue-700 text-sm mt-1">
                Transfer to Wallet
              </button>
            </div>
            
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Add Balance
            </button>
          </div>
        </div>

        {/* Tabs and Content */}
        <div className="bg-white rounded-lg border border-gray-200">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    selectedTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {selectedTab === 'transactions' && (
              <div>
                {/* Search and Date Filter */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search"
                        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-600">{dateRange}</span>
                    <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Transactions Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Order Amount
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Payment Type
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Request Type
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
                          Status Code
                        </th>
                        <th className="text-left py-3 px-4"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((transaction, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-4 px-4 text-sm text-gray-900">
                            {transaction.orderId}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {transaction.date}
                          </td>
                          <td className={`py-4 px-4 text-sm font-medium ${
                            transaction.amount.startsWith('-') ? 'text-red-600' : 'text-gray-900'
                          }`}>
                            {transaction.amount}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {transaction.paymentType}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {transaction.requestType}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {transaction.status}
                          </td>
                          <td className="py-4 px-4 text-sm text-gray-600">
                            {transaction.statusCode}
                          </td>
                          <td className="py-4 px-4">
                            <button className="text-gray-400 hover:text-gray-600">
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
