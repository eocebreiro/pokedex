import React, { useState, useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Spinner } from "../components/Spinner";
import noimage from "../img/noimage.png";

const TYPE_COLORS = {
  bug: "#B1C12E",
  dark: "#4F3A2D",
  dragon: "#755EDF",
  electric: "#FCBC17",
  fairy: "#F4B1F4",
  fighting: "#823551D",
  fire: "#E73B0C",
  flying: "#A3B3F7",
  ghost: "#6060B2",
  grass: "#74C236",
  ground: "#D3B357",
  ice: "#A3E7FD",
  normal: "#C8C4BC",
  poison: "#934594",
  psychic: "#ED4882",
  rock: "#B9A156",
  steel: "#B5B5C3",
  water: "#3295F6",
};

export const Pokemon = () => {
  const [loading, setLoading] = useState(true);
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
    genderRatioFemale: "",
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
    const name = pokemonRes.data.name;

    // Get image url

    let imageUrl;
    if (pokemonRes.data.sprites.front_default === null) {
      imageUrl = noimage;
    } else {
      imageUrl = pokemonRes.data.sprites.front_default;
    }
    // Get stats data
    let { hp, attack, defense, speed, specialAttack, specialDefense } = "";
    pokemonRes.data.stats.forEach((stat) => {
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
          specialDefense = stat.base_stat;
          break;
        default:
          console.log("stat missiing");
      }
      return;
    });

    // Get height data (convert to feet)
    const height = Math.round(pokemonRes.data.height * 0.328084);

    // Get weight data (convert to feet)
    const weight = Math.round(pokemonRes.data.weight * 0.220462);

    // Get the type(s)
    const types = pokemonRes.data.types.map((type) => type.type.name);

    // Get abilities
    const abilities = pokemonRes.data.abilities
      .map((ability) => {
        return ability.ability.name;
      })
      .join(", ");

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
        return `${stat.effort} ${stat.stat.name}`;
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
      }
      return 0;
    });

    // Get gender rate
    let genderRatioFemale = -1;
    let genderRatioMale = -1; // -1 is genderless
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
        return group.name;
      })
      .join(", ");

    // Get hatch steps
    const hatchSteps = 255 * (pokemonRes.data.hatch_counter + 1);

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
    setLoading(false);
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
    genderRatioFemale,
    eggGroups,
    catchRate,
    hatchSteps,
  } = data;

  console.log(genderRatioFemale);
  return !loading ? (
    <Fragment>
      <div className="loading-fade d-flex justify-content-center w-100 vh-100 position-absolute">
        <Spinner />
      </div>
      <div className="container">
        <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-5">
                  <h5># {pokemonIndex}</h5>
                </div>
                <div className="col-7">
                  <div className="float-end text-capitalize">
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
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-md-3 align-items-center d-flex">
                  <img
                    style={{ width: "15rem", height: "15rem" }}
                    className="card-img-top rounded mx-auto mt-2"
                    src={imageUrl}
                    alt={"Pokemon #" + pokemonIndex + " Image"}
                  />
                </div>
                <div className="col-md-9">
                  <h4 className="mx-auto text-capitalize">{name} </h4>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">HP</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${(stats.hp / 255) * 100}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.hp}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${(stats.attack / 255) * 100}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.attack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${(stats.defense / 255) * 100}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.defense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Speed</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${(stats.speed / 255) * 100}%` }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.speed}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special Attack</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${(stats.specialAttack / 255) * 100}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.specialAttack}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row align-items-center">
                    <div className="col-12 col-md-3">Special Defense</div>
                    <div className="col-12 col-md-9">
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{
                            width: `${(stats.specialDefense / 255) * 100}%`,
                          }}
                          aria-valuenow="25"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <small>{stats.specialDefense}</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mt-1">
                  <div className="col">
                    <p className="">{description}</p>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="card-body">
              <h5 className="card-title text-center">Profile</h5>
              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">Height:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-start">{height} ft.</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">Weight:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-start">{weight} lbs.</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">Catch Rate:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-start">{catchRate}%</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">Gender Ratio:</h6>
                    </div>
                    <div className="col-6">
                      {genderRatioFemale === -1 ? (
                        <h6 className="float-start">Genderless</h6>
                      ) : (
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${genderRatioFemale}%`,
                              backgroundColor: "#c2185b",
                            }}
                            aria-valuenow="15"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{genderRatioFemale}</small>
                          </div>
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${genderRatioMale}%`,
                              backgroundColor: "#1976d2",
                            }}
                            aria-valuenow="30"
                            aria-valuemin="0"
                            aria-valuemax="100"
                          >
                            <small>{genderRatioMale}</small>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">Egg Groups:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-start text-capitalize">
                        {eggGroups}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">Hatch Steps:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-start">{hatchSteps}</h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">Abilities:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-start text-capitalize">
                        {abilities}
                      </h6>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <h6 className="float-end">EVs:</h6>
                    </div>
                    <div className="col-6">
                      <h6 className="float-start text-capitalize">{evs}</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer text-muted">
              Data From{" "}
              <a
                href="https://pokeapi.co/"
                target="_blank"
                className="card-link"
                rel="noreferrer"
              >
                PokeAPI.co
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  ) : (
    <div className="loading d-flex justify-content-center w-100 vh-100 position-absolute">
      <Spinner />
    </div>
  );
};
