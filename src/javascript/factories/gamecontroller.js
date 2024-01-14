import { Ship } from "./ship.js";
import { Gameboard } from "./gameboard.js";
import { Player } from "./player.js";
import { DOM_Generator } from "../dom.js";
import { getAIMove } from "../AI.js";

export { GameController };

const DOM = new DOM_Generator();

class GameController {
  constructor() {
    this.humanPlayer;
    this.computerPlayer;
    this.activePlayer;
    this.inactivePlayer;
  }

  getOtherPlayer(player) {
    if (player === this.humanPlayer) {
      return this.computerPlayer;
    } else {
      return this.humanPlayer;
    }
  }

  initialiseGame() {
    this.humanPlayer = new Player();
    this.computerPlayer = new Player();

    this.humanPlayer.setEnemyPlayer(this.computerPlayer);
    this.computerPlayer.setEnemyPlayer(this.humanPlayer);

    this.activePlayer = this.humanPlayer;
    this.inactivePlayer = this.computerPlayer;

    this.generateRandomBoard(this.humanPlayer);
    this.generateRandomBoard(this.computerPlayer);

    // remove below 2 lines when done
    // this.testPlaceSomeShips(this.humanPlayer);
    // this.testPlaceSomeShips(this.computerPlayer);

    DOM.initialiseGame_DOM();
    DOM.updateGameboard();
  }

  generateRandomBoard(player) {
    const selectedBoard = player.enemyPlayer.playerboard;
    const ship1 = new Ship(5);
    const ship2 = new Ship(4);
    const ship3 = new Ship(3);
    const ship4 = new Ship(3);
    const ship5 = new Ship(2);

    const shipsToAdd = [ship1, ship2, ship3, ship4, ship5];

    function isAllTilesFree(X_start, X_end, Y_start, Y_end) {
      let isAllTilesFree = true;

      outerLoop: for (let x = X_start; x <= X_end; x++) {
        for (let y = Y_start; y <= Y_end; y++) {
          if (player.playerboard.fullBoard[x][y].hasTileShip()) {
            isAllTilesFree = false;
            break outerLoop;
          }
        }
      }

      return isAllTilesFree;
    }

    function getRandomCoordinates(shipLength) {
      const isHorizontal = Math.random() < 0.5;

      let X_start, X_end, Y_start, Y_end;

      if (isHorizontal) {
        X_start = Math.floor(Math.random() * (10 - shipLength + 1));
        X_end = X_start + shipLength - 1;
        Y_start = Math.floor(Math.random() * 10);
        Y_end = Y_start;
      } else {
        X_start = Math.floor(Math.random() * 10);
        X_end = X_start;
        Y_start = Math.floor(Math.random() * (10 - shipLength + 1));
        Y_end = Y_start + shipLength - 1;
      }

      return [X_start, X_end, Y_start, Y_end];
    }

    shipsToAdd.forEach((ship) => {
      let randomCoordinates;
      do {
        randomCoordinates = getRandomCoordinates(ship.length);
      } while (!isAllTilesFree(...randomCoordinates));

      player.playerboard.placeShip(ship, ...randomCoordinates);
    });
  }

  switchActivePlayer() {
    this.activePlayer =
      this.activePlayer === this.humanPlayer
        ? this.computerPlayer
        : this.humanPlayer;

    this.inactivePlayer =
      this.inactivePlayer === this.humanPlayer
        ? this.computerPlayer
        : this.humanPlayer;
  }

