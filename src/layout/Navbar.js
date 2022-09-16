import React from "react";
import { Link } from "react-router-dom";
import pokeballImg from "../img/pokeball.png";

export const Navbar = () => {
  return (
    <nav className="ps-2 pe-2 navbar navbar-expand-md navbar-dark bg-dark fixed-top">
      <Link
        to="/pokedex"
        className="navbar-brand col-sm-3 col-md-2 mr-0 text-center"
      >
        P
        <img
          className="pokeball-logo-icon"
          src={pokeballImg}
          alt="pokeball logo icon"
        />
        kedex
      </Link>
    </nav>
  );
};
