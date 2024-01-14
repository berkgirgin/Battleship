export { GameboardTile, Gameboard };

class GameboardTile {
  constructor(X_coor, Y_coor) {
    this.X_coor = X_coor;
    this.Y_coor = Y_coor;
    this.shipInfo = null;
    this.isTileHit = false;
  }

  assignShip(ship) {
    this.shipInfo = ship;
  }

  hasTileShip() {
    if (this.shipInfo === null) {
      return false;
    } else {
      return true;
    }
  }
}

class Gameboard {
  /*
  Pseudo code
  Gameboard class/factory
  
  Gameboards should be able to place ships at specific coordinates by calling the ship factory function.
  
  create gameBoard lines, coor [x, y]
  line1 = [[0,0], [0,1], [0,2], [0,3]]
  line2 = [[1,0], [1,1], [1,2], [1,3]]
  line3 = [[2,0], [2,1], [2,2], [2,3]]
  line4 = [[3,0], [3,1], [3,2], [3,3]]
  
  so the fullBoard = [[[0,0], [0,1], [0,2], [0,3]], [[1,0], [1,1], [1,2], [1,3]], [[2,0], [2,1], [2,2], [2,3]],[[3,0], [3,1], [3,2], [3,3]]]
  
  line1 = [GameboardTile,{isHit: false, hasShip: false}, [0,2], [0,3]]
  line2 = [[1,0], [1,1], [1,2], [1,3]]
  line3 = [[2,0], [2,1], [2,2], [2,3]]
  line4 = [[3,0], [3,1], [3,2], [3,3]]
  
  fleet = {
      {
          shipInfo = testShip1
      }
  }
  
  */

  constructor() {
    this.boardSize = 10;
    this.fullBoard = this.initialiseBoard();
    this.fleet = [];
  }

  initialiseBoard() {
    let board = [];
    for (let i = 0; i < this.boardSize; i++) {
      let row = [];
      for (let j = 0; j < this.boardSize; j++) {
        let tile = new GameboardTile(i, j);
        row.push(tile);
      }
      board.push(row);
    }

    return board;
  }

  placeShip(ship, X_start, X_end, Y_start, Y_end) {
    if (
      X_start >= this.boardSize ||
      X_end >= this.boardSize ||
      Y_start >= this.boardSize ||
      Y_end >= this.boardSize
    ) {
      throw new Error("can't add out of the board");
    }

    // TO DO: check all tiles are available "before" proceeding
    for (let i = X_start; i <= X_end; i++) {
      for (let j = Y_start; j <= Y_end; j++) {
        if (this.fullBoard[i][j].shipInfo !== null) {
          return;
        }
      }
    }
    //

    // TO DO: check if the same ship has already been added

    this.fleet.push(ship);

    for (let i = X_start; i <= X_end; i++) {
      for (let j = Y_start; j <= Y_end; j++) {
        this.fullBoard[i][j].assignShip(ship);
      }
    }
  }

  receiveAttack(X_coor, Y_coor) {
    /* takes a pair of coordinates, determines whether or not the attack hit a ship 
      and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.*/

    if (X_coor >= this.boardSize || Y_coor >= this.boardSize) {
      throw new Error("can't attack out of the board");
    }
    const targetTile = this.fullBoard[X_coor][Y_coor];
    const targetShip = targetTile.shipInfo; // null if empty

    if (targetTile.isTileHit) {
      throw new Error(
        `tile(X:${targetTile.X_coor},Y:${targetTile.Y_coor}) has been attacked already`
      );
    }

    targetTile.isTileHit = true;
    if (targetShip !== null) {
      targetShip.hit(); // checking if it hit a ship

      // TO DO: check if the ship is sunk, may be needed for game interface
    }
  }

  isAllShipsSunk() {
    let isAllShipsSunk = true;
    this.fleet.forEach((ship) => {
      if (!ship.isSunk()) {
        isAllShipsSunk = false;
      }
    });

    return isAllShipsSunk;
  }

  getShipsHitTileCoordinates(ship) {
    // returns [X_start, X_end, Y_start, Y_end]
    let all_X_coor = [];
    let all_Y_coor = [];

    function findMinMax(numbersArr) {
      if (!Array.isArray(numbersArr) || numbersArr.length === 0) {
        return null; // Handle invalid input
      }

      const sortedNumbers = [...numbersArr].sort((a, b) => a - b);
      const smallest = sortedNumbers[0];
      const largest = sortedNumbers[sortedNumbers.length - 1];

      return [smallest, largest];
    }

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        let currentTile = this.fullBoard[i][j];
        if (currentTile.shipInfo == ship && currentTile.isTileHit) {
          // allTilesOfShip.push(this.fullBoard[i][j]);
          all_X_coor.push(i);
          all_Y_coor.push(j);
        }
      }
    }
    let [X_start, X_end] = findMinMax(all_X_coor);
    let [Y_start, Y_end] = findMinMax(all_Y_coor);

    return [X_start, X_end, Y_start, Y_end];
    //
  }

  // TO DO: This will help show the sunk ships on DOM gameboard
  getSunkShipTiles(ship) {
    if (!ship.isSunk()) {
      return;
    }

    let allTilesOfShip = [];

    for (let i = 0; i < this.boardSize; i++) {
      for (let j = 0; j < this.boardSize; j++) {
        if (this.fullBoard[i][j].shipInfo == ship) {
          allTilesOfShip.push(this.fullBoard[i][j]);
        }
      }
    }
    if (allTilesOfShip.length === 0) {
      return;
    } else {
      return allTilesOfShip;
    }
  }
}
