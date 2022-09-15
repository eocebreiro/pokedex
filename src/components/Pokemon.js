import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TYPE_COLORS = {
  Bug: "#B1C12E",
  Dark: "#4F3A2D",
  Dragon: "#755EDF",
  Electric: "#FCBC17",
  Fairy: "#F4B1F4",
  Fighting: "#823551D",
  Fire: "#E73B0C",
  Flying: "#A3B3F7",
  Ghost: "#6060B2",
  Grass: "#74C236",
  Ground: "#D3B357",
  Ice: "#A3E7FD",
  Normal: "#C8C4BC",
  Poison: "#934594",
  Psychic: "#ED4882",
  Rock: "#B9A156",
  Steel: "#B5B5C3",
  Water: "#3295F6",
};

export const Pokemon = () => {
  const [data, setData] = useState({
    name: "",
    imageUrl: "",
    types: [],
    stats: {
      hp: "",
      attack: "",
      defense: "",
      speed: "",
      specialAttack: "",
      specialDefense: "",
    },
    height: "",
    weight: "",
    abilities: "",
    evs: "",
    // Axios Call 2
    description: "",
    genderRatioMale: "",
    genderRationFemale: "",
    eggGroups: "",
    catchRate: "",
    hatchSteps: "",
  });

  const { pokemonIndex } = useParams();

  //Urls for pokemon information (API)
  const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;
  const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

  //Get pokemon data
  const getPokemonData = async () => {
    const pokemonRes = await axios.get(pokemonUrl);

    // get name
    const name = pokemonRes.data.name
      .toLowerCase()
      .split(" ")
      .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
      .join(" ");

    // Get image url
    const imageUrl = pokemonRes.data.sprites.front_default;

    // Get stats data
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";
    pokemonRes.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          hp = stat.base_stat;
          break;
        case "attack":
          attack = stat.base_stat;
          break;
        case "defense":
          defense = stat.base_stat;
          break;
        case "speed":
          speed = stat.base_stat;
          break;
        case "special-attack":
          specialAttack = stat.base_stat;
          break;
        case "special-defense":
          specialAttack = stat.base_stat;
          break;
      }
    });

    // Get height data (convert to feet)
    const height = Math.round(pokemonRes.data.height * 0.328084);

    // Get weight data (convert to feet)
    const weight = Math.round(pokemonRes.data.weight * 0.220462);

    // Get the type(s)
    const types = pokemonRes.data.types.map((type) =>
      type.type.name
        .toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")
    );

    // Get abilities
    const abilities = pokemonRes.data.abilities.map((ability) => {
      return ability.ability.name
        .toLowerCase()
        .split("-")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
    });

    // Get the EVs
    const evs = pokemonRes.data.stats
      .filter((stat) => {
        if (stat.effort > 0) {
          return true;
        } else {
          return false;
        }
      })
      .map((stat) => {
        return `${stat.effort} ${stat.stat.name}`
          .toLowerCase()
          .split("-")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    // set state
    setData({
      ...data,
      name,
      imageUrl,
      types,
      stats: {
        hp,
        attack,
        defense,
        speed,
        specialAttack,
        specialDefense,
      },
      height,
      weight,
      abilities,
      evs,
    });
  };

  const getPokemonDescription = async () => {
    const pokemonRes = await axios.get(pokemonSpeciesUrl);

    let description = "";
    // get flavor text
    pokemonRes.data.flavor_text_entries.some((flavor) => {
      if (flavor.language.name === "en") {
        description = flavor.flavor_text;
        return;
      }
    });

    // Get gender rate
    let { genderRatioFemale, genderRatioMale } = -1; // -1 is genderless
    const femaleRate = pokemonRes.data.gender_rate;
    if (femaleRate !== -1) {
      genderRatioFemale = 12.5 * femaleRate;
      genderRatioMale = 12.5 * (8 - femaleRate);
    }

    // Get catch rate
    const catchRate = Math.round((100 / 255) * pokemonRes.data.capture_rate);

    // Get egg groups
    const eggGroups = pokemonRes.data.egg_groups
      .map((group) => {
        return group.name
          .toLowerCase()
          .split(" ")
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(" ");
      })
      .join(", ");

    // Get hatch steps
    const hatchSteps = 255 * (pokemonRes.hatch_counter + 1);

    // set state
    setData({
      ...data,
      description,
      genderRatioMale,
      genderRatioFemale,
      eggGroups,
      catchRate,
      hatchSteps,
    });
  };

  useEffect(() => {
    //Axios call 1
    getPokemonData();
    // Axios call 2
    getPokemonDescription();
  });

  // Deconstruct for easier calls

  const {
    // Axios Call 1
    name,
    imageUrl,
    types,
    stats,
    height,
    weight,
    abilities,
    evs,
    // Axios Call 2
    description,
    genderRatioMale,
    genderRationFemale,
    eggGroups,
    catchRate,
    hatchSteps,
  } = data;
  return (
    <div className="container">
      <div className="col">
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>{pokemonIndex}</h5>
              </div>
              <div className="col-7">
                <div className="float-end">
                  {types.map((type) => (
                    <span
                      key={type}
                      className="badge rounded-pill me-1"
                      style={{ backgroundColor: `${TYPE_COLORS[type]}` }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3">
                  <img
                    className="card-img-top rounded mx-auto mt-2"
                    src={imageUrl}
                  />
                </div>
                <div className="col-md-9">
                  <h4 className="mx-auto">{name} </h4>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressBar"
                          sytle={{ width: `${stats.hp}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
