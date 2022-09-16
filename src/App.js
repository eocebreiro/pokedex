import React, { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { Navbar } from "./layout/Navbar";
import { Dashboard } from "./layout/Dashboard";
import { NotFoundPage } from "./layout/NotFoundPage";
import { Pokemon } from "./components/Pokemon";
import { Spinner } from "./components/Spinner";
import noimage from "./img/noimage.png";
import backgroundImage from "./img/background.png";

const MAX_POKEMON = 905;

function App() {
  // Busness Logic
  const [pokemonList, setPokemonList] = useState(null);
  const url = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  const pokemon = [];
  //Get a list of pokemon
  const getPokemon = async () => {
    try {
      const res = await axios.get(url);
      for (let i = 0; i < MAX_POKEMON; i++) {
        let index =
          res.data["results"][i].url.split("/")[
            res.data["results"][i].url.split("/").length - 2
          ];
        try {
          let pokemonUrl = "https://pokeapi.co/api/v2/pokemon/" + index;

          const pokemonData = await axios.get(pokemonUrl);

          let image;
          if (pokemonData.data.sprites.front_default) {
            image = pokemonData.data.sprites.front_default;
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
    <Router>
      <Fragment>
        {pokemonList ? (
          <Fragment>
            <div
              className="App"
              style={{ background: `url(${backgroundImage})` }}
            >
              <Navbar />
              <div className="loading-fade d-flex justify-content-center w-100 vh-100 position-absolute">
                <Spinner />
              </div>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={<Dashboard pokemonList={pokemonList} />}
                />
                <Route
                  exact
                  path="/pokemon/:pokemonIndex"
                  element={<Pokemon />}
                />
                <Route exact path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </Fragment>
        ) : (
          <div className="loading d-flex justify-content-center w-100 vh-100 position-absolute">
            <Spinner />
          </div>
        )}
      </Fragment>
    </Router>
  );
}

export default App;
