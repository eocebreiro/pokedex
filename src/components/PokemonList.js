import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import { PokemonCard } from "./PokemonCard";

export const PokemonList = () => {
  const [data, setData] = useState({
    url: "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0",
    pokemon: null,
  });

  const { url, pokemon } = data;

  const getPokemon = async () => {
    const res = await axios.get(url);
    setData({ pokemon: res.data["results"] });
  };

  useEffect(() => {
    getPokemon();
  }, []);

  return (
    <Fragment>
      {pokemon ? (
        <div className="row">
          {pokemon.map((pokemon) => (
            <PokemonCard
              key={pokemon.name}
              name={pokemon.name}
              url={pokemon.url}
            />
          ))}
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </Fragment>
  );
};
