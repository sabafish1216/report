import { Report, ReportFormData } from '../types';

const STORAGE_KEY = 'reports';

export const getReports = (): Report[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to get reports from storage:', error);
    return [];
  }
};

export const saveReport = (reportData: ReportFormData): Report => {
  try {
    const newReport: Report = {
      id: Date.now().toString(),
      ...reportData,
      updatedAt: new Date().toISOString()
    };
    
    // 既存のレポートを新しいレポートで置き換える
    const updatedReports = [newReport];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReports));
    
    return newReport;
  } catch (error) {
    console.error('Failed to save report:', error);
    throw new Error('レポートの保存に失敗しました');
  }
};

export const getLatestReport = (): Report | null => {
  const reports = getReports();
  return reports.length > 0 ? reports[0] : null;
};
