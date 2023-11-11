// toggles between white and black color on grid
function mouseClicked() {
  if (!paused) return;
  let res = grid.getCell(mouseX - grid.x, mouseY - grid.y);
  if (res == null) return;
  let [i, j] = [...res];
  curr[i][j] = 1 - curr[i][j];
  // console.log(i, j);
  grid.show();
}

function mouseDragged() {
  if (!paused) return;
  let res = grid.getCell(mouseX - grid.x, mouseY - grid.y);
  if (res == null) return;
  let [i, j] = [...res];
  curr[i][j] = 1 - curr[i][j];
  // console.log(i, j);
  grid.show();
}

// toggles between play and pause button
function pausedClicked() {
  paused = !paused;
  pauseBtn.html(paused ? "Play" : "Pause");
}

// sets black and white to cells randomly
function randomClicked() {
  for (let i = 0; i < grid.nRow; i++) {
    for (let j = 0; j < grid.nCol; j++) {
      curr[i][j] = random([0, 1]);
    }
  }
}
