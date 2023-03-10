'use strict'
// draft.txt contain the *current logic of the game
// (this file dynamically changes, whenever I connect a new line between 2 dots, delete others, etc.)


// Version #3
/*

- Generate a grid in a requested size which contain clickable tiles 
- Properties of grid:
- set the size of each square in the grid relative to the main container grid
- fill the grid with squares 
- the grid will be filled from bottom to top,
randomly but after a validation check based on its neighbors (and the grid size/scope limitations )
- after each validation a Tile in a specific type will be assigned to each square
properties of each Square:
id (based on the position), row, column, Tile, 
and methods: isValid() which will run a check based on the object that its been called with.
if Tile, in the beginning, when setting the grid - check if it can be store at a square and return a boolean value.
(each tile type will have its own conditions.)
After the first turn, when called with Tile, isValid() will check if it can be built either if 
the pool of this type in the inventory isn't empty, or it is a legit square to get built in.
- when been called with Tool - isValid will check if it's the appropriate(/matching) tool for the task.

So the class World will have methods -
generateGrid - which initially get a size and set the grid accordingly
updateTypePool - which will initially set a pool of each type after completed generating the grid,
And after that will update the pool state according to the mining

properties of World:
Grid, Inventory


WHAT SHOULD BE THE CONDITIONS OF isValid()
// updateState() - which will sync between the last event and any element which should be affected by it or react to it.
// updateWorldState() - which will keep all the element synchronized

// (play/pause/stop)?
*/


/*
- step by step let's build a 4*5 grid of divs

*/

class Square {
    constructor(width, height, row, column) {
        this.width = width;
        this.height = height;
        this.row = row
        this.column = column
        this.square = document.createElement('div');
        this.square.style.border = "2px solid rgb(222, 20, 20)";
        this.square.style.backgroundColor = "rgb(0,0,0)";
        this.square.style.width = `${this.width}px`;
        this.square.style.height = `${this.height}px`;
        this.square.style.gridRow = row;
        this.square.style.gridColumn = column;
    }
}

function generateGrid(containerWidth, containerHeight) {
    if (containerHeight > containerWidth) {
        [containerWidth, containerHeight] = [containerHeight, containerWidth];
    }
    const squareArea = 1500;
    const aspectRatio = containerWidth / containerHeight;
    const numSquares = ((containerWidth * containerHeight) / squareArea);
    
    let numRows, numColumns;
    if (aspectRatio >= 1) {
        numRows = Math.floor(Math.sqrt(numSquares / aspectRatio));
        numColumns = Math.ceil(numSquares / numRows);
    } else {
        numColumns = Math.floor(Math.sqrt(numSquares * aspectRatio));
        numRows = Math.ceil(numSquares / numColumns);
    } 
    const squareWidth = containerWidth / numColumns;
    const squareHeight = containerHeight / numRows;

    const grid = document.createElement('div');
    grid.style.width = `${containerWidth}px`;
    grid.style.height = `${containerHeight}px`;
    grid.style.display = "grid";
    grid.style.gridTemplateRows = `repeat(${numRows}, ${squareHeight}px)`;
    grid.style.gridTemplateColumns = `repeat(${numColumns}, ${squareWidth}px)`;
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            const square = new Square(squareWidth, squareHeight, i + 1, j + 1);
            square.square.id = `${i}-${j}`;
            square.square.innerHTML = `${i}-${j}`;
            square.square.style.width  = `${squareWidth}px`;
            square.square.style.height = `${squareHeight}px`;
            grid.appendChild(square.square);
        }
    }
    return grid;
}
const grid = generateGrid(400, 800)
const world = document.getElementById('world')
world.style.border = "2px solid rgb(0,0,255)"
world.appendChild(grid)

class Inventory {
    constructor() {
        this.pools = {};
    }

    addTile(tile) {
        if (!this.pools[tile.type]) {
            this.pools[tile.type] = 0;
        }
        this.pools[tile.type]++;
    }

    removeTile(tile) {
        if (this.pools[tile.type] && this.pools[tile.type] > 0) {
            this.pools[tile.type]--;
        }
    }
}