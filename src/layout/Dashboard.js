import React, { Fragment } from "react";

import { PokemonList } from "../components/PokemonList";
import { SearchBar } from "../components/SearchBar";

export const Dashboard = ({ pokemonList }) => {
  return (
    <Fragment>
      <div className="container ">
        <SearchBar />
        <div className="row">
          <div className="col">
            <PokemonList pokemon={pokemonList} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
