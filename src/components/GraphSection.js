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
    if (addConnPhase === 2) {
      addConnPhase = 1;
      tempStateForConn.fillColor = "#74343f";
    }
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
      <div className="h-[35rem] mt-2 relative" id="canvasContainer">
        <canvas
          className="bg-primary rounded-lg border border-accent"
          id="canvas"
          width="100%"
          height="100%"
        ></canvas>
        <div className="absolute left-1/2 top-1/2  bg-secondary w-64 h-52 border-black border-4 rounded-xl hidden" style={{transform:"translate(-50%, -50%)"}}>

        </div>
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
let myConnections = [];
let clickedStateIndex = null;
let clickedConnIndex = null;
let isDragging = false;
let startX;
let startY;
let addConnPhase = 1;
let tempStateForConn;

function getOffset() {
  let canvasOffsets = canvas.getBoundingClientRect();
  offsetX = canvasOffsets.left;
  offsetY = canvasOffsets.top;
}

function drawStatesWithConnections() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  myConnections.forEach((connection) => {
    connection.draw();
  });

  myStates.forEach((state) => {
    state.draw();
  });
}

function distanceMouseToState(x, y, state) {
  return Math.sqrt(Math.pow(x - state.x, 2) + Math.pow(y - state.y, 2));
}

function mouseInState(x, y, state) {
  let distance = distanceMouseToState(x, y, state);
  if (distance <= state.r + state.lineWidth) {
    return true;
  } else {
    return false;
  }
}

function checkStateClick() {
  let minDistance;
  if (myStates.length > 0) {
    minDistance = distanceMouseToState(startX, startY, myStates[0]);
  }
  for (let i = 0; i < myStates.length; i++) {
    if (mouseInState(startX, startY, myStates[i])) {
      let currentDistance = distanceMouseToState(startX, startY, myStates[i]);
      if (currentDistance <= minDistance) {
        clickedStateIndex = i;
        minDistance = currentDistance;
        isDragging = true;
      }
    }
  }

  if (myStates.length > 1 && isDragging) {
    swapStates();
  }
}

function mouseInConn(x, y, conn) {
  let fromX = conn.fromState.x;
  let toX = conn.toState.x;
  let fromY = conn.fromState.y;
  let toY = conn.toState.y;

  // Check if the mouse coordinates are within the bounding box of the connection
  if (
    x >= Math.min(fromX, toX) &&
    x <= Math.max(fromX, toX) &&
    y >= Math.min(fromY, toY) &&
    y <= Math.max(fromY, toY)
  ) {
    // Calculate the distance from the mouse to the line formed by the connection
    let distance =
      Math.abs((toX - fromX) * (fromY - y) - (fromX - x) * (toY - fromY)) /
      Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));

    // You can adjust this threshold value based on your needs
    let threshold = 5;

    // If the distance is within the threshold, the mouse is considered to be in the connection
    return distance < threshold;
  }

  return false;
}

