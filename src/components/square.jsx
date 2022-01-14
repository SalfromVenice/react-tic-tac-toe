import React from "react";

const Square = ({ value, onClick, color }) => {
  return (
    <button
      type="button"
      className={`square ${color}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
