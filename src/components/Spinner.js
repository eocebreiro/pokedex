import React, { Fragment } from "react";
import spinner from "../img/loading.gif";

export const Spinner = () => {
  return (
    <Fragment>
      <img className="spinner" src={spinner} alt="Loading..." />
    </Fragment>
  );
};
