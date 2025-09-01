import { Expense, ExpenseCategory } from './expense';

export type CloudExportFormat = 'email' | 'google-sheets' | 'dropbox' | 'onedrive' | 'link-share';

export type ExportTemplate = {
  id: string;
  name: string;
  description: string;
  icon: string;
  fields: string[];
  defaultFilename: string;
  targetAudience?: string;
};

export type CloudProvider = {
  id: string;
  name: string;
  icon: string;
  connected: boolean;
  lastSync?: string;
  autoBackup?: boolean;
};

export type ExportJob = {
  id: string;
  templateId: string;
  format: CloudExportFormat;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'shared';
  progress: number;
  createdAt: string;
  completedAt?: string;
  recordCount: number;
  totalAmount: number;
  shareUrl?: string;
  qrCode?: string;
  errorMessage?: string;
  recipient?: string;
  cloudProvider?: string;
};

export type ScheduledExport = {
  id: string;
  templateId: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  nextRun: string;
  lastRun?: string;
  enabled: boolean;
  cloudProvider: string;
  recipient?: string;
};

export type ShareableLink = {
  id: string;
  url: string;
  expiresAt: string;
  accessCount: number;
  maxAccess?: number;
  password?: boolean;
  qrCode: string;
  createdAt: string;
};

export interface CloudExportFilters {
  dateRange?: {
    start: string;
    end: string;
  };
  categories: ExpenseCategory[];
  template: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface CloudExportState {
  jobs: ExportJob[];
  scheduledExports: ScheduledExport[];
  shareableLinks: ShareableLink[];
  connectedProviders: CloudProvider[];
  templates: ExportTemplate[];
}