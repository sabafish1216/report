import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <Link to="/" className="logo">
            📊 Report
          </Link>
          
          <nav className="nav">
            <Link 
              to="/" 
              className={`nav-link ${isHomePage ? 'active' : ''}`}
            >
              レポート表示
            </Link>
            <Link 
              to="/add" 
              className={`nav-link ${!isHomePage ? 'active' : ''}`}
            >
              新規追加
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
