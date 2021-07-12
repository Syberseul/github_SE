import React, { useState, useEffect, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
};

function MyCounter() {
  const [count, dispatch] = useReducer(reducer, 0);
  const [name, setName] = useState("rua");

  useEffect(() => {
    console.log("effect invoked");
    return () => console.log("effect detected");
  }, [count]);

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => dispatch({ type: "add" })}>{count}</button>
    </div>
  );
}

export default MyCounter;
