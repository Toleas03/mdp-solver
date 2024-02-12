import React from "react";
import Icon from "./Icon";

function GraphSection() {
  return (
    <div className="col-span-12 md:col-span-8 xl:col-span-9">
      <div className="flex gap-2">
        <Icon src="images/Cursor.png" alt="Cursor Mode" />
        <Icon src="images/Plus.png" alt="Addition Mode" />
        <Icon src="images/Subtract.png" alt="Subtraction Mode" />
        <Icon src="images/Edit.png" alt="Edit Mode" />
        <Icon src="images/Zoom.png" alt="Zoom Options" />
        <Icon src="images/Undo.png" alt="Undo" />
        <Icon src="images/Redo.png" alt="Redo" />
      </div>
      <div className="bg-secondary rounded-full h-8 flex justify-center items-center bg-opacity-50 mt-2 text-whitish font-medium">
        Add states or connections
      </div>
      <div className="bg-primary h-[35rem] mt-2 rounded-lg border border-accent"></div>
    </div>
  );
}

export default GraphSection;
