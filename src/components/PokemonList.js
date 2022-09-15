import React from "react";

import { PokemonCard } from "./PokemonCard";

export const PokemonList = ({ pokemon }) => {
  return (
    <div className="row">
      {pokemon.map((pokemon) => (
        <PokemonCard
          key={pokemon.name}
          name={pokemon.name}
          url={pokemon.url}
          image={pokemon.image}
          index={pokemon.index}
        />
      ))}
    </div>
  );
};
