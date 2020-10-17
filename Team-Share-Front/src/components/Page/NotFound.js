// import Modules
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


// import Components


// this Component
const NotFound = () => (
    
    <div classname="container w-75">
                <h1 className="text-center m-3 text-dark">
                    Bravo tu as trouvé la page 404 !!!!
                    <img src="https://media.giphy.com/media/E4LWtyQ9KiToA/giphy.gif" />
                </h1>
    <Link to="/">
      <h1>Go Home</h1>
    </Link>
  </div>
);

export default NotFound;