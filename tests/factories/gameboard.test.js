import {
  Gameboard,
  GameboardTile,
} from "../../src/javascript/factories/gameboard.js";

import { Ship } from "../../src/javascript/factories/ship.js";

describe("Gameboard Class", () => {
  test("generating Gameboard works", () => {
    const testGameBoard = new Gameboard();
    expect(testGameBoard.fullBoard.length).toBe(testGameBoard.boardSize);

    expect(testGameBoard.fullBoard[3].length).toBe(testGameBoard.boardSize);
    expect(testGameBoard.fullBoard[testGameBoard.boardSize - 1].length).toBe(
      testGameBoard.boardSize
    );

    expect(testGameBoard.fullBoard[3][2]).toBeInstanceOf(GameboardTile);
    expect(
      testGameBoard.fullBoard[3][testGameBoard.boardSize - 1]
    ).toBeInstanceOf(GameboardTile);

    expect(testGameBoard.fullBoard[3][2].X_coor).toBe(3);
    expect(testGameBoard.fullBoard[3][2].Y_coor).toBe(2);
  });

  test("placeShip works", () => {
    // coordinates start from 0, ends with (boardSize-1)
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(2);
    const testShip2 = new Ship(2);

    testGameBoard.placeShip(testShip1, 1, 2, 1, 1);
    expect(testGameBoard.fullBoard[2][1].shipInfo).toBe(testShip1);
    expect(testGameBoard.fullBoard[1][0].shipInfo).toBe(null); // otherwise should be null

    testGameBoard.placeShip(testShip2, 3, 3, 2, 3);
    expect(testGameBoard.fullBoard[3][3].shipInfo).toBe(testShip2);
    expect(testGameBoard.fullBoard[1][0].shipInfo).toBe(null); // otherwise should be null
  });

  test("placeShip does not place out of board", () => {
    // coordinates start from 0, ends with (boardSize-1)
    const testGameBoard = new Gameboard();
    const testShip = new Ship(10);

    expect(() => {
      testGameBoard.placeShip(testShip, 1, 2, 3, testGameBoard.boardSize + 2);
    }).toThrow();
  });

  test("placeShip does not add on existing ships", () => {
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(3);
    const testShip2 = new Ship(4);
    const testShip3 = new Ship(5);

    function getFleetSize() {
      return testGameBoard.fleet.length;
    }

    expect(getFleetSize()).toBe(0);

    testGameBoard.placeShip(testShip1, 1, 3, 2, 2);
    expect(getFleetSize()).toBe(1);
    testGameBoard.placeShip(testShip2, 1, 4, 4, 4);
    expect(getFleetSize()).toBe(2);

    testGameBoard.placeShip(testShip3, 1, 5, 2, 2);
    expect(getFleetSize()).toBe(2);
    testGameBoard.placeShip(testShip3, 4, 8, 4, 4);
    expect(getFleetSize()).toBe(2);

    testGameBoard.placeShip(testShip3, 0, 4, 8, 8);
    expect(getFleetSize()).toBe(3);
  });

  test.skip("placeShip does not add an existing ship(to fleet)", () => {
    expect().toBe();
  });

  test("receiveAttack works", () => {
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(3);
    testGameBoard.placeShip(testShip1, 1, 1, 0, 2);

    expect(testGameBoard.fullBoard[1][0].shipInfo).toBe(testShip1);
    expect(testGameBoard.fullBoard[1][0].isTileHit).toBe(false);
    expect(testGameBoard.fullBoard[1][1].isTileHit).toBe(false);
    expect(testGameBoard.fullBoard[1][2].isTileHit).toBe(false);

    testGameBoard.receiveAttack(1, 1);
    expect(testGameBoard.fullBoard[1][0].isTileHit).toBe(false);
    expect(testGameBoard.fullBoard[1][1].isTileHit).toBe(true);
    expect(testGameBoard.fullBoard[1][2].isTileHit).toBe(false);

    expect(testShip1.hitCount).toBe(1);
    expect(testShip1.isSunk()).toBe(false);

    testGameBoard.receiveAttack(1, 0);
    testGameBoard.receiveAttack(1, 2);
    expect(testGameBoard.fullBoard[1][0].isTileHit).toBe(true);
    expect(testGameBoard.fullBoard[1][1].isTileHit).toBe(true);
    expect(testGameBoard.fullBoard[1][2].isTileHit).toBe(true);

    expect(testShip1.hitCount).toBe(3);
    expect(testShip1.isSunk()).toBe(true);
  });

  test("receiveAttack does not work out of board", () => {
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(3);
    testGameBoard.placeShip(testShip1, 1, 1, 0, 2);

    expect(() => {
      testGameBoard.receiveAttack(testGameBoard.boardSize, 1);
    }).toThrow();
  });

  test("receiveAttack does not work on already attacked tile", () => {
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(3);
    testGameBoard.placeShip(testShip1, 1, 1, 0, 2);

    expect(testGameBoard.fullBoard[1][1].isTileHit).toBe(false);
    testGameBoard.receiveAttack(1, 1);
    expect(testGameBoard.fullBoard[1][1].isTileHit).toBe(true);

    expect(() => {
      testGameBoard.receiveAttack(1, 1);
    }).toThrow(/has been attacked already/);
  });

  test("testing the fleet", () => {
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(3);
    const testShip2 = new Ship(4);
    const testFleet = testGameBoard.fleet;

    function getFleetSize() {
      return testGameBoard.fleet.length;
    }

    testGameBoard.placeShip(testShip1, 1, 3, 2, 2);
    expect(testFleet.includes(testShip1)).toBe(true);
    expect(getFleetSize()).toBe(1);

    testGameBoard.placeShip(testShip2, 1, 3, 3, 3);
    expect(testFleet.includes(testShip2)).toBe(true);
    expect(testFleet.includes(testShip1)).toBe(true);
    expect(getFleetSize()).toBe(2);
  });

  test("isAllShipsSunk works", () => {
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(2);
    const testShip2 = new Ship(5);
    const testShip3 = new Ship(4);

    testGameBoard.placeShip(testShip1, 1, 1, 0, 1);
    testGameBoard.placeShip(testShip2, 2, 2, 0, 4);
    testGameBoard.placeShip(testShip3, 3, 3, 0, 3);

    expect(testShip1.isSunk()).toBe(false);
    expect(testShip2.isSunk()).toBe(false);
    expect(testShip3.isSunk()).toBe(false);
    expect(testGameBoard.isAllShipsSunk()).toBe(false);

    testGameBoard.receiveAttack(1, 0);
    testGameBoard.receiveAttack(1, 1);
    expect(testShip1.isSunk()).toBe(true);
    expect(testShip2.isSunk()).toBe(false);
    expect(testShip3.isSunk()).toBe(false);
    expect(testGameBoard.isAllShipsSunk()).toBe(false);

    testGameBoard.receiveAttack(2, 0);
    testGameBoard.receiveAttack(2, 1);
    testGameBoard.receiveAttack(2, 2);
    testGameBoard.receiveAttack(2, 3);
    testGameBoard.receiveAttack(2, 4);
    expect(testShip1.isSunk()).toBe(true);
    expect(testShip2.isSunk()).toBe(true);
    expect(testShip3.isSunk()).toBe(false);
    expect(testGameBoard.isAllShipsSunk()).toBe(false);

    testGameBoard.receiveAttack(3, 0);
    testGameBoard.receiveAttack(3, 1);
    testGameBoard.receiveAttack(3, 2);
    testGameBoard.receiveAttack(3, 3);
    expect(testShip1.isSunk()).toBe(true);
    expect(testShip2.isSunk()).toBe(true);
    expect(testShip3.isSunk()).toBe(true);
    expect(testGameBoard.isAllShipsSunk()).toBe(true);
  });

  test("getSunkShipTiles works", () => {
    const testGameBoard = new Gameboard();
    const testShip1 = new Ship(3);
    testGameBoard.placeShip(testShip1, 1, 3, 3, 3);

    testGameBoard.receiveAttack(1, 3);
    expect(testGameBoard.getSunkShipTiles(testShip1)).toEqual();

    testGameBoard.receiveAttack(2, 3);
    expect(testGameBoard.getSunkShipTiles(testShip1)).toEqual();

    testGameBoard.receiveAttack(3, 3);
    expect(testGameBoard.getSunkShipTiles(testShip1)).toEqual([
      testGameBoard.fullBoard[1][3],
      testGameBoard.fullBoard[2][3],
      testGameBoard.fullBoard[3][3],
    ]);
  });
});
