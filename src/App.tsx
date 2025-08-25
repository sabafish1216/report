import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ReportDisplay from './components/ReportDisplay';
import ReportForm from './components/ReportForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ReportDisplay />} />
            <Route path="/add" element={<ReportForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
