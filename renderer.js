// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

let drawColor = "black";
let drawPen = "pencil";

document.querySelectorAll(".pen").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    setDrawPen(e.currentTarget.dataset.pen);
  });
});

document.querySelectorAll(".color").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    setDrawColor(e.currentTarget.dataset.color);
  });
});

function setDrawColor(color) {
  drawColor = document.getElementById("options").dataset.color = color;
}
function setDrawPen(pen) {
  drawPen = document.getElementById("options").dataset.pen = pen;
}

document.addEventListener(
  "keydown",
  (e) => {
    const pen = {
      1: "pencil",
      2: "paintbrush",
      3: "brush",
    }[e.key];
    if (pen) {
      setDrawPen(pen);
    }
    const color = {
      q: "black",
      w: "red",
      e: "yellow",
      r: "green",
      t: "blue",
    }[e.key];
    if (color) {
      setDrawColor(color);
    }
  },
  false
);

const canvas = document.getElementById("canvas-over-screen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");
let isDrawing = false;
let x = 0;
let y = 0;

canvas.addEventListener("mousedown", (e) => {
  x = e.offsetX;
  y = e.offsetY;
  isDrawing = true;
});

canvas.addEventListener("mousemove", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = e.offsetX;
    y = e.offsetY;
  }
});

window.addEventListener("mouseup", (e) => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.offsetX, e.offsetY);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

function drawLine(context, x1, y1, x2, y2) {
  context.beginPath();
  context.strokeStyle = drawColor;
  context.lineWidth = 1;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.moveTo(x1, y1);
  context.lineTo(x2, y2);
  //   context.bezierCurveTo(
  //     (x2 * 1) / 3 + (x1 * 2) / 3,
  //     (y2 * 1) / 3 + (y1 * 2) / 3,
  //     (x1 * 1) / 3 + (x2 * 2) / 3,
  //     (y1 * 1) / 3 + (y2 * 2) / 3,
  //     x2,
  //     y2
  //   );

  context.stroke();
  context.closePath();
  console.log("draw line:", x1, y1, x2, y2);
}
