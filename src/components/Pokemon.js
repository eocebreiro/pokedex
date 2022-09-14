import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Pokemon = () => {
  const [name, setName] = useState(null);

  const { pokemonIndex } = useParams();

  //Urls for pokemon information (API)
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

  //Get pokemon info
  const getPokemonInfo = async () => {
    const pokemonRes = await axios.get(pokemonUrl);
    setName(pokemonRes.data.name);
    console.log(pokemonRes.data.name);
  };

  useEffect(() => {
    getPokemonInfo();
  });

  return (
    <div className="container">
      <h1>{name}</h1>
    </div>
  );
};
