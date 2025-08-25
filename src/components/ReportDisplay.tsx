import React, { useEffect, useState } from 'react';
import { Report } from '../types';
import { getLatestReport } from '../utils/storage';
import './ReportDisplay.css';

const ReportDisplay: React.FC = () => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadReport = () => {
      const latestReport = getLatestReport();
      setReport(latestReport);
      setLoading(false);
    };

    loadReport();
    
    // ページがフォーカスされた時にデータを再読み込み
    const handleFocus = () => {
      loadReport();
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) {
    return (
      <div className="report-display loading">
        <div className="loading-spinner">読み込み中...</div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="report-display empty">
        <h2>レポートがありません</h2>
        <p>新しいレポートを追加してください。</p>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="report-display">
      <div className="report-header">
        <h1 className="report-title">{report.title}</h1>
        <div className="report-meta">
          <span className="update-time">
            更新日時: {formatDate(report.updatedAt)}
          </span>
        </div>
      </div>
      
      <div className="report-content">
        <div className="content-text">
          {report.content.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportDisplay;
