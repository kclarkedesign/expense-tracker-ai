'use client';

import React, { useState, useEffect } from 'react';
import { 
  Share2, 
  Link2, 
  QrCode, 
  Copy, 
  Mail, 
  MessageSquare, 
  Users,
  Clock,
  Shield,
  Eye,
  Download,
  Trash2,
  RefreshCw,
  Loader2
} from 'lucide-react';
import { Expense } from '@/types/expense';
import { ShareableLink, ExportTemplate } from '@/types/cloud-export';
import { CloudExportService } from '@/lib/cloud-export';
import { formatCurrency, cn } from '@/lib/utils';

interface ShareCenterProps {
  expenses: Expense[];
}

export function ShareCenter({ expenses }: ShareCenterProps) {
  const [shareableLinks, setShareableLinks] = useState<ShareableLink[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<ExportTemplate | null>(null);
  const [isGeneratingLink, setIsGeneratingLink] = useState(false);
  const [linkSettings, setLinkSettings] = useState({
    expiresIn: '7days',
    maxAccess: '',
    passwordProtected: false
  });

  const templates = CloudExportService.getExportTemplates();

  useEffect(() => {
    setShareableLinks(CloudExportService.getShareableLinks());
  }, []);

  const handleGenerateLink = async () => {
    if (!selectedTemplate) return;
    
    setIsGeneratingLink(true);
    try {
      const link = await CloudExportService.generateShareableLink(expenses, selectedTemplate);
      setShareableLinks(prev => [link, ...prev]);
    } catch (error) {
      console.error('Failed to generate link:', error);
    }
    setIsGeneratingLink(false);
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const revokeLink = async (linkId: string) => {
    await CloudExportService.revokeShareableLink(linkId);
    setShareableLinks(prev => prev.filter(link => link.id !== linkId));
  };

  const totalValue = formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Share & Collaborate</h2>
        <p className="text-gray-600 mt-2">Create secure, shareable exports for teams and stakeholders</p>
      </div>

      {/* Quick Share Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all text-center group">
          <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-3 group-hover:bg-blue-200 transition-colors">
            <Mail className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Email Report</h3>
          <p className="text-sm text-gray-600">Send formatted report via email</p>
        </button>

        <button className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all text-center group">
          <div className="bg-green-100 p-3 rounded-full w-fit mx-auto mb-3 group-hover:bg-green-200 transition-colors">
            <MessageSquare className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Slack/Teams</h3>
          <p className="text-sm text-gray-600">Post summary to team channels</p>
        </button>

        <button className="p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all text-center group">
          <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-3 group-hover:bg-purple-200 transition-colors">
            <Users className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">Team Dashboard</h3>
          <p className="text-sm text-gray-600">Add to shared workspace</p>
        </button>
      </div>

      {/* Create Shareable Link */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Create Shareable Link</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Template
            </label>
            <select
              value={selectedTemplate?.id || ''}
              onChange={(e) => {
                const template = templates.find(t => t.id === e.target.value);
                setSelectedTemplate(template || null);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Choose a template...</option>
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.icon} {template.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Link Expires
            </label>
            <select
              value={linkSettings.expiresIn}
              onChange={(e) => setLinkSettings(prev => ({ ...prev, expiresIn: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="1day">1 Day</option>
              <option value="7days">7 Days</option>
              <option value="30days">30 Days</option>
              <option value="never">Never</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Access Count (optional)
            </label>
            <input
              type="number"
              placeholder="Unlimited"
              value={linkSettings.maxAccess}
              onChange={(e) => setLinkSettings(prev => ({ ...prev, maxAccess: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div className="flex items-center space-x-2 pt-6">
            <input
              type="checkbox"
              id="password-protected"
              checked={linkSettings.passwordProtected}
              onChange={(e) => setLinkSettings(prev => ({ ...prev, passwordProtected: e.target.checked }))}
              className="rounded text-blue-600"
            />
            <label htmlFor="password-protected" className="text-sm text-gray-700">
              Password protected
            </label>
          </div>
        </div>

        <button
          onClick={handleGenerateLink}
          disabled={!selectedTemplate || isGeneratingLink}
          className={cn(
            'w-full mt-6 flex items-center justify-center space-x-2 py-3 rounded-lg font-medium transition-colors',
            !selectedTemplate || isGeneratingLink
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
          )}
        >
          {isGeneratingLink ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Generating secure link...</span>
            </>
          ) : (
            <>
              <Link2 className="h-4 w-4" />
              <span>Generate Shareable Link</span>
            </>
          )}
        </button>
      </div>

      {/* Active Shared Links */}
      {shareableLinks.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Active Shared Links</h3>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              <RefreshCw className="h-4 w-4 inline mr-1" />
              Refresh
            </button>
          </div>

          <div className="space-y-4">
            {shareableLinks.map((link) => (
              <div key={link.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Link2 className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-gray-900">Shared Export Link</span>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                    
                    <div className="text-sm text-gray-600 space-y-1">
                      <div>Created: {new Date(link.createdAt).toLocaleDateString()}</div>
                      <div>Expires: {new Date(link.expiresAt).toLocaleDateString()}</div>
                      <div>Access count: {link.accessCount}</div>
                    </div>

                    <div className="flex items-center space-x-2 mt-3">
                      <input
                        type="text"
                        value={link.url}
                        readOnly
                        className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard(link.url)}
                        className="p-2 text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg hover:bg-blue-50"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="ml-6 flex flex-col items-center space-y-2">
                    <div className="border border-gray-200 rounded-lg p-2 bg-white">
                      <img 
                        src={link.qrCode} 
                        alt="QR Code" 
                        className="w-20 h-20"
                      />
                    </div>
                    <button className="text-xs text-gray-600 hover:text-gray-800">
                      <QrCode className="h-3 w-3 inline mr-1" />
                      Download QR
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-3 w-3" />
                      <span>Encrypted</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>View-only</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => revokeLink(link.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    <Trash2 className="h-4 w-4 inline mr-1" />
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Collaboration Features */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">🚀 Coming Soon</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Real-time collaborative editing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Comment system on shared reports</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Team workspace integration</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Advanced permission controls</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Audit trail for shared data</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
              <span>Integration with Slack, Teams, Discord</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}