  playRound(X_coor, Y_coor, player) {
    if (player === this.computerPlayer) {
      console.log([X_coor, Y_coor]);
    }
    // console.log(`isHumanTurn: ${player === this.humanPlayer}`);
    // console.log(`played tile: [${X_coor}, ${Y_coor}]`);

    // if ((player = this.computerPlayer)) {
    //   this.playComputerRound(X_coor, Y_coor);
    //   return;
    // }
    // player should be the active player.
    // We click on inactive player board on DOM to playRound

    // ?? where to check if attack is allowed
    // if (!player.isAttackAllowed(X_coor, Y_coor)) {
    //   return;
    // }
    //
    player.attackEnemyPlayer(X_coor, Y_coor);

    // here comes some DOM stuff

    const targetBoard = player.enemyPlayer.playerboard;
    const targetTile = player.enemyPlayer.playerboard.fullBoard[X_coor][Y_coor];

    // check if this ship has been sunk now
    if (targetTile.hasTileShip()) {
      if (targetTile.shipInfo.isSunk()) {
        // here comes DOM stuff
        // allTilesOfShip = ..
        // forEach(allTilesOfShip)
        targetBoard.getSunkShipTiles(targetTile.shipInfo);
      }
    }

    //checking if the other player has lost the game
    if (player.enemyPlayer.playerboard.isAllShipsSunk()) {
      this.endGame(player);
    }

    // TO DO: keep attacking if attack is successful.
    outerLoop: if (targetTile.isTileHit && targetTile.hasTileShip()) {
      if (this.activePlayer === this.computerPlayer) {
        break outerLoop; // needs to jump in to below computerTurn logic
      } else {
        return; // no change with active player
      }
    } else {
      this.switchActivePlayer();
    }

    // this.switchActivePlayer();

    if (this.activePlayer === this.computerPlayer) {
      let [nextRound_X_coor, nextRound_Y_coor] = getAIMove(
        this.humanPlayer.playerboard
      );

      this.playRound(nextRound_X_coor, nextRound_Y_coor, this.computerPlayer);
    }
  }

  // playComputerRound(X_coor, Y_coor) {}

  endGame(winningPlayer) {
    // for now, we make losing board red, winning green

    if (winningPlayer === this.humanPlayer) {
      DOM.endGame_DOM("human");
    } else if (winningPlayer === this.computerPlayer) {
      DOM.endGame_DOM("computer");
    }
  }
}

//
// below are test functions for this Class
//
GameController.prototype.initialiseTestGame = function () {
  this.humanPlayer = new Player();
  this.computerPlayer = new Player();

  this.humanPlayer.setEnemyPlayer(this.computerPlayer);
  this.computerPlayer.setEnemyPlayer(this.humanPlayer);

  this.testPlaceSomeShips(this.humanPlayer);
  this.testPlaceSomeShips(this.computerPlayer);

  this.activePlayer = this.humanPlayer;
  this.inactivePlayer = this.computerPlayer;
};

GameController.prototype.initialiseTestGameNoShips = function () {
  this.humanPlayer = new Player();
  this.computerPlayer = new Player();

  this.humanPlayer.setEnemyPlayer(this.computerPlayer);
  this.computerPlayer.setEnemyPlayer(this.humanPlayer);

  // this.testPlaceSomeShips(this.humanPlayer);
  // this.testPlaceSomeShips(this.computerPlayer);

  this.activePlayer = this.humanPlayer;
  this.inactivePlayer = this.computerPlayer;
};

GameController.prototype.testPlaceSomeShips = function (player) {
  const testShip1 = new Ship(3);
  const testShip2 = new Ship(4);
  const testShip3 = new Ship(5);

  player.playerboard.placeShip(testShip1, 2, 4, 1, 1);
  player.playerboard.placeShip(testShip2, 2, 5, 2, 2);
  player.playerboard.placeShip(testShip3, 2, 6, 3, 3);
};

GameController.prototype.initialiseTestGame_AI_Test = function () {
  this.humanPlayer = new Player();
  this.computerPlayer = new Player();

  this.humanPlayer.setEnemyPlayer(this.computerPlayer);
  this.computerPlayer.setEnemyPlayer(this.humanPlayer);

  this.testPlaceSomeShips_AI_Test(this.humanPlayer);
  this.testPlaceSomeShips_AI_Test(this.computerPlayer);

  this.activePlayer = this.humanPlayer;
  this.inactivePlayer = this.computerPlayer;
};

GameController.prototype.testPlaceSomeShips_AI_Test = function (player) {
  const testShip1 = new Ship(3);
  const testShip2 = new Ship(4);
  const testShip3 = new Ship(5);

  player.playerboard.placeShip(testShip1, 2, 4, 2, 2);
  player.playerboard.placeShip(testShip2, 2, 5, 5, 5);
  player.playerboard.placeShip(testShip3, 2, 6, 8, 8);
};
//
//
