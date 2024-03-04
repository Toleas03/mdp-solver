import React, { useState } from "react";
import Variable from "./Variable";

function VariablesSection() {
  const [discount, setDiscount] = useState(1);
  const [iterations, setIterations] = useState(5);

  function changeDiscount(event) {
    const { value } = event.target;
    setDiscount(value);
  }

  function changeIterations(event) {
    const { value } = event.target;
    setIterations(value);
  }

  return (
    <div className="col-span-8 col-start-3 md:col-start-auto md:col-span-4 xl:col-span-3 mt-11">
      <span className="text-whitish text-2xl font-semibold">Variables</span>
      <div className="bg-bkg-100 h-[35rem] mt-2 rounded-lg border border-accent">
        <form className="grid grid-cols-2 gap-2 mt-3 text-whitish font-medium w-11/12">
          <Variable name="Discount" value={discount} onChange={changeDiscount} />
          <Variable name="Iterations" value={iterations} onChange={changeIterations} />
        </form>
      </div>
    </div>
  );
}

export default VariablesSection;
