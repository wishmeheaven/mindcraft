'use strict'

// version#3 has been deleted accidentally


class Square {
    constructor(width, height, row, column){       
        const minDimension = Math.min(width, height);
        this.width = minDimension;
        this.height = minDimension;
        this.row = row
        this.column = column

        this.square = document.createElement('div')
        this.square.style.margin = "0px"
        this.square.style.border = "2px solid rgb(222, 20, 20)"
        this.square.style.backgroundColor = "rgb(0,0,0)"
        this.square.style.width = `${this.width}px`
        this.square.style.height = `${this.height }px`
        this.square.style.gridRow = row
        this.square.style.gridColumn = column

        // this.square.style.display = "flex"
    }

}

function generateGrid(containerWidth, containerHeight){
    const squareSizePercentage = (containerWidth + containerHeight) / 100;
    console.log(squareSizePercentage)
    console.log(containerWidth)
    console.log(containerHeight)
    const squareWidth = containerWidth * (squareSizePercentage / 100);
    const squareHeight = containerHeight * (squareSizePercentage / 100);
    const numberOfColumns = Math.floor(containerWidth / squareWidth)
    const numberOfRows = Math.floor(containerHeight / squareHeight)
    console.log("numberOfColumns",numberOfColumns)
    console.log("numberOfRows", numberOfRows)
    const grid = document.createElement('div');
    grid.style.width = `${containerWidth}px`;
    grid.style.height = `${containerHeight}px`;
    grid.style.display = "grid"
    grid.style.border = "1px solid rgb(20,222,33)"
    grid.style.gridTemplateColumns = `repeat (${numberOfRows}, ${squareWidth}px)`
    grid.style.gridTemplateRows = `repeat (${numberOfColumns}, ${squareHeight}px)`
    
    for (let i = 0; i < numberOfColumns; i++) {
        for (let j = 0; j < numberOfRows; j++) {
            const square = new Square(squareWidth, squareHeight, i+1, j+1)
            grid.appendChild(square.square)
        }
    }
    grid.style.maxHeight = "fit-content"
    // grid.style.borderSpacing = "0px"
    // grid.style.rowGap = "0px";
    // grid.style.columnGap = "0px"
    return grid;
}

const grid = generateGrid(400,600)

const world = document.getElementById('world')
world.style.width = "400px";
world.style.height = "600px";
world.appendChild(grid)