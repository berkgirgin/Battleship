"use strict";
(self["webpackChunktestrepo"] = self["webpackChunktestrepo"] || []).push([["index"],{

/***/ "./src/javascript/AI.js":
/*!******************************!*\
  !*** ./src/javascript/AI.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getAIMove: () => (/* binding */ getAIMove),
/* harmony export */   getRandomNonHitTile: () => (/* binding */ getRandomNonHitTile)
/* harmony export */ });
//

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
        if (currentTile.isTileHit && currentTile.shipInfo !== null && currentTile.shipInfo?.isSunk() === false) {
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
    let [X_start, X_end, Y_start, Y_end] = humanBoard.getShipsHitTileCoordinates(hitShip);
    let is_X_axis = Y_start === Y_end;
    if (is_X_axis) {
      if (isBetween0to9(X_start - 1) && !humanBoard.fullBoard[X_start - 1][Y_start].isTileHit) {
        return [X_start - 1, Y_start];
      } else if (isBetween0to9(X_end + 1) && !humanBoard.fullBoard[X_end + 1][Y_start].isTileHit) {
        return [X_end + 1, Y_start];
      }
    } else if (!is_X_axis) {
      if (isBetween0to9(Y_start - 1) && !humanBoard.fullBoard[X_start][Y_start - 1].isTileHit) {
        return [X_start, Y_start - 1];
      } else if (isBetween0to9(Y_end + 1) && !humanBoard.fullBoard[X_start][Y_end + 1].isTileHit) {
        return [X_start, Y_end + 1];
      }
    }
  }
  //
  // when ship.hitCount = 1
  else if (hitShip.hitCount === 1) {
    let selected_X = selectedHitTile.X_coor;
    let selected_Y = selectedHitTile.Y_coor;
    let movesToCheck = [[selected_X - 1, selected_Y], [selected_X + 1, selected_Y], [selected_X, selected_Y - 1], [selected_X, selected_Y + 1]];
    for (let i = 0; i < movesToCheck.length; i++) {
      let currentMove_X_coor = movesToCheck[i][0];
      let currentMove_Y_coor = movesToCheck[i][1];
      if (isBetween0to9(currentMove_X_coor) && isBetween0to9(currentMove_Y_coor) && !humanBoard.fullBoard[currentMove_X_coor][currentMove_Y_coor].isTileHit) {
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

/***/ }),

/***/ "./src/javascript/dom.js":
/*!*******************************!*\
  !*** ./src/javascript/dom.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOM_Generator: () => (/* binding */ DOM_Generator)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../javascript/index.js */ "./src/javascript/index.js");
/* harmony import */ var _load_ship_images_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./load_ship_images.js */ "./src/javascript/load_ship_images.js");




//
// ****

// TO DO: above line causes an error on Jest, but not on the app

class DOM_Generator {
  constructor() {}
  //

  initialiseGame_DOM() {
    const humanPlayerBoard_Container = document.querySelector(".human_gameboard_container");
    const computerPlayerBoard_Container = document.querySelector(".computer_gameboard_container");
    this.createGameboardGrids(humanPlayerBoard_Container, "human");
    this.createGameboardGrids(computerPlayerBoard_Container, "computer");
    const newGame_Button = document.querySelector(".new_game_button");
    const startGame_Button = document.querySelector(".start_game_button");
    const resetBoard_Button = document.querySelector(".reset_board_button");
    newGame_Button.addEventListener("click", () => {
      this.newGameButtonEvent();
    });
    startGame_Button.addEventListener("click", () => {
      this.startGameButtonEvent();
    });
    resetBoard_Button.addEventListener("click", () => {
      this.resetBoardButtonEvent();
    });
    const humanVictoryImage = document.querySelector(".victory_photo_human");
    const computerVictoryImage = document.querySelector(".victory_photo_computer");
    humanVictoryImage.addEventListener("click", () => {
      this.newGameButtonEvent();
    });
    computerVictoryImage.addEventListener("click", () => {
      this.newGameButtonEvent();
    });

    // this.addAudioConfig();
    this.addVideoBackgroundLoopDelay();
  }
  createGameboardGrids(targetContainer, humanOrComputer) {
    const dimension = 10;
    const childrenOfContainer = targetContainer.querySelectorAll("box");
    childrenOfContainer.forEach(element => {
      element.remove();
      // element.setAttribute("style", `border: 2px solid blue;`);
    });
    for (let i = dimension - 1; i >= 0; i--) {
      for (let j = 0; j < dimension; j++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("tile");
        // newDiv.classList.add(`box${i}`);
        newDiv.setAttribute("data-x_coor", `${j}`);
        newDiv.setAttribute("data-y_coor", `${i}`);
        // newDiv.textContent = `${j + i * 10}`;

        targetContainer.appendChild(newDiv);
      }
    }
    const tiles = targetContainer.querySelectorAll(".tile");
    tiles.forEach(tile => {
      tile.addEventListener("click", event => {
        this.clickOnGameboardTile(event, humanOrComputer);
      });
      // tile.addEventListener("hover", () => {
      //   this.hoverOnGameboardTile();
      // });
    });
  }

  // hoverOnGameboardTile(x) {
  //   console.log(this);
  // }

  clickOnGameboardTile(event, humanOrComputer) {
    // console.log(event.target);
    let tile_xCoor = event.target.dataset.x_coor;
    let tile_yCoor = event.target.dataset.y_coor;
    // console.log(tile_xCoor, tile_yCoor);

    if (humanOrComputer === "computer") {
      _index_js__WEBPACK_IMPORTED_MODULE_0__.game.playRound(tile_xCoor, tile_yCoor, _index_js__WEBPACK_IMPORTED_MODULE_0__.game.humanPlayer);
    } else if (humanOrComputer === "human") {
      _index_js__WEBPACK_IMPORTED_MODULE_0__.game.playRound(tile_xCoor, tile_yCoor, _index_js__WEBPACK_IMPORTED_MODULE_0__.game.computerPlayer);
    } else {
      throw new Error("Neither human nor computer is selected for the gameboard tile functions");
    }

    // this.updateGameboard();
  }
  removeActivePlayerTagToAI() {
    const computerBoardDiv = document.querySelector(".computer_gameboard_container");
    computerBoardDiv.classList.remove("active_players_enemy");
  }
  addActivePlayerTagtoAI() {
    const computerBoardDiv = document.querySelector(".computer_gameboard_container");
    computerBoardDiv.classList.add("active_players_enemy");
  }
  updateGameboard() {
    //
    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(".computer_gameboard_container");
    let isHumanTurn = _index_js__WEBPACK_IMPORTED_MODULE_0__.game.activePlayer === _index_js__WEBPACK_IMPORTED_MODULE_0__.game.humanPlayer;
    if (isHumanTurn) {
      this.addActivePlayerTagtoAI();
    } else {
      this.removeActivePlayerTagToAI();
    }

    //

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const selector = `.tile[data-x_coor="${i}"][data-y_coor="${j}"]`;
        let currentHumanTile_DOM = humanBoardDiv.querySelector(selector);
        let currentComputerTile_DOM = computerBoardDiv.querySelector(selector);
        let currentHumanTile = _index_js__WEBPACK_IMPORTED_MODULE_0__.game.humanPlayer.playerboard.fullBoard[i][j];
        let currentComputerTile = _index_js__WEBPACK_IMPORTED_MODULE_0__.game.computerPlayer.playerboard.fullBoard[i][j];

        // for testing, make ship tiles visible.
        if (currentHumanTile.hasTileShip()) {
          currentHumanTile_DOM.classList.add("has_ship");
        }
        if (currentComputerTile.hasTileShip()) {
          currentComputerTile_DOM.classList.add("has_ship");
        }
        //

        // adding ship images to ships
        // TO DO: make the computer one not visible
        if (currentHumanTile.hasTileShip()) {
          let shipType = currentHumanTile.shipInfo.shipType;
          currentHumanTile_DOM.setAttribute("data-ship_type", `${shipType}`);
        }
        if (currentComputerTile.hasTileShip()) {
          let shipType = currentComputerTile.shipInfo.shipType;
          currentComputerTile_DOM.setAttribute("data-ship_type", `${shipType}`);
          //
          if (currentComputerTile.shipInfo.isSunk()) {
            currentComputerTile_DOM.classList.add("sunk_ship");
          }
        }

        //

        // making hit tiles visible
        if (currentHumanTile.isTileHit) {
          currentHumanTile_DOM.classList.add("hit");
          if (currentHumanTile.hasTileShip()) {
            currentHumanTile_DOM.classList.add("hit_successful");
          } else {
            currentHumanTile_DOM.classList.add("hit_missed");
          }
        }
        if (currentComputerTile.isTileHit) {
          currentComputerTile_DOM.classList.add("hit");
          if (currentComputerTile.hasTileShip()) {
            currentComputerTile_DOM.classList.add("hit_successful");
          } else {
            currentComputerTile_DOM.classList.add("hit_missed");
          }
        }
        //
      }
    }
    _index_js__WEBPACK_IMPORTED_MODULE_0__.game.computerPlayer.playerboard.fullBoard;
    _index_js__WEBPACK_IMPORTED_MODULE_0__.game.computerPlayer.playerboard.fullBoard[2][1].isTileHit;
    (0,_load_ship_images_js__WEBPACK_IMPORTED_MODULE_1__.loadShipImages)(_index_js__WEBPACK_IMPORTED_MODULE_0__.game.humanPlayer.playerboard, humanBoardDiv);
    (0,_load_ship_images_js__WEBPACK_IMPORTED_MODULE_1__.loadShipImages)(_index_js__WEBPACK_IMPORTED_MODULE_0__.game.computerPlayer.playerboard, computerBoardDiv);
  }
  endGame_DOM(isWinnerHumanOrComputer) {
    // isWinnerHumanOrComputer will be "human" or "computer"
    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(".computer_gameboard_container");
    if (isWinnerHumanOrComputer === "human") {
      humanBoardDiv.classList.add("has_won");
      computerBoardDiv.classList.add("has_lost");
    } else if (isWinnerHumanOrComputer === "computer") {
      humanBoardDiv.classList.add("has_lost");
      computerBoardDiv.classList.add("has_won");
    }
    const victoryScreen = document.querySelector(".victory_screen_container");
    const humanVictoryImage = document.querySelector(".victory_photo_human");
    const computerVictoryImage = document.querySelector(".victory_photo_computer");
    const overlay = document.querySelector(".overlay");
    overlay.classList.add("active");
    victoryScreen.classList.add("active");
    if (isWinnerHumanOrComputer === "human") {
      humanVictoryImage.classList.add("active");
    } else if (isWinnerHumanOrComputer === "computer") {
      computerVictoryImage.classList.add("active");
    } else {
      throw new Error(`isWinnerHumanOrComputer is neither "human" nor "computer"`);
    }

    //
  }
  newGameAfterVictory() {
    const overlay = document.querySelector(".overlay");
    const victoryScreen = document.querySelector(".victory_screen_container");
    const humanVictoryImage = document.querySelector(".victory_photo_human");
    const computerVictoryImage = document.querySelector(".victory_photo_computer");
    victoryScreen.classList.remove("active");
    humanVictoryImage.classList.remove("active");
    computerVictoryImage.classList.remove("active");
    overlay.classList.remove("active");
    this.newGameButtonEvent();
  }
  clearGameboardsDOM() {
    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(".computer_gameboard_container");
    while (humanBoardDiv.firstChild) {
      humanBoardDiv.removeChild(humanBoardDiv.firstChild);
    }
    while (computerBoardDiv.firstChild) {
      computerBoardDiv.removeChild(computerBoardDiv.firstChild);
    }
  }
  newGameButtonEvent() {
    const startGame_Button = document.querySelector(".start_game_button");
    const resetBoard_Button = document.querySelector(".reset_board_button");
    startGame_Button.classList.remove("inactive");
    resetBoard_Button.classList.remove("inactive");
    const overlay = document.querySelector(".overlay");
    const victoryScreen = document.querySelector(".victory_screen_container");
    const humanVictoryImage = document.querySelector(".victory_photo_human");
    const computerVictoryImage = document.querySelector(".victory_photo_computer");
    victoryScreen.classList.remove("active");
    humanVictoryImage.classList.remove("active");
    computerVictoryImage.classList.remove("active");
    overlay.classList.remove("active");
    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(".computer_gameboard_container");
    humanBoardDiv.classList.remove("has_lost");
    humanBoardDiv.classList.remove("has_won");
    computerBoardDiv.classList.remove("has_lost");
    computerBoardDiv.classList.remove("has_won");
    this.clearGameboardsDOM();
    // game.initialiseGame();

    (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.generateMainGame)();
  }
  startGameButtonEvent() {
    const startGame_Button = document.querySelector(".start_game_button");
    const resetBoard_Button = document.querySelector(".reset_board_button");
    startGame_Button.classList.add("inactive");
    resetBoard_Button.classList.add("inactive");
    const kirovReportingAudio = document.querySelector("audio.kirov_reporting_audio");
    kirovReportingAudio.play();
    this.updateGameboard(); // adds back the active player tag
    // TO DO: remove or grey out "Start Game" and "Reset Board" buttons
  }
  resetBoardButtonEvent() {
    this.clearGameboardsDOM();
    _index_js__WEBPACK_IMPORTED_MODULE_0__.game.resetCurrentGameboards();
  }
  addVideoBackgroundLoopDelay() {
    const video = document.querySelector(".background_video");
    // video.play();

    video.addEventListener("ended", myHandler, false);
    function myHandler(e) {
      // console.log("ended");
      video.currentTime = 0;
      video.pause();
      setTimeout(function () {
        video.play();
      }, 10000);
    }
  }
  playAudio(audio, maxTimeOut) {
    return new Promise(res => {
      audio.play();

      // Set a timeout to stop the audio after maxTimeOut seconds
      if (maxTimeOut) {
        setTimeout(() => {
          audio.pause();
          audio.currentTime = 0;
          res();
        }, maxTimeOut * 1000);
      }
    });
  }
  async playAttackAudio(player) {
    const prismAudio = document.querySelector("audio.prism_audio");
    const teslaAudio = document.querySelector("audio.tesla_audio");
    if (player === _index_js__WEBPACK_IMPORTED_MODULE_0__.game.humanPlayer) {
      prismAudio.currentTime = 0;
      await this.playAudio(prismAudio, 2);
    } else if (player === _index_js__WEBPACK_IMPORTED_MODULE_0__.game.computerPlayer) {
      teslaAudio.currentTime = 0;
      await this.playAudio(teslaAudio, 2);
    }
  }
  async playAttackHitAudio(isHit) {
    const attackSuccessfulAudio = document.querySelector(".attack_successful_audio");
    const attackMissedAudio = document.querySelector(".attack_missed_audio");
    if (isHit) {
      attackSuccessfulAudio.currentTime = 0;
      await this.playAudio(attackSuccessfulAudio, 3);
    } else {
      attackMissedAudio.currentTime = 0;
      await this.playAudio(attackMissedAudio, 3);
    }
  }
  disableBody() {
    const body = document.querySelector("body");
    body.classList.add("disabled");
    console.log("body disabled");
  }
  enableBody() {
    const body = document.querySelector("body");
    body.classList.remove("disabled");
    console.log("body enabled");
  }

  //
}

/***/ }),

/***/ "./src/javascript/factories/gameboard.js":
/*!***********************************************!*\
  !*** ./src/javascript/factories/gameboard.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gameboard: () => (/* binding */ Gameboard),
/* harmony export */   GameboardTile: () => (/* binding */ GameboardTile)
/* harmony export */ });

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
    if (X_start >= this.boardSize || X_end >= this.boardSize || Y_start >= this.boardSize || Y_end >= this.boardSize) {
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
      throw new Error(`tile(X:${targetTile.X_coor},Y:${targetTile.Y_coor}) has been attacked already`);
    }
    targetTile.isTileHit = true;
    if (targetShip !== null) {
      targetShip.hit(); // checking if it hit a ship

      // TO DO: check if the ship is sunk, may be needed for game interface
    }
  }
  isAllShipsSunk() {
    let isAllShipsSunk = true;
    this.fleet.forEach(ship => {
      if (!ship.isSunk()) {
        isAllShipsSunk = false;
      }
    });
    return isAllShipsSunk;
  }
  getShipsCoordinates(ship) {
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
        if (currentTile.shipInfo?.shipType == ship.shipType) {
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

/***/ }),

/***/ "./src/javascript/factories/gamecontroller.js":
/*!****************************************************!*\
  !*** ./src/javascript/factories/gamecontroller.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOM: () => (/* binding */ DOM),
/* harmony export */   GameController: () => (/* binding */ GameController)
/* harmony export */ });
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/javascript/factories/ship.js");
/* harmony import */ var _gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard.js */ "./src/javascript/factories/gameboard.js");
/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player.js */ "./src/javascript/factories/player.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom.js */ "./src/javascript/dom.js");
/* harmony import */ var _AI_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../AI.js */ "./src/javascript/AI.js");







const DOM = new _dom_js__WEBPACK_IMPORTED_MODULE_3__.DOM_Generator();
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
    this.humanPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
    this.computerPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
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
    DOM.removeActivePlayerTagToAI(); // to be added when game starts
  }
  resetCurrentGameboards() {
    this.humanPlayer.playerboard.fullBoard = this.humanPlayer.playerboard.initialiseBoard();
    this.computerPlayer.playerboard.fullBoard = this.computerPlayer.playerboard.initialiseBoard();
    this.generateRandomBoard(this.humanPlayer);
    this.generateRandomBoard(this.computerPlayer);
    DOM.initialiseGame_DOM();
    DOM.updateGameboard();
    DOM.removeActivePlayerTagToAI(); // to be added when game starts
  }
  generateRandomBoard(player) {
    // const selectedBoard = player.enemyPlayer.playerboard;
    const ship1 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(5, "carrier");
    const ship2 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(4, "battleship");
    const ship3 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(3, "cruiser");
    const ship4 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(3, "submarine");
    const ship5 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(2, "destroyer");
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
    shipsToAdd.forEach(ship => {
      let randomCoordinates;
      do {
        randomCoordinates = getRandomCoordinates(ship.length);
      } while (!isAllTilesFree(...randomCoordinates));
      player.playerboard.placeShip(ship, ...randomCoordinates);
    });
  }
  switchActivePlayer() {
    this.activePlayer = this.activePlayer === this.humanPlayer ? this.computerPlayer : this.humanPlayer;
    this.inactivePlayer = this.inactivePlayer === this.humanPlayer ? this.computerPlayer : this.humanPlayer;
  }
  async playRound(X_coor, Y_coor, player) {
    DOM.removeActivePlayerTagToAI();
    if (player === this.computerPlayer) {
      console.log("AI hits: " + "[" + X_coor + ", " + Y_coor + "]");
    }
    await DOM.playAttackAudio(player);
    // await sleep(1);

    player.attackEnemyPlayer(X_coor, Y_coor);
    const targetBoard = player.enemyPlayer.playerboard;
    const targetTile = player.enemyPlayer.playerboard.fullBoard[X_coor][Y_coor];
    const isHitSuccessful = targetTile.hasTileShip();

    // check if this ship has been sunk now
    if (targetTile.hasTileShip()) {
      if (targetTile.shipInfo.isSunk()) {
        // here comes DOM stuff
        // allTilesOfShip = ..
        // forEach(allTilesOfShip)
        if (player === this.humanPlayer) {}
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
        DOM.updateGameboard();
        DOM.removeActivePlayerTagToAI();
        await DOM.playAttackHitAudio(isHitSuccessful);
        DOM.addActivePlayerTagtoAI();
        return; // no change with active player
      }
    } else {
      this.switchActivePlayer();
    }

    // this.switchActivePlayer();

    DOM.updateGameboard();
    DOM.removeActivePlayerTagToAI();
    await DOM.playAttackHitAudio(isHitSuccessful);
    DOM.addActivePlayerTagtoAI();
    if (this.activePlayer === this.computerPlayer) {
      let [nextRound_X_coor, nextRound_Y_coor] = (0,_AI_js__WEBPACK_IMPORTED_MODULE_4__.getAIMove)(this.humanPlayer.playerboard);
      this.playRound(nextRound_X_coor, nextRound_Y_coor, this.computerPlayer);
    }
  }

  // playComputerRound(X_coor, Y_coor) {}

  endGame(winningPlayer) {
    // for now, we make losing board red, winning green

    DOM.updateGameboard();
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
  this.humanPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
  this.computerPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
  this.humanPlayer.setEnemyPlayer(this.computerPlayer);
  this.computerPlayer.setEnemyPlayer(this.humanPlayer);
  this.testPlaceSomeShips(this.humanPlayer);
  this.testPlaceSomeShips(this.computerPlayer);
  this.activePlayer = this.humanPlayer;
  this.inactivePlayer = this.computerPlayer;
};
GameController.prototype.initialiseTestGameNoShips = function () {
  this.humanPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
  this.computerPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
  this.humanPlayer.setEnemyPlayer(this.computerPlayer);
  this.computerPlayer.setEnemyPlayer(this.humanPlayer);

  // this.testPlaceSomeShips(this.humanPlayer);
  // this.testPlaceSomeShips(this.computerPlayer);

  this.activePlayer = this.humanPlayer;
  this.inactivePlayer = this.computerPlayer;
};
GameController.prototype.testPlaceSomeShips = function (player) {
  const testShip1 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(3);
  const testShip2 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(4);
  const testShip3 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(5);
  player.playerboard.placeShip(testShip1, 2, 4, 1, 1);
  player.playerboard.placeShip(testShip2, 2, 5, 2, 2);
  player.playerboard.placeShip(testShip3, 2, 6, 3, 3);
};
GameController.prototype.initialiseTestGame_AI_Test = function () {
  this.humanPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
  this.computerPlayer = new _player_js__WEBPACK_IMPORTED_MODULE_2__.Player();
  this.humanPlayer.setEnemyPlayer(this.computerPlayer);
  this.computerPlayer.setEnemyPlayer(this.humanPlayer);
  this.testPlaceSomeShips_AI_Test(this.humanPlayer);
  this.testPlaceSomeShips_AI_Test(this.computerPlayer);
  this.activePlayer = this.humanPlayer;
  this.inactivePlayer = this.computerPlayer;
};
GameController.prototype.testPlaceSomeShips_AI_Test = function (player) {
  const testShip1 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(3);
  const testShip2 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(4);
  const testShip3 = new _ship_js__WEBPACK_IMPORTED_MODULE_0__.Ship(5);
  player.playerboard.placeShip(testShip1, 2, 4, 2, 2);
  player.playerboard.placeShip(testShip2, 2, 5, 5, 5);
  player.playerboard.placeShip(testShip3, 2, 6, 8, 8);
};
//
//

/***/ }),

/***/ "./src/javascript/factories/player.js":
/*!********************************************!*\
  !*** ./src/javascript/factories/player.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Player: () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/javascript/factories/gameboard.js");


class Player {
  constructor() {
    this.playerboard = new _gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard();
    this.isMyTurn = false;
    this.enemyPlayer;
  }
  setEnemyPlayer(player) {
    this.enemyPlayer = player;
  }
  isAttackAllowed(X_coor, Y_coor) {
    if (X_coor >= this.enemyPlayer.playerboard.boardSize || Y_coor >= this.enemyPlayer.playerboard.boardSize) {
      return false;
    }
    if (this.enemyPlayer.playerboard.fullBoard[X_coor][Y_coor].isTileHit) {
      return false;
    }
    return true;
  }
  attackEnemyPlayer(X_coor, Y_coor) {
    if (!this.enemyPlayer) {
      throw new Error("no enemy player has been specified");
    }
    this.enemyPlayer.playerboard.receiveAttack(X_coor, Y_coor);
  }
}

/***/ }),

/***/ "./src/javascript/factories/ship.js":
/*!******************************************!*\
  !*** ./src/javascript/factories/ship.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ship: () => (/* binding */ Ship)
/* harmony export */ });

class Ship {
  constructor(length, shipType) {
    this.length = length;
    this.hitCount = 0;
    this.shipType = shipType;
  }
  getLength() {
    return this.length;
  }
  hit() {
    // increases the number of ‘hits’ in your ship.
    if (this.hitCount === this.length) {
      return;
    }
    this.hitCount++;
  }
  isSunk() {
    // calculates whether a ship is considered sunk based on its length
    // and the number of hits it has received.

    if (this.hitCount === this.length) {
      return true;
    } else if (this.hitCount < this.length) {
      return false;
    } else {
      throw new Error("hit count exceeded length");
    }
  }
}

/***/ }),

/***/ "./src/javascript/index.js":
/*!*********************************!*\
  !*** ./src/javascript/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   game: () => (/* binding */ game),
/* harmony export */   generateMainGame: () => (/* binding */ generateMainGame)
/* harmony export */ });
/* harmony import */ var _factories_ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/ship.js */ "./src/javascript/factories/ship.js");
/* harmony import */ var _factories_gameboard_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./factories/gameboard.js */ "./src/javascript/factories/gameboard.js");
/* harmony import */ var _factories_player_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./factories/player.js */ "./src/javascript/factories/player.js");
/* harmony import */ var _factories_gamecontroller_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./factories/gamecontroller.js */ "./src/javascript/factories/gamecontroller.js");
/* harmony import */ var _AI_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AI.js */ "./src/javascript/AI.js");
/* harmony import */ var _javascript_load_ship_images_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../javascript/load_ship_images.js */ "./src/javascript/load_ship_images.js");
/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../styles/index.css */ "./src/styles/index.css");
//








