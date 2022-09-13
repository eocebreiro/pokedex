import React from "react";
import { PokemonList } from "../components/PokemonList";

export const Dashboard = () => {
  return (
    <div className="row">
      <div className="col">
        <PokemonList />
      </div>
    </div>
  );
};
