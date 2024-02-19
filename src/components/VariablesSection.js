import React from "react";
import Variable from "./Variable";

function VariablesSection() {
  return (
    <div className="col-span-8 col-start-3 md:col-start-auto md:col-span-4 xl:col-span-3 mt-11">
      <span className="text-whitish text-2xl font-semibold">Variables</span>
      <div className="bg-bkg-100 h-[35rem] mt-2 rounded-lg border border-accent">
        <form className="grid grid-cols-2 gap-2 mt-3 text-whitish font-medium w-11/12">
          <Variable name="Iterations" value="3" />
          <Variable name="Discount" value="1" />
        </form>
      </div>
    </div>
  );
}

export default VariablesSection;
