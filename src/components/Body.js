import React from "react";
import Toggle from "./Toggle";
import GraphSection from "./GraphSection";
import VariablesSection from "./VariablesSection";

function Body() {
  return (
    <div>
      <Toggle />

      <div className="w-full flex justify-center pt-10">
        <div className="grid grid-cols-12 gap-10 basis-11/12 xl:basis-9/12">
          <GraphSection />
          <VariablesSection />
        </div>
      </div>

      <div className="flex justify-center pt-5">
        <button className="bg-secondary bg-opacity-50 w-52 h-12 rounded-full text-whitish font-medium hover:bg-opacity-100 transition">
          Calculate Table
        </button>
      </div>
    </div>
  );
}

export default Body;
