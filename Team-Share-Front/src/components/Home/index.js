// == Import : npm
import React from 'react';
import { NavLink } from 'react-router-dom';

// == Import : local
import './home.scss';
import SubscribeModal from 'src/containers/Subscribe';

// == Composant
const Home = ({ token }) => (
  <div className="div-home">
    <main className="main-container">

      <div className="welcome">
        <h1 className="welcome-title">Vous êtes sur Team-Share</h1>
        <p className="welcome-subtitle">Team-Share est une plate-forme d'appel à projets collaboratifs. Si vous cherchez une équipe pour monter votre projet web, vous êtes bien tombé. Vous pouvez vous inscrire, vous connecter, créer un projet et liker les projets qui vous plaisent. Enjoy!</p>

        <div className="welcome-buttons">
          {token.length > 3 && <NavLink to="/project-creation"><button className="welcome-buttons-button cta-button">Lancez-vous !</button></NavLink>}
          {token === '' && <SubscribeModal className="welcome-buttons-button cta-button">Nouveau Projet !</SubscribeModal>}
          <NavLink to="/legalmentions">
          <button className="welcome-buttons-button">En savoir plus</button>
          </NavLink>
        </div>
      </div>
      <img className="team-pic" src="src/assets/together.jpg" title="Photo by krakenimages on Unsplash" alt="quatre personnes agissant en équipe" />
    </main>

    <svg className="wave" viewBox="0 0 1170 126" xmlns="http://www.w3.org/2000/svg">
      <path className="wave-path" fill="#FFF" fillRule="evenodd" d="M685.6,38.8C418.7-11.1,170.2,9.9,0,30v96h1440V30C1252.7,52.2,1010,99.4,685.6,38.8z" />
    </svg>
  </div>
);

// == Export
export default Home;

