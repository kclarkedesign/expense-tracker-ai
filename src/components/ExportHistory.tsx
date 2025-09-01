'use client';

import React, { useState, useEffect } from 'react';
import { 
  History, 
  Download, 
  Mail, 
  Cloud, 
  Share2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  ExternalLink,
  MoreVertical,
  Filter,
  Calendar,
  FileText
} from 'lucide-react';
import { ExportJob, ExportTemplate } from '@/types/cloud-export';
import { CloudExportService } from '@/lib/cloud-export';
import { formatCurrency, cn } from '@/lib/utils';

export function ExportHistory() {
  const [exportHistory, setExportHistory] = useState<ExportJob[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterFormat, setFilterFormat] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');

  const templates = CloudExportService.getExportTemplates();

  useEffect(() => {
    // Load some mock history data
    const mockHistory: ExportJob[] = [
      {
        id: '1',
        templateId: 'monthly-summary',
        format: 'email',
        status: 'completed',
        progress: 100,
        createdAt: '2025-09-01T10:30:00Z',
        completedAt: '2025-09-01T10:31:00Z',
        recordCount: 124,
        totalAmount: 2847.50,
        recipient: 'finance@company.com'
      },
      {
        id: '2',
        templateId: 'tax-report',
        format: 'google-sheets',
        status: 'completed',
        progress: 100,
        createdAt: '2025-08-31T15:22:00Z',
        completedAt: '2025-08-31T15:23:30Z',
        recordCount: 89,
        totalAmount: 1924.30,
        cloudProvider: 'google-sheets'
      },
      {
        id: '3',
        templateId: 'category-analysis',
        format: 'link-share',
        status: 'shared',
        progress: 100,
        createdAt: '2025-08-30T09:15:00Z',
        completedAt: '2025-08-30T09:16:00Z',
        recordCount: 156,
        totalAmount: 3251.75,
        shareUrl: 'https://expense-tracker.app/shared/abc123',
        qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=='
      },
      {
        id: '4',
        templateId: 'receipt-backup',
        format: 'dropbox',
        status: 'failed',
        progress: 45,
        createdAt: '2025-08-29T14:08:00Z',
        recordCount: 78,
        totalAmount: 1654.20,
        cloudProvider: 'dropbox',
        errorMessage: 'Connection timeout - please try again'
      },
      {
        id: '5',
        templateId: 'personal-budget',
        format: 'email',
        status: 'processing',
        progress: 78,
        createdAt: '2025-09-01T11:45:00Z',
        recordCount: 67,
        totalAmount: 892.40,
        recipient: 'personal@email.com'
      }
    ];

    setExportHistory(mockHistory);
  }, []);

  const getStatusIcon = (status: ExportJob['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'shared':
        return <Share2 className="h-5 w-5 text-blue-500" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getFormatIcon = (format: ExportJob['format']) => {
    switch (format) {
      case 'email':
        return <Mail className="h-4 w-4 text-blue-600" />;
      case 'google-sheets':
        return <FileText className="h-4 w-4 text-green-600" />;
      case 'dropbox':
      case 'onedrive':
        return <Cloud className="h-4 w-4 text-purple-600" />;
      case 'link-share':
        return <Share2 className="h-4 w-4 text-orange-600" />;
      default:
        return <Download className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusLabel = (status: ExportJob['status']) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'shared':
        return 'Shared';
      case 'processing':
        return 'Processing';
      case 'failed':
        return 'Failed';
      case 'pending':
        return 'Pending';
      default:
        return 'Unknown';
    }
  };

  const getStatusColor = (status: ExportJob['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'shared':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'pending':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredHistory = exportHistory.filter(job => {
    if (filterStatus !== 'all' && job.status !== filterStatus) return false;
    if (filterFormat !== 'all' && job.format !== filterFormat) return false;
    
    if (selectedPeriod !== 'all') {
      const jobDate = new Date(job.createdAt);
      const now = new Date();
      const daysDiff = Math.floor((now.getTime() - jobDate.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (selectedPeriod) {
        case 'today':
          if (daysDiff > 0) return false;
          break;
        case 'week':
          if (daysDiff > 7) return false;
          break;
        case 'month':
          if (daysDiff > 30) return false;
          break;
      }
    }
    
    return true;
  });

  const stats = {
    total: exportHistory.length,
    completed: exportHistory.filter(j => j.status === 'completed').length,
    shared: exportHistory.filter(j => j.status === 'shared').length,
    failed: exportHistory.filter(j => j.status === 'failed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Export History</h2>
        <p className="text-gray-600 mt-2">Track all your data exports and sharing activities</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Exports</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-800">{stats.completed}</div>
          <div className="text-sm text-green-700">Completed</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-800">{stats.shared}</div>
          <div className="text-sm text-blue-700">Shared</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-800">{stats.failed}</div>
          <div className="text-sm text-red-700">Failed</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <div className="flex flex-wrap items-center space-x-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="shared">Shared</option>
            <option value="processing">Processing</option>
            <option value="failed">Failed</option>
          </select>

          <select
            value={filterFormat}
            onChange={(e) => setFilterFormat(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Formats</option>
            <option value="email">Email</option>
            <option value="google-sheets">Google Sheets</option>
            <option value="dropbox">Cloud Storage</option>
            <option value="link-share">Shared Links</option>
          </select>

          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-1 border border-gray-300 rounded text-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Export History List */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        {filteredHistory.length === 0 ? (
          <div className="text-center py-12">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="text-gray-500 text-lg mb-2">No exports found</div>
            <p className="text-gray-400">Try adjusting your filters or create your first export</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredHistory.map((job) => {
              const template = templates.find(t => t.id === job.templateId);
              
              return (
                <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="flex-shrink-0">
                        {getStatusIcon(job.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-medium text-gray-900">
                            {template?.icon} {template?.name || 'Unknown Template'}
                          </h3>
                          <span className={cn(
                            'inline-flex items-center px-2 py-1 text-xs font-medium rounded-full border',
                            getStatusColor(job.status)
                          )}>
                            {getStatusLabel(job.status)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center space-x-1">
                            {getFormatIcon(job.format)}
                            <span className="capitalize">{job.format.replace('-', ' ')}</span>
                          </div>
                          <span>•</span>
                          <span>{job.recordCount} records</span>
                          <span>•</span>
                          <span>{formatCurrency(job.totalAmount)}</span>
                          <span>•</span>
                          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>

                        {job.recipient && (
                          <div className="flex items-center space-x-1 text-sm text-blue-600 mb-2">
                            <Mail className="h-3 w-3" />
                            <span>Sent to: {job.recipient}</span>
                          </div>
                        )}

                        {job.cloudProvider && (
                          <div className="flex items-center space-x-1 text-sm text-purple-600 mb-2">
                            <Cloud className="h-3 w-3" />
                            <span>Uploaded to: {job.cloudProvider}</span>
                          </div>
                        )}

                        {job.shareUrl && (
                          <div className="flex items-center space-x-2 mb-2">
                            <input
                              type="text"
                              value={job.shareUrl}
                              readOnly
                              className="text-sm bg-gray-50 border border-gray-200 rounded px-2 py-1 text-blue-600 flex-1"
                            />
                            <button className="p-1 text-blue-600 hover:text-blue-800">
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </div>
                        )}

                        {job.status === 'processing' && (
                          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                        )}

                        {job.errorMessage && (
                          <div className="bg-red-50 border border-red-200 rounded p-2 text-sm text-red-700">
                            {job.errorMessage}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      {job.completedAt && (
                        <span className="text-xs text-gray-500">
                          Completed at {new Date(job.completedAt).toLocaleTimeString()}
                        </span>
                      )}
                      <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                        <MoreVertical className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Activity Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {filteredHistory.slice(0, 5).map((job, index) => {
            const template = templates.find(t => t.id === job.templateId);
            
            return (
              <div key={job.id} className="flex items-center space-x-3 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
                <span className="text-gray-600">
                  {new Date(job.createdAt).toLocaleString()}
                </span>
                <span className="text-gray-900">
                  Exported {template?.name} via {job.format} 
                  ({job.recordCount} records, {formatCurrency(job.totalAmount)})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}