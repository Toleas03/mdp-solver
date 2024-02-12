import React from "react";

function Variable(props) {
  return (
    <>
      <label className="text-lg" for={props.name.toLowerCase()}>
        {props.name}
      </label>
      <input
        className="bg-secondary text-center rounded-full h-7 focus:outline-none focus:border-2 focus:border-accent"
        type="text"
        name={props.name.toLowerCase()}
        id={props.name.toLowerCase()}
        value={props.value}
      ></input>
    </>
  );
}

export default Variable;
