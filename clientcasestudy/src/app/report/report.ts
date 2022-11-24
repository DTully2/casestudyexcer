import { ReportItem } from './report-item';
/**
 * Report - interface for expense report
 */
export interface Report {
  id: number;
  vendorid: number;
  amount: number;
  items: ReportItem[];
  podate?: string;
}