function checkConnClick() {
  for (let i = 0; i < myConnections.length; i++) {
    if (mouseInConn(startX, startY, myConnections[i])) {
      clickedConnIndex = i;
    }
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

  checkStateClick();
  checkConnClick();

  let index = myStates.length - 1;

  if (tool === "add") {
    if (clickedStateIndex != null) {
      if (addConnPhase === 1) {
        tempStateForConn = myStates[index];
        tempStateForConn.fillColor = "#b51b34";
        addConnPhase = 2;
      } else {
        addConnPhase = 1;
        myStates[index].fillColor = "#b51b34";
        myStates[index].draw();
        let connText = window.prompt(
          `A connection will be made from ${tempStateForConn.text} to ${myStates[index].text}\nConnection Name:`
        );
        let connReward = window.prompt("Reward:");
        tempStateForConn.fillColor = "#74343f";
        myStates[index].fillColor = "#74343f";
        myConnections.push(
          new Connection(
            tempStateForConn,
            myStates[index],
            connText,
            connReward,
            1
          )
        );
      }
    } else {
      if (addConnPhase === 2) {
        addConnPhase = 1;
        tempStateForConn.fillColor = "#74343f";
      } else {
        let stateText = window.prompt("State Name:");
        myStates.push(new State(startX, startY, stateText));
      }
    }
  } else if (tool === "sub") {
    if (clickedStateIndex != null) {
      let confirm = window.prompt(
        `Are you sure you want to delete state ${myStates[index].text}? (y/n)`
      );
      if (typeof confirm === "string" && confirm.toLowerCase() === "y") {
        for (let i = 0; i < myConnections.length; i++) {
          if (
            myConnections[i].fromState === myStates[index] ||
            myConnections[i].toState === myStates[index]
          ) {
            myConnections.splice(i, 1);
          }
        }
        myStates.splice(index, 1);
      }
    } else if (clickedConnIndex != null) {
      let confirm = window.prompt(
        `Are you sure you want to delete Connection ${myConnections[clickedConnIndex].text}? (y/n)`
      );
      if (typeof confirm === "string" && confirm.toLowerCase() === "y") {
        myConnections.splice(clickedConnIndex, 1);
      }
    }
  }

  drawStatesWithConnections();
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
  clickedConnIndex = null;
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
    drawStatesWithConnections();

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
    drawStatesWithConnections();
  };
  canvas.onresize = () => {
    getOffset();
    canvas.width = canvasContainer.offsetWidth;
    canvas.height = canvasContainer.offsetHeight;
    drawStatesWithConnections();
  };

  canvas.onmousedown = mouseDown;
  canvas.onmouseup = mouseUpOut;
  canvas.onmouseout = mouseUpOut;
  canvas.onmousemove = mouseMove;

  canvas.ontouchstart = mouseDown;
  canvas.ontouchend = mouseUpOut;
  canvas.ontouchcancel = mouseUpOut;
  canvas.ontouchmove = mouseMove;

  let state1 = new State(100, 100, "A");
  let state2 = new State(300, 200, "B");
  myStates.push(state1);
  myStates.push(state2);
  let conn1 = new Connection(state1, state2, "Test Conn", "5", "1");
  myConnections.push(conn1);
  drawStatesWithConnections();
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
  constructor(fromState, toState, text, reward, prob) {
    this.fromState = fromState;
    this.toState = toState;
    this.text = text;
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

    let headLen = 12;
    let dx = toX - fromX;
    let dy = toY - fromY;
    let angle = Math.atan2(dy, dx);

    fromX = fromX + gap * Math.cos(angle);
    toX = toX - gap * Math.cos(angle);
    fromY = fromY + gap * Math.sin(angle);
    toY = toY - gap * Math.sin(angle);

    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);

    toX = toX - 0.25 * Math.cos(angle);
    toY = toY - 0.25 * Math.sin(angle);

    context.moveTo(toX, toY);

    context.lineTo(
      toX - headLen * Math.cos(angle - Math.PI / 5),
      toY - headLen * Math.sin(angle - Math.PI / 5)
    );
    context.moveTo(toX, toY);
    context.lineTo(
      toX - headLen * Math.cos(angle + Math.PI / 5),
      toY - headLen * Math.sin(angle + Math.PI / 5)
    );

    let middleX = (fromX + toX) / 2;
    let middleY = (fromY + toY) / 2;

    if (toX < fromX) {
      angle += Math.PI;
    }

    context.save();
    context.translate(middleX, middleY);
    context.rotate(angle);
    context.translate(0, -10);

    context.font = "1rem Poppins";
    context.fillStyle = "#000";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(this.text, 0, 0);

    context.restore();

    context.save();
    context.translate(toX, toY);
    context.rotate(angle);

    if (toX < fromX) {
      context.translate(5, -15);
    } else {
      context.translate(-5, -15);
    }

    context.fillStyle = "#74343f";
    context.fillText("+" + this.reward, 0, 0);

    context.restore();

    context.strokeStyle = "#000";
    context.stroke();
    context.closePath();
  }
}

export default GraphSection;
