// == Import : npm
import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';


// == Import : local
import './navbar.scss';
import LoginModal from 'src/containers/Login';
import SubscribeModal from 'src/containers/Subscribe';
import DisconnectModal from 'src/containers/Disconnect';



const NavBar = ({ token }) => {

  return (
    <div className="navbar">
      <div>
        <NavLink to="/" exact>
          <img className="navbar-logo" alt="logo" src="src/assets/logo.png" />
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li>
          {token.length > 3 && <NavLink to="/profile" className="navbar-link-menu">Mon Profil</NavLink>}
        </li>
        <li>
          <NavLink to="/projects" className="navbar-link-menu">Tous les projets</NavLink>
        </li>
        <li>
          {token.length > 3 && <NavLink to="/project-creation" className="navbar-link-menu">Créer un Projet</NavLink>}
        </li>
        <li>
          {token === "" && <LoginModal className="button-link-connect" />}
        </li>
        <li className="navbar-link">
          {token === "" && <SubscribeModal className="button-link button-link-subscribe" />}
        </li>
        <li className="navbar-link">
          {token.length > 3 && <DisconnectModal className="button-link-connect" />}
        </li>
        
      </ul>

    </div>
  );
};

NavBar.propTypes = {
  token: PropTypes.string.isRequired,
}

export default NavBar;