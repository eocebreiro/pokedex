import React, { Fragment } from "react";
import spinner from "../img/loading.gif";

export const Spinner = () => {
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: "300px", margin: "auto", display: "block" }}
        alt="Loading..."
      />
    </Fragment>
  );
};
