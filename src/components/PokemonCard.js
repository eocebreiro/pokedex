import React from "react";
import { Link } from "react-router-dom";

export const PokemonCard = ({ name, url, index, image }) => {
  return (
    <div className="col-md-3 col-sm-6 mb-5">
      <Link to={`pokemon/${index}`}>
        <div className="card card-custom">
          <h5 className="card-header">#{index}</h5>
          <div>{}</div>
          <img
            style={{ width: "6rem", height: "6rem" }}
            className="card-img-top rounded mx-auto mt-2"
            src={image}
            alt={"Pokemon #" + index + " Image"}
          />
          <div className="card-body mx-auto">
            <h6 className="card-title">
              {name
                .toLowerCase()
                .split(" ")
                .map(
                  (letter) =>
                    letter.charAt(0).toUpperCase() + letter.substring(1)
                )
                .join(" ")}
            </h6>
          </div>
        </div>
      </Link>
    </div>
  );
};
