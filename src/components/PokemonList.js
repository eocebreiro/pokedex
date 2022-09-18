import React from "react";

import { PokemonCard } from "./PokemonCard";

export const PokemonList = ({ pokemon }) => {
  return (
    <div className="row">
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.index}
          name={pokemon.name}
          apiURL={pokemon.apiURL}
          image={pokemon.image}
          index={pokemon.index}
        />
      ))}
    </div>
  );
};
