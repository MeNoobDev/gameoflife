let grid; // initialize a grid object
let curr, next; // used to cycle between curr and next grid

let cWidth = 1202, // dimensions of the canvas
  cHeight = 602;
// let cWidth = screen.availWidth;
// let cHeight = 0.75 * screen.availHeight;
let pauseBtn, // play / pause / reset buttons
  paused = true;
let resetBtn;
let randomBtn;
// grid props are grid properties we want to initialize
let gridProps = {
  x: 0,
  y: 0,
  width: cWidth,
  height: cHeight,
  cellSize: 14,
  borderSize: 1,
};
var cnv; // canvas variable

function setup() {
  // create a canvas of dimensions cWidth and cHeight
  cnv = createCanvas(cWidth, cHeight);
  cnv.parent("canvasContainer"); // add canvas to a parent class

  background(50); // background color of 50
  grid = new Grid(...Object.values(gridProps), false); // false makes sure grid isn't random
  frameRate(20); // set a framerate of 20
  grid.show(); // use a propert .show() which shows the grid cells
  curr = grid.grid; // set curr to current grid
  next = grid.copy(); // set next to a copy of current grid

  // handles the play/pause button
  pauseBtn = createButton("Play").class("Btn");
  pauseBtn.parent("canvasContainer");
  pauseBtn.mousePressed(pausedClicked);

  // handles the reset button
  resetBtn = createButton("Reset").class("Btn");
  resetBtn.parent("canvasContainer");
  resetBtn.mousePressed(() => {
    for (let i = 0; i < grid.nRow; ++i)
      for (let j = 0; j < grid.nCol; ++j) curr[i][j] = next[i][j] = 0;
    paused = false;
    pausedClicked();
  });
  randomBtn = createButton("Random").class("Btn");
  randomBtn.parent("canvasContainer");
  randomBtn.mousePressed(randomClicked);
}

function draw() {
  background(50);
  // frameRate(4);
  grid.show();
  if (paused) return;
  for (let i = 0; i < grid.nRow; ++i) {
    for (let j = 0; j < grid.nCol; ++j) {
      let sum = grid.getNeighborSum(i, j, true);
      if (curr[i][j] == 0) next[i][j] = sum == 3 ? 1 : 0;
      else next[i][j] = sum < 2 || sum > 3 ? 0 : 1;
    }
  }
  // for (let i = 0; i < grid.nRow; ++i) curr[i] = [...next[i]];
  let isDiff = false;
  for (let i = 0; i < grid.nRow; ++i) {
    for (let j = 0; j < grid.nCol; ++j) {
      if (isDiff || curr[i][j] != next[i][j]) isDiff = true;
      curr[i][j] = next[i][j];
    }
  }
  if (!isDiff) {
    paused = false;
    pausedClicked();
  }
}
