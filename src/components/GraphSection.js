import React from "react";
import Tool from "./Tool";

function GraphSection() {
  function changeTool(event) {
    const { title } = event.target;
    const prevTool = document.getElementById(tool);
    const currentTool = document.getElementById(title);
    prevTool.classList.remove("bg-primary");
    prevTool.classList.add("bg-accent");
    currentTool.classList.remove("bg-accent");
    currentTool.classList.add("bg-primary");
    tool = title;
  }

  return (
    <div className="col-span-12 md:col-span-8 xl:col-span-9">
      <div className="flex gap-2">
        <Tool
          src="images/Cursor.png"
          alt="Cursor Mode"
          title="cursor"
          onClick={changeTool}
        />
        <Tool
          src="images/Plus.png"
          alt="Addition Mode"
          title="add"
          onClick={changeTool}
        />
        <Tool
          src="images/Subtract.png"
          alt="Subtraction Mode"
          title="sub"
          onClick={changeTool}
        />
        <Tool
          src="images/Edit.png"
          alt="Edit Mode"
          title="edit"
          onClick={changeTool}
        />
        <Tool
          src="images/Zoom.png"
          alt="Zoom Options"
          title="zoom"
          onClick={changeTool}
        />
        <Tool
          src="images/Undo.png"
          alt="Undo"
          title="undo"
          onClick={changeTool}
        />
        <Tool
          src="images/Redo.png"
          alt="Redo"
          title="redo"
          onClick={changeTool}
        />
      </div>
      <div className="bg-secondary rounded-full h-8 flex justify-center items-center bg-opacity-50 mt-2 text-whitish font-medium">
        Add states or connections
      </div>
      <div className="h-[35rem] mt-2" id="canvasContainer">
        <canvas
          className="bg-primary rounded-lg border border-accent"
          id="canvas"
          width="100%"
          height="100%"
        ></canvas>
      </div>
    </div>
  );
}

let canvas;
let context;
let canvasContainer;
let tool = "cursor";
let offsetX;
let offsetY;
let myStates = [];
let clickedStateIndex = null;
let isDragging = false;
let startX;
let startY;

function getOffset() {
  let canvasOffsets = canvas.getBoundingClientRect();
  offsetX = canvasOffsets.left;
  offsetY = canvasOffsets.top;
}

function drawStates() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  myStates.forEach((state) => {
    state.draw();
  });
}

function mouseInState(x, y, state) {
  let distance = Math.sqrt(Math.pow(x - state.x, 2) + Math.pow(y - state.y, 2));
  if (distance <= state.r + state.lineWidth) {
    return true;
  } else {
    return false;
  }
}

function mouseDown(event) {
  event.preventDefault();

  if(event.type === "mousedown") {
    startX = parseInt(event.clientX - offsetX);
    startY = parseInt(event.clientY - offsetY);
  } else {
    startX = parseInt(event.touches[0].clientX - offsetX);
    startY = parseInt(event.touches[0].clientY - offsetY);
  }

  if (tool === "add") {
    const stateText = window.prompt("State Name:");
    myStates.push(new State(startX, startY, stateText));
    drawStates();
  } else {
    for (let i = 0; i < myStates.length; i++) {
      if (mouseInState(startX, startY, myStates[i])) {
        clickedStateIndex = i;
        isDragging = true;
        break;
      }
    }
    if(tool === "sub" && clickedStateIndex != null) {
      const confirm = window.prompt("Are you sure? (y/n)");
      if(confirm.toLowerCase() === "y") {
        myStates.splice(clickedStateIndex, 1);
        drawStates();
      }
    }
  }
}

function mouseUpOut(event) {
  event.preventDefault();
  if (isDragging) {
    isDragging = false;
    clickedStateIndex = null;
  }
}

function mouseMove(event) {
  if (isDragging && tool === "cursor") {
    let currentX;
    let currentY;
    if(event.type === "mousemove") {
      currentX = parseInt(event.clientX - offsetX);
      currentY = parseInt(event.clientY - offsetY);
    } else {
      currentX = parseInt(event.touches[0].clientX - offsetX);
      currentY = parseInt(event.touches[0].clientY - offsetY);
    }

    myStates[clickedStateIndex].x += currentX - startX;
    myStates[clickedStateIndex].y += currentY - startY;
    drawStates();
    
    if(event.type === "mousemove") {
      startX = parseInt(event.clientX - offsetX);
      startY = parseInt(event.clientY - offsetY);
    } else {
      startX = parseInt(event.touches[0].clientX - offsetX);
      startY = parseInt(event.touches[0].clientY - offsetY);
    }
  }
}

window.onload = () => {
  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvasContainer = document.getElementById("canvasContainer");

  canvas.width = canvasContainer.offsetWidth;
  canvas.height = canvasContainer.offsetHeight;

  getOffset();

  window.onscroll = () => {
    getOffset();
  };
  window.onresize = () => {
    getOffset();
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    drawStates();
  };
  canvas.onresize = () => {
    getOffset();
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    drawStates();
  };

  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUpOut;
  canvas.onmouseout = mouseUpOut;
  canvas.onmousemove = mouseMove;

  canvas.ontouchstart = mouseDown;
  canvas.ontouchend = mouseUpOut;
  canvas.ontouchcancel = mouseUpOut;
  canvas.ontouchmove = mouseMove;
};

class State {
  constructor(x, y, text) {
    this.x = x;
    this.y = y;
    this.r = 25;
    this.lineWidth = 3;
    this.fillColor = "#74343f";
    this.borderColor = "#b48d5a";
    this.textColor = "#ebeff6";
    this.text = text;
  }

  draw() {
    context.beginPath();
    context.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    context.fillStyle = this.fillColor;
    context.strokeStyle = this.borderColor;
    context.lineWidth = this.lineWidth;
    context.fill();
    context.stroke();
    context.fillStyle = this.borderColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = this.textColor;
    context.font = "0.65rem Poppins";
    if (this.text.length < 3) {
      context.font = "1rem Poppins";
    } else if (this.text.length < 5) {
      context.font = "0.875rem Poppins";
    }
    context.fillText(this.text, this.x, this.y);
    context.closePath();
  }
}

export default GraphSection;
