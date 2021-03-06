// == Import : npm
import React from 'react';
import { IoIosAt, IoLogoGithub, IoLogoTwitter, IoLogoFacebook, IoLogoLinkedin } from "react-icons/io";
import { NavLink, Route } from 'react-router-dom';



// == Import : local
import './footer.scss';

// == Composant
const Footer = () => (
  <>
    <div id="footer" className="footer">
      <div className="footer-upper">
        <div className="footer-upper-links">
          <h3>Navigation</h3>
          <ul>
            <li><NavLink exact to="/">Accueil</NavLink></li>
            <li><NavLink to="/projects">Projets</NavLink></li>
            <li><NavLink to="/subscribe">S'inscire</NavLink></li>
            <li><NavLink to="/login">Se connecter</NavLink></li>
            <li><NavLink to="/legalmentions">Mentions Légales</NavLink></li>
          </ul>
        </div>
        <div className="footer-upper-contacts">
          <h3> Contacts </h3>
          <div className="footer-upper-contacts">
            <a href="#"><IoIosAt /></a>
            <a href="https://github.com"><IoLogoGithub /></a>
            <a href="https://www.facebook.com"><IoLogoFacebook /></a>
            <a href="https://twitter.com"><IoLogoTwitter /></a>
            <a href="https://www.linkedin.com"><IoLogoLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-bottom-copyright">
          &copy; 2020 Team-Share-Project.io
      </div>
      </div>

    </div>
  </>
);

// == Export
export default Footer;
