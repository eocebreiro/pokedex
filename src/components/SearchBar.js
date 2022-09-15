import React from "react";

export const SearchBar = () => {
  return (
    <div className="pt-4 pb-4">
      <form>
        <input
          placeholder="Pokemon"
          className="form-control mx-auto"
          style={{
            backgroundColor: "white transparent",
            height: "1.75em",
            width: "95%",
            borderRadius: "15px",
            opacity: "0.8",
            fontSize: "1.75em",
          }}
        />
      </form>
    </div>
  );
};
