import React from "react";
import { Link } from "react-router-dom";

import noimage from "../img/noimage.png";

export const PokemonCard = ({ name, url, index, image }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-5">
      <Link className="card-link-custom" to={`pokemon/${index}`}>
        <div className="card card-custom">
          <div className="card-header">
            <img
              style={{ width: "100%", height: "100%" }}
              className="card-img-top rounded mx-auto mt-2 pokemon-card-img"
              src={image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = noimage;
              }}
              alt={"Pokemon #" + index + " Image"}
            />
          </div>
          <div className="card-body mx-auto">
            <h5 className="card-title text-capitalize mb-0 ">{name}</h5>
            <span className="d-flex justify-content-center">{"#" + index}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};
