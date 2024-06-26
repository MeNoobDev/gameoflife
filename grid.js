class Grid {
  constructor(x, y, w, h, cellSize, borderSize, isRand = true) {
    // grid has the following properties
    // x is the col
    // y is the row
    // w is the width of canvas
    // h is the height of canvas
    // cellSize = size of the cell, borderSize = size of the border surrounding the cell
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.cellSize = cellSize;
    this.borderSize = borderSize;

    //Calculate Number of Rows and Columns
    this.nRow = int((h - borderSize) / (borderSize + cellSize));
    this.nCol = int((w - borderSize) / (borderSize + cellSize));

    this.sizeX = this.nCol * (borderSize + cellSize) + borderSize;
    this.sizeY = this.nRow * (borderSize + cellSize) + borderSize;

    // create a grid with nRows
    this.grid = new Array(this.nRow);
    for (let i = 0; i < this.nRow; i++) {
      // set each row to an array of nCols
      this.grid[i] = new Array(this.nCol);
      for (let j = 0; j < this.nCol; j++)
        // set each grid[i][j] to 0 if isRand = false
        this.grid[i][j] = isRand ? random([0, 1]) : 0;
    }
  }

  // displays the grid
  show() {
    let startX = this.x + this.borderSize;
    let startY = this.y + this.borderSize;

    for (let i = 0; i < this.nRow; i++) {
      for (let j = 0; j < this.nCol; j++) {
        // if grid[i][j] is 1, fill with black, else fill with white
        this.grid[i][j] ? fill(0) : fill(255);
        let x = startX + j * (this.cellSize + this.borderSize);
        let y = startY + i * (this.cellSize + this.borderSize);
        // console.log(x, y);
        rect(x, y, this.cellSize, this.cellSize);
      }
    }
  }

  // copies the original array into a new "copy" array
  // and returns it
  copy() {
    let copy = new Array(this.nRow);
    for (let i = 0; i < this.nRow; i++) {
      copy[i] = new Array(this.nCol);
      for (let j = 0; j < this.nCol; j++) copy[i][j] = this.grid[i][j];
    }
    return copy;
  }

  // returns the sum of all 8 neighbours of a cell
  getNeighborSum(i, j, wrap = false) {
    let pi = i == 0 ? this.nRow - 1 : i - 1;
    let pj = j == 0 ? this.nCol - 1 : j - 1;
    let ni = i == this.nRow - 1 ? 0 : i + 1;
    let nj = j == this.nCol - 1 ? 0 : j + 1;
    return (
      this.grid[pi][j] +
      this.grid[ni][j] +
      this.grid[i][nj] +
      this.grid[i][pj] +
      this.grid[pi][pj] +
      this.grid[pi][nj] +
      this.grid[ni][pj] +
      this.grid[ni][nj]
    );
  }

  // returns the cell co ordinate
  getCell(px, py) {
    if (
      px < 0 ||
      py < 0 ||
      px > this.sizeX - this.borderSize ||
      py > this.sizeY - this.borderSize
    )
      return null;
    let startX = this.cellSize + this.borderSize;
    let startY = this.cellSize + this.borderSize;
    return [int(py / startY), int(px / startX)];
  }
}
