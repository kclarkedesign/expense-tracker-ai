import { Expense } from '@/types/expense';
import { 
  CloudExportFormat, 
  ExportTemplate, 
  CloudProvider, 
  ExportJob, 
  ScheduledExport, 
  ShareableLink,
  CloudExportFilters 
} from '@/types/cloud-export';
import { v4 as uuidv4 } from 'uuid';
import QRCode from 'qrcode';
import { formatCurrency } from '@/lib/utils';

export class CloudExportService {
  private static exportHistory: ExportJob[] = [];
  private static scheduledExports: ScheduledExport[] = [];
  private static shareableLinks: ShareableLink[] = [];

  static getExportTemplates(): ExportTemplate[] {
    return [
      {
        id: 'tax-report',
        name: 'Tax Report',
        description: 'Detailed report for tax filing with categorized deductions',
        icon: '📊',
        fields: ['date', 'amount', 'category', 'description', 'taxDeductible'],
        defaultFilename: 'tax-report-{year}',
        targetAudience: 'Accountants & Tax Professionals'
      },
      {
        id: 'monthly-summary',
        name: 'Monthly Summary',
        description: 'Executive summary with key metrics and trends',
        icon: '📈',
        fields: ['monthlyTotals', 'categoryBreakdown', 'trends'],
        defaultFilename: 'monthly-summary-{month}-{year}',
        targetAudience: 'Management & Finance Teams'
      },
      {
        id: 'category-analysis',
        name: 'Category Analysis',
        description: 'Deep dive into spending patterns by category',
        icon: '🎯',
        fields: ['categoryTotals', 'percentages', 'trends', 'recommendations'],
        defaultFilename: 'category-analysis-{dateRange}',
        targetAudience: 'Budget Analysts'
      },
      {
        id: 'receipt-backup',
        name: 'Receipt Backup',
        description: 'Complete transaction log for backup and compliance',
        icon: '🗃️',
        fields: ['all'],
        defaultFilename: 'expense-backup-{timestamp}',
        targetAudience: 'Compliance & Audit'
      },
      {
        id: 'personal-budget',
        name: 'Personal Budget Review',
        description: 'Personal finance overview with insights',
        icon: '💰',
        fields: ['simplified', 'insights', 'goals'],
        defaultFilename: 'budget-review-{period}',
        targetAudience: 'Personal Use'
      }
    ];
  }

  static getCloudProviders(): CloudProvider[] {
    return [
      {
        id: 'google-drive',
        name: 'Google Drive',
        icon: '🔵',
        connected: Math.random() > 0.5,
        lastSync: '2025-09-01T10:30:00Z',
        autoBackup: true
      },
      {
        id: 'dropbox',
        name: 'Dropbox',
        icon: '📦',
        connected: Math.random() > 0.7,
        lastSync: '2025-08-30T15:45:00Z',
        autoBackup: false
      },
      {
        id: 'onedrive',
        name: 'OneDrive',
        icon: '☁️',
        connected: false
      },
      {
        id: 'google-sheets',
        name: 'Google Sheets',
        icon: '📋',
        connected: Math.random() > 0.3,
        lastSync: '2025-09-01T09:15:00Z',
        autoBackup: true
      },
      {
        id: 'notion',
        name: 'Notion',
        icon: '📝',
        connected: false
      }
    ];
  }

  static async generateShareableLink(expenses: Expense[], template: ExportTemplate): Promise<ShareableLink> {
    const id = uuidv4();
    const url = `https://expense-tracker.app/shared/${id}`;
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(); // 7 days
    
    const qrCode = await QRCode.toDataURL(url, {
      width: 200,
      margin: 2,
      color: {
        dark: '#1f2937',
        light: '#ffffff'
      }
    });

    const shareableLink: ShareableLink = {
      id,
      url,
      expiresAt,
      accessCount: 0,
      qrCode,
      createdAt: new Date().toISOString()
    };

    this.shareableLinks.push(shareableLink);
    return shareableLink;
  }

