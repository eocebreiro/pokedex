import React from "react";
import { Link } from "react-router-dom";

export const PokemonCard = ({ name, url, index, image }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-5">
      <Link className="card-link-custom" to={`pokemon/${index}`}>
        <div className="card card-custom">
          <h5 className="card-header">#{index}</h5>
          <div>{}</div>
          <img
            style={{ width: "6rem", height: "6rem" }}
            className="card-img-top rounded mx-auto mt-2 pokemon-card-img"
            src={image}
            alt={"Pokemon #" + index + " Image"}
          />
          <div className="card-body mx-auto">
            <h6 className="card-title text-capitalize">{name}</h6>
          </div>
        </div>
      </Link>
    </div>
  );
};