let game;
function generateMainGame() {
  game = new _factories_gamecontroller_js__WEBPACK_IMPORTED_MODULE_3__.GameController();
  game.initialiseGame();
}
generateMainGame();
(0,_javascript_load_ship_images_js__WEBPACK_IMPORTED_MODULE_5__.addAudioConfig)();

/***/ }),

/***/ "./src/javascript/load_ship_images.js":
/*!********************************************!*\
  !*** ./src/javascript/load_ship_images.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addAudioConfig: () => (/* binding */ addAudioConfig),
/* harmony export */   loadShipImages: () => (/* binding */ loadShipImages)
/* harmony export */ });
/* harmony import */ var _factories_gameboard_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/gameboard.js */ "./src/javascript/factories/gameboard.js");

// import { DOM } from "./factories/gamecontroller.js";


//

function loadShipImages(gameboard, gameboardContainer) {
  gameboard.fleet.forEach(ship => {
    let [X_start, X_end, Y_start, Y_end] = gameboard.getShipsCoordinates(ship);
    let isXAxis = Y_start === Y_end;
    let shipType = ship.shipType;
    const shipTiles = gameboardContainer.querySelectorAll(`.tile.has_ship[data-ship_type="${shipType}"]`);
    let selector_headTile = `.tile.has_ship[data-x_coor="${X_end}"][data-y_coor="${Y_end}"][data-ship_type="${shipType}"]`;
    let headTiles = gameboardContainer.querySelectorAll(selector_headTile);
    shipTiles.forEach(shipTile => {
      // battleShipTile.style.backgroundColor = "pink";
      if (isXAxis) {
        shipTile.classList.add("x_axis");
      } else {
        shipTile.classList.add("y_axis");
      }
    });
    headTiles.forEach(headTile => {
      headTile.classList.add("head_tile");
    });
  });

  // // TO DO: make computer ships invisible, only seen when sunk
  // const battleShipTiles = gameboardContainer.querySelectorAll(
  //   '.tile.has_ship[data-ship_type="battleship"]'
  // );

  // let battleship = gameboard.fleet[1];
  // // console.log(gameboard.getShipsCoordinates(battleship));

  // let [X_start, X_end, Y_start, Y_end] =
  //   gameboard.getShipsCoordinates(battleship);

  // let isXAxis = Y_start === Y_end;

  // let selector_headTile = `.tile.has_ship[data-x_coor="${X_end}"][data-y_coor="${Y_end}"][data-ship_type="battleship"]`;

  // let headTiles = gameboardContainer.querySelectorAll(selector_headTile);

  // battleShipTiles.forEach((battleShipTile) => {
  //   // battleShipTile.style.backgroundColor = "pink";
  //   if (isXAxis) {
  //     battleShipTile.classList.add("x_axis");
  //   } else {
  //     battleShipTile.classList.add("y_axis");
  //   }
  // });

  // headTiles.forEach((headTile) => {
  //   headTile.classList.add("head_tile");
  // });
}
function addAudioConfig() {
  const audioBackground = document.querySelector("audio.background_music");
  const audioIconOn = document.querySelector("button.background_music_button .icon_on");
  const audioIconOff = document.querySelector("button.background_music_button .icon_off");
  audioIconOn.style.display = "none";
  const audioButton = document.querySelector("button.background_music_button");
  function togglePlay() {
    if (audioBackground.paused) {
      audioIconOn.style.display = "block";
      audioIconOff.style.display = "none";
      console.log("playing background music");
      audioBackground.play();
    } else {
      audioIconOn.style.display = "none";
      audioIconOff.style.display = "block";
      console.log("pausing background music");
      audioBackground.pause();
    }
  }
  audioButton.addEventListener("click", () => {
    togglePlay();
  });
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/ra2_allied_logo.webp */ "./src/assets/images/ra2_allied_logo.webp"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ../assets/images/ra2_soviet_logo.png */ "./src/assets/images/ra2_soviet_logo.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --ra2-menu-yellow: #f8fb01;
  --ra2-menu-red: #b60100;
  --header-light-grey: rgb(139, 147, 154);
  --header-dark-grey: rgba(91, 100, 103, 1);
  --button-hover-grey: #3a3a3a;
  --neutral-black: #121212;
  --dark-grey: #232323;
  --font_color_white: #e8e6e3;

  --button-box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,
    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,
    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,
    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,
    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;

  --button-hover-box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;

  --header-background: linear-gradient(
    90deg,
    rgba(139, 147, 154, 1) 0%,
    rgba(91, 100, 103, 1) 100%
  );

  --gameboard-box-shadow: 0 2px 3px #292929, 0 0 77px black inset,
    5px -5px 44px #292929 inset;

  --float-size: 0.15rem;
  --border_radius: 10px;
  --tile-border: 0.5px silver solid;

  font-size: 16px;
}

@keyframes float-y-axis {
  0% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }

  50% {
    transform: translateY(var(--float-size));
    -webkit-transform: translateY(var(--float-size));
  }

  100% {
    transform: translateY(0);
    -webkit-transform: translateY(0);
  }
}

@keyframes float-x-axis {
  0% {
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }

  50% {
    transform: translateX(var(--float-size));
    -webkit-transform: translateX(var(--float-size));
  }

  100% {
    transform: translateX(0);
    -webkit-transform: translateX(0);
  }
}

@keyframes changeScale {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(1.2);
  }
}

body {
  background-color: black;
  margin: 0;
  padding: 0;
  position: relative;

  color: var(--ra2-menu-yellow);
}

.background_video {
  width: 100vw;
  height: 100vh;
  object-fit: cover;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: -1;

  opacity: 0.15;
}

.main_container > * {
  display: flex;
  justify-content: center;
  align-items: center;
  /* padding: 1rem; */
}

/* Header */

.header_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  /* background-image: url(../assets/images/dreadnought.jpg);
  background-position: center;
  background-size: 15%; */
  background: rgb(139, 147, 154);
  background: var(--header-background);

  box-shadow: var(--gameboard-box-shadow);
}

/* .left_side_buttons_container {
  display: flex;
  justify-content: center;
  align-items: center;
} */

.right_side_header_container,
.left_side_buttons_container {
  display: flex;
  justify-content: center;
  align-items: center;

  /* negating the parent padding */
  /* margin-left: -1rem; */
  gap: 1rem;

  font-size: 1.7rem;
  font-weight: bold;
}

/* .right_side_header_container img {
  height: 2rem;
} */

.button img {
  height: 2rem;
  color: var(--ra2-menu-yellow);
}

.button {
  border: none;
  box-shadow: var(--button-box-shadow);

  position: relative;
  background-color: var(--ra2-menu-red);
  border-radius: 4em;
  /* font-size: 16px; */
  font-size: 1rem;
  color: var(--ra2-menu-yellow);
  font-weight: bold;
  padding: 0.8em 1.8em;
  cursor: pointer;
  user-select: none;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  transition-duration: 0.4s;
  -webkit-transition-duration: 0.4s; /* Safari */
}

.button:hover {
  transition-duration: 0.1s;
  background-color: var(--button-hover-grey);
}

.button:after {
  content: "";
  display: block;
  position: absolute;
  border-radius: 4em;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: all 0.5s;
  box-shadow: 0 0 10px 40px var(--ra2-menu-red);
}

.button:active:after {
  box-shadow: 0 0 0 0 var(--ra2-menu-yellow);
  position: absolute;
  border-radius: 4em;
  left: 0;
  top: 0;
  opacity: 1;
  transition: 0s;
}

.button:active {
  top: 1px;
}
/* ****** */

/* Start and Reset Buttons*/
.start_buttons_container {
  display: flex;
  gap: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.start_buttons_container > .inactive {
  visibility: hidden;
}

/* ************************/

/* Gameboards Main Container */

.gameboards_main_container {
  display: flex;
  gap: 4rem;

  font-size: 1.3rem;
  font-weight: bold;
}

.gameboards_main_container > * {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* gap: 0.5rem; */
}

.player_title {
  width: 30rem;
  border: 0.4rem solid var(--header-dark-grey);
  background-color: var(--dark-grey);
  /* padding-left: 1rem; */
  text-align: center;
}

/* ************************* */

/* Gameboard Container */
.gameboards_container {
  display: flex;
  gap: 2rem;
}

.human_gameboard_container,
.computer_gameboard_container {
  background-color: white;
  /* border: 24px groove #727278; */
  /* box-sizing: border-box; */
  border: 0.4rem solid var(--header-dark-grey);
  box-shadow: var(--gameboard-box-shadow);

  width: 30rem;
  height: 30rem;

  display: grid;
  grid-template-columns: repeat(10, minmax(10px, 1fr));
  grid-auto-rows: 1fr;

  opacity: 0.9;
}
.human_gameboard_container {
  background-color: rgb(0, 132, 251);

  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});

  background-repeat: no-repeat;
  background-position: center;
  background-size: 42%;
}
.computer_gameboard_container {
  background-color: #450a0a;

  background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
  background-repeat: no-repeat;
  background-position: 50% 45%;
  background-size: 30%;
}

.human_gameboard_container.has_won,
.computer_gameboard_container.has_won {
  border-color: green;
  border-radius: 30px;
}

.human_gameboard_container.has_lost,
.computer_gameboard_container.has_lost {
  border-color: red;
  border-radius: 30px;
}

/* pointer events allowed only on computer board during human turn */
.human_gameboard_container,
.computer_gameboard_container {
  pointer-events: none;
  cursor: not-allowed;
}
.computer_gameboard_container.active_players_enemy {
  pointer-events: all;
}

/* Gameboard Tiles */

.computer_gameboard_container .tile.has_ship:not(.sunk_ship) {
  background: none;
  border: var(--tile-border);
  animation: none;
  border-radius: 0 !important;
}
/* .computer_gameboard_container .tile.has_ship.sunk_ship {
  background: inherit;
} */

.tile {
  aspect-ratio: 1 / 1;
  border: var(--tile-border);
  transition-duration: 0.4s;

  cursor: crosshair;
}

.tile.hit {
  /* background-color: red; */
  pointer-events: none;
}

.tile.hit:hover {
  background-color: gray;
}

.tile.has_ship {
  border-style: solid;
  border-color: livid;
  border: 6px var(--button-hover-grey) solid;
  background-color: var(--header-light-grey);
  background-position: center;
  /* background-size: 100%; */
  background-size: cover;
  background-repeat: no-repeat;

  animation: float 4s infinite ease-in-out;

  /* padding: 5px; */
}
.tile.has_ship.x_axis {
  animation: float-y-axis 4s infinite ease-in-out;
}
.tile.has_ship.y_axis {
  animation: float-x-axis 4s infinite ease-in-out;
}

.tile.has_ship.head_tile.sunk_ship:not(:hover) {
  background-color: var(--header-dark-grey);
  background-image: none;
}

.tile.has_ship.head_tile.x_axis {
  border-radius: 40px 999em 999em 40px;
}
.tile.has_ship.head_tile.y_axis {
  border-radius: 999em 999em 40px 40px;
}

.tile:hover:not(.hit) {
  background-color: bisque !important;
}
/* *************** */

/* hit tiles */

.tile.hit {
  position: relative;
}
.tile.hit::after {
  content: "";
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* margin: -8px; */
  border-radius: 50%;
}
.tile.hit.hit_successful::after {
  background-color: red;
}
.tile.hit.hit_missed::after {
  background-color: white;
}
/* ********* */

/* victory screen */

.victory_screen_container {
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: 200ms;
  border-radius: var(--border_radius);
  z-index: 10;

  /* width: 500px;
  max-width: 80%;
  height: 300px;
  max-height: 80%; */

  width: 320px;
  height: 100px;

  display: flex;
  flex-direction: column;

  /* padding: 40px 30px; */

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}
.victory_screen_container.active {
  transform: translate(-50%, -50%) scale(1);
}

.victory_screen_container img {
  visibility: hidden;
  border: 8px transparent solid;
}
.victory_screen_container img.active {
  visibility: inherit;

  animation-duration: 1.5s;
  animation-name: changeScale;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-timing-function: ease-in-out;

  cursor: pointer;
}
.victory_screen_container img.active:hover {
  border-color: rgb(0, 132, 251);
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  opacity: 0;
  pointer-events: none;
}
.overlay.active {
  opacity: 1;
  pointer-events: all;
}

