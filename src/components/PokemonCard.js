import React, { useState } from "react";

export const PokemonCard = () => {
  const [data, setData] = useState({
    name: "",
    imageurl: "",
    pokemonIndex: "",
  });

  const { name, imageurl, pokemonIndex } = data;

  return (
    <div className="col-md-3 col-sm-6 mb-5">
      <div className="card">
        <div className="card-header">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};
