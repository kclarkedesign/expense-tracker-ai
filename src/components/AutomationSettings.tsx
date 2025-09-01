'use client';

import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Zap, 
  Calendar, 
  Mail, 
  Cloud, 
  Settings, 
  Play, 
  Pause, 
  Trash2,
  Plus,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';
import { Expense } from '@/types/expense';
import { ScheduledExport, ExportTemplate, CloudProvider } from '@/types/cloud-export';
import { CloudExportService } from '@/lib/cloud-export';
import { cn } from '@/lib/utils';

interface AutomationSettingsProps {
  expenses: Expense[];
}

export function AutomationSettings({ expenses }: AutomationSettingsProps) {
  const [scheduledExports, setScheduledExports] = useState<ScheduledExport[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newSchedule, setNewSchedule] = useState<{
    templateId: string;
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
    cloudProvider: string;
    recipient: string;
  }>({
    templateId: '',
    frequency: 'monthly',
    cloudProvider: '',
    recipient: ''
  });

  const templates = CloudExportService.getExportTemplates();
  const providers = CloudExportService.getCloudProviders().filter(p => p.connected);

  useEffect(() => {
    setScheduledExports(CloudExportService.getScheduledExports());
  }, []);

  const handleCreateSchedule = async () => {
    if (!newSchedule.templateId || !newSchedule.cloudProvider) return;

    try {
      const scheduled = await CloudExportService.scheduleRecurringExport(
        newSchedule.templateId,
        newSchedule.frequency,
        newSchedule.cloudProvider,
        newSchedule.recipient || undefined
      );
      setScheduledExports(prev => [...prev, scheduled]);
      setIsCreating(false);
      setNewSchedule({ templateId: '', frequency: 'monthly', cloudProvider: '', recipient: '' });
    } catch (error) {
      console.error('Failed to create schedule:', error);
    }
  };

  const toggleSchedule = async (scheduledId: string) => {
    await CloudExportService.toggleScheduledExport(scheduledId);
    setScheduledExports(prev => 
      prev.map(s => s.id === scheduledId ? { ...s, enabled: !s.enabled } : s)
    );
  };

  const frequencyLabels = {
    daily: 'Every Day',
    weekly: 'Every Week',
    monthly: 'Every Month',
    quarterly: 'Every Quarter'
  };

  const getNextRunDisplay = (nextRun: string) => {
    const date = new Date(nextRun);
    const now = new Date();
    const diffHours = Math.round((date.getTime() - now.getTime()) / (1000 * 60 * 60));
    
    if (diffHours < 24) {
      return `In ${diffHours} hours`;
    } else {
      return `In ${Math.round(diffHours / 24)} days`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Automation & Scheduling</h2>
        <p className="text-gray-600 mt-2">Set up automated exports and backups for your expense data</p>
      </div>

      {/* Automation Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <Clock className="h-6 w-6 text-blue-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-blue-900">{scheduledExports.length}</div>
          <div className="text-sm text-blue-700">Scheduled Exports</div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-green-900">
            {scheduledExports.filter(s => s.enabled).length}
          </div>
          <div className="text-sm text-green-700">Active Automations</div>
        </div>
        
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <Cloud className="h-6 w-6 text-purple-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-purple-900">{providers.length}</div>
          <div className="text-sm text-purple-700">Connected Services</div>
        </div>
        
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <Calendar className="h-6 w-6 text-orange-600 mx-auto mb-2" />
          <div className="text-lg font-semibold text-orange-900">
            {scheduledExports.filter(s => {
              const nextRun = new Date(s.nextRun);
              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              return nextRun <= tomorrow;
            }).length}
          </div>
          <div className="text-sm text-orange-700">Due Tomorrow</div>
        </div>
      </div>

      {/* Create New Schedule */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Create Automated Export</h3>
          <button
            onClick={() => setIsCreating(!isCreating)}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800"
          >
            <Plus className="h-4 w-4" />
            <span>New Schedule</span>
          </button>
        </div>

        {isCreating && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                <select
                  value={newSchedule.templateId}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, templateId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select template...</option>
                  {templates.map((template) => (
                    <option key={template.id} value={template.id}>
                      {template.icon} {template.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Frequency</label>
                <select
                  value={newSchedule.frequency}
                  onChange={(e) => setNewSchedule(prev => ({ 
                    ...prev, 
                    frequency: e.target.value as 'daily' | 'weekly' | 'monthly' | 'quarterly'
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <select
                  value={newSchedule.cloudProvider}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, cloudProvider: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select service...</option>
                  {providers.map((provider) => (
                    <option key={provider.id} value={provider.id}>
                      {provider.icon} {provider.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (optional)</label>
                <input
                  type="email"
                  placeholder="notify@company.com"
                  value={newSchedule.recipient}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, recipient: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateSchedule}
                disabled={!newSchedule.templateId || !newSchedule.cloudProvider}
                className={cn(
                  'px-4 py-2 rounded-lg font-medium',
                  !newSchedule.templateId || !newSchedule.cloudProvider
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                )}
              >
                Create Schedule
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Existing Schedules */}
      {scheduledExports.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Scheduled Exports</h3>
          
          <div className="space-y-4">
            {scheduledExports.map((schedule) => {
              const template = templates.find(t => t.id === schedule.templateId);
              const provider = providers.find(p => p.id === schedule.cloudProvider);
              
              return (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={cn(
                        'p-2 rounded-lg',
                        schedule.enabled ? 'bg-green-100' : 'bg-gray-100'
                      )}>
                        <Calendar className={cn(
                          'h-5 w-5',
                          schedule.enabled ? 'text-green-600' : 'text-gray-400'
                        )} />
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">
                            {template?.icon} {template?.name}
                          </span>
                          <span className="text-sm text-gray-500">→</span>
                          <span className="text-sm text-gray-700">
                            {provider?.icon} {provider?.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                          <span>{frequencyLabels[schedule.frequency]}</span>
                          <span>•</span>
                          <span>Next: {getNextRunDisplay(schedule.nextRun)}</span>
                          {schedule.recipient && (
                            <>
                              <span>•</span>
                              <span className="flex items-center space-x-1">
                                <Mail className="h-3 w-3" />
                                <span>{schedule.recipient}</span>
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleSchedule(schedule.id)}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          schedule.enabled
                            ? 'text-orange-600 hover:bg-orange-50'
                            : 'text-green-600 hover:bg-green-50'
                        )}
                      >
                        {schedule.enabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                      
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Settings className="h-4 w-4" />
                      </button>
                      
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {schedule.enabled && (
                    <div className="mt-3 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-sm text-green-700">
                        <CheckCircle2 className="h-4 w-4 mr-2" />
                        <span>Active - Next export {getNextRunDisplay(schedule.nextRun)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Smart Automation Suggestions */}
      <div className="bg-gradient-to-r from-indigo-50 to-cyan-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🤖 Smart Suggestions</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-indigo-200">
            <div className="p-1 bg-indigo-100 rounded">
              <Zap className="h-4 w-4 text-indigo-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Weekly Team Summary</div>
              <div className="text-sm text-gray-600">Based on your expense patterns, consider a weekly summary for your finance team</div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
              Set up
            </button>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-indigo-200">
            <div className="p-1 bg-green-100 rounded">
              <Cloud className="h-4 w-4 text-green-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Daily Backup</div>
              <div className="text-sm text-gray-600">Protect your data with daily automated backups to Google Drive</div>
            </div>
            <button className="text-green-600 hover:text-green-800 text-sm font-medium">
              Enable
            </button>
          </div>

          <div className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-indigo-200">
            <div className="p-1 bg-orange-100 rounded">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900">Monthly Tax Report</div>
              <div className="text-sm text-gray-600">Automatically generate tax-ready reports for your accountant</div>
            </div>
            <button className="text-orange-600 hover:text-orange-800 text-sm font-medium">
              Configure
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Automation Features */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Automation</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Trigger-Based Exports</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>When monthly spending exceeds $1,000</span>
                <button className="text-blue-600 text-xs">Setup</button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>End of each quarter</span>
                <button className="text-blue-600 text-xs">Setup</button>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>When new expense category is added</span>
                <button className="text-blue-600 text-xs">Setup</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Smart Insights</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Unusual spending alerts</span>
                <div className="w-6 h-3 bg-green-400 rounded-full relative">
                  <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Budget threshold warnings</span>
                <div className="w-6 h-3 bg-gray-300 rounded-full relative">
                  <div className="w-2 h-2 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                <span>Spending trend analysis</span>
                <div className="w-6 h-3 bg-green-400 rounded-full relative">
                  <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}