import React, { Fragment, useState, useEffect } from "react";

import { PokemonList } from "../components/PokemonList";
import { SearchBar } from "../components/SearchBar";

export const Dashboard = ({ pokemonList }) => {
  const [formData, setFormData] = useState({
    search: "",
  });
  const { search } = formData;

  const [list, setList] = useState(pokemonList);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getList = async () => {
    let searchList = pokemonList
      .filter((pokemon) => {
        if (
          pokemon.name.toLowerCase().includes(search.toLowerCase()) ||
          pokemon.index === search
        ) {
          return true;
        } else {
          return false;
        }
      })
      .map((pokemon) => {
        return pokemon;
      });

    setList(searchList);
  };

  useEffect(() => {
    getList();
  }, [search]);
  return (
    <Fragment>
      <div className="container ">
        <div className="pt-4 pb-4">
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
          </form>
        </div>
        <div className="row">
          <div className="col">
            <PokemonList pokemon={list} />
          </div>
        </div>
      </div>
    </Fragment>
  );
};