  static async simulateCloudExport(
    expenses: Expense[], 
    format: CloudExportFormat, 
    template: ExportTemplate,
    options: {
      recipient?: string;
      cloudProvider?: string;
      scheduledId?: string;
    } = {}
  ): Promise<ExportJob> {
    const jobId = uuidv4();
    
    const job: ExportJob = {
      id: jobId,
      templateId: template.id,
      format,
      status: 'pending',
      progress: 0,
      createdAt: new Date().toISOString(),
      recordCount: expenses.length,
      totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
      recipient: options.recipient,
      cloudProvider: options.cloudProvider
    };

    this.exportHistory.push(job);

    // Simulate processing
    return new Promise((resolve) => {
      const updateProgress = () => {
        const currentJob = this.exportHistory.find(j => j.id === jobId)!;
        
        if (currentJob.progress < 100) {
          currentJob.progress += Math.random() * 30 + 10;
          currentJob.status = 'processing';
          
          if (currentJob.progress >= 100) {
            currentJob.progress = 100;
            currentJob.status = format === 'link-share' ? 'shared' : 'completed';
            currentJob.completedAt = new Date().toISOString();
            
            if (format === 'link-share') {
              // Generate shareable link for this export
              this.generateShareableLink(expenses, template).then(link => {
                currentJob.shareUrl = link.url;
                currentJob.qrCode = link.qrCode;
              });
            }
            
            resolve(currentJob);
          } else {
            setTimeout(updateProgress, 800 + Math.random() * 1200);
          }
        }
      };

      setTimeout(updateProgress, 500);
    });
  }

  static async sendEmailExport(
    expenses: Expense[], 
    template: ExportTemplate, 
    recipient: string,
    subject?: string
  ): Promise<ExportJob> {
    return this.simulateCloudExport(expenses, 'email', template, { recipient });
  }

  static async exportToGoogleSheets(
    expenses: Expense[], 
    template: ExportTemplate,
    sheetName?: string
  ): Promise<ExportJob> {
    return this.simulateCloudExport(expenses, 'google-sheets', template, { 
      cloudProvider: 'google-sheets' 
    });
  }

  static async createShareableLink(
    expenses: Expense[], 
    template: ExportTemplate
  ): Promise<ExportJob> {
    return this.simulateCloudExport(expenses, 'link-share', template);
  }

  static async scheduleRecurringExport(
    templateId: string,
    frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly',
    cloudProvider: string,
    recipient?: string
  ): Promise<ScheduledExport> {
    const scheduled: ScheduledExport = {
      id: uuidv4(),
      templateId,
      frequency,
      nextRun: this.calculateNextRun(frequency),
      enabled: true,
      cloudProvider,
      recipient
    };

    this.scheduledExports.push(scheduled);
    return scheduled;
  }

  private static calculateNextRun(frequency: string): string {
    const now = new Date();
    switch (frequency) {
      case 'daily':
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
      case 'weekly':
        return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString();
      case 'monthly':
        return new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toISOString();
      case 'quarterly':
        return new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()).toISOString();
      default:
        return new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString();
    }
  }

  static getExportHistory(): ExportJob[] {
    return [...this.exportHistory].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  static getScheduledExports(): ScheduledExport[] {
    return [...this.scheduledExports];
  }

  static getShareableLinks(): ShareableLink[] {
    return [...this.shareableLinks];
  }

  static async revokeShareableLink(linkId: string): Promise<void> {
    const index = this.shareableLinks.findIndex(link => link.id === linkId);
    if (index !== -1) {
      this.shareableLinks.splice(index, 1);
    }
  }

  static async toggleScheduledExport(scheduledId: string): Promise<void> {
    const scheduled = this.scheduledExports.find(s => s.id === scheduledId);
    if (scheduled) {
      scheduled.enabled = !scheduled.enabled;
    }
  }

  static generateTemplateData(expenses: Expense[], template: ExportTemplate): any {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const categoryTotals = expenses.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {} as Record<string, number>);

    switch (template.id) {
      case 'tax-report':
        return {
          summary: {
            totalDeductions: total,
            recordCount: expenses.length,
            taxYear: new Date().getFullYear()
          },
          byCategory: Object.entries(categoryTotals).map(([cat, amount]) => ({
            category: cat,
            amount,
            percentage: (amount / total) * 100,
            deductible: ['Transportation', 'Bills'].includes(cat)
          })),
          transactions: expenses
        };

      case 'monthly-summary':
        return {
          period: {
            start: expenses.length > 0 ? expenses.map(e => e.date).sort()[0] : '',
            end: expenses.length > 0 ? expenses.map(e => e.date).sort().reverse()[0] : ''
          },
          metrics: {
            totalSpent: total,
            averageTransaction: expenses.length > 0 ? total / expenses.length : 0,
            transactionCount: expenses.length
          },
          breakdown: categoryTotals
        };

      case 'category-analysis':
        return {
          insights: Object.entries(categoryTotals)
            .sort(([,a], [,b]) => b - a)
            .map(([category, amount], index) => ({
              rank: index + 1,
              category,
              amount,
              percentage: (amount / total) * 100,
              trend: Math.random() > 0.5 ? 'increasing' : 'decreasing'
            }))
        };

      default:
        return { expenses, summary: { total, count: expenses.length } };
    }
  }

  static async connectProvider(providerId: string): Promise<boolean> {
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    return Math.random() > 0.2; // 80% success rate
  }

  static async disconnectProvider(providerId: string): Promise<void> {
    // Simulate disconnection
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}