import React from "react";
import { NavLink } from 'react-router-dom';

// Nav component with links to static topics
const Nav = () => {
  return (
    <nav className="main-nav">
      <ul>
       {/* Navigation links using NavLink to highlight active routes */}
        <li><NavLink to="/cats">Cats</NavLink></li>
        <li><NavLink to="/dogs">Dogs</NavLink></li>
        <li><NavLink to="/computers">Computers</NavLink></li>
      </ul>
    </nav>
  );
};


export default Nav;
