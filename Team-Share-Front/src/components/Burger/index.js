// npm import
import React from "react";
import { slide as Menu } from "react-burger-menu";
import { NavLink } from 'react-router-dom';
import { Divider } from 'semantic-ui-react'


// local import
import './burger.scss';
import LoginModal from "src/components/Login";
import SubscribeModal from "src/components/Subscribe";

const Burger = () => {


  return (
    <Menu right>
      {/* <NavLink className="menu-item" to="/login">
        Se connecter
      </NavLink>
      <NavLink className="menu-item" to="#">
        S'inscrire
      </NavLink>
      <Divider />
      <NavLink className="menu-item" to="/profil" exact>
        Ton profil
      </NavLink> */}
      <Divider />
      <NavLink className="menu-item" to="/projects" exact>
        Liste des projets
      </NavLink>
      <NavLink className="menu-item" to="/project-creation" exact>
        Creer un projet
      </NavLink>
      <Divider />
      {/* <NavLink className="menu-item" to="/team" exact>
          A propos
      </NavLink> */}
      <NavLink className="menu-item" to="/legalmentions" exact>
        Mentions légales
      </NavLink>
      <Divider />
      <NavLink className="menu-item" to="/" exact>
        Logout
      </NavLink>
    </Menu>
  );
};


export default Burger;