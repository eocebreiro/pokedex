import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";

import noimage from "../img/noimage.jpg";
import { Spinner } from "../components/Spinner";
import { PokemonList } from "../components/PokemonList";

export const Dashboard = () => {
  const [pokemonList, setPokemonList] = useState(null);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  const pokemon = [];

  //Get a list of pokemon
  const getPokemon = async () => {
    try {
      const res = await axios.get(url);
      for (let i = 0; i < res.data["results"].length; i++) {
        let index =
          res.data["results"][i].url.split("/")[
            res.data["results"][i].url.split("/").length - 2
          ];
        try {
          let pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + index;

          const pokemonRes = await axios.get(pokemonUrl);

          let image;
          if (pokemonRes.data.sprites.front_default) {
            image = pokemonRes.data.sprites.front_default;
          } else {
            image = noimage;
          }

          pokemon.push({
            name: res.data["results"][i].name,
            index: index,
            url: pokemonUrl,
            image: image,
          });
        } catch (error) {
          console.log(error);
        }
      }
      setPokemonList(pokemon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPokemon();
  });

  return (
    <Fragment>
      {pokemonList ? (
        <Fragment>
          <div className="loading-fade d-flex justify-content-center w-100 vh-100 position-absolute">
            <Spinner />
          </div>
          <div className="container ">
            <div className="row">
              <div className="col">
                <PokemonList pokemon={pokemonList} />
              </div>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="loading d-flex justify-content-center w-100 vh-100 position-absolute">
            <Spinner />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
