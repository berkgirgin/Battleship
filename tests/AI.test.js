import { Ship } from "../src/javascript/factories/ship.js";
import { Gameboard } from "../src/javascript/factories/gameboard.js";
import { Player } from "../src/javascript/factories/player.js";
import { GameController } from "../src/javascript/factories/gamecontroller.js";
import { getAIMove, getRandomNonHitTile } from "../src/javascript/AI.js";

describe("AI Moves", () => {
  test("getRandomNonHitTile works", () => {
    //getRandomNonHitTile should return [x,y]
    const game = new GameController();
    game.initialiseTestGame_AI_Test();

    const humanBoard = game.humanPlayer.playerboard;
    let randomTile;

    let [x1_coor, y1_coor] = getRandomNonHitTile(humanBoard);
    expect(humanBoard.fullBoard[x1_coor][y1_coor].isTileHit).toBe(false);

    let [x2_coor, y2_coor] = getRandomNonHitTile(humanBoard);
    expect(humanBoard.fullBoard[x2_coor][y2_coor].isTileHit).toBe(false);
    expect(x1_coor === x2_coor).toBe(false);
    expect(y1_coor === y2_coor).toBe(false);
  });

  test("getAIMove returns error if no non-hit tile left", () => {
    const game = new GameController();
    game.initialiseTestGame_AI_Test();

    const humanBoard = game.humanPlayer.playerboard;
    // setting all tiles to hit
    for (let i = 0; i < humanBoard.boardSize; i++) {
      for (let j = 0; j < humanBoard.boardSize; j++) {
        humanBoard.fullBoard[i][j].isTileHit = true;
      }
    }
    expect(() => {
      getAIMove(humanBoard);
    }).toThrow("no non-hit tile left");
  });

  test.skip("getAIMove hits neighbors after successful hit", () => {
    const game = new GameController();
    game.initialiseTestGame_AI_Test();
    let possibleNextMoves;

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(2, 2, game.humanPlayer);
    possibleNextMoves = [
      [1, 2],
      [3, 2],
      [2, 3],
      [2, 1],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    game.playRound(1, 2, game.humanPlayer);
    possibleNextMoves = [
      [3, 2],
      [2, 3],
      [2, 1],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    game.playRound(2, 3, game.humanPlayer);
    possibleNextMoves = [
      [3, 2],
      [2, 1],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    game.playRound(2, 1, game.humanPlayer);
    possibleNextMoves = [[3, 2]];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    game.playRound(3, 2, game.humanPlayer);
    possibleNextMoves = []; // should get a random tile then
    initialNextMoves = [
      [1, 2],
      [3, 2],
      [2, 3],
      [2, 1],
    ];
    expect(
      initialNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(false);
  });

  test.skip("getAIMove hits same line(x or y direction) after 2 successful hits", () => {
    const game = new GameController();
    game.initialiseTestGame_AI_Test();
    let possibleNextMoves;

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(2, 2, game.humanPlayer);
    possibleNextMoves = [
      [1, 2],
      [3, 2],
      [2, 3],
      [2, 1],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(3, 2, game.humanPlayer);
    possibleNextMoves = [
      [1, 2],
      [4, 2],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(3, 2, game.humanPlayer);
    possibleNextMoves = [
      [1, 2],
      [4, 2],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    //
  });

  test.skip("getAIMove keeps track when ships are next to each other", () => {
    // solution: when a ship is sunk, check all map to see if there
    // is a hit tile already
    // ALSO check both ifTileHit and if Ships are same
    const game = new GameController();
    game.initialiseGame();

    const testShip1 = new Ship(3);
    const testShip2 = new Ship(3);
    player.playerboard.placeShip(testShip1, 2, 4, 1, 1);
    player.playerboard.placeShip(testShip2, 2, 4, 2, 2);

    let possibleNextMoves;

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(2, 2, game.humanPlayer);
    possibleNextMoves = [
      [1, 2],
      [3, 2],
      [2, 3],
      [2, 1],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(2, 1, game.humanPlayer); // here tile is hit but different ship
    possibleNextMoves = [
      [1, 2],
      [3, 2],
      [2, 3],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(1, 2, game.humanPlayer);
    possibleNextMoves = [
      [3, 2],
      [2, 3],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(3, 2, game.humanPlayer);
    possibleNextMoves = [[4, 2]];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(4, 2, game.humanPlayer); // ship is sunk, [2,1] was hit but different ship
    possibleNextMoves = [
      [1, 1],
      [3, 1],
      [2, 0],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    //
  });

  test.skip("getAIMove ignores options out of board", () => {
    const game = new GameController();
    game.initialiseGame();

    const testShip1 = new Ship(3);
    const testShip2 = new Ship(4);
    player.playerboard.placeShip(testShip1, 0, 2, 0, 0);
    player.playerboard.placeShip(testShip2, 9, 9, 2, 5);

    let possibleNextMoves;

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(0, 0, game.humanPlayer);
    possibleNextMoves = [
      [1, 0],
      [0, 1],
    ];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(1, 0, game.humanPlayer);
    possibleNextMoves = [[2, 0]];
    expect(
      possibleNextMoves.includes(getAIMove(game.computerPlayer.playerboard))
    ).toBe(true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(2, 0, game.humanPlayer); // sunk
    // possible with low chance, but it shouldn't call [3,0] by default
    expect(getAIMove(game.computerPlayer.playerboard) == [3, 0]).toBe(false);

    //
  });
  // test("getRandomNonHitTile is called when there is no unsunk hit tile", () => {});
});
