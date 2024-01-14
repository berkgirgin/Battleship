//
export { getAIMove, getRandomNonHitTile };

function getAIMove(humanBoard, lastHitHumanTile) {
  // TO DO: make sure to check the tiles have the same ship in the pattern
  //this func should return [x,y]

  function isBetween0to9(value) {
    // return false if smaller than 0 and bigger than 9
    return value >= 0 && value <= 9;
  }

  function getHitTileWithNonsunkShip() {
    // returns a single tile
    // returns null if there is no hit tile with a ship
    let resultTile = null;

    outerLoop: for (let i = 0; i < humanBoard.boardSize; i++) {
      for (let j = 0; j < humanBoard.boardSize; j++) {
        let currentTile = humanBoard.fullBoard[i][j];

        if (
          currentTile.isTileHit &&
          currentTile.shipInfo !== null &&
          currentTile.shipInfo?.isSunk() === false
        ) {
          resultTile = currentTile;
          break outerLoop;
        }
      }
    }

    return resultTile;
  }

  // if no tiles left, return error
  let isNonHitTileLeft = false;

  outerLoop: for (let i = 0; i < humanBoard.boardSize; i++) {
    for (let j = 0; j < humanBoard.boardSize; j++) {
      if (!humanBoard.fullBoard[i][j].isTileHit) {
        isNonHitTileLeft = true;
        break outerLoop;
      }
    }
  }

  if (isNonHitTileLeft === false) {
    throw new Error("no non-hit tile left");
  }
  //

  // rest of the logic will follow later
  // pseudo code to get AI move
  // get a random hit tile with an unsunk!! ship

  // if ship.hitCount > 1
  // get [X_start, X_end, Y_start, Y_end] of the ship[2,6,0,0]
  // check the axis of the ship
  // find hit coordinates x=3 x=4
  // try from above smallest-1(x=2) or biggest+1(x=5) non-hit(check if onboard)

  // if ship.hitCount = 1
  // check the 4 neighboring tiles(? get array davon) for:
  // // if it is non-hit(skip if hit)
  // //  then hit one of these

  // !!DEFAULT BEHAVIOUR HERE!!
  if (getHitTileWithNonsunkShip() === null) {
    return getRandomNonHitTile(humanBoard);
  }
  //

  let selectedHitTile = getHitTileWithNonsunkShip();
  let hitShip = selectedHitTile.shipInfo;

  // when ship.hitCount > 1
  if (hitShip.hitCount > 1) {
    let [X_start, X_end, Y_start, Y_end] =
      humanBoard.getShipsHitTileCoordinates(hitShip);

    let is_X_axis = Y_start === Y_end;

    if (is_X_axis) {
      if (
        isBetween0to9(X_start - 1) &&
        !humanBoard.fullBoard[X_start - 1][Y_start].isTileHit
      ) {
        return [X_start - 1, Y_start];
      } else if (
        isBetween0to9(X_end + 1) &&
        !humanBoard.fullBoard[X_end + 1][Y_start].isTileHit
      ) {
        return [X_end + 1, Y_start];
      }
    } else if (!is_X_axis) {
      if (
        isBetween0to9(Y_start - 1) &&
        !humanBoard.fullBoard[X_start][Y_start - 1].isTileHit
      ) {
        return [X_start, Y_start - 1];
      } else if (
        isBetween0to9(Y_end + 1) &&
        !humanBoard.fullBoard[X_start][Y_end + 1].isTileHit
      ) {
        return [X_start, Y_end + 1];
      }
    }
  }
  //
  // when ship.hitCount = 1
  else if (hitShip.hitCount === 1) {
    let selected_X = selectedHitTile.X_coor;
    let selected_Y = selectedHitTile.Y_coor;

    let movesToCheck = [
      [selected_X - 1, selected_Y],
      [selected_X + 1, selected_Y],
      [selected_X, selected_Y - 1],
      [selected_X, selected_Y + 1],
    ];

    for (let i = 0; i < movesToCheck.length; i++) {
      let currentMove_X_coor = movesToCheck[i][0];
      let currentMove_Y_coor = movesToCheck[i][1];

      if (
        isBetween0to9(currentMove_X_coor) &&
        isBetween0to9(currentMove_Y_coor) &&
        !humanBoard.fullBoard[currentMove_X_coor][currentMove_Y_coor].isTileHit
      ) {
        return [currentMove_X_coor, currentMove_Y_coor];
      }
    }
  }
  //
}

function getRandomNonHitTile(humanBoard) {
  //this func should return [x,y], similar to above
  let x, y;

  do {
    x = Math.floor(Math.random() * 10);
    y = Math.floor(Math.random() * 10);
  } while (humanBoard.fullBoard[x][y].isTileHit);

  return [x, y];
}
