import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import ReportDisplay from './components/ReportDisplay';

// テスト用のラッパーコンポーネント
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <BrowserRouter>
    {children}
  </BrowserRouter>
);

test('renders header with logo and navigation', () => {
  render(
    <TestWrapper>
      <Header />
    </TestWrapper>
  );
  
  // ヘッダーのロゴが表示されることを確認
  const logoElement = screen.getByText(/📊 Report/i);
  expect(logoElement).toBeInTheDocument();
  
  // ナビゲーションリンクが表示されることを確認
  const reportDisplayLink = screen.getByText(/レポート表示/i);
  expect(reportDisplayLink).toBeInTheDocument();
  
  const addReportLink = screen.getByText(/新規追加/i);
  expect(addReportLink).toBeInTheDocument();
});

test('renders report display with empty state when no reports exist', () => {
  render(<ReportDisplay />);
  
  // レポートがない場合のメッセージが表示されることを確認
  const emptyMessage = screen.getByText(/レポートがありません/i);
  expect(emptyMessage).toBeInTheDocument();
  
  const addMessage = screen.getByText(/新しいレポートを追加してください/i);
  expect(addMessage).toBeInTheDocument();
});
