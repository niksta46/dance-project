import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            Dance Studio
          </Link>
          
          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/pages" className="nav-link">
                Pages
              </Link>
            </li>
            <li>
              <Link to="/classes" className="nav-link">
                Classes
              </Link>
            </li>
            <li>
              <Link to="/news" className="nav-link">
                News
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;