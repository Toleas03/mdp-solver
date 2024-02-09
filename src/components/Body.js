import React from 'react';

function Body() {
  return (
    <div className="w-full flex justify-center pt-10">
      <div className="bg-secondary w-96 h-10 flex justify-center items-center rounded-full z-0 relative shadow-inner">
        <div className="bg-accent w-44 h-8 absolute z-10 rounded-full left-3 shadow-md"></div>
        <span className="pr-6 text-lg font-semibold z-20 cursor-pointer">Value Iteration</span>
        <span className="pl-6 text-whitish text-lg font-semibold z-20 cursor-pointer">Policy Iteration</span>
      </div>
    </div>
  )
}

export default Body