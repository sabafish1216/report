import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ReportFormData } from '../types';
import { saveReport } from '../utils/storage';
import './ReportForm.css';

const ReportForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ReportFormData>({
    title: '',
    content: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('タイトルと本文を入力してください');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await saveReport(formData);
      // 保存成功後、メインページにリダイレクト
      navigate('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'レポートの保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="report-form-container">
      <div className="form-header">
        <h1>新しいレポートを追加</h1>
        <p>新しいレポートを作成すると、既存のレポートは置き換えられます</p>
      </div>

      <form onSubmit={handleSubmit} className="report-form">
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="title">タイトル *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="レポートのタイトルを入力してください"
            required
            maxLength={100}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">本文 *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            placeholder="レポートの本文を入力してください"
            required
            rows={15}
            maxLength={5000}
          />
          <div className="character-count">
            {formData.content.length}/5000文字
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
            disabled={isSubmitting}
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? '保存中...' : 'レポートを保存'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
