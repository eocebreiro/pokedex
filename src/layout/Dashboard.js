import React, { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PokemonList } from "../components/PokemonList";

export const Dashboard = ({ pokemonList }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    search: "",
  });
  const { search } = formData;

  const [list, setList] = useState(pokemonList);

  const onChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, search: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    let pokemonIndex = null;
    let index = null;
    if (isNaN(search)) {
      console.log(search);
      index = await list.map((pokemon) =>
        pokemon.name.toLowerCase().indexOf(search.toLowerCase())
      );
      if (search.toLowerCase() !== (await list[index].name.toLowerCase())) {
        index = null;
      }
    } else {
      console.log(search);
      index = await list.map((pokemon) => pokemon.index.indexOf(search));
    }
    if (index != null) {
      pokemonIndex = list[index].index;

      navigate("/pokedex/pokemon/" + pokemonIndex);
    }
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
            <input
              style={{ display: "none" }}
              type="submit"
              onClick={(e) => onSubmit(e)}
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