/* ************** */
`, "",{"version":3,"sources":["webpack://./src/styles/index.css"],"names":[],"mappings":"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","sourcesContent":[":root {\n  --ra2-menu-yellow: #f8fb01;\n  --ra2-menu-red: #b60100;\n  --header-light-grey: rgb(139, 147, 154);\n  --header-dark-grey: rgba(91, 100, 103, 1);\n  --button-hover-grey: #3a3a3a;\n  --neutral-black: #121212;\n  --dark-grey: #232323;\n  --font_color_white: #e8e6e3;\n\n  --button-box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset,\n    rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset,\n    rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px,\n    rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px,\n    rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;\n\n  --button-hover-box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,\n    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,\n    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;\n\n  --header-background: linear-gradient(\n    90deg,\n    rgba(139, 147, 154, 1) 0%,\n    rgba(91, 100, 103, 1) 100%\n  );\n\n  --gameboard-box-shadow: 0 2px 3px #292929, 0 0 77px black inset,\n    5px -5px 44px #292929 inset;\n\n  --float-size: 0.15rem;\n  --border_radius: 10px;\n  --tile-border: 0.5px silver solid;\n\n  font-size: 16px;\n}\n\n@keyframes float-y-axis {\n  0% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n  }\n\n  50% {\n    transform: translateY(var(--float-size));\n    -webkit-transform: translateY(var(--float-size));\n  }\n\n  100% {\n    transform: translateY(0);\n    -webkit-transform: translateY(0);\n  }\n}\n\n@keyframes float-x-axis {\n  0% {\n    transform: translateX(0);\n    -webkit-transform: translateX(0);\n  }\n\n  50% {\n    transform: translateX(var(--float-size));\n    -webkit-transform: translateX(var(--float-size));\n  }\n\n  100% {\n    transform: translateX(0);\n    -webkit-transform: translateX(0);\n  }\n}\n\n@keyframes changeScale {\n  from {\n    transform: scale(1);\n  }\n  to {\n    transform: scale(1.2);\n  }\n}\n\nbody {\n  background-color: black;\n  margin: 0;\n  padding: 0;\n  position: relative;\n\n  color: var(--ra2-menu-yellow);\n}\n\n.background_video {\n  width: 100vw;\n  height: 100vh;\n  object-fit: cover;\n  position: fixed;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  z-index: -1;\n\n  opacity: 0.15;\n}\n\n.main_container > * {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  /* padding: 1rem; */\n}\n\n/* Header */\n\n.header_container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0.5rem;\n  background-color: rgba(0, 0, 0, 0.8);\n  /* background-image: url(../assets/images/dreadnought.jpg);\n  background-position: center;\n  background-size: 15%; */\n  background: rgb(139, 147, 154);\n  background: var(--header-background);\n\n  box-shadow: var(--gameboard-box-shadow);\n}\n\n/* .left_side_buttons_container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n} */\n\n.right_side_header_container,\n.left_side_buttons_container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n\n  /* negating the parent padding */\n  /* margin-left: -1rem; */\n  gap: 1rem;\n\n  font-size: 1.7rem;\n  font-weight: bold;\n}\n\n/* .right_side_header_container img {\n  height: 2rem;\n} */\n\n.button img {\n  height: 2rem;\n  color: var(--ra2-menu-yellow);\n}\n\n.button {\n  border: none;\n  box-shadow: var(--button-box-shadow);\n\n  position: relative;\n  background-color: var(--ra2-menu-red);\n  border-radius: 4em;\n  /* font-size: 16px; */\n  font-size: 1rem;\n  color: var(--ra2-menu-yellow);\n  font-weight: bold;\n  padding: 0.8em 1.8em;\n  cursor: pointer;\n  user-select: none;\n  text-align: center;\n  text-decoration: none;\n  cursor: pointer;\n  transition-duration: 0.4s;\n  -webkit-transition-duration: 0.4s; /* Safari */\n}\n\n.button:hover {\n  transition-duration: 0.1s;\n  background-color: var(--button-hover-grey);\n}\n\n.button:after {\n  content: \"\";\n  display: block;\n  position: absolute;\n  border-radius: 4em;\n  left: 0;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transition: all 0.5s;\n  box-shadow: 0 0 10px 40px var(--ra2-menu-red);\n}\n\n.button:active:after {\n  box-shadow: 0 0 0 0 var(--ra2-menu-yellow);\n  position: absolute;\n  border-radius: 4em;\n  left: 0;\n  top: 0;\n  opacity: 1;\n  transition: 0s;\n}\n\n.button:active {\n  top: 1px;\n}\n/* ****** */\n\n/* Start and Reset Buttons*/\n.start_buttons_container {\n  display: flex;\n  gap: 2rem;\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n}\n.start_buttons_container > .inactive {\n  visibility: hidden;\n}\n\n/* ************************/\n\n/* Gameboards Main Container */\n\n.gameboards_main_container {\n  display: flex;\n  gap: 4rem;\n\n  font-size: 1.3rem;\n  font-weight: bold;\n}\n\n.gameboards_main_container > * {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n  /* gap: 0.5rem; */\n}\n\n.player_title {\n  width: 30rem;\n  border: 0.4rem solid var(--header-dark-grey);\n  background-color: var(--dark-grey);\n  /* padding-left: 1rem; */\n  text-align: center;\n}\n\n/* ************************* */\n\n/* Gameboard Container */\n.gameboards_container {\n  display: flex;\n  gap: 2rem;\n}\n\n.human_gameboard_container,\n.computer_gameboard_container {\n  background-color: white;\n  /* border: 24px groove #727278; */\n  /* box-sizing: border-box; */\n  border: 0.4rem solid var(--header-dark-grey);\n  box-shadow: var(--gameboard-box-shadow);\n\n  width: 30rem;\n  height: 30rem;\n\n  display: grid;\n  grid-template-columns: repeat(10, minmax(10px, 1fr));\n  grid-auto-rows: 1fr;\n\n  opacity: 0.9;\n}\n.human_gameboard_container {\n  background-color: rgb(0, 132, 251);\n\n  background-image: url(../assets/images/ra2_allied_logo.webp);\n\n  background-repeat: no-repeat;\n  background-position: center;\n  background-size: 42%;\n}\n.computer_gameboard_container {\n  background-color: #450a0a;\n\n  background-image: url(../assets/images/ra2_soviet_logo.png);\n  background-repeat: no-repeat;\n  background-position: 50% 45%;\n  background-size: 30%;\n}\n\n.human_gameboard_container.has_won,\n.computer_gameboard_container.has_won {\n  border-color: green;\n  border-radius: 30px;\n}\n\n.human_gameboard_container.has_lost,\n.computer_gameboard_container.has_lost {\n  border-color: red;\n  border-radius: 30px;\n}\n\n/* pointer events allowed only on computer board during human turn */\n.human_gameboard_container,\n.computer_gameboard_container {\n  pointer-events: none;\n  cursor: not-allowed;\n}\n.computer_gameboard_container.active_players_enemy {\n  pointer-events: all;\n}\n\n/* Gameboard Tiles */\n\n.computer_gameboard_container .tile.has_ship:not(.sunk_ship) {\n  background: none;\n  border: var(--tile-border);\n  animation: none;\n  border-radius: 0 !important;\n}\n/* .computer_gameboard_container .tile.has_ship.sunk_ship {\n  background: inherit;\n} */\n\n.tile {\n  aspect-ratio: 1 / 1;\n  border: var(--tile-border);\n  transition-duration: 0.4s;\n\n  cursor: crosshair;\n}\n\n.tile.hit {\n  /* background-color: red; */\n  pointer-events: none;\n}\n\n.tile.hit:hover {\n  background-color: gray;\n}\n\n.tile.has_ship {\n  border-style: solid;\n  border-color: livid;\n  border: 6px var(--button-hover-grey) solid;\n  background-color: var(--header-light-grey);\n  background-position: center;\n  /* background-size: 100%; */\n  background-size: cover;\n  background-repeat: no-repeat;\n\n  animation: float 4s infinite ease-in-out;\n\n  /* padding: 5px; */\n}\n.tile.has_ship.x_axis {\n  animation: float-y-axis 4s infinite ease-in-out;\n}\n.tile.has_ship.y_axis {\n  animation: float-x-axis 4s infinite ease-in-out;\n}\n\n.tile.has_ship.head_tile.sunk_ship:not(:hover) {\n  background-color: var(--header-dark-grey);\n  background-image: none;\n}\n\n.tile.has_ship.head_tile.x_axis {\n  border-radius: 40px 999em 999em 40px;\n}\n.tile.has_ship.head_tile.y_axis {\n  border-radius: 999em 999em 40px 40px;\n}\n\n.tile:hover:not(.hit) {\n  background-color: bisque !important;\n}\n/* *************** */\n\n/* hit tiles */\n\n.tile.hit {\n  position: relative;\n}\n.tile.hit::after {\n  content: \"\";\n  width: 25px;\n  height: 25px;\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  /* margin: -8px; */\n  border-radius: 50%;\n}\n.tile.hit.hit_successful::after {\n  background-color: red;\n}\n.tile.hit.hit_missed::after {\n  background-color: white;\n}\n/* ********* */\n\n/* victory screen */\n\n.victory_screen_container {\n  position: fixed;\n  top: 30%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  transition: 200ms;\n  border-radius: var(--border_radius);\n  z-index: 10;\n\n  /* width: 500px;\n  max-width: 80%;\n  height: 300px;\n  max-height: 80%; */\n\n  width: 320px;\n  height: 100px;\n\n  display: flex;\n  flex-direction: column;\n\n  /* padding: 40px 30px; */\n\n  display: flex;\n  flex-direction: column;\n  gap: 1.2rem;\n}\n.victory_screen_container.active {\n  transform: translate(-50%, -50%) scale(1);\n}\n\n.victory_screen_container img {\n  visibility: hidden;\n  border: 8px transparent solid;\n}\n.victory_screen_container img.active {\n  visibility: inherit;\n\n  animation-duration: 1.5s;\n  animation-name: changeScale;\n  animation-iteration-count: infinite;\n  animation-direction: alternate;\n  animation-timing-function: ease-in-out;\n\n  cursor: pointer;\n}\n.victory_screen_container img.active:hover {\n  border-color: rgb(0, 132, 251);\n}\n\n.overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.85);\n  opacity: 0;\n  pointer-events: none;\n}\n.overlay.active {\n  opacity: 1;\n  pointer-events: all;\n}\n\n/* ************** */\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/images/ra2_allied_logo.webp":
/*!************************************************!*\
  !*** ./src/assets/images/ra2_allied_logo.webp ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f079538ef7a4b2be4f54.webp";

/***/ }),

/***/ "./src/assets/images/ra2_soviet_logo.png":
/*!***********************************************!*\
  !*** ./src/assets/images/ra2_soviet_logo.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "6062eb36f511b32c73d1.png";

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/javascript/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBCQUEwQixtQ0FBbUM7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIsbUNBQW1DO0FBQzdEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COztBQUVuQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEseUJBQXlCOztBQUV6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPLHVGQUF1RixZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsU0FBUyxRQUFRLE9BQU8sUUFBUSxTQUFTLE1BQU0sS0FBSyxRQUFRLGFBQWEsYUFBYSxjQUFjLFdBQVcsT0FBTyxLQUFLLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxNQUFNLE1BQU0sS0FBSyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE1BQU0sTUFBTSxLQUFLLFlBQVksV0FBVyxVQUFVLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsVUFBVSxNQUFNLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxPQUFPLFdBQVcsS0FBSyxVQUFVLFlBQVksYUFBYSxXQUFXLFlBQVksT0FBTyxPQUFPLGFBQWEsY0FBYyxhQUFhLE9BQU8sUUFBUSxNQUFNLE1BQU0sVUFBVSxZQUFZLGNBQWMsYUFBYSxhQUFhLFlBQVksWUFBWSxhQUFhLE9BQU8sTUFBTSxNQUFNLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxXQUFXLFlBQVksYUFBYSxhQUFhLFdBQVcsWUFBWSxhQUFhLGFBQWEsV0FBVyxZQUFZLHVCQUF1QixPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxLQUFLLFVBQVUsS0FBSyxXQUFXLFlBQVksTUFBTSxVQUFVLFVBQVUsWUFBWSxhQUFhLE1BQU0sS0FBSyxZQUFZLE9BQU8sYUFBYSxjQUFjLE1BQU0sVUFBVSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsT0FBTyxhQUFhLGFBQWEsTUFBTSxVQUFVLFVBQVUsTUFBTSxNQUFNLFlBQVksYUFBYSxhQUFhLGFBQWEsY0FBYyxXQUFXLFdBQVcsVUFBVSxZQUFZLGNBQWMsV0FBVyxLQUFLLEtBQUssYUFBYSxjQUFjLGFBQWEsYUFBYSxhQUFhLE1BQU0sS0FBSyxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxNQUFNLFlBQVksYUFBYSxPQUFPLE1BQU0sWUFBWSxhQUFhLE9BQU8sWUFBWSxPQUFPLFlBQVksYUFBYSxNQUFNLEtBQUssWUFBWSxPQUFPLGFBQWEsTUFBTSxZQUFZLGFBQWEsV0FBVyxZQUFZLE1BQU0sTUFBTSxNQUFNLEtBQUssWUFBWSxhQUFhLGNBQWMsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGNBQWMsY0FBYyxhQUFhLE1BQU0sS0FBSyxZQUFZLE1BQU0sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxhQUFhLFlBQVksS0FBSyxZQUFZLE1BQU0sS0FBSyxVQUFVLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxZQUFZLGFBQWEsYUFBYSxNQUFNLEtBQUssWUFBWSxNQUFNLEtBQUssWUFBWSxNQUFNLFdBQVcsYUFBYSxNQUFNLFVBQVUsVUFBVSxVQUFVLFlBQVksYUFBYSxhQUFhLFlBQVksT0FBTyxRQUFRLFdBQVcsV0FBVyxV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QUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsaUZBQWlGO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7O0FDNURhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdGVzdHJlcG8vLi9zcmMvamF2YXNjcmlwdC9BSS5qcyIsIndlYnBhY2s6Ly90ZXN0cmVwby8uL3NyYy9qYXZhc2NyaXB0L2RvbS5qcyIsIndlYnBhY2s6Ly90ZXN0cmVwby8uL3NyYy9qYXZhc2NyaXB0L2ZhY3Rvcmllcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vdGVzdHJlcG8vLi9zcmMvamF2YXNjcmlwdC9mYWN0b3JpZXMvZ2FtZWNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vdGVzdHJlcG8vLi9zcmMvamF2YXNjcmlwdC9mYWN0b3JpZXMvcGxheWVyLmpzIiwid2VicGFjazovL3Rlc3RyZXBvLy4vc3JjL2phdmFzY3JpcHQvZmFjdG9yaWVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vdGVzdHJlcG8vLi9zcmMvamF2YXNjcmlwdC9pbmRleC5qcyIsIndlYnBhY2s6Ly90ZXN0cmVwby8uL3NyYy9qYXZhc2NyaXB0L2xvYWRfc2hpcF9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vdGVzdHJlcG8vLi9zcmMvc3R5bGVzL2luZGV4LmNzcyIsIndlYnBhY2s6Ly90ZXN0cmVwby8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdGVzdHJlcG8vLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3Rlc3RyZXBvLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdGVzdHJlcG8vLi9zcmMvc3R5bGVzL2luZGV4LmNzcz82MzQ5Iiwid2VicGFjazovL3Rlc3RyZXBvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3Rlc3RyZXBvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90ZXN0cmVwby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly90ZXN0cmVwby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90ZXN0cmVwby8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3Rlc3RyZXBvLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9cbmV4cG9ydCB7IGdldEFJTW92ZSwgZ2V0UmFuZG9tTm9uSGl0VGlsZSB9O1xuXG5mdW5jdGlvbiBnZXRBSU1vdmUoaHVtYW5Cb2FyZCwgbGFzdEhpdEh1bWFuVGlsZSkge1xuICAvLyBUTyBETzogbWFrZSBzdXJlIHRvIGNoZWNrIHRoZSB0aWxlcyBoYXZlIHRoZSBzYW1lIHNoaXAgaW4gdGhlIHBhdHRlcm5cbiAgLy90aGlzIGZ1bmMgc2hvdWxkIHJldHVybiBbeCx5XVxuXG4gIGZ1bmN0aW9uIGlzQmV0d2VlbjB0bzkodmFsdWUpIHtcbiAgICAvLyByZXR1cm4gZmFsc2UgaWYgc21hbGxlciB0aGFuIDAgYW5kIGJpZ2dlciB0aGFuIDlcbiAgICByZXR1cm4gdmFsdWUgPj0gMCAmJiB2YWx1ZSA8PSA5O1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0SGl0VGlsZVdpdGhOb25zdW5rU2hpcCgpIHtcbiAgICAvLyByZXR1cm5zIGEgc2luZ2xlIHRpbGVcbiAgICAvLyByZXR1cm5zIG51bGwgaWYgdGhlcmUgaXMgbm8gaGl0IHRpbGUgd2l0aCBhIHNoaXBcbiAgICBsZXQgcmVzdWx0VGlsZSA9IG51bGw7XG5cbiAgICBvdXRlckxvb3A6IGZvciAobGV0IGkgPSAwOyBpIDwgaHVtYW5Cb2FyZC5ib2FyZFNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBodW1hbkJvYXJkLmJvYXJkU2l6ZTsgaisrKSB7XG4gICAgICAgIGxldCBjdXJyZW50VGlsZSA9IGh1bWFuQm9hcmQuZnVsbEJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBjdXJyZW50VGlsZS5pc1RpbGVIaXQgJiZcbiAgICAgICAgICBjdXJyZW50VGlsZS5zaGlwSW5mbyAhPT0gbnVsbCAmJlxuICAgICAgICAgIGN1cnJlbnRUaWxlLnNoaXBJbmZvPy5pc1N1bmsoKSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVzdWx0VGlsZSA9IGN1cnJlbnRUaWxlO1xuICAgICAgICAgIGJyZWFrIG91dGVyTG9vcDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiByZXN1bHRUaWxlO1xuICB9XG5cbiAgLy8gaWYgbm8gdGlsZXMgbGVmdCwgcmV0dXJuIGVycm9yXG4gIGxldCBpc05vbkhpdFRpbGVMZWZ0ID0gZmFsc2U7XG5cbiAgb3V0ZXJMb29wOiBmb3IgKGxldCBpID0gMDsgaSA8IGh1bWFuQm9hcmQuYm9hcmRTaXplOyBpKyspIHtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGh1bWFuQm9hcmQuYm9hcmRTaXplOyBqKyspIHtcbiAgICAgIGlmICghaHVtYW5Cb2FyZC5mdWxsQm9hcmRbaV1bal0uaXNUaWxlSGl0KSB7XG4gICAgICAgIGlzTm9uSGl0VGlsZUxlZnQgPSB0cnVlO1xuICAgICAgICBicmVhayBvdXRlckxvb3A7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGlzTm9uSGl0VGlsZUxlZnQgPT09IGZhbHNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibm8gbm9uLWhpdCB0aWxlIGxlZnRcIik7XG4gIH1cbiAgLy9cblxuICAvLyByZXN0IG9mIHRoZSBsb2dpYyB3aWxsIGZvbGxvdyBsYXRlclxuICAvLyBwc2V1ZG8gY29kZSB0byBnZXQgQUkgbW92ZVxuICAvLyBnZXQgYSByYW5kb20gaGl0IHRpbGUgd2l0aCBhbiB1bnN1bmshISBzaGlwXG5cbiAgLy8gaWYgc2hpcC5oaXRDb3VudCA+IDFcbiAgLy8gZ2V0IFtYX3N0YXJ0LCBYX2VuZCwgWV9zdGFydCwgWV9lbmRdIG9mIHRoZSBzaGlwWzIsNiwwLDBdXG4gIC8vIGNoZWNrIHRoZSBheGlzIG9mIHRoZSBzaGlwXG4gIC8vIGZpbmQgaGl0IGNvb3JkaW5hdGVzIHg9MyB4PTRcbiAgLy8gdHJ5IGZyb20gYWJvdmUgc21hbGxlc3QtMSh4PTIpIG9yIGJpZ2dlc3QrMSh4PTUpIG5vbi1oaXQoY2hlY2sgaWYgb25ib2FyZClcblxuICAvLyBpZiBzaGlwLmhpdENvdW50ID0gMVxuICAvLyBjaGVjayB0aGUgNCBuZWlnaGJvcmluZyB0aWxlcyg/IGdldCBhcnJheSBkYXZvbikgZm9yOlxuICAvLyAvLyBpZiBpdCBpcyBub24taGl0KHNraXAgaWYgaGl0KVxuICAvLyAvLyAgdGhlbiBoaXQgb25lIG9mIHRoZXNlXG5cbiAgLy8gISFERUZBVUxUIEJFSEFWSU9VUiBIRVJFISFcbiAgaWYgKGdldEhpdFRpbGVXaXRoTm9uc3Vua1NoaXAoKSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBnZXRSYW5kb21Ob25IaXRUaWxlKGh1bWFuQm9hcmQpO1xuICB9XG4gIC8vXG5cbiAgbGV0IHNlbGVjdGVkSGl0VGlsZSA9IGdldEhpdFRpbGVXaXRoTm9uc3Vua1NoaXAoKTtcbiAgbGV0IGhpdFNoaXAgPSBzZWxlY3RlZEhpdFRpbGUuc2hpcEluZm87XG5cbiAgLy8gd2hlbiBzaGlwLmhpdENvdW50ID4gMVxuICBpZiAoaGl0U2hpcC5oaXRDb3VudCA+IDEpIHtcbiAgICBsZXQgW1hfc3RhcnQsIFhfZW5kLCBZX3N0YXJ0LCBZX2VuZF0gPVxuICAgICAgaHVtYW5Cb2FyZC5nZXRTaGlwc0hpdFRpbGVDb29yZGluYXRlcyhoaXRTaGlwKTtcblxuICAgIGxldCBpc19YX2F4aXMgPSBZX3N0YXJ0ID09PSBZX2VuZDtcblxuICAgIGlmIChpc19YX2F4aXMpIHtcbiAgICAgIGlmIChcbiAgICAgICAgaXNCZXR3ZWVuMHRvOShYX3N0YXJ0IC0gMSkgJiZcbiAgICAgICAgIWh1bWFuQm9hcmQuZnVsbEJvYXJkW1hfc3RhcnQgLSAxXVtZX3N0YXJ0XS5pc1RpbGVIaXRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gW1hfc3RhcnQgLSAxLCBZX3N0YXJ0XTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGlzQmV0d2VlbjB0bzkoWF9lbmQgKyAxKSAmJlxuICAgICAgICAhaHVtYW5Cb2FyZC5mdWxsQm9hcmRbWF9lbmQgKyAxXVtZX3N0YXJ0XS5pc1RpbGVIaXRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gW1hfZW5kICsgMSwgWV9zdGFydF07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghaXNfWF9heGlzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIGlzQmV0d2VlbjB0bzkoWV9zdGFydCAtIDEpICYmXG4gICAgICAgICFodW1hbkJvYXJkLmZ1bGxCb2FyZFtYX3N0YXJ0XVtZX3N0YXJ0IC0gMV0uaXNUaWxlSGl0XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIFtYX3N0YXJ0LCBZX3N0YXJ0IC0gMV07XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICBpc0JldHdlZW4wdG85KFlfZW5kICsgMSkgJiZcbiAgICAgICAgIWh1bWFuQm9hcmQuZnVsbEJvYXJkW1hfc3RhcnRdW1lfZW5kICsgMV0uaXNUaWxlSGl0XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIFtYX3N0YXJ0LCBZX2VuZCArIDFdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvL1xuICAvLyB3aGVuIHNoaXAuaGl0Q291bnQgPSAxXG4gIGVsc2UgaWYgKGhpdFNoaXAuaGl0Q291bnQgPT09IDEpIHtcbiAgICBsZXQgc2VsZWN0ZWRfWCA9IHNlbGVjdGVkSGl0VGlsZS5YX2Nvb3I7XG4gICAgbGV0IHNlbGVjdGVkX1kgPSBzZWxlY3RlZEhpdFRpbGUuWV9jb29yO1xuXG4gICAgbGV0IG1vdmVzVG9DaGVjayA9IFtcbiAgICAgIFtzZWxlY3RlZF9YIC0gMSwgc2VsZWN0ZWRfWV0sXG4gICAgICBbc2VsZWN0ZWRfWCArIDEsIHNlbGVjdGVkX1ldLFxuICAgICAgW3NlbGVjdGVkX1gsIHNlbGVjdGVkX1kgLSAxXSxcbiAgICAgIFtzZWxlY3RlZF9YLCBzZWxlY3RlZF9ZICsgMV0sXG4gICAgXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbW92ZXNUb0NoZWNrLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsZXQgY3VycmVudE1vdmVfWF9jb29yID0gbW92ZXNUb0NoZWNrW2ldWzBdO1xuICAgICAgbGV0IGN1cnJlbnRNb3ZlX1lfY29vciA9IG1vdmVzVG9DaGVja1tpXVsxXTtcblxuICAgICAgaWYgKFxuICAgICAgICBpc0JldHdlZW4wdG85KGN1cnJlbnRNb3ZlX1hfY29vcikgJiZcbiAgICAgICAgaXNCZXR3ZWVuMHRvOShjdXJyZW50TW92ZV9ZX2Nvb3IpICYmXG4gICAgICAgICFodW1hbkJvYXJkLmZ1bGxCb2FyZFtjdXJyZW50TW92ZV9YX2Nvb3JdW2N1cnJlbnRNb3ZlX1lfY29vcl0uaXNUaWxlSGl0XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIFtjdXJyZW50TW92ZV9YX2Nvb3IsIGN1cnJlbnRNb3ZlX1lfY29vcl07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vXG59XG5cbmZ1bmN0aW9uIGdldFJhbmRvbU5vbkhpdFRpbGUoaHVtYW5Cb2FyZCkge1xuICAvL3RoaXMgZnVuYyBzaG91bGQgcmV0dXJuIFt4LHldLCBzaW1pbGFyIHRvIGFib3ZlXG4gIGxldCB4LCB5O1xuXG4gIGRvIHtcbiAgICB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApO1xuICAgIHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gIH0gd2hpbGUgKGh1bWFuQm9hcmQuZnVsbEJvYXJkW3hdW3ldLmlzVGlsZUhpdCk7XG5cbiAgcmV0dXJuIFt4LCB5XTtcbn1cbiIsImV4cG9ydCB7IERPTV9HZW5lcmF0b3IgfTtcbmltcG9ydCB7IGdlbmVyYXRlTWFpbkdhbWUgfSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHsgbG9hZFNoaXBJbWFnZXMgfSBmcm9tIFwiLi9sb2FkX3NoaXBfaW1hZ2VzLmpzXCI7XG5cbi8vXG4vLyAqKioqXG5pbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4uL2phdmFzY3JpcHQvaW5kZXguanNcIjtcbi8vIFRPIERPOiBhYm92ZSBsaW5lIGNhdXNlcyBhbiBlcnJvciBvbiBKZXN0LCBidXQgbm90IG9uIHRoZSBhcHBcblxuY2xhc3MgRE9NX0dlbmVyYXRvciB7XG4gIGNvbnN0cnVjdG9yKCkge31cbiAgLy9cblxuICBpbml0aWFsaXNlR2FtZV9ET00oKSB7XG4gICAgY29uc3QgaHVtYW5QbGF5ZXJCb2FyZF9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuaHVtYW5fZ2FtZWJvYXJkX2NvbnRhaW5lclwiXG4gICAgKTtcbiAgICBjb25zdCBjb21wdXRlclBsYXllckJvYXJkX0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jb21wdXRlcl9nYW1lYm9hcmRfY29udGFpbmVyXCJcbiAgICApO1xuXG4gICAgdGhpcy5jcmVhdGVHYW1lYm9hcmRHcmlkcyhodW1hblBsYXllckJvYXJkX0NvbnRhaW5lciwgXCJodW1hblwiKTtcbiAgICB0aGlzLmNyZWF0ZUdhbWVib2FyZEdyaWRzKGNvbXB1dGVyUGxheWVyQm9hcmRfQ29udGFpbmVyLCBcImNvbXB1dGVyXCIpO1xuXG4gICAgY29uc3QgbmV3R2FtZV9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5ld19nYW1lX2J1dHRvblwiKTtcbiAgICBjb25zdCBzdGFydEdhbWVfQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydF9nYW1lX2J1dHRvblwiKTtcbiAgICBjb25zdCByZXNldEJvYXJkX0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRfYm9hcmRfYnV0dG9uXCIpO1xuXG4gICAgbmV3R2FtZV9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgIHRoaXMubmV3R2FtZUJ1dHRvbkV2ZW50KCk7XG4gICAgfSk7XG4gICAgc3RhcnRHYW1lX0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5zdGFydEdhbWVCdXR0b25FdmVudCgpO1xuICAgIH0pO1xuICAgIHJlc2V0Qm9hcmRfQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLnJlc2V0Qm9hcmRCdXR0b25FdmVudCgpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgaHVtYW5WaWN0b3J5SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpY3RvcnlfcGhvdG9faHVtYW5cIik7XG4gICAgY29uc3QgY29tcHV0ZXJWaWN0b3J5SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIudmljdG9yeV9waG90b19jb21wdXRlclwiXG4gICAgKTtcbiAgICBodW1hblZpY3RvcnlJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5uZXdHYW1lQnV0dG9uRXZlbnQoKTtcbiAgICB9KTtcbiAgICBjb21wdXRlclZpY3RvcnlJbWFnZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5uZXdHYW1lQnV0dG9uRXZlbnQoKTtcbiAgICB9KTtcblxuICAgIC8vIHRoaXMuYWRkQXVkaW9Db25maWcoKTtcbiAgICB0aGlzLmFkZFZpZGVvQmFja2dyb3VuZExvb3BEZWxheSgpO1xuICB9XG5cbiAgY3JlYXRlR2FtZWJvYXJkR3JpZHModGFyZ2V0Q29udGFpbmVyLCBodW1hbk9yQ29tcHV0ZXIpIHtcbiAgICBjb25zdCBkaW1lbnNpb24gPSAxMDtcbiAgICBjb25zdCBjaGlsZHJlbk9mQ29udGFpbmVyID0gdGFyZ2V0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCJib3hcIik7XG4gICAgY2hpbGRyZW5PZkNvbnRhaW5lci5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgLy8gZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJzdHlsZVwiLCBgYm9yZGVyOiAycHggc29saWQgYmx1ZTtgKTtcbiAgICB9KTtcblxuICAgIGZvciAobGV0IGkgPSBkaW1lbnNpb24gLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBkaW1lbnNpb247IGorKykge1xuICAgICAgICBjb25zdCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBuZXdEaXYuY2xhc3NMaXN0LmFkZChcInRpbGVcIik7XG4gICAgICAgIC8vIG5ld0Rpdi5jbGFzc0xpc3QuYWRkKGBib3gke2l9YCk7XG4gICAgICAgIG5ld0Rpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLXhfY29vclwiLCBgJHtqfWApO1xuICAgICAgICBuZXdEaXYuc2V0QXR0cmlidXRlKFwiZGF0YS15X2Nvb3JcIiwgYCR7aX1gKTtcbiAgICAgICAgLy8gbmV3RGl2LnRleHRDb250ZW50ID0gYCR7aiArIGkgKiAxMH1gO1xuXG4gICAgICAgIHRhcmdldENvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdEaXYpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRpbGVzID0gdGFyZ2V0Q29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGlsZVwiKTtcbiAgICB0aWxlcy5mb3JFYWNoKCh0aWxlKSA9PiB7XG4gICAgICB0aWxlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgdGhpcy5jbGlja09uR2FtZWJvYXJkVGlsZShldmVudCwgaHVtYW5PckNvbXB1dGVyKTtcbiAgICAgIH0pO1xuICAgICAgLy8gdGlsZS5hZGRFdmVudExpc3RlbmVyKFwiaG92ZXJcIiwgKCkgPT4ge1xuICAgICAgLy8gICB0aGlzLmhvdmVyT25HYW1lYm9hcmRUaWxlKCk7XG4gICAgICAvLyB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGhvdmVyT25HYW1lYm9hcmRUaWxlKHgpIHtcbiAgLy8gICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgLy8gfVxuXG4gIGNsaWNrT25HYW1lYm9hcmRUaWxlKGV2ZW50LCBodW1hbk9yQ29tcHV0ZXIpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpO1xuICAgIGxldCB0aWxlX3hDb29yID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueF9jb29yO1xuICAgIGxldCB0aWxlX3lDb29yID0gZXZlbnQudGFyZ2V0LmRhdGFzZXQueV9jb29yO1xuICAgIC8vIGNvbnNvbGUubG9nKHRpbGVfeENvb3IsIHRpbGVfeUNvb3IpO1xuXG4gICAgaWYgKGh1bWFuT3JDb21wdXRlciA9PT0gXCJjb21wdXRlclwiKSB7XG4gICAgICBnYW1lLnBsYXlSb3VuZCh0aWxlX3hDb29yLCB0aWxlX3lDb29yLCBnYW1lLmh1bWFuUGxheWVyKTtcbiAgICB9IGVsc2UgaWYgKGh1bWFuT3JDb21wdXRlciA9PT0gXCJodW1hblwiKSB7XG4gICAgICBnYW1lLnBsYXlSb3VuZCh0aWxlX3hDb29yLCB0aWxlX3lDb29yLCBnYW1lLmNvbXB1dGVyUGxheWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIk5laXRoZXIgaHVtYW4gbm9yIGNvbXB1dGVyIGlzIHNlbGVjdGVkIGZvciB0aGUgZ2FtZWJvYXJkIHRpbGUgZnVuY3Rpb25zXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy51cGRhdGVHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIHJlbW92ZUFjdGl2ZVBsYXllclRhZ1RvQUkoKSB7XG4gICAgY29uc3QgY29tcHV0ZXJCb2FyZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi5jb21wdXRlcl9nYW1lYm9hcmRfY29udGFpbmVyXCJcbiAgICApO1xuICAgIGNvbXB1dGVyQm9hcmREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZV9wbGF5ZXJzX2VuZW15XCIpO1xuICB9XG5cbiAgYWRkQWN0aXZlUGxheWVyVGFndG9BSSgpIHtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXJcIlxuICAgICk7XG4gICAgY29tcHV0ZXJCb2FyZERpdi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlX3BsYXllcnNfZW5lbXlcIik7XG4gIH1cblxuICB1cGRhdGVHYW1lYm9hcmQoKSB7XG4gICAgLy9cbiAgICBjb25zdCBodW1hbkJvYXJkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1hbl9nYW1lYm9hcmRfY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuY29tcHV0ZXJfZ2FtZWJvYXJkX2NvbnRhaW5lclwiXG4gICAgKTtcblxuICAgIGxldCBpc0h1bWFuVHVybiA9IGdhbWUuYWN0aXZlUGxheWVyID09PSBnYW1lLmh1bWFuUGxheWVyO1xuXG4gICAgaWYgKGlzSHVtYW5UdXJuKSB7XG4gICAgICB0aGlzLmFkZEFjdGl2ZVBsYXllclRhZ3RvQUkoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW1vdmVBY3RpdmVQbGF5ZXJUYWdUb0FJKCk7XG4gICAgfVxuXG4gICAgLy9cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9yID0gYC50aWxlW2RhdGEteF9jb29yPVwiJHtpfVwiXVtkYXRhLXlfY29vcj1cIiR7an1cIl1gO1xuXG4gICAgICAgIGxldCBjdXJyZW50SHVtYW5UaWxlX0RPTSA9IGh1bWFuQm9hcmREaXYucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgIGxldCBjdXJyZW50Q29tcHV0ZXJUaWxlX0RPTSA9IGNvbXB1dGVyQm9hcmREaXYucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XG5cbiAgICAgICAgbGV0IGN1cnJlbnRIdW1hblRpbGUgPSBnYW1lLmh1bWFuUGxheWVyLnBsYXllcmJvYXJkLmZ1bGxCb2FyZFtpXVtqXTtcbiAgICAgICAgbGV0IGN1cnJlbnRDb21wdXRlclRpbGUgPVxuICAgICAgICAgIGdhbWUuY29tcHV0ZXJQbGF5ZXIucGxheWVyYm9hcmQuZnVsbEJvYXJkW2ldW2pdO1xuXG4gICAgICAgIC8vIGZvciB0ZXN0aW5nLCBtYWtlIHNoaXAgdGlsZXMgdmlzaWJsZS5cbiAgICAgICAgaWYgKGN1cnJlbnRIdW1hblRpbGUuaGFzVGlsZVNoaXAoKSkge1xuICAgICAgICAgIGN1cnJlbnRIdW1hblRpbGVfRE9NLmNsYXNzTGlzdC5hZGQoXCJoYXNfc2hpcFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VycmVudENvbXB1dGVyVGlsZS5oYXNUaWxlU2hpcCgpKSB7XG4gICAgICAgICAgY3VycmVudENvbXB1dGVyVGlsZV9ET00uY2xhc3NMaXN0LmFkZChcImhhc19zaGlwXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vXG5cbiAgICAgICAgLy8gYWRkaW5nIHNoaXAgaW1hZ2VzIHRvIHNoaXBzXG4gICAgICAgIC8vIFRPIERPOiBtYWtlIHRoZSBjb21wdXRlciBvbmUgbm90IHZpc2libGVcbiAgICAgICAgaWYgKGN1cnJlbnRIdW1hblRpbGUuaGFzVGlsZVNoaXAoKSkge1xuICAgICAgICAgIGxldCBzaGlwVHlwZSA9IGN1cnJlbnRIdW1hblRpbGUuc2hpcEluZm8uc2hpcFR5cGU7XG4gICAgICAgICAgY3VycmVudEh1bWFuVGlsZV9ET00uc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwX3R5cGVcIiwgYCR7c2hpcFR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRDb21wdXRlclRpbGUuaGFzVGlsZVNoaXAoKSkge1xuICAgICAgICAgIGxldCBzaGlwVHlwZSA9IGN1cnJlbnRDb21wdXRlclRpbGUuc2hpcEluZm8uc2hpcFR5cGU7XG4gICAgICAgICAgY3VycmVudENvbXB1dGVyVGlsZV9ET00uc2V0QXR0cmlidXRlKFwiZGF0YS1zaGlwX3R5cGVcIiwgYCR7c2hpcFR5cGV9YCk7XG4gICAgICAgICAgLy9cbiAgICAgICAgICBpZiAoY3VycmVudENvbXB1dGVyVGlsZS5zaGlwSW5mby5pc1N1bmsoKSkge1xuICAgICAgICAgICAgY3VycmVudENvbXB1dGVyVGlsZV9ET00uY2xhc3NMaXN0LmFkZChcInN1bmtfc2hpcFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvL1xuXG4gICAgICAgIC8vIG1ha2luZyBoaXQgdGlsZXMgdmlzaWJsZVxuICAgICAgICBpZiAoY3VycmVudEh1bWFuVGlsZS5pc1RpbGVIaXQpIHtcbiAgICAgICAgICBjdXJyZW50SHVtYW5UaWxlX0RPTS5jbGFzc0xpc3QuYWRkKFwiaGl0XCIpO1xuXG4gICAgICAgICAgaWYgKGN1cnJlbnRIdW1hblRpbGUuaGFzVGlsZVNoaXAoKSkge1xuICAgICAgICAgICAgY3VycmVudEh1bWFuVGlsZV9ET00uY2xhc3NMaXN0LmFkZChcImhpdF9zdWNjZXNzZnVsXCIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50SHVtYW5UaWxlX0RPTS5jbGFzc0xpc3QuYWRkKFwiaGl0X21pc3NlZFwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1cnJlbnRDb21wdXRlclRpbGUuaXNUaWxlSGl0KSB7XG4gICAgICAgICAgY3VycmVudENvbXB1dGVyVGlsZV9ET00uY2xhc3NMaXN0LmFkZChcImhpdFwiKTtcblxuICAgICAgICAgIGlmIChjdXJyZW50Q29tcHV0ZXJUaWxlLmhhc1RpbGVTaGlwKCkpIHtcbiAgICAgICAgICAgIGN1cnJlbnRDb21wdXRlclRpbGVfRE9NLmNsYXNzTGlzdC5hZGQoXCJoaXRfc3VjY2Vzc2Z1bFwiKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudENvbXB1dGVyVGlsZV9ET00uY2xhc3NMaXN0LmFkZChcImhpdF9taXNzZWRcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2FtZS5jb21wdXRlclBsYXllci5wbGF5ZXJib2FyZC5mdWxsQm9hcmQ7XG5cbiAgICBnYW1lLmNvbXB1dGVyUGxheWVyLnBsYXllcmJvYXJkLmZ1bGxCb2FyZFsyXVsxXS5pc1RpbGVIaXQ7XG5cbiAgICBsb2FkU2hpcEltYWdlcyhnYW1lLmh1bWFuUGxheWVyLnBsYXllcmJvYXJkLCBodW1hbkJvYXJkRGl2KTtcbiAgICBsb2FkU2hpcEltYWdlcyhnYW1lLmNvbXB1dGVyUGxheWVyLnBsYXllcmJvYXJkLCBjb21wdXRlckJvYXJkRGl2KTtcbiAgfVxuXG4gIGVuZEdhbWVfRE9NKGlzV2lubmVySHVtYW5PckNvbXB1dGVyKSB7XG4gICAgLy8gaXNXaW5uZXJIdW1hbk9yQ29tcHV0ZXIgd2lsbCBiZSBcImh1bWFuXCIgb3IgXCJjb21wdXRlclwiXG4gICAgY29uc3QgaHVtYW5Cb2FyZERpdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuaHVtYW5fZ2FtZWJvYXJkX2NvbnRhaW5lclwiKTtcbiAgICBjb25zdCBjb21wdXRlckJvYXJkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXJcIlxuICAgICk7XG5cbiAgICBpZiAoaXNXaW5uZXJIdW1hbk9yQ29tcHV0ZXIgPT09IFwiaHVtYW5cIikge1xuICAgICAgaHVtYW5Cb2FyZERpdi5jbGFzc0xpc3QuYWRkKFwiaGFzX3dvblwiKTtcbiAgICAgIGNvbXB1dGVyQm9hcmREaXYuY2xhc3NMaXN0LmFkZChcImhhc19sb3N0XCIpO1xuICAgIH0gZWxzZSBpZiAoaXNXaW5uZXJIdW1hbk9yQ29tcHV0ZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgaHVtYW5Cb2FyZERpdi5jbGFzc0xpc3QuYWRkKFwiaGFzX2xvc3RcIik7XG4gICAgICBjb21wdXRlckJvYXJkRGl2LmNsYXNzTGlzdC5hZGQoXCJoYXNfd29uXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IHZpY3RvcnlTY3JlZW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpY3Rvcnlfc2NyZWVuX2NvbnRhaW5lclwiKTtcbiAgICBjb25zdCBodW1hblZpY3RvcnlJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmljdG9yeV9waG90b19odW1hblwiKTtcbiAgICBjb25zdCBjb21wdXRlclZpY3RvcnlJbWFnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIi52aWN0b3J5X3Bob3RvX2NvbXB1dGVyXCJcbiAgICApO1xuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG5cbiAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgdmljdG9yeVNjcmVlbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIGlmIChpc1dpbm5lckh1bWFuT3JDb21wdXRlciA9PT0gXCJodW1hblwiKSB7XG4gICAgICBodW1hblZpY3RvcnlJbWFnZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgIH0gZWxzZSBpZiAoaXNXaW5uZXJIdW1hbk9yQ29tcHV0ZXIgPT09IFwiY29tcHV0ZXJcIikge1xuICAgICAgY29tcHV0ZXJWaWN0b3J5SW1hZ2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgaXNXaW5uZXJIdW1hbk9yQ29tcHV0ZXIgaXMgbmVpdGhlciBcImh1bWFuXCIgbm9yIFwiY29tcHV0ZXJcImBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy9cbiAgfVxuXG4gIG5ld0dhbWVBZnRlclZpY3RvcnkoKSB7XG4gICAgY29uc3Qgb3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIub3ZlcmxheVwiKTtcbiAgICBjb25zdCB2aWN0b3J5U2NyZWVuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWN0b3J5X3NjcmVlbl9jb250YWluZXJcIik7XG4gICAgY29uc3QgaHVtYW5WaWN0b3J5SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnZpY3RvcnlfcGhvdG9faHVtYW5cIik7XG4gICAgY29uc3QgY29tcHV0ZXJWaWN0b3J5SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIudmljdG9yeV9waG90b19jb21wdXRlclwiXG4gICAgKTtcblxuICAgIHZpY3RvcnlTY3JlZW4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBodW1hblZpY3RvcnlJbWFnZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGNvbXB1dGVyVmljdG9yeUltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuXG4gICAgdGhpcy5uZXdHYW1lQnV0dG9uRXZlbnQoKTtcbiAgfVxuXG4gIGNsZWFyR2FtZWJvYXJkc0RPTSgpIHtcbiAgICBjb25zdCBodW1hbkJvYXJkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1hbl9nYW1lYm9hcmRfY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuY29tcHV0ZXJfZ2FtZWJvYXJkX2NvbnRhaW5lclwiXG4gICAgKTtcblxuICAgIHdoaWxlIChodW1hbkJvYXJkRGl2LmZpcnN0Q2hpbGQpIHtcbiAgICAgIGh1bWFuQm9hcmREaXYucmVtb3ZlQ2hpbGQoaHVtYW5Cb2FyZERpdi5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgd2hpbGUgKGNvbXB1dGVyQm9hcmREaXYuZmlyc3RDaGlsZCkge1xuICAgICAgY29tcHV0ZXJCb2FyZERpdi5yZW1vdmVDaGlsZChjb21wdXRlckJvYXJkRGl2LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgfVxuXG4gIG5ld0dhbWVCdXR0b25FdmVudCgpIHtcbiAgICBjb25zdCBzdGFydEdhbWVfQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGFydF9nYW1lX2J1dHRvblwiKTtcbiAgICBjb25zdCByZXNldEJvYXJkX0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzZXRfYm9hcmRfYnV0dG9uXCIpO1xuICAgIHN0YXJ0R2FtZV9CdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcImluYWN0aXZlXCIpO1xuICAgIHJlc2V0Qm9hcmRfQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJpbmFjdGl2ZVwiKTtcblxuICAgIGNvbnN0IG92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm92ZXJsYXlcIik7XG4gICAgY29uc3QgdmljdG9yeVNjcmVlbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIudmljdG9yeV9zY3JlZW5fY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGh1bWFuVmljdG9yeUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi52aWN0b3J5X3Bob3RvX2h1bWFuXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyVmljdG9yeUltYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLnZpY3RvcnlfcGhvdG9fY29tcHV0ZXJcIlxuICAgICk7XG4gICAgdmljdG9yeVNjcmVlbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xuICAgIGh1bWFuVmljdG9yeUltYWdlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgY29tcHV0ZXJWaWN0b3J5SW1hZ2UuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG5cbiAgICBjb25zdCBodW1hbkJvYXJkRGl2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1hbl9nYW1lYm9hcmRfY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyQm9hcmREaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgXCIuY29tcHV0ZXJfZ2FtZWJvYXJkX2NvbnRhaW5lclwiXG4gICAgKTtcbiAgICBodW1hbkJvYXJkRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJoYXNfbG9zdFwiKTtcbiAgICBodW1hbkJvYXJkRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJoYXNfd29uXCIpO1xuICAgIGNvbXB1dGVyQm9hcmREaXYuY2xhc3NMaXN0LnJlbW92ZShcImhhc19sb3N0XCIpO1xuICAgIGNvbXB1dGVyQm9hcmREaXYuY2xhc3NMaXN0LnJlbW92ZShcImhhc193b25cIik7XG5cbiAgICB0aGlzLmNsZWFyR2FtZWJvYXJkc0RPTSgpO1xuICAgIC8vIGdhbWUuaW5pdGlhbGlzZUdhbWUoKTtcblxuICAgIGdlbmVyYXRlTWFpbkdhbWUoKTtcbiAgfVxuXG4gIHN0YXJ0R2FtZUJ1dHRvbkV2ZW50KCkge1xuICAgIGNvbnN0IHN0YXJ0R2FtZV9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXJ0X2dhbWVfYnV0dG9uXCIpO1xuICAgIGNvbnN0IHJlc2V0Qm9hcmRfQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yZXNldF9ib2FyZF9idXR0b25cIik7XG4gICAgc3RhcnRHYW1lX0J1dHRvbi5jbGFzc0xpc3QuYWRkKFwiaW5hY3RpdmVcIik7XG4gICAgcmVzZXRCb2FyZF9CdXR0b24uY2xhc3NMaXN0LmFkZChcImluYWN0aXZlXCIpO1xuXG4gICAgY29uc3Qga2lyb3ZSZXBvcnRpbmdBdWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcImF1ZGlvLmtpcm92X3JlcG9ydGluZ19hdWRpb1wiXG4gICAgKTtcbiAgICBraXJvdlJlcG9ydGluZ0F1ZGlvLnBsYXkoKTtcblxuICAgIHRoaXMudXBkYXRlR2FtZWJvYXJkKCk7IC8vIGFkZHMgYmFjayB0aGUgYWN0aXZlIHBsYXllciB0YWdcbiAgICAvLyBUTyBETzogcmVtb3ZlIG9yIGdyZXkgb3V0IFwiU3RhcnQgR2FtZVwiIGFuZCBcIlJlc2V0IEJvYXJkXCIgYnV0dG9uc1xuICB9XG5cbiAgcmVzZXRCb2FyZEJ1dHRvbkV2ZW50KCkge1xuICAgIHRoaXMuY2xlYXJHYW1lYm9hcmRzRE9NKCk7XG4gICAgZ2FtZS5yZXNldEN1cnJlbnRHYW1lYm9hcmRzKCk7XG4gIH1cblxuICBhZGRWaWRlb0JhY2tncm91bmRMb29wRGVsYXkoKSB7XG4gICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tncm91bmRfdmlkZW9cIik7XG4gICAgLy8gdmlkZW8ucGxheSgpO1xuXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIG15SGFuZGxlciwgZmFsc2UpO1xuXG4gICAgZnVuY3Rpb24gbXlIYW5kbGVyKGUpIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKFwiZW5kZWRcIik7XG4gICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XG4gICAgICB2aWRlby5wYXVzZSgpO1xuXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmlkZW8ucGxheSgpO1xuICAgICAgfSwgMTAwMDApO1xuICAgIH1cbiAgfVxuXG4gIHBsYXlBdWRpbyhhdWRpbywgbWF4VGltZU91dCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzKSA9PiB7XG4gICAgICBhdWRpby5wbGF5KCk7XG5cbiAgICAgIC8vIFNldCBhIHRpbWVvdXQgdG8gc3RvcCB0aGUgYXVkaW8gYWZ0ZXIgbWF4VGltZU91dCBzZWNvbmRzXG4gICAgICBpZiAobWF4VGltZU91dCkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBhdWRpby5wYXVzZSgpO1xuICAgICAgICAgIGF1ZGlvLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSwgbWF4VGltZU91dCAqIDEwMDApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcGxheUF0dGFja0F1ZGlvKHBsYXllcikge1xuICAgIGNvbnN0IHByaXNtQXVkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYXVkaW8ucHJpc21fYXVkaW9cIik7XG4gICAgY29uc3QgdGVzbGFBdWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhdWRpby50ZXNsYV9hdWRpb1wiKTtcblxuICAgIGlmIChwbGF5ZXIgPT09IGdhbWUuaHVtYW5QbGF5ZXIpIHtcbiAgICAgIHByaXNtQXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgYXdhaXQgdGhpcy5wbGF5QXVkaW8ocHJpc21BdWRpbywgMik7XG4gICAgfSBlbHNlIGlmIChwbGF5ZXIgPT09IGdhbWUuY29tcHV0ZXJQbGF5ZXIpIHtcbiAgICAgIHRlc2xhQXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgYXdhaXQgdGhpcy5wbGF5QXVkaW8odGVzbGFBdWRpbywgMik7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcGxheUF0dGFja0hpdEF1ZGlvKGlzSGl0KSB7XG4gICAgY29uc3QgYXR0YWNrU3VjY2Vzc2Z1bEF1ZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgIFwiLmF0dGFja19zdWNjZXNzZnVsX2F1ZGlvXCJcbiAgICApO1xuICAgIGNvbnN0IGF0dGFja01pc3NlZEF1ZGlvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hdHRhY2tfbWlzc2VkX2F1ZGlvXCIpO1xuXG4gICAgaWYgKGlzSGl0KSB7XG4gICAgICBhdHRhY2tTdWNjZXNzZnVsQXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgYXdhaXQgdGhpcy5wbGF5QXVkaW8oYXR0YWNrU3VjY2Vzc2Z1bEF1ZGlvLCAzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0YWNrTWlzc2VkQXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgYXdhaXQgdGhpcy5wbGF5QXVkaW8oYXR0YWNrTWlzc2VkQXVkaW8sIDMpO1xuICAgIH1cbiAgfVxuXG4gIGRpc2FibGVCb2R5KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICBib2R5LmNsYXNzTGlzdC5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICBjb25zb2xlLmxvZyhcImJvZHkgZGlzYWJsZWRcIik7XG4gIH1cblxuICBlbmFibGVCb2R5KCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYm9keVwiKTtcbiAgICBib2R5LmNsYXNzTGlzdC5yZW1vdmUoXCJkaXNhYmxlZFwiKTtcbiAgICBjb25zb2xlLmxvZyhcImJvZHkgZW5hYmxlZFwiKTtcbiAgfVxuXG4gIC8vXG59XG4iLCJleHBvcnQgeyBHYW1lYm9hcmRUaWxlLCBHYW1lYm9hcmQgfTtcblxuY2xhc3MgR2FtZWJvYXJkVGlsZSB7XG4gIGNvbnN0cnVjdG9yKFhfY29vciwgWV9jb29yKSB7XG4gICAgdGhpcy5YX2Nvb3IgPSBYX2Nvb3I7XG4gICAgdGhpcy5ZX2Nvb3IgPSBZX2Nvb3I7XG4gICAgdGhpcy5zaGlwSW5mbyA9IG51bGw7XG4gICAgdGhpcy5pc1RpbGVIaXQgPSBmYWxzZTtcbiAgfVxuXG4gIGFzc2lnblNoaXAoc2hpcCkge1xuICAgIHRoaXMuc2hpcEluZm8gPSBzaGlwO1xuICB9XG5cbiAgaGFzVGlsZVNoaXAoKSB7XG4gICAgaWYgKHRoaXMuc2hpcEluZm8gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG59XG5cbmNsYXNzIEdhbWVib2FyZCB7XG4gIC8qXG4gIFBzZXVkbyBjb2RlXG4gIEdhbWVib2FyZCBjbGFzcy9mYWN0b3J5XG4gIFxuICBHYW1lYm9hcmRzIHNob3VsZCBiZSBhYmxlIHRvIHBsYWNlIHNoaXBzIGF0IHNwZWNpZmljIGNvb3JkaW5hdGVzIGJ5IGNhbGxpbmcgdGhlIHNoaXAgZmFjdG9yeSBmdW5jdGlvbi5cbiAgXG4gIGNyZWF0ZSBnYW1lQm9hcmQgbGluZXMsIGNvb3IgW3gsIHldXG4gIGxpbmUxID0gW1swLDBdLCBbMCwxXSwgWzAsMl0sIFswLDNdXVxuICBsaW5lMiA9IFtbMSwwXSwgWzEsMV0sIFsxLDJdLCBbMSwzXV1cbiAgbGluZTMgPSBbWzIsMF0sIFsyLDFdLCBbMiwyXSwgWzIsM11dXG4gIGxpbmU0ID0gW1szLDBdLCBbMywxXSwgWzMsMl0sIFszLDNdXVxuICBcbiAgc28gdGhlIGZ1bGxCb2FyZCA9IFtbWzAsMF0sIFswLDFdLCBbMCwyXSwgWzAsM11dLCBbWzEsMF0sIFsxLDFdLCBbMSwyXSwgWzEsM11dLCBbWzIsMF0sIFsyLDFdLCBbMiwyXSwgWzIsM11dLFtbMywwXSwgWzMsMV0sIFszLDJdLCBbMywzXV1dXG4gIFxuICBsaW5lMSA9IFtHYW1lYm9hcmRUaWxlLHtpc0hpdDogZmFsc2UsIGhhc1NoaXA6IGZhbHNlfSwgWzAsMl0sIFswLDNdXVxuICBsaW5lMiA9IFtbMSwwXSwgWzEsMV0sIFsxLDJdLCBbMSwzXV1cbiAgbGluZTMgPSBbWzIsMF0sIFsyLDFdLCBbMiwyXSwgWzIsM11dXG4gIGxpbmU0ID0gW1szLDBdLCBbMywxXSwgWzMsMl0sIFszLDNdXVxuICBcbiAgZmxlZXQgPSB7XG4gICAgICB7XG4gICAgICAgICAgc2hpcEluZm8gPSB0ZXN0U2hpcDFcbiAgICAgIH1cbiAgfVxuICBcbiAgKi9cblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJvYXJkU2l6ZSA9IDEwO1xuICAgIHRoaXMuZnVsbEJvYXJkID0gdGhpcy5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICB0aGlzLmZsZWV0ID0gW107XG4gIH1cblxuICBpbml0aWFsaXNlQm9hcmQoKSB7XG4gICAgbGV0IGJvYXJkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmJvYXJkU2l6ZTsgaSsrKSB7XG4gICAgICBsZXQgcm93ID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMuYm9hcmRTaXplOyBqKyspIHtcbiAgICAgICAgbGV0IHRpbGUgPSBuZXcgR2FtZWJvYXJkVGlsZShpLCBqKTtcbiAgICAgICAgcm93LnB1c2godGlsZSk7XG4gICAgICB9XG4gICAgICBib2FyZC5wdXNoKHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvYXJkO1xuICB9XG5cbiAgcGxhY2VTaGlwKHNoaXAsIFhfc3RhcnQsIFhfZW5kLCBZX3N0YXJ0LCBZX2VuZCkge1xuICAgIGlmIChcbiAgICAgIFhfc3RhcnQgPj0gdGhpcy5ib2FyZFNpemUgfHxcbiAgICAgIFhfZW5kID49IHRoaXMuYm9hcmRTaXplIHx8XG4gICAgICBZX3N0YXJ0ID49IHRoaXMuYm9hcmRTaXplIHx8XG4gICAgICBZX2VuZCA+PSB0aGlzLmJvYXJkU2l6ZVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY2FuJ3QgYWRkIG91dCBvZiB0aGUgYm9hcmRcIik7XG4gICAgfVxuXG4gICAgLy8gVE8gRE86IGNoZWNrIGFsbCB0aWxlcyBhcmUgYXZhaWxhYmxlIFwiYmVmb3JlXCIgcHJvY2VlZGluZ1xuICAgIGZvciAobGV0IGkgPSBYX3N0YXJ0OyBpIDw9IFhfZW5kOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSBZX3N0YXJ0OyBqIDw9IFlfZW5kOyBqKyspIHtcbiAgICAgICAgaWYgKHRoaXMuZnVsbEJvYXJkW2ldW2pdLnNoaXBJbmZvICE9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIC8vXG5cbiAgICAvLyBUTyBETzogY2hlY2sgaWYgdGhlIHNhbWUgc2hpcCBoYXMgYWxyZWFkeSBiZWVuIGFkZGVkXG5cbiAgICB0aGlzLmZsZWV0LnB1c2goc2hpcCk7XG5cbiAgICBmb3IgKGxldCBpID0gWF9zdGFydDsgaSA8PSBYX2VuZDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gWV9zdGFydDsgaiA8PSBZX2VuZDsgaisrKSB7XG4gICAgICAgIHRoaXMuZnVsbEJvYXJkW2ldW2pdLmFzc2lnblNoaXAoc2hpcCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhYX2Nvb3IsIFlfY29vcikge1xuICAgIC8qIHRha2VzIGEgcGFpciBvZiBjb29yZGluYXRlcywgZGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgYXR0YWNrIGhpdCBhIHNoaXAgXG4gICAgICBhbmQgdGhlbiBzZW5kcyB0aGUg4oCYaGl04oCZIGZ1bmN0aW9uIHRvIHRoZSBjb3JyZWN0IHNoaXAsIG9yIHJlY29yZHMgdGhlIGNvb3JkaW5hdGVzIG9mIHRoZSBtaXNzZWQgc2hvdC4qL1xuXG4gICAgaWYgKFhfY29vciA+PSB0aGlzLmJvYXJkU2l6ZSB8fCBZX2Nvb3IgPj0gdGhpcy5ib2FyZFNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImNhbid0IGF0dGFjayBvdXQgb2YgdGhlIGJvYXJkXCIpO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXRUaWxlID0gdGhpcy5mdWxsQm9hcmRbWF9jb29yXVtZX2Nvb3JdO1xuICAgIGNvbnN0IHRhcmdldFNoaXAgPSB0YXJnZXRUaWxlLnNoaXBJbmZvOyAvLyBudWxsIGlmIGVtcHR5XG5cbiAgICBpZiAodGFyZ2V0VGlsZS5pc1RpbGVIaXQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHRpbGUoWDoke3RhcmdldFRpbGUuWF9jb29yfSxZOiR7dGFyZ2V0VGlsZS5ZX2Nvb3J9KSBoYXMgYmVlbiBhdHRhY2tlZCBhbHJlYWR5YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0YXJnZXRUaWxlLmlzVGlsZUhpdCA9IHRydWU7XG4gICAgaWYgKHRhcmdldFNoaXAgIT09IG51bGwpIHtcbiAgICAgIHRhcmdldFNoaXAuaGl0KCk7IC8vIGNoZWNraW5nIGlmIGl0IGhpdCBhIHNoaXBcblxuICAgICAgLy8gVE8gRE86IGNoZWNrIGlmIHRoZSBzaGlwIGlzIHN1bmssIG1heSBiZSBuZWVkZWQgZm9yIGdhbWUgaW50ZXJmYWNlXG4gICAgfVxuICB9XG5cbiAgaXNBbGxTaGlwc1N1bmsoKSB7XG4gICAgbGV0IGlzQWxsU2hpcHNTdW5rID0gdHJ1ZTtcbiAgICB0aGlzLmZsZWV0LmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIGlmICghc2hpcC5pc1N1bmsoKSkge1xuICAgICAgICBpc0FsbFNoaXBzU3VuayA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGlzQWxsU2hpcHNTdW5rO1xuICB9XG5cbiAgZ2V0U2hpcHNDb29yZGluYXRlcyhzaGlwKSB7XG4gICAgLy8gcmV0dXJucyBbWF9zdGFydCwgWF9lbmQsIFlfc3RhcnQsIFlfZW5kXVxuICAgIGxldCBhbGxfWF9jb29yID0gW107XG4gICAgbGV0IGFsbF9ZX2Nvb3IgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGZpbmRNaW5NYXgobnVtYmVyc0Fycikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG51bWJlcnNBcnIpIHx8IG51bWJlcnNBcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsOyAvLyBIYW5kbGUgaW52YWxpZCBpbnB1dFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0ZWROdW1iZXJzID0gWy4uLm51bWJlcnNBcnJdLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgIGNvbnN0IHNtYWxsZXN0ID0gc29ydGVkTnVtYmVyc1swXTtcbiAgICAgIGNvbnN0IGxhcmdlc3QgPSBzb3J0ZWROdW1iZXJzW3NvcnRlZE51bWJlcnMubGVuZ3RoIC0gMV07XG5cbiAgICAgIHJldHVybiBbc21hbGxlc3QsIGxhcmdlc3RdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib2FyZFNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmJvYXJkU2l6ZTsgaisrKSB7XG4gICAgICAgIGxldCBjdXJyZW50VGlsZSA9IHRoaXMuZnVsbEJvYXJkW2ldW2pdO1xuXG4gICAgICAgIGlmIChjdXJyZW50VGlsZS5zaGlwSW5mbz8uc2hpcFR5cGUgPT0gc2hpcC5zaGlwVHlwZSkge1xuICAgICAgICAgIGFsbF9YX2Nvb3IucHVzaChpKTtcbiAgICAgICAgICBhbGxfWV9jb29yLnB1c2goaik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgW1hfc3RhcnQsIFhfZW5kXSA9IGZpbmRNaW5NYXgoYWxsX1hfY29vcik7XG4gICAgbGV0IFtZX3N0YXJ0LCBZX2VuZF0gPSBmaW5kTWluTWF4KGFsbF9ZX2Nvb3IpO1xuXG4gICAgcmV0dXJuIFtYX3N0YXJ0LCBYX2VuZCwgWV9zdGFydCwgWV9lbmRdO1xuICAgIC8vXG4gIH1cblxuICBnZXRTaGlwc0hpdFRpbGVDb29yZGluYXRlcyhzaGlwKSB7XG4gICAgLy8gcmV0dXJucyBbWF9zdGFydCwgWF9lbmQsIFlfc3RhcnQsIFlfZW5kXVxuICAgIGxldCBhbGxfWF9jb29yID0gW107XG4gICAgbGV0IGFsbF9ZX2Nvb3IgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGZpbmRNaW5NYXgobnVtYmVyc0Fycikge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG51bWJlcnNBcnIpIHx8IG51bWJlcnNBcnIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBudWxsOyAvLyBIYW5kbGUgaW52YWxpZCBpbnB1dFxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0ZWROdW1iZXJzID0gWy4uLm51bWJlcnNBcnJdLnNvcnQoKGEsIGIpID0+IGEgLSBiKTtcbiAgICAgIGNvbnN0IHNtYWxsZXN0ID0gc29ydGVkTnVtYmVyc1swXTtcbiAgICAgIGNvbnN0IGxhcmdlc3QgPSBzb3J0ZWROdW1iZXJzW3NvcnRlZE51bWJlcnMubGVuZ3RoIC0gMV07XG5cbiAgICAgIHJldHVybiBbc21hbGxlc3QsIGxhcmdlc3RdO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5ib2FyZFNpemU7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCB0aGlzLmJvYXJkU2l6ZTsgaisrKSB7XG4gICAgICAgIGxldCBjdXJyZW50VGlsZSA9IHRoaXMuZnVsbEJvYXJkW2ldW2pdO1xuICAgICAgICBpZiAoY3VycmVudFRpbGUuc2hpcEluZm8gPT0gc2hpcCAmJiBjdXJyZW50VGlsZS5pc1RpbGVIaXQpIHtcbiAgICAgICAgICAvLyBhbGxUaWxlc09mU2hpcC5wdXNoKHRoaXMuZnVsbEJvYXJkW2ldW2pdKTtcbiAgICAgICAgICBhbGxfWF9jb29yLnB1c2goaSk7XG4gICAgICAgICAgYWxsX1lfY29vci5wdXNoKGopO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBbWF9zdGFydCwgWF9lbmRdID0gZmluZE1pbk1heChhbGxfWF9jb29yKTtcbiAgICBsZXQgW1lfc3RhcnQsIFlfZW5kXSA9IGZpbmRNaW5NYXgoYWxsX1lfY29vcik7XG5cbiAgICByZXR1cm4gW1hfc3RhcnQsIFhfZW5kLCBZX3N0YXJ0LCBZX2VuZF07XG4gICAgLy9cbiAgfVxuXG4gIC8vIFRPIERPOiBUaGlzIHdpbGwgaGVscCBzaG93IHRoZSBzdW5rIHNoaXBzIG9uIERPTSBnYW1lYm9hcmRcbiAgZ2V0U3Vua1NoaXBUaWxlcyhzaGlwKSB7XG4gICAgaWYgKCFzaGlwLmlzU3VuaygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGFsbFRpbGVzT2ZTaGlwID0gW107XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuYm9hcmRTaXplOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5ib2FyZFNpemU7IGorKykge1xuICAgICAgICBpZiAodGhpcy5mdWxsQm9hcmRbaV1bal0uc2hpcEluZm8gPT0gc2hpcCkge1xuICAgICAgICAgIGFsbFRpbGVzT2ZTaGlwLnB1c2godGhpcy5mdWxsQm9hcmRbaV1bal0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChhbGxUaWxlc09mU2hpcC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGFsbFRpbGVzT2ZTaGlwO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXAuanNcIjtcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vcGxheWVyLmpzXCI7XG5pbXBvcnQgeyBET01fR2VuZXJhdG9yIH0gZnJvbSBcIi4uL2RvbS5qc1wiO1xuaW1wb3J0IHsgZ2V0QUlNb3ZlIH0gZnJvbSBcIi4uL0FJLmpzXCI7XG5cbmV4cG9ydCB7IEdhbWVDb250cm9sbGVyIH07XG5leHBvcnQgeyBET00gfTtcblxuY29uc3QgRE9NID0gbmV3IERPTV9HZW5lcmF0b3IoKTtcblxuY2xhc3MgR2FtZUNvbnRyb2xsZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmh1bWFuUGxheWVyO1xuICAgIHRoaXMuY29tcHV0ZXJQbGF5ZXI7XG4gICAgdGhpcy5hY3RpdmVQbGF5ZXI7XG4gICAgdGhpcy5pbmFjdGl2ZVBsYXllcjtcbiAgfVxuXG4gIGdldE90aGVyUGxheWVyKHBsYXllcikge1xuICAgIGlmIChwbGF5ZXIgPT09IHRoaXMuaHVtYW5QbGF5ZXIpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvbXB1dGVyUGxheWVyO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5odW1hblBsYXllcjtcbiAgICB9XG4gIH1cblxuICBpbml0aWFsaXNlR2FtZSgpIHtcbiAgICB0aGlzLmh1bWFuUGxheWVyID0gbmV3IFBsYXllcigpO1xuICAgIHRoaXMuY29tcHV0ZXJQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgICB0aGlzLmh1bWFuUGxheWVyLnNldEVuZW15UGxheWVyKHRoaXMuY29tcHV0ZXJQbGF5ZXIpO1xuICAgIHRoaXMuY29tcHV0ZXJQbGF5ZXIuc2V0RW5lbXlQbGF5ZXIodGhpcy5odW1hblBsYXllcik7XG5cbiAgICB0aGlzLmFjdGl2ZVBsYXllciA9IHRoaXMuaHVtYW5QbGF5ZXI7XG4gICAgdGhpcy5pbmFjdGl2ZVBsYXllciA9IHRoaXMuY29tcHV0ZXJQbGF5ZXI7XG5cbiAgICB0aGlzLmdlbmVyYXRlUmFuZG9tQm9hcmQodGhpcy5odW1hblBsYXllcik7XG4gICAgdGhpcy5nZW5lcmF0ZVJhbmRvbUJvYXJkKHRoaXMuY29tcHV0ZXJQbGF5ZXIpO1xuXG4gICAgLy8gcmVtb3ZlIGJlbG93IDIgbGluZXMgd2hlbiBkb25lXG4gICAgLy8gdGhpcy50ZXN0UGxhY2VTb21lU2hpcHModGhpcy5odW1hblBsYXllcik7XG4gICAgLy8gdGhpcy50ZXN0UGxhY2VTb21lU2hpcHModGhpcy5jb21wdXRlclBsYXllcik7XG5cbiAgICBET00uaW5pdGlhbGlzZUdhbWVfRE9NKCk7XG4gICAgRE9NLnVwZGF0ZUdhbWVib2FyZCgpO1xuICAgIERPTS5yZW1vdmVBY3RpdmVQbGF5ZXJUYWdUb0FJKCk7IC8vIHRvIGJlIGFkZGVkIHdoZW4gZ2FtZSBzdGFydHNcbiAgfVxuXG4gIHJlc2V0Q3VycmVudEdhbWVib2FyZHMoKSB7XG4gICAgdGhpcy5odW1hblBsYXllci5wbGF5ZXJib2FyZC5mdWxsQm9hcmQgPVxuICAgICAgdGhpcy5odW1hblBsYXllci5wbGF5ZXJib2FyZC5pbml0aWFsaXNlQm9hcmQoKTtcbiAgICB0aGlzLmNvbXB1dGVyUGxheWVyLnBsYXllcmJvYXJkLmZ1bGxCb2FyZCA9XG4gICAgICB0aGlzLmNvbXB1dGVyUGxheWVyLnBsYXllcmJvYXJkLmluaXRpYWxpc2VCb2FyZCgpO1xuXG4gICAgdGhpcy5nZW5lcmF0ZVJhbmRvbUJvYXJkKHRoaXMuaHVtYW5QbGF5ZXIpO1xuICAgIHRoaXMuZ2VuZXJhdGVSYW5kb21Cb2FyZCh0aGlzLmNvbXB1dGVyUGxheWVyKTtcblxuICAgIERPTS5pbml0aWFsaXNlR2FtZV9ET00oKTtcbiAgICBET00udXBkYXRlR2FtZWJvYXJkKCk7XG4gICAgRE9NLnJlbW92ZUFjdGl2ZVBsYXllclRhZ1RvQUkoKTsgLy8gdG8gYmUgYWRkZWQgd2hlbiBnYW1lIHN0YXJ0c1xuICB9XG5cbiAgZ2VuZXJhdGVSYW5kb21Cb2FyZChwbGF5ZXIpIHtcbiAgICAvLyBjb25zdCBzZWxlY3RlZEJvYXJkID0gcGxheWVyLmVuZW15UGxheWVyLnBsYXllcmJvYXJkO1xuICAgIGNvbnN0IHNoaXAxID0gbmV3IFNoaXAoNSwgXCJjYXJyaWVyXCIpO1xuICAgIGNvbnN0IHNoaXAyID0gbmV3IFNoaXAoNCwgXCJiYXR0bGVzaGlwXCIpO1xuICAgIGNvbnN0IHNoaXAzID0gbmV3IFNoaXAoMywgXCJjcnVpc2VyXCIpO1xuICAgIGNvbnN0IHNoaXA0ID0gbmV3IFNoaXAoMywgXCJzdWJtYXJpbmVcIik7XG4gICAgY29uc3Qgc2hpcDUgPSBuZXcgU2hpcCgyLCBcImRlc3Ryb3llclwiKTtcblxuICAgIGNvbnN0IHNoaXBzVG9BZGQgPSBbc2hpcDEsIHNoaXAyLCBzaGlwMywgc2hpcDQsIHNoaXA1XTtcblxuICAgIGZ1bmN0aW9uIGlzQWxsVGlsZXNGcmVlKFhfc3RhcnQsIFhfZW5kLCBZX3N0YXJ0LCBZX2VuZCkge1xuICAgICAgbGV0IGlzQWxsVGlsZXNGcmVlID0gdHJ1ZTtcblxuICAgICAgb3V0ZXJMb29wOiBmb3IgKGxldCB4ID0gWF9zdGFydDsgeCA8PSBYX2VuZDsgeCsrKSB7XG4gICAgICAgIGZvciAobGV0IHkgPSBZX3N0YXJ0OyB5IDw9IFlfZW5kOyB5KyspIHtcbiAgICAgICAgICBpZiAocGxheWVyLnBsYXllcmJvYXJkLmZ1bGxCb2FyZFt4XVt5XS5oYXNUaWxlU2hpcCgpKSB7XG4gICAgICAgICAgICBpc0FsbFRpbGVzRnJlZSA9IGZhbHNlO1xuICAgICAgICAgICAgYnJlYWsgb3V0ZXJMb29wO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaXNBbGxUaWxlc0ZyZWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0UmFuZG9tQ29vcmRpbmF0ZXMoc2hpcExlbmd0aCkge1xuICAgICAgY29uc3QgaXNIb3Jpem9udGFsID0gTWF0aC5yYW5kb20oKSA8IDAuNTtcblxuICAgICAgbGV0IFhfc3RhcnQsIFhfZW5kLCBZX3N0YXJ0LCBZX2VuZDtcblxuICAgICAgaWYgKGlzSG9yaXpvbnRhbCkge1xuICAgICAgICBYX3N0YXJ0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKDEwIC0gc2hpcExlbmd0aCArIDEpKTtcbiAgICAgICAgWF9lbmQgPSBYX3N0YXJ0ICsgc2hpcExlbmd0aCAtIDE7XG4gICAgICAgIFlfc3RhcnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIFlfZW5kID0gWV9zdGFydDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIFhfc3RhcnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICAgIFhfZW5kID0gWF9zdGFydDtcbiAgICAgICAgWV9zdGFydCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMCAtIHNoaXBMZW5ndGggKyAxKSk7XG4gICAgICAgIFlfZW5kID0gWV9zdGFydCArIHNoaXBMZW5ndGggLSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1hfc3RhcnQsIFhfZW5kLCBZX3N0YXJ0LCBZX2VuZF07XG4gICAgfVxuXG4gICAgc2hpcHNUb0FkZC5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBsZXQgcmFuZG9tQ29vcmRpbmF0ZXM7XG4gICAgICBkbyB7XG4gICAgICAgIHJhbmRvbUNvb3JkaW5hdGVzID0gZ2V0UmFuZG9tQ29vcmRpbmF0ZXMoc2hpcC5sZW5ndGgpO1xuICAgICAgfSB3aGlsZSAoIWlzQWxsVGlsZXNGcmVlKC4uLnJhbmRvbUNvb3JkaW5hdGVzKSk7XG5cbiAgICAgIHBsYXllci5wbGF5ZXJib2FyZC5wbGFjZVNoaXAoc2hpcCwgLi4ucmFuZG9tQ29vcmRpbmF0ZXMpO1xuICAgIH0pO1xuICB9XG5cbiAgc3dpdGNoQWN0aXZlUGxheWVyKCkge1xuICAgIHRoaXMuYWN0aXZlUGxheWVyID1cbiAgICAgIHRoaXMuYWN0aXZlUGxheWVyID09PSB0aGlzLmh1bWFuUGxheWVyXG4gICAgICAgID8gdGhpcy5jb21wdXRlclBsYXllclxuICAgICAgICA6IHRoaXMuaHVtYW5QbGF5ZXI7XG5cbiAgICB0aGlzLmluYWN0aXZlUGxheWVyID1cbiAgICAgIHRoaXMuaW5hY3RpdmVQbGF5ZXIgPT09IHRoaXMuaHVtYW5QbGF5ZXJcbiAgICAgICAgPyB0aGlzLmNvbXB1dGVyUGxheWVyXG4gICAgICAgIDogdGhpcy5odW1hblBsYXllcjtcbiAgfVxuXG4gIGFzeW5jIHBsYXlSb3VuZChYX2Nvb3IsIFlfY29vciwgcGxheWVyKSB7XG4gICAgRE9NLnJlbW92ZUFjdGl2ZVBsYXllclRhZ1RvQUkoKTtcblxuICAgIGlmIChwbGF5ZXIgPT09IHRoaXMuY29tcHV0ZXJQbGF5ZXIpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiQUkgaGl0czogXCIgKyBcIltcIiArIFhfY29vciArIFwiLCBcIiArIFlfY29vciArIFwiXVwiKTtcbiAgICB9XG5cbiAgICBhd2FpdCBET00ucGxheUF0dGFja0F1ZGlvKHBsYXllcik7XG4gICAgLy8gYXdhaXQgc2xlZXAoMSk7XG5cbiAgICBwbGF5ZXIuYXR0YWNrRW5lbXlQbGF5ZXIoWF9jb29yLCBZX2Nvb3IpO1xuXG4gICAgY29uc3QgdGFyZ2V0Qm9hcmQgPSBwbGF5ZXIuZW5lbXlQbGF5ZXIucGxheWVyYm9hcmQ7XG4gICAgY29uc3QgdGFyZ2V0VGlsZSA9IHBsYXllci5lbmVteVBsYXllci5wbGF5ZXJib2FyZC5mdWxsQm9hcmRbWF9jb29yXVtZX2Nvb3JdO1xuICAgIGNvbnN0IGlzSGl0U3VjY2Vzc2Z1bCA9IHRhcmdldFRpbGUuaGFzVGlsZVNoaXAoKTtcblxuICAgIC8vIGNoZWNrIGlmIHRoaXMgc2hpcCBoYXMgYmVlbiBzdW5rIG5vd1xuICAgIGlmICh0YXJnZXRUaWxlLmhhc1RpbGVTaGlwKCkpIHtcbiAgICAgIGlmICh0YXJnZXRUaWxlLnNoaXBJbmZvLmlzU3VuaygpKSB7XG4gICAgICAgIC8vIGhlcmUgY29tZXMgRE9NIHN0dWZmXG4gICAgICAgIC8vIGFsbFRpbGVzT2ZTaGlwID0gLi5cbiAgICAgICAgLy8gZm9yRWFjaChhbGxUaWxlc09mU2hpcClcbiAgICAgICAgaWYgKHBsYXllciA9PT0gdGhpcy5odW1hblBsYXllcikge1xuICAgICAgICB9XG4gICAgICAgIHRhcmdldEJvYXJkLmdldFN1bmtTaGlwVGlsZXModGFyZ2V0VGlsZS5zaGlwSW5mbyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9jaGVja2luZyBpZiB0aGUgb3RoZXIgcGxheWVyIGhhcyBsb3N0IHRoZSBnYW1lXG4gICAgaWYgKHBsYXllci5lbmVteVBsYXllci5wbGF5ZXJib2FyZC5pc0FsbFNoaXBzU3VuaygpKSB7XG4gICAgICB0aGlzLmVuZEdhbWUocGxheWVyKTtcbiAgICB9XG5cbiAgICAvLyBUTyBETzoga2VlcCBhdHRhY2tpbmcgaWYgYXR0YWNrIGlzIHN1Y2Nlc3NmdWwuXG4gICAgb3V0ZXJMb29wOiBpZiAodGFyZ2V0VGlsZS5pc1RpbGVIaXQgJiYgdGFyZ2V0VGlsZS5oYXNUaWxlU2hpcCgpKSB7XG4gICAgICBpZiAodGhpcy5hY3RpdmVQbGF5ZXIgPT09IHRoaXMuY29tcHV0ZXJQbGF5ZXIpIHtcbiAgICAgICAgYnJlYWsgb3V0ZXJMb29wOyAvLyBuZWVkcyB0byBqdW1wIGluIHRvIGJlbG93IGNvbXB1dGVyVHVybiBsb2dpY1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgRE9NLnVwZGF0ZUdhbWVib2FyZCgpO1xuICAgICAgICBET00ucmVtb3ZlQWN0aXZlUGxheWVyVGFnVG9BSSgpO1xuICAgICAgICBhd2FpdCBET00ucGxheUF0dGFja0hpdEF1ZGlvKGlzSGl0U3VjY2Vzc2Z1bCk7XG4gICAgICAgIERPTS5hZGRBY3RpdmVQbGF5ZXJUYWd0b0FJKCk7XG5cbiAgICAgICAgcmV0dXJuOyAvLyBubyBjaGFuZ2Ugd2l0aCBhY3RpdmUgcGxheWVyXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3dpdGNoQWN0aXZlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgLy8gdGhpcy5zd2l0Y2hBY3RpdmVQbGF5ZXIoKTtcblxuICAgIERPTS51cGRhdGVHYW1lYm9hcmQoKTtcbiAgICBET00ucmVtb3ZlQWN0aXZlUGxheWVyVGFnVG9BSSgpO1xuICAgIGF3YWl0IERPTS5wbGF5QXR0YWNrSGl0QXVkaW8oaXNIaXRTdWNjZXNzZnVsKTtcbiAgICBET00uYWRkQWN0aXZlUGxheWVyVGFndG9BSSgpO1xuXG4gICAgaWYgKHRoaXMuYWN0aXZlUGxheWVyID09PSB0aGlzLmNvbXB1dGVyUGxheWVyKSB7XG4gICAgICBsZXQgW25leHRSb3VuZF9YX2Nvb3IsIG5leHRSb3VuZF9ZX2Nvb3JdID0gZ2V0QUlNb3ZlKFxuICAgICAgICB0aGlzLmh1bWFuUGxheWVyLnBsYXllcmJvYXJkXG4gICAgICApO1xuICAgICAgdGhpcy5wbGF5Um91bmQobmV4dFJvdW5kX1hfY29vciwgbmV4dFJvdW5kX1lfY29vciwgdGhpcy5jb21wdXRlclBsYXllcik7XG4gICAgfVxuICB9XG5cbiAgLy8gcGxheUNvbXB1dGVyUm91bmQoWF9jb29yLCBZX2Nvb3IpIHt9XG5cbiAgZW5kR2FtZSh3aW5uaW5nUGxheWVyKSB7XG4gICAgLy8gZm9yIG5vdywgd2UgbWFrZSBsb3NpbmcgYm9hcmQgcmVkLCB3aW5uaW5nIGdyZWVuXG5cbiAgICBET00udXBkYXRlR2FtZWJvYXJkKCk7XG5cbiAgICBpZiAod2lubmluZ1BsYXllciA9PT0gdGhpcy5odW1hblBsYXllcikge1xuICAgICAgRE9NLmVuZEdhbWVfRE9NKFwiaHVtYW5cIik7XG4gICAgfSBlbHNlIGlmICh3aW5uaW5nUGxheWVyID09PSB0aGlzLmNvbXB1dGVyUGxheWVyKSB7XG4gICAgICBET00uZW5kR2FtZV9ET00oXCJjb21wdXRlclwiKTtcbiAgICB9XG4gIH1cbn1cblxuLy9cbi8vIGJlbG93IGFyZSB0ZXN0IGZ1bmN0aW9ucyBmb3IgdGhpcyBDbGFzc1xuLy9cbkdhbWVDb250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXNlVGVzdEdhbWUgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gIHRoaXMuY29tcHV0ZXJQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgdGhpcy5odW1hblBsYXllci5zZXRFbmVteVBsYXllcih0aGlzLmNvbXB1dGVyUGxheWVyKTtcbiAgdGhpcy5jb21wdXRlclBsYXllci5zZXRFbmVteVBsYXllcih0aGlzLmh1bWFuUGxheWVyKTtcblxuICB0aGlzLnRlc3RQbGFjZVNvbWVTaGlwcyh0aGlzLmh1bWFuUGxheWVyKTtcbiAgdGhpcy50ZXN0UGxhY2VTb21lU2hpcHModGhpcy5jb21wdXRlclBsYXllcik7XG5cbiAgdGhpcy5hY3RpdmVQbGF5ZXIgPSB0aGlzLmh1bWFuUGxheWVyO1xuICB0aGlzLmluYWN0aXZlUGxheWVyID0gdGhpcy5jb21wdXRlclBsYXllcjtcbn07XG5cbkdhbWVDb250cm9sbGVyLnByb3RvdHlwZS5pbml0aWFsaXNlVGVzdEdhbWVOb1NoaXBzID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmh1bWFuUGxheWVyID0gbmV3IFBsYXllcigpO1xuICB0aGlzLmNvbXB1dGVyUGxheWVyID0gbmV3IFBsYXllcigpO1xuXG4gIHRoaXMuaHVtYW5QbGF5ZXIuc2V0RW5lbXlQbGF5ZXIodGhpcy5jb21wdXRlclBsYXllcik7XG4gIHRoaXMuY29tcHV0ZXJQbGF5ZXIuc2V0RW5lbXlQbGF5ZXIodGhpcy5odW1hblBsYXllcik7XG5cbiAgLy8gdGhpcy50ZXN0UGxhY2VTb21lU2hpcHModGhpcy5odW1hblBsYXllcik7XG4gIC8vIHRoaXMudGVzdFBsYWNlU29tZVNoaXBzKHRoaXMuY29tcHV0ZXJQbGF5ZXIpO1xuXG4gIHRoaXMuYWN0aXZlUGxheWVyID0gdGhpcy5odW1hblBsYXllcjtcbiAgdGhpcy5pbmFjdGl2ZVBsYXllciA9IHRoaXMuY29tcHV0ZXJQbGF5ZXI7XG59O1xuXG5HYW1lQ29udHJvbGxlci5wcm90b3R5cGUudGVzdFBsYWNlU29tZVNoaXBzID0gZnVuY3Rpb24gKHBsYXllcikge1xuICBjb25zdCB0ZXN0U2hpcDEgPSBuZXcgU2hpcCgzKTtcbiAgY29uc3QgdGVzdFNoaXAyID0gbmV3IFNoaXAoNCk7XG4gIGNvbnN0IHRlc3RTaGlwMyA9IG5ldyBTaGlwKDUpO1xuXG4gIHBsYXllci5wbGF5ZXJib2FyZC5wbGFjZVNoaXAodGVzdFNoaXAxLCAyLCA0LCAxLCAxKTtcbiAgcGxheWVyLnBsYXllcmJvYXJkLnBsYWNlU2hpcCh0ZXN0U2hpcDIsIDIsIDUsIDIsIDIpO1xuICBwbGF5ZXIucGxheWVyYm9hcmQucGxhY2VTaGlwKHRlc3RTaGlwMywgMiwgNiwgMywgMyk7XG59O1xuXG5HYW1lQ29udHJvbGxlci5wcm90b3R5cGUuaW5pdGlhbGlzZVRlc3RHYW1lX0FJX1Rlc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuaHVtYW5QbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG4gIHRoaXMuY29tcHV0ZXJQbGF5ZXIgPSBuZXcgUGxheWVyKCk7XG5cbiAgdGhpcy5odW1hblBsYXllci5zZXRFbmVteVBsYXllcih0aGlzLmNvbXB1dGVyUGxheWVyKTtcbiAgdGhpcy5jb21wdXRlclBsYXllci5zZXRFbmVteVBsYXllcih0aGlzLmh1bWFuUGxheWVyKTtcblxuICB0aGlzLnRlc3RQbGFjZVNvbWVTaGlwc19BSV9UZXN0KHRoaXMuaHVtYW5QbGF5ZXIpO1xuICB0aGlzLnRlc3RQbGFjZVNvbWVTaGlwc19BSV9UZXN0KHRoaXMuY29tcHV0ZXJQbGF5ZXIpO1xuXG4gIHRoaXMuYWN0aXZlUGxheWVyID0gdGhpcy5odW1hblBsYXllcjtcbiAgdGhpcy5pbmFjdGl2ZVBsYXllciA9IHRoaXMuY29tcHV0ZXJQbGF5ZXI7XG59O1xuXG5HYW1lQ29udHJvbGxlci5wcm90b3R5cGUudGVzdFBsYWNlU29tZVNoaXBzX0FJX1Rlc3QgPSBmdW5jdGlvbiAocGxheWVyKSB7XG4gIGNvbnN0IHRlc3RTaGlwMSA9IG5ldyBTaGlwKDMpO1xuICBjb25zdCB0ZXN0U2hpcDIgPSBuZXcgU2hpcCg0KTtcbiAgY29uc3QgdGVzdFNoaXAzID0gbmV3IFNoaXAoNSk7XG5cbiAgcGxheWVyLnBsYXllcmJvYXJkLnBsYWNlU2hpcCh0ZXN0U2hpcDEsIDIsIDQsIDIsIDIpO1xuICBwbGF5ZXIucGxheWVyYm9hcmQucGxhY2VTaGlwKHRlc3RTaGlwMiwgMiwgNSwgNSwgNSk7XG4gIHBsYXllci5wbGF5ZXJib2FyZC5wbGFjZVNoaXAodGVzdFNoaXAzLCAyLCA2LCA4LCA4KTtcbn07XG4vL1xuLy9cbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gXCIuL2dhbWVib2FyZFwiO1xuXG5leHBvcnQgeyBQbGF5ZXIgfTtcblxuY2xhc3MgUGxheWVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5wbGF5ZXJib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgICB0aGlzLmlzTXlUdXJuID0gZmFsc2U7XG4gICAgdGhpcy5lbmVteVBsYXllcjtcbiAgfVxuXG4gIHNldEVuZW15UGxheWVyKHBsYXllcikge1xuICAgIHRoaXMuZW5lbXlQbGF5ZXIgPSBwbGF5ZXI7XG4gIH1cblxuICBpc0F0dGFja0FsbG93ZWQoWF9jb29yLCBZX2Nvb3IpIHtcbiAgICBpZiAoXG4gICAgICBYX2Nvb3IgPj0gdGhpcy5lbmVteVBsYXllci5wbGF5ZXJib2FyZC5ib2FyZFNpemUgfHxcbiAgICAgIFlfY29vciA+PSB0aGlzLmVuZW15UGxheWVyLnBsYXllcmJvYXJkLmJvYXJkU2l6ZVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmVuZW15UGxheWVyLnBsYXllcmJvYXJkLmZ1bGxCb2FyZFtYX2Nvb3JdW1lfY29vcl0uaXNUaWxlSGl0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhdHRhY2tFbmVteVBsYXllcihYX2Nvb3IsIFlfY29vcikge1xuICAgIGlmICghdGhpcy5lbmVteVBsYXllcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwibm8gZW5lbXkgcGxheWVyIGhhcyBiZWVuIHNwZWNpZmllZFwiKTtcbiAgICB9XG5cbiAgICB0aGlzLmVuZW15UGxheWVyLnBsYXllcmJvYXJkLnJlY2VpdmVBdHRhY2soWF9jb29yLCBZX2Nvb3IpO1xuICB9XG59XG4iLCJleHBvcnQgeyBTaGlwIH07XG5cbmNsYXNzIFNoaXAge1xuICBjb25zdHJ1Y3RvcihsZW5ndGgsIHNoaXBUeXBlKSB7XG4gICAgdGhpcy5sZW5ndGggPSBsZW5ndGg7XG4gICAgdGhpcy5oaXRDb3VudCA9IDA7XG4gICAgdGhpcy5zaGlwVHlwZSA9IHNoaXBUeXBlO1xuICB9XG5cbiAgZ2V0TGVuZ3RoKCkge1xuICAgIHJldHVybiB0aGlzLmxlbmd0aDtcbiAgfVxuXG4gIGhpdCgpIHtcbiAgICAvLyBpbmNyZWFzZXMgdGhlIG51bWJlciBvZiDigJhoaXRz4oCZIGluIHlvdXIgc2hpcC5cbiAgICBpZiAodGhpcy5oaXRDb3VudCA9PT0gdGhpcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhpdENvdW50Kys7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgLy8gY2FsY3VsYXRlcyB3aGV0aGVyIGEgc2hpcCBpcyBjb25zaWRlcmVkIHN1bmsgYmFzZWQgb24gaXRzIGxlbmd0aFxuICAgIC8vIGFuZCB0aGUgbnVtYmVyIG9mIGhpdHMgaXQgaGFzIHJlY2VpdmVkLlxuXG4gICAgaWYgKHRoaXMuaGl0Q291bnQgPT09IHRoaXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaGl0Q291bnQgPCB0aGlzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJoaXQgY291bnQgZXhjZWVkZWQgbGVuZ3RoXCIpO1xuICAgIH1cbiAgfVxufVxuIiwiLy9cbmltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9mYWN0b3JpZXMvc2hpcC5qc1wiO1xuaW1wb3J0IHsgR2FtZWJvYXJkVGlsZSwgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZmFjdG9yaWVzL2dhbWVib2FyZC5qc1wiO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSBcIi4vZmFjdG9yaWVzL3BsYXllci5qc1wiO1xuaW1wb3J0IHsgR2FtZUNvbnRyb2xsZXIgfSBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZWNvbnRyb2xsZXIuanNcIjtcbmltcG9ydCB7IGdldEFJTW92ZSwgZ2V0UmFuZG9tTm9uSGl0VGlsZSB9IGZyb20gXCIuL0FJLmpzXCI7XG5pbXBvcnQgeyBhZGRBdWRpb0NvbmZpZyB9IGZyb20gXCIuLi9qYXZhc2NyaXB0L2xvYWRfc2hpcF9pbWFnZXMuanNcIjtcblxuaW1wb3J0IFwiLi4vc3R5bGVzL2luZGV4LmNzc1wiO1xuXG5leHBvcnQgeyBnYW1lLCBnZW5lcmF0ZU1haW5HYW1lIH07XG5cbmxldCBnYW1lO1xuXG5mdW5jdGlvbiBnZW5lcmF0ZU1haW5HYW1lKCkge1xuICBnYW1lID0gbmV3IEdhbWVDb250cm9sbGVyKCk7XG4gIGdhbWUuaW5pdGlhbGlzZUdhbWUoKTtcbn1cblxuZ2VuZXJhdGVNYWluR2FtZSgpO1xuYWRkQXVkaW9Db25maWcoKTtcbiIsImltcG9ydCB7IGdldFNoaXBzQ29vcmRpbmF0ZXMgfSBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZWJvYXJkLmpzXCI7XG4vLyBpbXBvcnQgeyBET00gfSBmcm9tIFwiLi9mYWN0b3JpZXMvZ2FtZWNvbnRyb2xsZXIuanNcIjtcblxuZXhwb3J0IHsgbG9hZFNoaXBJbWFnZXMsIGFkZEF1ZGlvQ29uZmlnIH07XG4vL1xuXG5mdW5jdGlvbiBsb2FkU2hpcEltYWdlcyhnYW1lYm9hcmQsIGdhbWVib2FyZENvbnRhaW5lcikge1xuICBnYW1lYm9hcmQuZmxlZXQuZm9yRWFjaCgoc2hpcCkgPT4ge1xuICAgIGxldCBbWF9zdGFydCwgWF9lbmQsIFlfc3RhcnQsIFlfZW5kXSA9IGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKHNoaXApO1xuICAgIGxldCBpc1hBeGlzID0gWV9zdGFydCA9PT0gWV9lbmQ7XG4gICAgbGV0IHNoaXBUeXBlID0gc2hpcC5zaGlwVHlwZTtcblxuICAgIGNvbnN0IHNoaXBUaWxlcyA9IGdhbWVib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgYC50aWxlLmhhc19zaGlwW2RhdGEtc2hpcF90eXBlPVwiJHtzaGlwVHlwZX1cIl1gXG4gICAgKTtcblxuICAgIGxldCBzZWxlY3Rvcl9oZWFkVGlsZSA9IGAudGlsZS5oYXNfc2hpcFtkYXRhLXhfY29vcj1cIiR7WF9lbmR9XCJdW2RhdGEteV9jb29yPVwiJHtZX2VuZH1cIl1bZGF0YS1zaGlwX3R5cGU9XCIke3NoaXBUeXBlfVwiXWA7XG4gICAgbGV0IGhlYWRUaWxlcyA9IGdhbWVib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yX2hlYWRUaWxlKTtcblxuICAgIHNoaXBUaWxlcy5mb3JFYWNoKChzaGlwVGlsZSkgPT4ge1xuICAgICAgLy8gYmF0dGxlU2hpcFRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJwaW5rXCI7XG4gICAgICBpZiAoaXNYQXhpcykge1xuICAgICAgICBzaGlwVGlsZS5jbGFzc0xpc3QuYWRkKFwieF9heGlzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2hpcFRpbGUuY2xhc3NMaXN0LmFkZChcInlfYXhpc1wiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGhlYWRUaWxlcy5mb3JFYWNoKChoZWFkVGlsZSkgPT4ge1xuICAgICAgaGVhZFRpbGUuY2xhc3NMaXN0LmFkZChcImhlYWRfdGlsZVwiKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gLy8gVE8gRE86IG1ha2UgY29tcHV0ZXIgc2hpcHMgaW52aXNpYmxlLCBvbmx5IHNlZW4gd2hlbiBzdW5rXG4gIC8vIGNvbnN0IGJhdHRsZVNoaXBUaWxlcyA9IGdhbWVib2FyZENvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFxuICAvLyAgICcudGlsZS5oYXNfc2hpcFtkYXRhLXNoaXBfdHlwZT1cImJhdHRsZXNoaXBcIl0nXG4gIC8vICk7XG5cbiAgLy8gbGV0IGJhdHRsZXNoaXAgPSBnYW1lYm9hcmQuZmxlZXRbMV07XG4gIC8vIC8vIGNvbnNvbGUubG9nKGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKGJhdHRsZXNoaXApKTtcblxuICAvLyBsZXQgW1hfc3RhcnQsIFhfZW5kLCBZX3N0YXJ0LCBZX2VuZF0gPVxuICAvLyAgIGdhbWVib2FyZC5nZXRTaGlwc0Nvb3JkaW5hdGVzKGJhdHRsZXNoaXApO1xuXG4gIC8vIGxldCBpc1hBeGlzID0gWV9zdGFydCA9PT0gWV9lbmQ7XG5cbiAgLy8gbGV0IHNlbGVjdG9yX2hlYWRUaWxlID0gYC50aWxlLmhhc19zaGlwW2RhdGEteF9jb29yPVwiJHtYX2VuZH1cIl1bZGF0YS15X2Nvb3I9XCIke1lfZW5kfVwiXVtkYXRhLXNoaXBfdHlwZT1cImJhdHRsZXNoaXBcIl1gO1xuXG4gIC8vIGxldCBoZWFkVGlsZXMgPSBnYW1lYm9hcmRDb250YWluZXIucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcl9oZWFkVGlsZSk7XG5cbiAgLy8gYmF0dGxlU2hpcFRpbGVzLmZvckVhY2goKGJhdHRsZVNoaXBUaWxlKSA9PiB7XG4gIC8vICAgLy8gYmF0dGxlU2hpcFRpbGUuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gXCJwaW5rXCI7XG4gIC8vICAgaWYgKGlzWEF4aXMpIHtcbiAgLy8gICAgIGJhdHRsZVNoaXBUaWxlLmNsYXNzTGlzdC5hZGQoXCJ4X2F4aXNcIik7XG4gIC8vICAgfSBlbHNlIHtcbiAgLy8gICAgIGJhdHRsZVNoaXBUaWxlLmNsYXNzTGlzdC5hZGQoXCJ5X2F4aXNcIik7XG4gIC8vICAgfVxuICAvLyB9KTtcblxuICAvLyBoZWFkVGlsZXMuZm9yRWFjaCgoaGVhZFRpbGUpID0+IHtcbiAgLy8gICBoZWFkVGlsZS5jbGFzc0xpc3QuYWRkKFwiaGVhZF90aWxlXCIpO1xuICAvLyB9KTtcbn1cblxuZnVuY3Rpb24gYWRkQXVkaW9Db25maWcoKSB7XG4gIGNvbnN0IGF1ZGlvQmFja2dyb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJhdWRpby5iYWNrZ3JvdW5kX211c2ljXCIpO1xuICBjb25zdCBhdWRpb0ljb25PbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCJidXR0b24uYmFja2dyb3VuZF9tdXNpY19idXR0b24gLmljb25fb25cIlxuICApO1xuICBjb25zdCBhdWRpb0ljb25PZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiYnV0dG9uLmJhY2tncm91bmRfbXVzaWNfYnV0dG9uIC5pY29uX29mZlwiXG4gICk7XG4gIGF1ZGlvSWNvbk9uLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgY29uc3QgYXVkaW9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiYnV0dG9uLmJhY2tncm91bmRfbXVzaWNfYnV0dG9uXCIpO1xuXG4gIGZ1bmN0aW9uIHRvZ2dsZVBsYXkoKSB7XG4gICAgaWYgKGF1ZGlvQmFja2dyb3VuZC5wYXVzZWQpIHtcbiAgICAgIGF1ZGlvSWNvbk9uLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICBhdWRpb0ljb25PZmYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgY29uc29sZS5sb2coXCJwbGF5aW5nIGJhY2tncm91bmQgbXVzaWNcIik7XG4gICAgICBhdWRpb0JhY2tncm91bmQucGxheSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhdWRpb0ljb25Pbi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBhdWRpb0ljb25PZmYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIGNvbnNvbGUubG9nKFwicGF1c2luZyBiYWNrZ3JvdW5kIG11c2ljXCIpO1xuICAgICAgYXVkaW9CYWNrZ3JvdW5kLnBhdXNlKCk7XG4gICAgfVxuICB9XG5cbiAgYXVkaW9CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICB0b2dnbGVQbGF5KCk7XG4gIH0pO1xufVxuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2Fzc2V0cy9pbWFnZXMvcmEyX2FsbGllZF9sb2dvLndlYnBcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9hc3NldHMvaW1hZ2VzL3JhMl9zb3ZpZXRfbG9nby5wbmdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIGA6cm9vdCB7XG4gIC0tcmEyLW1lbnUteWVsbG93OiAjZjhmYjAxO1xuICAtLXJhMi1tZW51LXJlZDogI2I2MDEwMDtcbiAgLS1oZWFkZXItbGlnaHQtZ3JleTogcmdiKDEzOSwgMTQ3LCAxNTQpO1xuICAtLWhlYWRlci1kYXJrLWdyZXk6IHJnYmEoOTEsIDEwMCwgMTAzLCAxKTtcbiAgLS1idXR0b24taG92ZXItZ3JleTogIzNhM2EzYTtcbiAgLS1uZXV0cmFsLWJsYWNrOiAjMTIxMjEyO1xuICAtLWRhcmstZ3JleTogIzIzMjMyMztcbiAgLS1mb250X2NvbG9yX3doaXRlOiAjZThlNmUzO1xuXG4gIC0tYnV0dG9uLWJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xNykgMHB4IC0yM3B4IDI1cHggMHB4IGluc2V0LFxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNSkgMHB4IC0zNnB4IDMwcHggMHB4IGluc2V0LFxuICAgIHJnYmEoMCwgMCwgMCwgMC4xKSAwcHggLTc5cHggNDBweCAwcHggaW5zZXQsIHJnYmEoMCwgMCwgMCwgMC4wNikgMHB4IDJweCAxcHgsXG4gICAgcmdiYSgwLCAwLCAwLCAwLjA5KSAwcHggNHB4IDJweCwgcmdiYSgwLCAwLCAwLCAwLjA5KSAwcHggOHB4IDRweCxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMDkpIDBweCAxNnB4IDhweCwgcmdiYSgwLCAwLCAwLCAwLjA5KSAwcHggMzJweCAxNnB4O1xuXG4gIC0tYnV0dG9uLWhvdmVyLWJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yNSkgMHB4IDU0cHggNTVweCxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCAtMTJweCAzMHB4LCByZ2JhKDAsIDAsIDAsIDAuMTIpIDBweCA0cHggNnB4LFxuICAgIHJnYmEoMCwgMCwgMCwgMC4xNykgMHB4IDEycHggMTNweCwgcmdiYSgwLCAwLCAwLCAwLjA5KSAwcHggLTNweCA1cHg7XG5cbiAgLS1oZWFkZXItYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KFxuICAgIDkwZGVnLFxuICAgIHJnYmEoMTM5LCAxNDcsIDE1NCwgMSkgMCUsXG4gICAgcmdiYSg5MSwgMTAwLCAxMDMsIDEpIDEwMCVcbiAgKTtcblxuICAtLWdhbWVib2FyZC1ib3gtc2hhZG93OiAwIDJweCAzcHggIzI5MjkyOSwgMCAwIDc3cHggYmxhY2sgaW5zZXQsXG4gICAgNXB4IC01cHggNDRweCAjMjkyOTI5IGluc2V0O1xuXG4gIC0tZmxvYXQtc2l6ZTogMC4xNXJlbTtcbiAgLS1ib3JkZXJfcmFkaXVzOiAxMHB4O1xuICAtLXRpbGUtYm9yZGVyOiAwLjVweCBzaWx2ZXIgc29saWQ7XG5cbiAgZm9udC1zaXplOiAxNnB4O1xufVxuXG5Aa2V5ZnJhbWVzIGZsb2F0LXktYXhpcyB7XG4gIDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XG4gIH1cblxuICA1MCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSh2YXIoLS1mbG9hdC1zaXplKSk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVkodmFyKC0tZmxvYXQtc2l6ZSkpO1xuICB9XG5cbiAgMTAwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xuICB9XG59XG5cbkBrZXlmcmFtZXMgZmxvYXQteC1heGlzIHtcbiAgMCUge1xuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcbiAgfVxuXG4gIDUwJSB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKHZhcigtLWZsb2F0LXNpemUpKTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS1mbG9hdC1zaXplKSk7XG4gIH1cblxuICAxMDAlIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XG4gIH1cbn1cblxuQGtleWZyYW1lcyBjaGFuZ2VTY2FsZSB7XG4gIGZyb20ge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMSk7XG4gIH1cbiAgdG8ge1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMS4yKTtcbiAgfVxufVxuXG5ib2R5IHtcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xuXG4gIGNvbG9yOiB2YXIoLS1yYTItbWVudS15ZWxsb3cpO1xufVxuXG4uYmFja2dyb3VuZF92aWRlbyB7XG4gIHdpZHRoOiAxMDB2dztcbiAgaGVpZ2h0OiAxMDB2aDtcbiAgb2JqZWN0LWZpdDogY292ZXI7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHRvcDogMDtcbiAgYm90dG9tOiAwO1xuICB6LWluZGV4OiAtMTtcblxuICBvcGFjaXR5OiAwLjE1O1xufVxuXG4ubWFpbl9jb250YWluZXIgPiAqIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC8qIHBhZGRpbmc6IDFyZW07ICovXG59XG5cbi8qIEhlYWRlciAqL1xuXG4uaGVhZGVyX2NvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgcGFkZGluZzogMC41cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuOCk7XG4gIC8qIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9hc3NldHMvaW1hZ2VzL2RyZWFkbm91Z2h0LmpwZyk7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiAxNSU7ICovXG4gIGJhY2tncm91bmQ6IHJnYigxMzksIDE0NywgMTU0KTtcbiAgYmFja2dyb3VuZDogdmFyKC0taGVhZGVyLWJhY2tncm91bmQpO1xuXG4gIGJveC1zaGFkb3c6IHZhcigtLWdhbWVib2FyZC1ib3gtc2hhZG93KTtcbn1cblxuLyogLmxlZnRfc2lkZV9idXR0b25zX2NvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufSAqL1xuXG4ucmlnaHRfc2lkZV9oZWFkZXJfY29udGFpbmVyLFxuLmxlZnRfc2lkZV9idXR0b25zX2NvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gIC8qIG5lZ2F0aW5nIHRoZSBwYXJlbnQgcGFkZGluZyAqL1xuICAvKiBtYXJnaW4tbGVmdDogLTFyZW07ICovXG4gIGdhcDogMXJlbTtcblxuICBmb250LXNpemU6IDEuN3JlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi8qIC5yaWdodF9zaWRlX2hlYWRlcl9jb250YWluZXIgaW1nIHtcbiAgaGVpZ2h0OiAycmVtO1xufSAqL1xuXG4uYnV0dG9uIGltZyB7XG4gIGhlaWdodDogMnJlbTtcbiAgY29sb3I6IHZhcigtLXJhMi1tZW51LXllbGxvdyk7XG59XG5cbi5idXR0b24ge1xuICBib3JkZXI6IG5vbmU7XG4gIGJveC1zaGFkb3c6IHZhcigtLWJ1dHRvbi1ib3gtc2hhZG93KTtcblxuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXJhMi1tZW51LXJlZCk7XG4gIGJvcmRlci1yYWRpdXM6IDRlbTtcbiAgLyogZm9udC1zaXplOiAxNnB4OyAqL1xuICBmb250LXNpemU6IDFyZW07XG4gIGNvbG9yOiB2YXIoLS1yYTItbWVudS15ZWxsb3cpO1xuICBmb250LXdlaWdodDogYm9sZDtcbiAgcGFkZGluZzogMC44ZW0gMS44ZW07XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7XG4gIC13ZWJraXQtdHJhbnNpdGlvbi1kdXJhdGlvbjogMC40czsgLyogU2FmYXJpICovXG59XG5cbi5idXR0b246aG92ZXIge1xuICB0cmFuc2l0aW9uLWR1cmF0aW9uOiAwLjFzO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idXR0b24taG92ZXItZ3JleSk7XG59XG5cbi5idXR0b246YWZ0ZXIge1xuICBjb250ZW50OiBcIlwiO1xuICBkaXNwbGF5OiBibG9jaztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3JkZXItcmFkaXVzOiA0ZW07XG4gIGxlZnQ6IDA7XG4gIHRvcDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNpdGlvbjogYWxsIDAuNXM7XG4gIGJveC1zaGFkb3c6IDAgMCAxMHB4IDQwcHggdmFyKC0tcmEyLW1lbnUtcmVkKTtcbn1cblxuLmJ1dHRvbjphY3RpdmU6YWZ0ZXIge1xuICBib3gtc2hhZG93OiAwIDAgMCAwIHZhcigtLXJhMi1tZW51LXllbGxvdyk7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyLXJhZGl1czogNGVtO1xuICBsZWZ0OiAwO1xuICB0b3A6IDA7XG4gIG9wYWNpdHk6IDE7XG4gIHRyYW5zaXRpb246IDBzO1xufVxuXG4uYnV0dG9uOmFjdGl2ZSB7XG4gIHRvcDogMXB4O1xufVxuLyogKioqKioqICovXG5cbi8qIFN0YXJ0IGFuZCBSZXNldCBCdXR0b25zKi9cbi5zdGFydF9idXR0b25zX2NvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMnJlbTtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cbi5zdGFydF9idXR0b25zX2NvbnRhaW5lciA+IC5pbmFjdGl2ZSB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLyogKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG4vKiBHYW1lYm9hcmRzIE1haW4gQ29udGFpbmVyICovXG5cbi5nYW1lYm9hcmRzX21haW5fY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA0cmVtO1xuXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xuICBmb250LXdlaWdodDogYm9sZDtcbn1cblxuLmdhbWVib2FyZHNfbWFpbl9jb250YWluZXIgPiAqIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC8qIGdhcDogMC41cmVtOyAqL1xufVxuXG4ucGxheWVyX3RpdGxlIHtcbiAgd2lkdGg6IDMwcmVtO1xuICBib3JkZXI6IDAuNHJlbSBzb2xpZCB2YXIoLS1oZWFkZXItZGFyay1ncmV5KTtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0tZGFyay1ncmV5KTtcbiAgLyogcGFkZGluZy1sZWZ0OiAxcmVtOyAqL1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi8qICoqKioqKioqKioqKioqKioqKioqKioqKiogKi9cblxuLyogR2FtZWJvYXJkIENvbnRhaW5lciAqL1xuLmdhbWVib2FyZHNfY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAycmVtO1xufVxuXG4uaHVtYW5fZ2FtZWJvYXJkX2NvbnRhaW5lcixcbi5jb21wdXRlcl9nYW1lYm9hcmRfY29udGFpbmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIC8qIGJvcmRlcjogMjRweCBncm9vdmUgIzcyNzI3ODsgKi9cbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cbiAgYm9yZGVyOiAwLjRyZW0gc29saWQgdmFyKC0taGVhZGVyLWRhcmstZ3JleSk7XG4gIGJveC1zaGFkb3c6IHZhcigtLWdhbWVib2FyZC1ib3gtc2hhZG93KTtcblxuICB3aWR0aDogMzByZW07XG4gIGhlaWdodDogMzByZW07XG5cbiAgZGlzcGxheTogZ3JpZDtcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIG1pbm1heCgxMHB4LCAxZnIpKTtcbiAgZ3JpZC1hdXRvLXJvd3M6IDFmcjtcblxuICBvcGFjaXR5OiAwLjk7XG59XG4uaHVtYW5fZ2FtZWJvYXJkX2NvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigwLCAxMzIsIDI1MSk7XG5cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO1xuXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcbiAgYmFja2dyb3VuZC1zaXplOiA0MiU7XG59XG4uY29tcHV0ZXJfZ2FtZWJvYXJkX2NvbnRhaW5lciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICM0NTBhMGE7XG5cbiAgYmFja2dyb3VuZC1pbWFnZTogdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fX30pO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogbm8tcmVwZWF0O1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgNDUlO1xuICBiYWNrZ3JvdW5kLXNpemU6IDMwJTtcbn1cblxuLmh1bWFuX2dhbWVib2FyZF9jb250YWluZXIuaGFzX3dvbixcbi5jb21wdXRlcl9nYW1lYm9hcmRfY29udGFpbmVyLmhhc193b24ge1xuICBib3JkZXItY29sb3I6IGdyZWVuO1xuICBib3JkZXItcmFkaXVzOiAzMHB4O1xufVxuXG4uaHVtYW5fZ2FtZWJvYXJkX2NvbnRhaW5lci5oYXNfbG9zdCxcbi5jb21wdXRlcl9nYW1lYm9hcmRfY29udGFpbmVyLmhhc19sb3N0IHtcbiAgYm9yZGVyLWNvbG9yOiByZWQ7XG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XG59XG5cbi8qIHBvaW50ZXIgZXZlbnRzIGFsbG93ZWQgb25seSBvbiBjb21wdXRlciBib2FyZCBkdXJpbmcgaHVtYW4gdHVybiAqL1xuLmh1bWFuX2dhbWVib2FyZF9jb250YWluZXIsXG4uY29tcHV0ZXJfZ2FtZWJvYXJkX2NvbnRhaW5lciB7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICBjdXJzb3I6IG5vdC1hbGxvd2VkO1xufVxuLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXIuYWN0aXZlX3BsYXllcnNfZW5lbXkge1xuICBwb2ludGVyLWV2ZW50czogYWxsO1xufVxuXG4vKiBHYW1lYm9hcmQgVGlsZXMgKi9cblxuLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXIgLnRpbGUuaGFzX3NoaXA6bm90KC5zdW5rX3NoaXApIHtcbiAgYmFja2dyb3VuZDogbm9uZTtcbiAgYm9yZGVyOiB2YXIoLS10aWxlLWJvcmRlcik7XG4gIGFuaW1hdGlvbjogbm9uZTtcbiAgYm9yZGVyLXJhZGl1czogMCAhaW1wb3J0YW50O1xufVxuLyogLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXIgLnRpbGUuaGFzX3NoaXAuc3Vua19zaGlwIHtcbiAgYmFja2dyb3VuZDogaW5oZXJpdDtcbn0gKi9cblxuLnRpbGUge1xuICBhc3BlY3QtcmF0aW86IDEgLyAxO1xuICBib3JkZXI6IHZhcigtLXRpbGUtYm9yZGVyKTtcbiAgdHJhbnNpdGlvbi1kdXJhdGlvbjogMC40cztcblxuICBjdXJzb3I6IGNyb3NzaGFpcjtcbn1cblxuLnRpbGUuaGl0IHtcbiAgLyogYmFja2dyb3VuZC1jb2xvcjogcmVkOyAqL1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuLnRpbGUuaGl0OmhvdmVyIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcbn1cblxuLnRpbGUuaGFzX3NoaXAge1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6IGxpdmlkO1xuICBib3JkZXI6IDZweCB2YXIoLS1idXR0b24taG92ZXItZ3JleSkgc29saWQ7XG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1saWdodC1ncmV5KTtcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogY2VudGVyO1xuICAvKiBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7ICovXG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG5cbiAgYW5pbWF0aW9uOiBmbG9hdCA0cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcblxuICAvKiBwYWRkaW5nOiA1cHg7ICovXG59XG4udGlsZS5oYXNfc2hpcC54X2F4aXMge1xuICBhbmltYXRpb246IGZsb2F0LXktYXhpcyA0cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcbn1cbi50aWxlLmhhc19zaGlwLnlfYXhpcyB7XG4gIGFuaW1hdGlvbjogZmxvYXQteC1heGlzIDRzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xufVxuXG4udGlsZS5oYXNfc2hpcC5oZWFkX3RpbGUuc3Vua19zaGlwOm5vdCg6aG92ZXIpIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGVhZGVyLWRhcmstZ3JleSk7XG4gIGJhY2tncm91bmQtaW1hZ2U6IG5vbmU7XG59XG5cbi50aWxlLmhhc19zaGlwLmhlYWRfdGlsZS54X2F4aXMge1xuICBib3JkZXItcmFkaXVzOiA0MHB4IDk5OWVtIDk5OWVtIDQwcHg7XG59XG4udGlsZS5oYXNfc2hpcC5oZWFkX3RpbGUueV9heGlzIHtcbiAgYm9yZGVyLXJhZGl1czogOTk5ZW0gOTk5ZW0gNDBweCA0MHB4O1xufVxuXG4udGlsZTpob3Zlcjpub3QoLmhpdCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiBiaXNxdWUgIWltcG9ydGFudDtcbn1cbi8qICoqKioqKioqKioqKioqKiAqL1xuXG4vKiBoaXQgdGlsZXMgKi9cblxuLnRpbGUuaGl0IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLnRpbGUuaGl0OjphZnRlciB7XG4gIGNvbnRlbnQ6IFwiXCI7XG4gIHdpZHRoOiAyNXB4O1xuICBoZWlnaHQ6IDI1cHg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiA1MCU7XG4gIGxlZnQ6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG4gIC8qIG1hcmdpbjogLThweDsgKi9cbiAgYm9yZGVyLXJhZGl1czogNTAlO1xufVxuLnRpbGUuaGl0LmhpdF9zdWNjZXNzZnVsOjphZnRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJlZDtcbn1cbi50aWxlLmhpdC5oaXRfbWlzc2VkOjphZnRlciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xufVxuLyogKioqKioqKioqICovXG5cbi8qIHZpY3Rvcnkgc2NyZWVuICovXG5cbi52aWN0b3J5X3NjcmVlbl9jb250YWluZXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMzAlO1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xuICB0cmFuc2l0aW9uOiAyMDBtcztcbiAgYm9yZGVyLXJhZGl1czogdmFyKC0tYm9yZGVyX3JhZGl1cyk7XG4gIHotaW5kZXg6IDEwO1xuXG4gIC8qIHdpZHRoOiA1MDBweDtcbiAgbWF4LXdpZHRoOiA4MCU7XG4gIGhlaWdodDogMzAwcHg7XG4gIG1heC1oZWlnaHQ6IDgwJTsgKi9cblxuICB3aWR0aDogMzIwcHg7XG4gIGhlaWdodDogMTAwcHg7XG5cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAvKiBwYWRkaW5nOiA0MHB4IDMwcHg7ICovXG5cbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgZ2FwOiAxLjJyZW07XG59XG4udmljdG9yeV9zY3JlZW5fY29udGFpbmVyLmFjdGl2ZSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDEpO1xufVxuXG4udmljdG9yeV9zY3JlZW5fY29udGFpbmVyIGltZyB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbiAgYm9yZGVyOiA4cHggdHJhbnNwYXJlbnQgc29saWQ7XG59XG4udmljdG9yeV9zY3JlZW5fY29udGFpbmVyIGltZy5hY3RpdmUge1xuICB2aXNpYmlsaXR5OiBpbmhlcml0O1xuXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMS41cztcbiAgYW5pbWF0aW9uLW5hbWU6IGNoYW5nZVNjYWxlO1xuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xuICBhbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uOiBlYXNlLWluLW91dDtcblxuICBjdXJzb3I6IHBvaW50ZXI7XG59XG4udmljdG9yeV9zY3JlZW5fY29udGFpbmVyIGltZy5hY3RpdmU6aG92ZXIge1xuICBib3JkZXItY29sb3I6IHJnYigwLCAxMzIsIDI1MSk7XG59XG5cbi5vdmVybGF5IHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3R0b206IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44NSk7XG4gIG9wYWNpdHk6IDA7XG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuLm92ZXJsYXkuYWN0aXZlIHtcbiAgb3BhY2l0eTogMTtcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcbn1cblxuLyogKioqKioqKioqKioqKiogKi9cbmAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9pbmRleC5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSwwQkFBMEI7RUFDMUIsdUJBQXVCO0VBQ3ZCLHVDQUF1QztFQUN2Qyx5Q0FBeUM7RUFDekMsNEJBQTRCO0VBQzVCLHdCQUF3QjtFQUN4QixvQkFBb0I7RUFDcEIsMkJBQTJCOztFQUUzQjs7Ozt1RUFJcUU7O0VBRXJFOzt1RUFFcUU7O0VBRXJFOzs7O0dBSUM7O0VBRUQ7K0JBQzZCOztFQUU3QixxQkFBcUI7RUFDckIscUJBQXFCO0VBQ3JCLGlDQUFpQzs7RUFFakMsZUFBZTtBQUNqQjs7QUFFQTtFQUNFO0lBQ0Usd0JBQXdCO0lBQ3hCLGdDQUFnQztFQUNsQzs7RUFFQTtJQUNFLHdDQUF3QztJQUN4QyxnREFBZ0Q7RUFDbEQ7O0VBRUE7SUFDRSx3QkFBd0I7SUFDeEIsZ0NBQWdDO0VBQ2xDO0FBQ0Y7O0FBRUE7RUFDRTtJQUNFLHdCQUF3QjtJQUN4QixnQ0FBZ0M7RUFDbEM7O0VBRUE7SUFDRSx3Q0FBd0M7SUFDeEMsZ0RBQWdEO0VBQ2xEOztFQUVBO0lBQ0Usd0JBQXdCO0lBQ3hCLGdDQUFnQztFQUNsQztBQUNGOztBQUVBO0VBQ0U7SUFDRSxtQkFBbUI7RUFDckI7RUFDQTtJQUNFLHFCQUFxQjtFQUN2QjtBQUNGOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysa0JBQWtCOztFQUVsQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxZQUFZO0VBQ1osYUFBYTtFQUNiLGlCQUFpQjtFQUNqQixlQUFlO0VBQ2YsT0FBTztFQUNQLFFBQVE7RUFDUixNQUFNO0VBQ04sU0FBUztFQUNULFdBQVc7O0VBRVgsYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7RUFDbkIsbUJBQW1CO0FBQ3JCOztBQUVBLFdBQVc7O0FBRVg7RUFDRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixlQUFlO0VBQ2Ysb0NBQW9DO0VBQ3BDOzt5QkFFdUI7RUFDdkIsOEJBQThCO0VBQzlCLG9DQUFvQzs7RUFFcEMsdUNBQXVDO0FBQ3pDOztBQUVBOzs7O0dBSUc7O0FBRUg7O0VBRUUsYUFBYTtFQUNiLHVCQUF1QjtFQUN2QixtQkFBbUI7O0VBRW5CLGdDQUFnQztFQUNoQyx3QkFBd0I7RUFDeEIsU0FBUzs7RUFFVCxpQkFBaUI7RUFDakIsaUJBQWlCO0FBQ25COztBQUVBOztHQUVHOztBQUVIO0VBQ0UsWUFBWTtFQUNaLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFlBQVk7RUFDWixvQ0FBb0M7O0VBRXBDLGtCQUFrQjtFQUNsQixxQ0FBcUM7RUFDckMsa0JBQWtCO0VBQ2xCLHFCQUFxQjtFQUNyQixlQUFlO0VBQ2YsNkJBQTZCO0VBQzdCLGlCQUFpQjtFQUNqQixvQkFBb0I7RUFDcEIsZUFBZTtFQUNmLGlCQUFpQjtFQUNqQixrQkFBa0I7RUFDbEIscUJBQXFCO0VBQ3JCLGVBQWU7RUFDZix5QkFBeUI7RUFDekIsaUNBQWlDLEVBQUUsV0FBVztBQUNoRDs7QUFFQTtFQUNFLHlCQUF5QjtFQUN6QiwwQ0FBMEM7QUFDNUM7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsY0FBYztFQUNkLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsT0FBTztFQUNQLE1BQU07RUFDTixXQUFXO0VBQ1gsWUFBWTtFQUNaLFVBQVU7RUFDVixvQkFBb0I7RUFDcEIsNkNBQTZDO0FBQy9DOztBQUVBO0VBQ0UsMENBQTBDO0VBQzFDLGtCQUFrQjtFQUNsQixrQkFBa0I7RUFDbEIsT0FBTztFQUNQLE1BQU07RUFDTixVQUFVO0VBQ1YsY0FBYztBQUNoQjs7QUFFQTtFQUNFLFFBQVE7QUFDVjtBQUNBLFdBQVc7O0FBRVgsMkJBQTJCO0FBQzNCO0VBQ0UsYUFBYTtFQUNiLFNBQVM7RUFDVCxnQkFBZ0I7RUFDaEIsbUJBQW1CO0FBQ3JCO0FBQ0E7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUEsMkJBQTJCOztBQUUzQiw4QkFBOEI7O0FBRTlCO0VBQ0UsYUFBYTtFQUNiLFNBQVM7O0VBRVQsaUJBQWlCO0VBQ2pCLGlCQUFpQjtBQUNuQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsdUJBQXVCO0VBQ3ZCLG1CQUFtQjtFQUNuQixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSxZQUFZO0VBQ1osNENBQTRDO0VBQzVDLGtDQUFrQztFQUNsQyx3QkFBd0I7RUFDeEIsa0JBQWtCO0FBQ3BCOztBQUVBLDhCQUE4Qjs7QUFFOUIsd0JBQXdCO0FBQ3hCO0VBQ0UsYUFBYTtFQUNiLFNBQVM7QUFDWDs7QUFFQTs7RUFFRSx1QkFBdUI7RUFDdkIsaUNBQWlDO0VBQ2pDLDRCQUE0QjtFQUM1Qiw0Q0FBNEM7RUFDNUMsdUNBQXVDOztFQUV2QyxZQUFZO0VBQ1osYUFBYTs7RUFFYixhQUFhO0VBQ2Isb0RBQW9EO0VBQ3BELG1CQUFtQjs7RUFFbkIsWUFBWTtBQUNkO0FBQ0E7RUFDRSxrQ0FBa0M7O0VBRWxDLHlEQUE0RDs7RUFFNUQsNEJBQTRCO0VBQzVCLDJCQUEyQjtFQUMzQixvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLHlCQUF5Qjs7RUFFekIseURBQTJEO0VBQzNELDRCQUE0QjtFQUM1Qiw0QkFBNEI7RUFDNUIsb0JBQW9CO0FBQ3RCOztBQUVBOztFQUVFLG1CQUFtQjtFQUNuQixtQkFBbUI7QUFDckI7O0FBRUE7O0VBRUUsaUJBQWlCO0VBQ2pCLG1CQUFtQjtBQUNyQjs7QUFFQSxvRUFBb0U7QUFDcEU7O0VBRUUsb0JBQW9CO0VBQ3BCLG1CQUFtQjtBQUNyQjtBQUNBO0VBQ0UsbUJBQW1CO0FBQ3JCOztBQUVBLG9CQUFvQjs7QUFFcEI7RUFDRSxnQkFBZ0I7RUFDaEIsMEJBQTBCO0VBQzFCLGVBQWU7RUFDZiwyQkFBMkI7QUFDN0I7QUFDQTs7R0FFRzs7QUFFSDtFQUNFLG1CQUFtQjtFQUNuQiwwQkFBMEI7RUFDMUIseUJBQXlCOztFQUV6QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0Isb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0Usc0JBQXNCO0FBQ3hCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLG1CQUFtQjtFQUNuQiwwQ0FBMEM7RUFDMUMsMENBQTBDO0VBQzFDLDJCQUEyQjtFQUMzQiwyQkFBMkI7RUFDM0Isc0JBQXNCO0VBQ3RCLDRCQUE0Qjs7RUFFNUIsd0NBQXdDOztFQUV4QyxrQkFBa0I7QUFDcEI7QUFDQTtFQUNFLCtDQUErQztBQUNqRDtBQUNBO0VBQ0UsK0NBQStDO0FBQ2pEOztBQUVBO0VBQ0UseUNBQXlDO0VBQ3pDLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLG9DQUFvQztBQUN0QztBQUNBO0VBQ0Usb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsbUNBQW1DO0FBQ3JDO0FBQ0Esb0JBQW9COztBQUVwQixjQUFjOztBQUVkO0VBQ0Usa0JBQWtCO0FBQ3BCO0FBQ0E7RUFDRSxXQUFXO0VBQ1gsV0FBVztFQUNYLFlBQVk7RUFDWixrQkFBa0I7RUFDbEIsUUFBUTtFQUNSLFNBQVM7RUFDVCxnQ0FBZ0M7RUFDaEMsa0JBQWtCO0VBQ2xCLGtCQUFrQjtBQUNwQjtBQUNBO0VBQ0UscUJBQXFCO0FBQ3ZCO0FBQ0E7RUFDRSx1QkFBdUI7QUFDekI7QUFDQSxjQUFjOztBQUVkLG1CQUFtQjs7QUFFbkI7RUFDRSxlQUFlO0VBQ2YsUUFBUTtFQUNSLFNBQVM7RUFDVCx5Q0FBeUM7RUFDekMsaUJBQWlCO0VBQ2pCLG1DQUFtQztFQUNuQyxXQUFXOztFQUVYOzs7b0JBR2tCOztFQUVsQixZQUFZO0VBQ1osYUFBYTs7RUFFYixhQUFhO0VBQ2Isc0JBQXNCOztFQUV0Qix3QkFBd0I7O0VBRXhCLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsV0FBVztBQUNiO0FBQ0E7RUFDRSx5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsNkJBQTZCO0FBQy9CO0FBQ0E7RUFDRSxtQkFBbUI7O0VBRW5CLHdCQUF3QjtFQUN4QiwyQkFBMkI7RUFDM0IsbUNBQW1DO0VBQ25DLDhCQUE4QjtFQUM5QixzQ0FBc0M7O0VBRXRDLGVBQWU7QUFDakI7QUFDQTtFQUNFLDhCQUE4QjtBQUNoQzs7QUFFQTtFQUNFLGVBQWU7RUFDZixNQUFNO0VBQ04sT0FBTztFQUNQLFFBQVE7RUFDUixTQUFTO0VBQ1QscUNBQXFDO0VBQ3JDLFVBQVU7RUFDVixvQkFBb0I7QUFDdEI7QUFDQTtFQUNFLFVBQVU7RUFDVixtQkFBbUI7QUFDckI7O0FBRUEsbUJBQW1CXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIjpyb290IHtcXG4gIC0tcmEyLW1lbnUteWVsbG93OiAjZjhmYjAxO1xcbiAgLS1yYTItbWVudS1yZWQ6ICNiNjAxMDA7XFxuICAtLWhlYWRlci1saWdodC1ncmV5OiByZ2IoMTM5LCAxNDcsIDE1NCk7XFxuICAtLWhlYWRlci1kYXJrLWdyZXk6IHJnYmEoOTEsIDEwMCwgMTAzLCAxKTtcXG4gIC0tYnV0dG9uLWhvdmVyLWdyZXk6ICMzYTNhM2E7XFxuICAtLW5ldXRyYWwtYmxhY2s6ICMxMjEyMTI7XFxuICAtLWRhcmstZ3JleTogIzIzMjMyMztcXG4gIC0tZm9udF9jb2xvcl93aGl0ZTogI2U4ZTZlMztcXG5cXG4gIC0tYnV0dG9uLWJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4xNykgMHB4IC0yM3B4IDI1cHggMHB4IGluc2V0LFxcbiAgICByZ2JhKDAsIDAsIDAsIDAuMTUpIDBweCAtMzZweCAzMHB4IDBweCBpbnNldCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjEpIDBweCAtNzlweCA0MHB4IDBweCBpbnNldCwgcmdiYSgwLCAwLCAwLCAwLjA2KSAwcHggMnB4IDFweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjA5KSAwcHggNHB4IDJweCwgcmdiYSgwLCAwLCAwLCAwLjA5KSAwcHggOHB4IDRweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjA5KSAwcHggMTZweCA4cHgsIHJnYmEoMCwgMCwgMCwgMC4wOSkgMHB4IDMycHggMTZweDtcXG5cXG4gIC0tYnV0dG9uLWhvdmVyLWJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yNSkgMHB4IDU0cHggNTVweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjEyKSAwcHggLTEycHggMzBweCwgcmdiYSgwLCAwLCAwLCAwLjEyKSAwcHggNHB4IDZweCxcXG4gICAgcmdiYSgwLCAwLCAwLCAwLjE3KSAwcHggMTJweCAxM3B4LCByZ2JhKDAsIDAsIDAsIDAuMDkpIDBweCAtM3B4IDVweDtcXG5cXG4gIC0taGVhZGVyLWJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChcXG4gICAgOTBkZWcsXFxuICAgIHJnYmEoMTM5LCAxNDcsIDE1NCwgMSkgMCUsXFxuICAgIHJnYmEoOTEsIDEwMCwgMTAzLCAxKSAxMDAlXFxuICApO1xcblxcbiAgLS1nYW1lYm9hcmQtYm94LXNoYWRvdzogMCAycHggM3B4ICMyOTI5MjksIDAgMCA3N3B4IGJsYWNrIGluc2V0LFxcbiAgICA1cHggLTVweCA0NHB4ICMyOTI5MjkgaW5zZXQ7XFxuXFxuICAtLWZsb2F0LXNpemU6IDAuMTVyZW07XFxuICAtLWJvcmRlcl9yYWRpdXM6IDEwcHg7XFxuICAtLXRpbGUtYm9yZGVyOiAwLjVweCBzaWx2ZXIgc29saWQ7XFxuXFxuICBmb250LXNpemU6IDE2cHg7XFxufVxcblxcbkBrZXlmcmFtZXMgZmxvYXQteS1heGlzIHtcXG4gIDAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcXG4gIH1cXG5cXG4gIDUwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWSh2YXIoLS1mbG9hdC1zaXplKSk7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKHZhcigtLWZsb2F0LXNpemUpKTtcXG4gIH1cXG5cXG4gIDEwMCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCk7XFxuICAgIC13ZWJraXQtdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDApO1xcbiAgfVxcbn1cXG5cXG5Aa2V5ZnJhbWVzIGZsb2F0LXgtYXhpcyB7XFxuICAwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gICAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoMCk7XFxuICB9XFxuXFxuICA1MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgodmFyKC0tZmxvYXQtc2l6ZSkpO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCh2YXIoLS1mbG9hdC1zaXplKSk7XFxuICB9XFxuXFxuICAxMDAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKDApO1xcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgwKTtcXG4gIH1cXG59XFxuXFxuQGtleWZyYW1lcyBjaGFuZ2VTY2FsZSB7XFxuICBmcm9tIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxKTtcXG4gIH1cXG4gIHRvIHtcXG4gICAgdHJhbnNmb3JtOiBzY2FsZSgxLjIpO1xcbiAgfVxcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZzogMDtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG5cXG4gIGNvbG9yOiB2YXIoLS1yYTItbWVudS15ZWxsb3cpO1xcbn1cXG5cXG4uYmFja2dyb3VuZF92aWRlbyB7XFxuICB3aWR0aDogMTAwdnc7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgb2JqZWN0LWZpdDogY292ZXI7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBsZWZ0OiAwO1xcbiAgcmlnaHQ6IDA7XFxuICB0b3A6IDA7XFxuICBib3R0b206IDA7XFxuICB6LWluZGV4OiAtMTtcXG5cXG4gIG9wYWNpdHk6IDAuMTU7XFxufVxcblxcbi5tYWluX2NvbnRhaW5lciA+ICoge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIC8qIHBhZGRpbmc6IDFyZW07ICovXFxufVxcblxcbi8qIEhlYWRlciAqL1xcblxcbi5oZWFkZXJfY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZzogMC41cmVtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbiAgLyogYmFja2dyb3VuZC1pbWFnZTogdXJsKC4uL2Fzc2V0cy9pbWFnZXMvZHJlYWRub3VnaHQuanBnKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtc2l6ZTogMTUlOyAqL1xcbiAgYmFja2dyb3VuZDogcmdiKDEzOSwgMTQ3LCAxNTQpO1xcbiAgYmFja2dyb3VuZDogdmFyKC0taGVhZGVyLWJhY2tncm91bmQpO1xcblxcbiAgYm94LXNoYWRvdzogdmFyKC0tZ2FtZWJvYXJkLWJveC1zaGFkb3cpO1xcbn1cXG5cXG4vKiAubGVmdF9zaWRlX2J1dHRvbnNfY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufSAqL1xcblxcbi5yaWdodF9zaWRlX2hlYWRlcl9jb250YWluZXIsXFxuLmxlZnRfc2lkZV9idXR0b25zX2NvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgLyogbmVnYXRpbmcgdGhlIHBhcmVudCBwYWRkaW5nICovXFxuICAvKiBtYXJnaW4tbGVmdDogLTFyZW07ICovXFxuICBnYXA6IDFyZW07XFxuXFxuICBmb250LXNpemU6IDEuN3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4vKiAucmlnaHRfc2lkZV9oZWFkZXJfY29udGFpbmVyIGltZyB7XFxuICBoZWlnaHQ6IDJyZW07XFxufSAqL1xcblxcbi5idXR0b24gaW1nIHtcXG4gIGhlaWdodDogMnJlbTtcXG4gIGNvbG9yOiB2YXIoLS1yYTItbWVudS15ZWxsb3cpO1xcbn1cXG5cXG4uYnV0dG9uIHtcXG4gIGJvcmRlcjogbm9uZTtcXG4gIGJveC1zaGFkb3c6IHZhcigtLWJ1dHRvbi1ib3gtc2hhZG93KTtcXG5cXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLXJhMi1tZW51LXJlZCk7XFxuICBib3JkZXItcmFkaXVzOiA0ZW07XFxuICAvKiBmb250LXNpemU6IDE2cHg7ICovXFxuICBmb250LXNpemU6IDFyZW07XFxuICBjb2xvcjogdmFyKC0tcmEyLW1lbnUteWVsbG93KTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgcGFkZGluZzogMC44ZW0gMS44ZW07XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICB1c2VyLXNlbGVjdDogbm9uZTtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7XFxuICAtd2Via2l0LXRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7IC8qIFNhZmFyaSAqL1xcbn1cXG5cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuMXM7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1idXR0b24taG92ZXItZ3JleSk7XFxufVxcblxcbi5idXR0b246YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDRlbTtcXG4gIGxlZnQ6IDA7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC41cztcXG4gIGJveC1zaGFkb3c6IDAgMCAxMHB4IDQwcHggdmFyKC0tcmEyLW1lbnUtcmVkKTtcXG59XFxuXFxuLmJ1dHRvbjphY3RpdmU6YWZ0ZXIge1xcbiAgYm94LXNoYWRvdzogMCAwIDAgMCB2YXIoLS1yYTItbWVudS15ZWxsb3cpO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyLXJhZGl1czogNGVtO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDtcXG4gIG9wYWNpdHk6IDE7XFxuICB0cmFuc2l0aW9uOiAwcztcXG59XFxuXFxuLmJ1dHRvbjphY3RpdmUge1xcbiAgdG9wOiAxcHg7XFxufVxcbi8qICoqKioqKiAqL1xcblxcbi8qIFN0YXJ0IGFuZCBSZXNldCBCdXR0b25zKi9cXG4uc3RhcnRfYnV0dG9uc19jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMnJlbTtcXG4gIG1hcmdpbi10b3A6IDFyZW07XFxuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xcbn1cXG4uc3RhcnRfYnV0dG9uc19jb250YWluZXIgPiAuaW5hY3RpdmUge1xcbiAgdmlzaWJpbGl0eTogaGlkZGVuO1xcbn1cXG5cXG4vKiAqKioqKioqKioqKioqKioqKioqKioqKiovXFxuXFxuLyogR2FtZWJvYXJkcyBNYWluIENvbnRhaW5lciAqL1xcblxcbi5nYW1lYm9hcmRzX21haW5fY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDRyZW07XFxuXFxuICBmb250LXNpemU6IDEuM3JlbTtcXG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xcbn1cXG5cXG4uZ2FtZWJvYXJkc19tYWluX2NvbnRhaW5lciA+ICoge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAvKiBnYXA6IDAuNXJlbTsgKi9cXG59XFxuXFxuLnBsYXllcl90aXRsZSB7XFxuICB3aWR0aDogMzByZW07XFxuICBib3JkZXI6IDAuNHJlbSBzb2xpZCB2YXIoLS1oZWFkZXItZGFyay1ncmV5KTtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWRhcmstZ3JleSk7XFxuICAvKiBwYWRkaW5nLWxlZnQ6IDFyZW07ICovXFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi8qICoqKioqKioqKioqKioqKioqKioqKioqKiogKi9cXG5cXG4vKiBHYW1lYm9hcmQgQ29udGFpbmVyICovXFxuLmdhbWVib2FyZHNfY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBnYXA6IDJyZW07XFxufVxcblxcbi5odW1hbl9nYW1lYm9hcmRfY29udGFpbmVyLFxcbi5jb21wdXRlcl9nYW1lYm9hcmRfY29udGFpbmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgLyogYm9yZGVyOiAyNHB4IGdyb292ZSAjNzI3Mjc4OyAqL1xcbiAgLyogYm94LXNpemluZzogYm9yZGVyLWJveDsgKi9cXG4gIGJvcmRlcjogMC40cmVtIHNvbGlkIHZhcigtLWhlYWRlci1kYXJrLWdyZXkpO1xcbiAgYm94LXNoYWRvdzogdmFyKC0tZ2FtZWJvYXJkLWJveC1zaGFkb3cpO1xcblxcbiAgd2lkdGg6IDMwcmVtO1xcbiAgaGVpZ2h0OiAzMHJlbTtcXG5cXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgbWlubWF4KDEwcHgsIDFmcikpO1xcbiAgZ3JpZC1hdXRvLXJvd3M6IDFmcjtcXG5cXG4gIG9wYWNpdHk6IDAuOTtcXG59XFxuLmh1bWFuX2dhbWVib2FyZF9jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDAsIDEzMiwgMjUxKTtcXG5cXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9hc3NldHMvaW1hZ2VzL3JhMl9hbGxpZWRfbG9nby53ZWJwKTtcXG5cXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDQyJTtcXG59XFxuLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQ1MGEwYTtcXG5cXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybCguLi9hc3NldHMvaW1hZ2VzL3JhMl9zb3ZpZXRfbG9nby5wbmcpO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSA0NSU7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDMwJTtcXG59XFxuXFxuLmh1bWFuX2dhbWVib2FyZF9jb250YWluZXIuaGFzX3dvbixcXG4uY29tcHV0ZXJfZ2FtZWJvYXJkX2NvbnRhaW5lci5oYXNfd29uIHtcXG4gIGJvcmRlci1jb2xvcjogZ3JlZW47XFxuICBib3JkZXItcmFkaXVzOiAzMHB4O1xcbn1cXG5cXG4uaHVtYW5fZ2FtZWJvYXJkX2NvbnRhaW5lci5oYXNfbG9zdCxcXG4uY29tcHV0ZXJfZ2FtZWJvYXJkX2NvbnRhaW5lci5oYXNfbG9zdCB7XFxuICBib3JkZXItY29sb3I6IHJlZDtcXG4gIGJvcmRlci1yYWRpdXM6IDMwcHg7XFxufVxcblxcbi8qIHBvaW50ZXIgZXZlbnRzIGFsbG93ZWQgb25seSBvbiBjb21wdXRlciBib2FyZCBkdXJpbmcgaHVtYW4gdHVybiAqL1xcbi5odW1hbl9nYW1lYm9hcmRfY29udGFpbmVyLFxcbi5jb21wdXRlcl9nYW1lYm9hcmRfY29udGFpbmVyIHtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgY3Vyc29yOiBub3QtYWxsb3dlZDtcXG59XFxuLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXIuYWN0aXZlX3BsYXllcnNfZW5lbXkge1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuLyogR2FtZWJvYXJkIFRpbGVzICovXFxuXFxuLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXIgLnRpbGUuaGFzX3NoaXA6bm90KC5zdW5rX3NoaXApIHtcXG4gIGJhY2tncm91bmQ6IG5vbmU7XFxuICBib3JkZXI6IHZhcigtLXRpbGUtYm9yZGVyKTtcXG4gIGFuaW1hdGlvbjogbm9uZTtcXG4gIGJvcmRlci1yYWRpdXM6IDAgIWltcG9ydGFudDtcXG59XFxuLyogLmNvbXB1dGVyX2dhbWVib2FyZF9jb250YWluZXIgLnRpbGUuaGFzX3NoaXAuc3Vua19zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGluaGVyaXQ7XFxufSAqL1xcblxcbi50aWxlIHtcXG4gIGFzcGVjdC1yYXRpbzogMSAvIDE7XFxuICBib3JkZXI6IHZhcigtLXRpbGUtYm9yZGVyKTtcXG4gIHRyYW5zaXRpb24tZHVyYXRpb246IDAuNHM7XFxuXFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXG59XFxuXFxuLnRpbGUuaGl0IHtcXG4gIC8qIGJhY2tncm91bmQtY29sb3I6IHJlZDsgKi9cXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4udGlsZS5oaXQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG59XFxuXFxuLnRpbGUuaGFzX3NoaXAge1xcbiAgYm9yZGVyLXN0eWxlOiBzb2xpZDtcXG4gIGJvcmRlci1jb2xvcjogbGl2aWQ7XFxuICBib3JkZXI6IDZweCB2YXIoLS1idXR0b24taG92ZXItZ3JleSkgc29saWQ7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1oZWFkZXItbGlnaHQtZ3JleSk7XFxuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBjZW50ZXI7XFxuICAvKiBiYWNrZ3JvdW5kLXNpemU6IDEwMCU7ICovXFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG5cXG4gIGFuaW1hdGlvbjogZmxvYXQgNHMgaW5maW5pdGUgZWFzZS1pbi1vdXQ7XFxuXFxuICAvKiBwYWRkaW5nOiA1cHg7ICovXFxufVxcbi50aWxlLmhhc19zaGlwLnhfYXhpcyB7XFxuICBhbmltYXRpb246IGZsb2F0LXktYXhpcyA0cyBpbmZpbml0ZSBlYXNlLWluLW91dDtcXG59XFxuLnRpbGUuaGFzX3NoaXAueV9heGlzIHtcXG4gIGFuaW1hdGlvbjogZmxvYXQteC1heGlzIDRzIGluZmluaXRlIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4udGlsZS5oYXNfc2hpcC5oZWFkX3RpbGUuc3Vua19zaGlwOm5vdCg6aG92ZXIpIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1kYXJrLWdyZXkpO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbm9uZTtcXG59XFxuXFxuLnRpbGUuaGFzX3NoaXAuaGVhZF90aWxlLnhfYXhpcyB7XFxuICBib3JkZXItcmFkaXVzOiA0MHB4IDk5OWVtIDk5OWVtIDQwcHg7XFxufVxcbi50aWxlLmhhc19zaGlwLmhlYWRfdGlsZS55X2F4aXMge1xcbiAgYm9yZGVyLXJhZGl1czogOTk5ZW0gOTk5ZW0gNDBweCA0MHB4O1xcbn1cXG5cXG4udGlsZTpob3Zlcjpub3QoLmhpdCkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmlzcXVlICFpbXBvcnRhbnQ7XFxufVxcbi8qICoqKioqKioqKioqKioqKiAqL1xcblxcbi8qIGhpdCB0aWxlcyAqL1xcblxcbi50aWxlLmhpdCB7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxufVxcbi50aWxlLmhpdDo6YWZ0ZXIge1xcbiAgY29udGVudDogXFxcIlxcXCI7XFxuICB3aWR0aDogMjVweDtcXG4gIGhlaWdodDogMjVweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogNTAlO1xcbiAgbGVmdDogNTAlO1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XFxuICAvKiBtYXJnaW46IC04cHg7ICovXFxuICBib3JkZXItcmFkaXVzOiA1MCU7XFxufVxcbi50aWxlLmhpdC5oaXRfc3VjY2Vzc2Z1bDo6YWZ0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xcbn1cXG4udGlsZS5oaXQuaGl0X21pc3NlZDo6YWZ0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxufVxcbi8qICoqKioqKioqKiAqL1xcblxcbi8qIHZpY3Rvcnkgc2NyZWVuICovXFxuXFxuLnZpY3Rvcnlfc2NyZWVuX2NvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDMwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xcbiAgdHJhbnNpdGlvbjogMjAwbXM7XFxuICBib3JkZXItcmFkaXVzOiB2YXIoLS1ib3JkZXJfcmFkaXVzKTtcXG4gIHotaW5kZXg6IDEwO1xcblxcbiAgLyogd2lkdGg6IDUwMHB4O1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgbWF4LWhlaWdodDogODAlOyAqL1xcblxcbiAgd2lkdGg6IDMyMHB4O1xcbiAgaGVpZ2h0OiAxMDBweDtcXG5cXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcblxcbiAgLyogcGFkZGluZzogNDBweCAzMHB4OyAqL1xcblxcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBnYXA6IDEuMnJlbTtcXG59XFxuLnZpY3Rvcnlfc2NyZWVuX2NvbnRhaW5lci5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxufVxcblxcbi52aWN0b3J5X3NjcmVlbl9jb250YWluZXIgaW1nIHtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIGJvcmRlcjogOHB4IHRyYW5zcGFyZW50IHNvbGlkO1xcbn1cXG4udmljdG9yeV9zY3JlZW5fY29udGFpbmVyIGltZy5hY3RpdmUge1xcbiAgdmlzaWJpbGl0eTogaW5oZXJpdDtcXG5cXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogMS41cztcXG4gIGFuaW1hdGlvbi1uYW1lOiBjaGFuZ2VTY2FsZTtcXG4gIGFuaW1hdGlvbi1pdGVyYXRpb24tY291bnQ6IGluZmluaXRlO1xcbiAgYW5pbWF0aW9uLWRpcmVjdGlvbjogYWx0ZXJuYXRlO1xcbiAgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1pbi1vdXQ7XFxuXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcbi52aWN0b3J5X3NjcmVlbl9jb250YWluZXIgaW1nLmFjdGl2ZTpob3ZlciB7XFxuICBib3JkZXItY29sb3I6IHJnYigwLCAxMzIsIDI1MSk7XFxufVxcblxcbi5vdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC44NSk7XFxuICBvcGFjaXR5OiAwO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcbi5vdmVybGF5LmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxO1xcbiAgcG9pbnRlci1ldmVudHM6IGFsbDtcXG59XFxuXFxuLyogKioqKioqKioqKioqKiogKi9cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vaW5kZXguY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9pbmRleC5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyJdLCJuYW1lcyI6WyJnZXRBSU1vdmUiLCJnZXRSYW5kb21Ob25IaXRUaWxlIiwiaHVtYW5Cb2FyZCIsImxhc3RIaXRIdW1hblRpbGUiLCJpc0JldHdlZW4wdG85IiwidmFsdWUiLCJnZXRIaXRUaWxlV2l0aE5vbnN1bmtTaGlwIiwicmVzdWx0VGlsZSIsIm91dGVyTG9vcCIsImkiLCJib2FyZFNpemUiLCJqIiwiY3VycmVudFRpbGUiLCJmdWxsQm9hcmQiLCJpc1RpbGVIaXQiLCJzaGlwSW5mbyIsImlzU3VuayIsImlzTm9uSGl0VGlsZUxlZnQiLCJFcnJvciIsInNlbGVjdGVkSGl0VGlsZSIsImhpdFNoaXAiLCJoaXRDb3VudCIsIlhfc3RhcnQiLCJYX2VuZCIsIllfc3RhcnQiLCJZX2VuZCIsImdldFNoaXBzSGl0VGlsZUNvb3JkaW5hdGVzIiwiaXNfWF9heGlzIiwic2VsZWN0ZWRfWCIsIlhfY29vciIsInNlbGVjdGVkX1kiLCJZX2Nvb3IiLCJtb3Zlc1RvQ2hlY2siLCJsZW5ndGgiLCJjdXJyZW50TW92ZV9YX2Nvb3IiLCJjdXJyZW50TW92ZV9ZX2Nvb3IiLCJ4IiwieSIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIkRPTV9HZW5lcmF0b3IiLCJnZW5lcmF0ZU1haW5HYW1lIiwibG9hZFNoaXBJbWFnZXMiLCJnYW1lIiwiY29uc3RydWN0b3IiLCJpbml0aWFsaXNlR2FtZV9ET00iLCJodW1hblBsYXllckJvYXJkX0NvbnRhaW5lciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImNvbXB1dGVyUGxheWVyQm9hcmRfQ29udGFpbmVyIiwiY3JlYXRlR2FtZWJvYXJkR3JpZHMiLCJuZXdHYW1lX0J1dHRvbiIsInN0YXJ0R2FtZV9CdXR0b24iLCJyZXNldEJvYXJkX0J1dHRvbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJuZXdHYW1lQnV0dG9uRXZlbnQiLCJzdGFydEdhbWVCdXR0b25FdmVudCIsInJlc2V0Qm9hcmRCdXR0b25FdmVudCIsImh1bWFuVmljdG9yeUltYWdlIiwiY29tcHV0ZXJWaWN0b3J5SW1hZ2UiLCJhZGRWaWRlb0JhY2tncm91bmRMb29wRGVsYXkiLCJ0YXJnZXRDb250YWluZXIiLCJodW1hbk9yQ29tcHV0ZXIiLCJkaW1lbnNpb24iLCJjaGlsZHJlbk9mQ29udGFpbmVyIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJlbGVtZW50IiwicmVtb3ZlIiwibmV3RGl2IiwiY3JlYXRlRWxlbWVudCIsImNsYXNzTGlzdCIsImFkZCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwidGlsZXMiLCJ0aWxlIiwiZXZlbnQiLCJjbGlja09uR2FtZWJvYXJkVGlsZSIsInRpbGVfeENvb3IiLCJ0YXJnZXQiLCJkYXRhc2V0IiwieF9jb29yIiwidGlsZV95Q29vciIsInlfY29vciIsInBsYXlSb3VuZCIsImh1bWFuUGxheWVyIiwiY29tcHV0ZXJQbGF5ZXIiLCJyZW1vdmVBY3RpdmVQbGF5ZXJUYWdUb0FJIiwiY29tcHV0ZXJCb2FyZERpdiIsImFkZEFjdGl2ZVBsYXllclRhZ3RvQUkiLCJ1cGRhdGVHYW1lYm9hcmQiLCJodW1hbkJvYXJkRGl2IiwiaXNIdW1hblR1cm4iLCJhY3RpdmVQbGF5ZXIiLCJzZWxlY3RvciIsImN1cnJlbnRIdW1hblRpbGVfRE9NIiwiY3VycmVudENvbXB1dGVyVGlsZV9ET00iLCJjdXJyZW50SHVtYW5UaWxlIiwicGxheWVyYm9hcmQiLCJjdXJyZW50Q29tcHV0ZXJUaWxlIiwiaGFzVGlsZVNoaXAiLCJzaGlwVHlwZSIsImVuZEdhbWVfRE9NIiwiaXNXaW5uZXJIdW1hbk9yQ29tcHV0ZXIiLCJ2aWN0b3J5U2NyZWVuIiwib3ZlcmxheSIsIm5ld0dhbWVBZnRlclZpY3RvcnkiLCJjbGVhckdhbWVib2FyZHNET00iLCJmaXJzdENoaWxkIiwicmVtb3ZlQ2hpbGQiLCJraXJvdlJlcG9ydGluZ0F1ZGlvIiwicGxheSIsInJlc2V0Q3VycmVudEdhbWVib2FyZHMiLCJ2aWRlbyIsIm15SGFuZGxlciIsImUiLCJjdXJyZW50VGltZSIsInBhdXNlIiwic2V0VGltZW91dCIsInBsYXlBdWRpbyIsImF1ZGlvIiwibWF4VGltZU91dCIsIlByb21pc2UiLCJyZXMiLCJwbGF5QXR0YWNrQXVkaW8iLCJwbGF5ZXIiLCJwcmlzbUF1ZGlvIiwidGVzbGFBdWRpbyIsInBsYXlBdHRhY2tIaXRBdWRpbyIsImlzSGl0IiwiYXR0YWNrU3VjY2Vzc2Z1bEF1ZGlvIiwiYXR0YWNrTWlzc2VkQXVkaW8iLCJkaXNhYmxlQm9keSIsImJvZHkiLCJjb25zb2xlIiwibG9nIiwiZW5hYmxlQm9keSIsIkdhbWVib2FyZFRpbGUiLCJHYW1lYm9hcmQiLCJhc3NpZ25TaGlwIiwic2hpcCIsImluaXRpYWxpc2VCb2FyZCIsImZsZWV0IiwiYm9hcmQiLCJyb3ciLCJwdXNoIiwicGxhY2VTaGlwIiwicmVjZWl2ZUF0dGFjayIsInRhcmdldFRpbGUiLCJ0YXJnZXRTaGlwIiwiaGl0IiwiaXNBbGxTaGlwc1N1bmsiLCJnZXRTaGlwc0Nvb3JkaW5hdGVzIiwiYWxsX1hfY29vciIsImFsbF9ZX2Nvb3IiLCJmaW5kTWluTWF4IiwibnVtYmVyc0FyciIsIkFycmF5IiwiaXNBcnJheSIsInNvcnRlZE51bWJlcnMiLCJzb3J0IiwiYSIsImIiLCJzbWFsbGVzdCIsImxhcmdlc3QiLCJnZXRTdW5rU2hpcFRpbGVzIiwiYWxsVGlsZXNPZlNoaXAiLCJTaGlwIiwiUGxheWVyIiwiR2FtZUNvbnRyb2xsZXIiLCJET00iLCJpbmFjdGl2ZVBsYXllciIsImdldE90aGVyUGxheWVyIiwiaW5pdGlhbGlzZUdhbWUiLCJzZXRFbmVteVBsYXllciIsImdlbmVyYXRlUmFuZG9tQm9hcmQiLCJzaGlwMSIsInNoaXAyIiwic2hpcDMiLCJzaGlwNCIsInNoaXA1Iiwic2hpcHNUb0FkZCIsImlzQWxsVGlsZXNGcmVlIiwiZ2V0UmFuZG9tQ29vcmRpbmF0ZXMiLCJzaGlwTGVuZ3RoIiwiaXNIb3Jpem9udGFsIiwicmFuZG9tQ29vcmRpbmF0ZXMiLCJzd2l0Y2hBY3RpdmVQbGF5ZXIiLCJhdHRhY2tFbmVteVBsYXllciIsInRhcmdldEJvYXJkIiwiZW5lbXlQbGF5ZXIiLCJpc0hpdFN1Y2Nlc3NmdWwiLCJlbmRHYW1lIiwibmV4dFJvdW5kX1hfY29vciIsIm5leHRSb3VuZF9ZX2Nvb3IiLCJ3aW5uaW5nUGxheWVyIiwicHJvdG90eXBlIiwiaW5pdGlhbGlzZVRlc3RHYW1lIiwidGVzdFBsYWNlU29tZVNoaXBzIiwiaW5pdGlhbGlzZVRlc3RHYW1lTm9TaGlwcyIsInRlc3RTaGlwMSIsInRlc3RTaGlwMiIsInRlc3RTaGlwMyIsImluaXRpYWxpc2VUZXN0R2FtZV9BSV9UZXN0IiwidGVzdFBsYWNlU29tZVNoaXBzX0FJX1Rlc3QiLCJpc015VHVybiIsImlzQXR0YWNrQWxsb3dlZCIsImdldExlbmd0aCIsImFkZEF1ZGlvQ29uZmlnIiwiZ2FtZWJvYXJkIiwiZ2FtZWJvYXJkQ29udGFpbmVyIiwiaXNYQXhpcyIsInNoaXBUaWxlcyIsInNlbGVjdG9yX2hlYWRUaWxlIiwiaGVhZFRpbGVzIiwic2hpcFRpbGUiLCJoZWFkVGlsZSIsImF1ZGlvQmFja2dyb3VuZCIsImF1ZGlvSWNvbk9uIiwiYXVkaW9JY29uT2ZmIiwic3R5bGUiLCJkaXNwbGF5IiwiYXVkaW9CdXR0b24iLCJ0b2dnbGVQbGF5IiwicGF1c2VkIl0sInNvdXJjZVJvb3QiOiIifQ==