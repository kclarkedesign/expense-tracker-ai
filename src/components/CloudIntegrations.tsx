'use client';

import React, { useState } from 'react';
import { 
  Mail, 
  FileSpreadsheet, 
  Cloud, 
  Folder, 
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  ExternalLink,
  Settings,
  Zap
} from 'lucide-react';
import { Expense } from '@/types/expense';
import { CloudProvider } from '@/types/cloud-export';
import { CloudExportService } from '@/lib/cloud-export';
import { formatCurrency, cn } from '@/lib/utils';

interface CloudIntegrationsProps {
  expenses: Expense[];
  onServiceConnect: (serviceId: string) => void;
}

interface ServiceIntegration {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<any>;
  category: 'email' | 'storage' | 'productivity' | 'analytics';
  features: string[];
  connected: boolean;
  lastSync?: string;
  autoSync?: boolean;
  premium?: boolean;
}

const integrations: ServiceIntegration[] = [
  {
    id: 'email',
    name: 'Email Export',
    description: 'Send reports directly to your inbox or team members',
    icon: Mail,
    category: 'email',
    features: ['Scheduled delivery', 'Multiple recipients', 'Custom templates', 'Rich formatting'],
    connected: true,
    lastSync: '2025-09-01T10:30:00Z',
    autoSync: true
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Real-time sync with Google Sheets for collaboration',
    icon: FileSpreadsheet,
    category: 'productivity',
    features: ['Live sync', 'Formula integration', 'Shared access', 'Chart generation'],
    connected: true,
    lastSync: '2025-09-01T10:15:00Z',
    autoSync: true
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Automatic backup to your Google Drive',
    icon: Cloud,
    category: 'storage',
    features: ['Auto backup', 'Version history', 'Shared folders', 'Mobile access'],
    connected: true,
    lastSync: '2025-09-01T09:45:00Z',
    autoSync: true
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    description: 'Sync exports to your Dropbox for easy access',
    icon: Folder,
    category: 'storage',
    features: ['Smart sync', 'Team folders', 'Version control', 'Offline access'],
    connected: false
  },
  {
    id: 'onedrive',
    name: 'Microsoft OneDrive',
    description: 'Integrate with Microsoft Office ecosystem',
    icon: Cloud,
    category: 'storage',
    features: ['Office integration', 'SharePoint sync', 'Teams collaboration', 'Power BI'],
    connected: false,
    premium: true
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Create living documents with your expense data',
    icon: FileText,
    category: 'productivity',
    features: ['Database sync', 'Rich formatting', 'Team workspaces', 'AI insights'],
    connected: false,
    premium: true
  }
];

export function CloudIntegrations({ expenses, onServiceConnect }: CloudIntegrationsProps) {
  const [connectingService, setConnectingService] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Services', count: integrations.length },
    { id: 'email', name: 'Email', count: integrations.filter(i => i.category === 'email').length },
    { id: 'storage', name: 'Storage', count: integrations.filter(i => i.category === 'storage').length },
    { id: 'productivity', name: 'Productivity', count: integrations.filter(i => i.category === 'productivity').length },
    { id: 'analytics', name: 'Analytics', count: integrations.filter(i => i.category === 'analytics').length }
  ];

  const filteredIntegrations = selectedCategory === 'all' 
    ? integrations 
    : integrations.filter(i => i.category === selectedCategory);

  const connectedCount = integrations.filter(i => i.connected).length;
  const totalData = formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0));

  const handleConnect = async (integration: ServiceIntegration) => {
    if (integration.connected) return;
    
    setConnectingService(integration.id);
    
    try {
      const success = await CloudExportService.connectProvider(integration.id);
      if (success) {
        integration.connected = true;
        integration.lastSync = new Date().toISOString();
        onServiceConnect(integration.id);
      }
    } catch (error) {
      console.error('Connection failed:', error);
    }
    
    setConnectingService(null);
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{connectedCount}</div>
            <div className="text-sm text-gray-600">Connected Services</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{expenses.length}</div>
            <div className="text-sm text-gray-600">Records Ready</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{totalData}</div>
            <div className="text-sm text-gray-600">Total Value</div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={cn(
              'px-4 py-2 rounded-full text-sm font-medium transition-colors',
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category.name} ({category.count})
          </button>
        ))}
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredIntegrations.map((integration) => (
          <div
            key={integration.id}
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={cn(
                  'p-3 rounded-xl',
                  integration.connected ? 'bg-green-100' : 'bg-gray-100'
                )}>
                  <integration.icon className={cn(
                    'h-6 w-6',
                    integration.connected ? 'text-green-600' : 'text-gray-600'
                  )} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                    {integration.premium && (
                      <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs px-2 py-1 rounded-full font-medium">
                        PRO
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{integration.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {integration.connected ? (
                  <div className="flex items-center space-x-1 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-xs font-medium">Connected</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-1 text-gray-400">
                    <AlertCircle className="h-4 w-4" />
                    <span className="text-xs">Not connected</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {integration.features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>

            {/* Connection Status */}
            {integration.connected && integration.lastSync && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-green-800">
                    Last sync: {new Date(integration.lastSync).toLocaleString()}
                  </span>
                  {integration.autoSync && (
                    <div className="flex items-center space-x-1 text-green-600">
                      <Zap className="h-3 w-3" />
                      <span className="text-xs">Auto-sync</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center space-x-2">
              {integration.connected ? (
                <>
                  <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    Export Now
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Settings className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleConnect(integration)}
                  disabled={connectingService === integration.id}
                  className={cn(
                    'flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
                    integration.premium
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  )}
                >
                  {connectingService === integration.id ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Connecting...</span>
                    </>
                  ) : (
                    <span>Connect {integration.premium ? 'PRO' : ''}</span>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Integration Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Integration Tips</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Connect Google Sheets for real-time collaborative budgeting</li>
          <li>• Set up email automation to receive weekly spending summaries</li>
          <li>• Use Dropbox for automatic backup of all your financial data</li>
          <li>• Pro tip: Notion integration creates beautiful expense dashboards</li>
        </ul>
      </div>
    </div>
  );
}