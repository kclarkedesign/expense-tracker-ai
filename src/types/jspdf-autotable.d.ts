declare module 'jspdf-autotable' {
  import { jsPDF } from 'jspdf';
  
  interface AutoTableOptions {
    startY?: number;
    head?: string[][];
    body?: string[][];
    theme?: 'striped' | 'grid' | 'plain';
    headStyles?: { fillColor?: number[] };
    columnStyles?: Record<number, { cellWidth?: number | 'auto'; halign?: 'left' | 'center' | 'right' }>;
  }
  
  function autoTable(doc: jsPDF, options: AutoTableOptions): void;
  
  export default autoTable;
}