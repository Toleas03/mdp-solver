import React from "react";

function Icon(props) {
  return (
    <div className="bg-accent w-9 h-9 rounded-full flex justify-center items-center cursor-pointer">
      <img className="w-6 h-6" src={props.src} alt={props.alt} />
    </div>
  );
}

export default Icon;