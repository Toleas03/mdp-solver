import React from "react";

function Tool(props) {

  let currentClass = "w-9 h-9 rounded-full flex justify-center items-center cursor-pointer bg-accent";

  if(props.title === "cursor") {
    currentClass = "w-9 h-9 rounded-full flex justify-center items-center cursor-pointer bg-primary";
  }

  return (
    <div className={currentClass} title={props.title} id={props.title} onClick={props.onClick}>
      <img className="w-6 h-6" src={props.src} alt={props.alt} title={props.title} />
    </div>
  );
}

export default Tool;