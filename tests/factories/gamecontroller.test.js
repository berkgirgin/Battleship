import { Ship } from "../../src/javascript/factories/ship.js";
import { Gameboard } from "../../src/javascript/factories/gameboard.js";
import { Player } from "../../src/javascript/factories/player.js";
import { GameController } from "../../src/javascript/factories/gamecontroller.js";

describe("Gamecontroller Class", () => {
  test("initialiseTestGame works", () => {
    const game = new GameController();
    game.initialiseTestGame();

    expect(game.humanPlayer).toBeInstanceOf(Player);
    expect(game.computerPlayer).toBeInstanceOf(Player);

    expect(game.humanPlayer.playerboard).toBeInstanceOf(Gameboard);
    expect(game.computerPlayer.playerboard).toBeInstanceOf(Gameboard);
  });

  test("switchActivePlayer works", () => {
    const game = new GameController();
    game.initialiseTestGame();

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.switchActivePlayer();
    expect(game.activePlayer).toBe(game.computerPlayer);
    game.switchActivePlayer();
    expect(game.activePlayer).toBe(game.humanPlayer);
  });

  test("playRound works", () => {
    const game = new GameController();
    game.initialiseTestGame();

    expect(game.computerPlayer.playerboard.fullBoard[2][1].isTileHit === false);
    expect(game.computerPlayer.playerboard.fullBoard[3][1].isTileHit === false);
    expect(game.computerPlayer.playerboard.fullBoard[4][1].isTileHit === false);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(2, 1, game.humanPlayer);
    expect(game.computerPlayer.playerboard.fullBoard[2][1].isTileHit === true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(2, 1, game.activePlayer); // already hit, so playRound() should not do anything
    expect(game.computerPlayer.playerboard.fullBoard[2][1].isTileHit === true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(3, 1, game.activePlayer); // hit a ship, so still its turn
    expect(game.computerPlayer.playerboard.fullBoard[2][1].isTileHit === true);
    expect(game.computerPlayer.playerboard.fullBoard[3][1].isTileHit === true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(9, 9, game.activePlayer); // did not hit a ship, so turn changes
    expect(game.computerPlayer.playerboard.fullBoard[2][1].isTileHit === true);
    expect(game.computerPlayer.playerboard.fullBoard[3][1].isTileHit === true);
    expect(game.computerPlayer.playerboard.fullBoard[9][9].isTileHit === true);

    expect(game.activePlayer).toBe(game.computerPlayer);
    game.playRound(3, 1, game.activePlayer); // hit a ship, so still its turn
    expect(game.humanPlayer.playerboard.fullBoard[2][1].isTileHit === false);
    expect(game.humanPlayer.playerboard.fullBoard[3][1].isTileHit === true);

    expect(game.activePlayer).toBe(game.computerPlayer);
    game.playRound(8, 8, game.activePlayer); // did not hit a ship, so turn changes
    expect(game.humanPlayer.playerboard.fullBoard[8][8].isTileHit === false);
    expect(game.humanPlayer.playerboard.fullBoard[3][1].isTileHit === true);

    expect(game.activePlayer).toBe(game.humanPlayer);
    game.playRound(4, 1, game.activePlayer);
    expect(game.computerPlayer.playerboard.fullBoard[2][1].isTileHit === true);
    expect(game.computerPlayer.playerboard.fullBoard[3][1].isTileHit === true);
    expect(game.computerPlayer.playerboard.fullBoard[4][1].isTileHit === true);
    expect(
      game.computerPlayer.playerboard.fullBoard[4][1].shipInfo.isSunk() === true
    );
  });

  test.skip("endGame works", () => {});

  test.skip("generateRandomBoard works", () => {});
});
