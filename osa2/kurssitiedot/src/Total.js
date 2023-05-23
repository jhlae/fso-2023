//import { useState, useEffect } from "react";

const Total = ({ parts }) => {
  let total = parts.reduce((prev, cur, idx, parts) => prev + cur.exercises, 0);

  return (
    <p>
      <strong>Number of exercises: {total}</strong>
    </p>
  );
};

export default Total;
