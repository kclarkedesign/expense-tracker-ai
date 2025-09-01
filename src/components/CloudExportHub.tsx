'use client';

import React, { useState, useEffect } from 'react';
import { 
  Cloud, 
  Mail, 
  Share2, 
  Clock, 
  History, 
  Settings,
  X,
  Zap,
  Users,
  Shield
} from 'lucide-react';
import { Expense } from '@/types/expense';
import { cn } from '@/lib/utils';
import { ExportTemplateSelector } from './ExportTemplateSelector';
import { CloudIntegrations } from './CloudIntegrations';
import { ExportHistory } from './ExportHistory';
import { AutomationSettings } from './AutomationSettings';
import { ShareCenter } from './ShareCenter';

interface CloudExportHubProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
}

type TabId = 'templates' | 'integrations' | 'share' | 'automation' | 'history';

const tabs = [
  {
    id: 'templates' as const,
    name: 'Templates',
    icon: Zap,
    description: 'Export templates'
  },
  {
    id: 'integrations' as const,
    name: 'Integrations',
    icon: Cloud,
    description: 'Cloud services'
  },
  {
    id: 'share' as const,
    name: 'Share',
    icon: Share2,
    description: 'Sharing & collaboration'
  },
  {
    id: 'automation' as const,
    name: 'Automation',
    icon: Clock,
    description: 'Scheduled exports'
  },
  {
    id: 'history' as const,
    name: 'History',
    icon: History,
    description: 'Export activity'
  }
];

export function CloudExportHub({ isOpen, onClose, expenses }: CloudExportHubProps) {
  const [activeTab, setActiveTab] = useState<TabId>('templates');
  const [connectedServices, setConnectedServices] = useState(3);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <Cloud className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Export Hub</h1>
              <p className="text-blue-100">Connected • Collaborative • Automated</p>
            </div>
          </div>

          {/* Status Indicators */}
          <div className="flex items-center space-x-6 mt-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm">{connectedServices} services connected</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">{expenses.length} records ready</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span className="text-sm">End-to-end encrypted</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-white'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                )}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(95vh-240px)]">
          {activeTab === 'templates' && (
            <ExportTemplateSelector 
              expenses={expenses}
              onTemplateSelect={(template) => {
                // Could trigger export flow or switch to integrations tab
                setActiveTab('integrations');
              }}
            />
          )}
          
          {activeTab === 'integrations' && (
            <CloudIntegrations 
              expenses={expenses}
              onServiceConnect={(serviceId) => {
                setConnectedServices(prev => prev + 1);
              }}
            />
          )}
          
          {activeTab === 'share' && (
            <ShareCenter 
              expenses={expenses}
            />
          )}
          
          {activeTab === 'automation' && (
            <AutomationSettings 
              expenses={expenses}
            />
          )}
          
          {activeTab === 'history' && (
            <ExportHistory />
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                <span>All systems operational</span>
              </div>
              <span>•</span>
              <span>Last sync: 2 minutes ago</span>
            </div>
            <div className="text-xs text-gray-500">
              Powered by ExpenseTracker Cloud ✨
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}