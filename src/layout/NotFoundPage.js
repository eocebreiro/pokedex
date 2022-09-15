import React, { Fragment } from "react";
import pokeball from "../img/pokeball.png";

export const NotFoundPage = ({ pokemonList }) => {
  return (
    <Fragment>
      <div className="container mt-5  align-items-center">
        <div className="row">
          <div className="justify-content-center d-flex align-items-center px-2">
            <span style={{ fontSize: "5rem" }}>4 </span>
            <img
              style={{ width: "5rem", height: "5rem" }}
              src={pokeball}
              alt={"404 page not found"}
            />
            <span style={{ fontSize: "5rem" }}>4</span>
          </div>
          <div className="justify-content-center d-flex align-items-center px-2">
            <h2>Page Not Found</h2>
          </div>
          <div className="justify-content-center d-flex align-items-center px-2">
            <a className="btn btn-dark mt-3" role="button" href="/">
              Home
            </a>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
