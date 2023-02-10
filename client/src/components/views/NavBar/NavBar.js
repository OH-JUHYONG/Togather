import React from 'react';
import './Sections/Navbar.css';
import RightMenu from './Sections/RightMenu';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const navigateToLandingPage = () => {
    navigate('/');
  };

  return (
    <nav className="navbar">
      <button className="navbar-left_button" onClick={navigateToLandingPage}>
        Togather
      </button>
      <div>
        <RightMenu />
      </div>
    </nav>
  );
}

export default NavBar;
