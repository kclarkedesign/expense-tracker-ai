import { Expense } from '@/types/expense';
import { formatCurrency } from '@/lib/utils';

export type ExportFormat = 'csv' | 'json' | 'pdf';

export class AdvancedExportService {
  static async exportToCSV(expenses: Expense[]): Promise<string> {
    const headers = ['Date', 'Amount', 'Category', 'Description', 'Created At'];
    const rows = expenses.map(expense => [
      expense.date,
      expense.amount.toString(),
      expense.category,
      `"${expense.description.replace(/"/g, '""')}"`,
      expense.createdAt
    ]);

    return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
  }

  static async exportToJSON(expenses: Expense[]): Promise<string> {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalRecords: expenses.length,
      totalAmount: expenses.reduce((sum, exp) => sum + exp.amount, 0),
      expenses: expenses.map(expense => ({
        ...expense,
        formattedAmount: formatCurrency(expense.amount)
      })),
      summary: {
        byCategory: this.getCategorySummary(expenses),
        dateRange: {
          earliest: expenses.length > 0 ? Math.min(...expenses.map(e => new Date(e.date).getTime())) : null,
          latest: expenses.length > 0 ? Math.max(...expenses.map(e => new Date(e.date).getTime())) : null
        }
      }
    };

    return JSON.stringify(exportData, null, 2);
  }

  static async exportToPDF(expenses: Expense[]): Promise<any> {
    // Dynamic import to avoid SSR issues
    const { jsPDF } = await import('jspdf');
    const autoTable = (await import('jspdf-autotable')).default;

    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.text('Expense Report', 20, 20);
    
    // Add export info
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, 30);
    doc.text(`Total Records: ${expenses.length}`, 20, 35);
    doc.text(`Total Amount: ${formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0))}`, 20, 40);

    // Add summary by category
    const categoryData = this.getCategorySummary(expenses);
    if (Object.keys(categoryData).length > 0) {
      doc.setFontSize(14);
      doc.text('Summary by Category', 20, 55);
      
      autoTable(doc, {
        startY: 60,
        head: [['Category', 'Count', 'Total Amount', 'Percentage']],
        body: Object.entries(categoryData).map(([category, data]) => [
          category,
          data.count.toString(),
          formatCurrency(data.total),
          `${data.percentage.toFixed(1)}%`
        ]),
        theme: 'grid',
        headStyles: { fillColor: [59, 130, 246] },
      });
    }

    // Add detailed expense table
    const finalY = (doc as any).lastAutoTable?.finalY || 100;
    doc.setFontSize(14);
    doc.text('Detailed Expenses', 20, finalY + 15);

    autoTable(doc, {
      startY: finalY + 25,
      head: [['Date', 'Amount', 'Category', 'Description']],
      body: expenses.map(expense => [
        expense.date,
        formatCurrency(expense.amount),
        expense.category,
        expense.description.length > 40 ? expense.description.substring(0, 40) + '...' : expense.description
      ]),
      theme: 'striped',
      headStyles: { fillColor: [59, 130, 246] },
      columnStyles: {
        0: { cellWidth: 25 },
        1: { cellWidth: 25, halign: 'right' },
        2: { cellWidth: 30 },
        3: { cellWidth: 'auto' }
      },
    });

    return doc;
  }

  static getCategorySummary(expenses: Expense[]) {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    
    return expenses.reduce((acc, expense) => {
      if (!acc[expense.category]) {
        acc[expense.category] = { count: 0, total: 0, percentage: 0 };
      }
      acc[expense.category].count++;
      acc[expense.category].total += expense.amount;
      acc[expense.category].percentage = total > 0 ? (acc[expense.category].total / total) * 100 : 0;
      return acc;
    }, {} as Record<string, { count: number; total: number; percentage: number }>);
  }

  static async downloadFile(content: string | any, filename: string, format: ExportFormat): Promise<void> {
    if (format === 'pdf' && content && typeof content.save === 'function') {
      content.save(`${filename}.pdf`);
      return;
    }

    const blob = new Blob([content as string], {
      type: format === 'json' ? 'application/json' : 'text/csv'
    });

    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  }

  static async exportExpenses(expenses: Expense[], format: ExportFormat, filename: string): Promise<void> {
    let content: string | any;

    switch (format) {
      case 'csv':
        content = await this.exportToCSV(expenses);
        break;
      case 'json':
        content = await this.exportToJSON(expenses);
        break;
      case 'pdf':
        content = await this.exportToPDF(expenses);
        break;
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }

    await this.downloadFile(content, filename, format);
  }
}