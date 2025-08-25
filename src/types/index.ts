export interface Report {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface ReportFormData {
  title: string;
  content: string;
}
