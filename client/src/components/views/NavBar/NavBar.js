import React from 'react';
import './Navbar.css';
import RightMenu from './Sections/RightMenu';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/');
  };

  return (
    <div className="status-bar">
      <div className="status-bar__column">
        <button className="navbar-left_button" onClick={navigateToLandingPage}>
          Togather
        </button>
      </div>

      <div className="status-bar__column">
        <RightMenu />
      </div>
    </div>
  );
}

export default NavBar;
