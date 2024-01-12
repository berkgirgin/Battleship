//
export { getAIMove, getRandomNonHitTile };

function getAIMove(humanBoard, lastHitHumanTile) {
  //this func should return [x,y]

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

  // rest of the logic will follow later

  return getRandomNonHitTile(humanBoard);
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
