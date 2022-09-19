import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { PokemonList } from "../components/PokemonList";
import { Spinner } from "../components/Spinner";
import noimage from "../img/noimage.png";

const MAX_POKEMON = 905;

export const Dashboard = () => {
  const navigate = useNavigate();

  const [pokemon, setPokemon] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    search: "",
  });
  const { search } = formData;

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ search: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let searchPokemon = null;
    if (isNaN(search)) {
      let findPokemon = pokemon.find(
        ({ name }) => name.toLowerCase() === search.toLowerCase()
      );
      if (findPokemon) {
        searchPokemon = findPokemon.index;
      }
    } else {
      if (parseInt(search) > 0 && parseInt(search) < MAX_POKEMON)
        searchPokemon = search;
    }

    if (searchPokemon) {
      navigate("/pokedex/pokemon/" + searchPokemon);
    } else {
      navigate("/pokedex/404");
    }
  };

  useEffect(() => {
    //Get a list of pokemom
    const getPokemon = async () => {
      const url = `https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}&offset=0`;
      const res = await axios.get(url);
      const pokemon = res.data.results.map((result, index) => {
        let stringIndex = null;
        if (index + 1 < 100) {
          if (index + 1 < 10) {
            stringIndex = "00" + (index + 1).toString();
          } else {
            stringIndex = "0" + (index + 1).toString();
          }
        } else {
          stringIndex = (index + 1).toString();
        }
        return {
          name: result.name,
          index: stringIndex,
          image: `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${stringIndex}.png`,
          apiURL: result.url,
        };
      });
      setPokemon(pokemon);
      setSearchResults(pokemon);
    };
    getPokemon();
  }, []);

  useEffect(() => {
    // display user's search results while the user is typing
    const getSeachResults = async () => {
      let searchList = pokemon
        .filter((pokemon) => {
          if (
            pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
            pokemon.index === parseInt(search)
          ) {
            return true;
          } else {
            return false;
          }
        })
        .map((pokemon) => {
          return pokemon;
        });
      setSearchResults(searchList);
    };
    getSeachResults();
  }, [search, pokemon]);

  return (
    <Fragment>
      {pokemon.length === 0 ? (
        <div className="loading d-flex justify-content-center w-100 vh-100 position-absolute">
          <Spinner />
        </div>
      ) : (
        <Fragment>
          <div className="loading-fade d-flex justify-content-center w-100 vh-100 position-absolute">
            <Spinner />
          </div>
          <div className="container ">
            <div className="search-bar-custom">
              <form>
                <input
                  placeholder="Pokemon Name or Number"
                  name="search"
                  value={search}
                  onChange={(e) => onChange(e)}
                  autoComplete="off"
                  className="form-control mx-auto search-custom"
                  style={{
                    backgroundColor: "white transparent",
                    height: "1.75em",
                    width: "95%",
                    borderRadius: "10px",
                    opacity: "0.8",
                    fontSize: "1.75em",
                  }}
                />
                <input
                  style={{ display: "none" }}
                  type="submit"
                  onClick={(e) => onSubmit(e)}
                />
              </form>
            </div>
            <div className="row">
              <div className="col">
                <PokemonList pokemon={searchResults} />
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
