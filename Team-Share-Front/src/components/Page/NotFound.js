// import Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// import Components
import "./notfound.scss";

// this Component
const NotFound = () => (

  <div className="notfound">
    <h1 className="notfound-text">
      Congratulations !  You found the 404  !!!!
    </h1>
    <img className='notfound-image' alt="Leonardo Dicaprio vous fellicite d'avoir trouvé la page 404" src="https://media.giphy.com/media/E4LWtyQ9KiToA/giphy.gif" />

    <Link content="Back Home"to="/">
      <p className="notfound-link">Back Home</p>
    </Link>
  </div>
);

export default NotFound;