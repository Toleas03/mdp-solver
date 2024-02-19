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

function distanceMouseToState(x, y, state) {
  return Math.sqrt(Math.pow(x - state.x, 2) + Math.pow(y - state.y, 2));
}

function distanceStateToState(fromState, toState) {
  return Math.sqrt(Math.pow(fromState.x - toState.x, 2) + Math.pow(fromState.y - toState.y, 2));
}

function mouseInState(x, y, state) {
  let distance = distanceMouseToState(x, y, state);
  if (distance <= state.r + state.lineWidth) {
    return true;
  } else {
    return false;
  }
}

function mouseDown(event) {
  event.preventDefault();

  if (event.type === "mousedown") {
    startX = parseInt(event.clientX - offsetX);
    startY = parseInt(event.clientY - offsetY);
  } else {
    startX = parseInt(event.touches[0].clientX - offsetX);
    startY = parseInt(event.touches[0].clientY - offsetY);
  }

  if (tool === "add") {
    let stateText = window.prompt("State Name:");
    myStates.push(new State(startX, startY, stateText));
    drawStates();
  } else {
    let minDistance;
    if (myStates.length > 0) {
      minDistance = distanceMouseToState(startX, startY, myStates[0]);
      clickedStateIndex = 0;
    }
    for (let i = 0; i < myStates.length; i++) {
      if (mouseInState(startX, startY, myStates[i])) {
        let currentDistance = distanceMouseToState(startX, startY, myStates[i]);
        if (currentDistance < minDistance) {
          clickedStateIndex = i;
          minDistance = currentDistance;
        }
        isDragging = true;
      }
    }

    if (myStates.length > 1) {
      swapStates();
    }

    if (tool === "sub" && clickedStateIndex != null) {
      let index = myStates.length - 1;
      let confirm = window.prompt(
        `Are you sure you want to delete state ${myStates[index].text}? (y/n)`
      );
      if (typeof confirm === "string" && confirm.toLowerCase() === "y") {
        myStates.splice(index, 1);
      }
    }

    drawStates();
  }
}

function swapStates() {
  let temp = myStates.splice(clickedStateIndex, 1);
  myStates.push(temp[0]);
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
    if (event.type === "mousemove") {
      currentX = parseInt(event.clientX - offsetX);
      currentY = parseInt(event.clientY - offsetY);
    } else {
      currentX = parseInt(event.touches[0].clientX - offsetX);
      currentY = parseInt(event.touches[0].clientY - offsetY);
    }

    myStates[myStates.length - 1].x += currentX - startX;
    myStates[myStates.length - 1].y += currentY - startY;
    drawStates();

    if (event.type === "mousemove") {
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

  /*
  let state1 = new State(100, 100, "A");
  let state2 = new State(300, 200, "B");
  myStates.push(state1);
  myStates.push(state2);
  drawStates();
  let con1 = new Connection(state1, state2, "Name", "5", "1");
  con1.draw();
  */
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

class Connection {
  constructor(fromState, toState, name, reward, prob) {
    this.fromState = fromState;
    this.toState = toState;
    this.name = name;
    this.reward = reward;
    this.prob = prob;
  }

  draw() {
    context.beginPath();

    let fromX = this.fromState.x;
    let toX = this.toState.x;
    let fromY = this.fromState.y;
    let toY = this.toState.y;
    let gap = 32;

    if(this.fromState.x < this.toState.x) {
      fromX += gap;
      toX -= gap;
    } else {
      fromX -= gap;
      toX -= gap;
    }

    if(this.fromState.y < this.toState.y) {
      fromY += gap;
      toY -= gap;
    } else {
      fromY -= gap;
      toY -= gap;
    }

    let headLen = 10; // length of head in pixels
    let dx = toX - fromX;
    let dy = toY - fromY;
    let angle = Math.atan2(dy, dx);
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.lineTo(
      toX - headLen * Math.cos(angle - Math.PI / 6),
      toY - headLen * Math.sin(angle - Math.PI / 6)
    );
    context.moveTo(toX, toY);
    context.lineTo(
      toX - headLen * Math.cos(angle + Math.PI / 6),
      toY - headLen * Math.sin(angle + Math.PI / 6)
    );

    context.strokeStyle = "#000";
    context.stroke();
    context.closePath();
  }
}

export default GraphSection;
