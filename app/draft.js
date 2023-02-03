'use strict'

// Minecraft
// create a "living" (integrated) Grid of tiles
// grid will be a master mind object that will be fully aware
// in every given time - of its state in every structure level
// GRID (internal)) STRUCTURE :
// there will be a very specific and accurate role for any part of the grid
// Cell, beside column and row which will be its unique Id
// if empty, and if not part of "sky" - can be filled with content from INVENTORY.
// if occupied, with the right TOOL - can get emptied by being taken to INVENTORY.
// Each cell "knows" at every single moment during runtime -
// What type of TILE it can be filled with.
// Any change that the player wants to make in a Cell
// (Either if the s/he aware of that or not)
// Will first trigger a check if this change is even possible(/legal)
// and if so - will trigger A CHANGE(/CHAIN) REACTION -
// that will inform all the elements that affected by this change
// for the purpose of keeping them synchronized with the Grid current state.

// Grid aka Map aka World aka Screen functionality:
// generated - "according to a given number, filled your cells with content"
// (*with a min-max range limitation) - number: x, grid size (length) === x*x
// --- content is the type of tile that each cell in the grid will get filled with
// Amongst row and column, each Cell will also have: isSolid,
// means, either it solid by nature (literally?) and can be filled,
// or a part of the sky and unplayable
// (*settings might be changed between games by the player)
// Beside that, Cell will have a Tile (class) property ("sky" if "empty")
// so to sum up: (instead of a Grid,) World - Cell(s), Tool(s), Inventory, generator(size), updateState()
// Cell - row, column, isSolid, Tile, updateWorldState()
// Tile - type, match(/matchingTool), updateWorldState()
// Tool - type, match(matchingTile), updateWorldState()
// Inventory - setOfTiles, updateWorldState()
// -*- maybe there will be another nature/rules/conditions for each tile/tool
// so beside matching() is will get integrated with/in other forms


// ---------------------------------------------------------------------------