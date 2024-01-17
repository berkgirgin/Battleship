export { DOM_Generator };
import { generateMainGame } from "./index.js";
import { loadShipImages } from "./load_ship_images.js";

//
// ****
import { game } from "../javascript/index.js";
// TO DO: above line causes an error on Jest, but not on the app

class DOM_Generator {
  constructor() {}
  //

  initialiseGame_DOM() {
    const humanPlayerBoard_Container = document.querySelector(
      ".human_gameboard_container"
    );
    const computerPlayerBoard_Container = document.querySelector(
      ".computer_gameboard_container"
    );

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
    const computerVictoryImage = document.querySelector(
      ".victory_photo_computer"
    );
    humanVictoryImage.addEventListener("click", () => {
      this.newGameButtonEvent();
    });
    computerVictoryImage.addEventListener("click", () => {
      this.newGameButtonEvent();
    });

    this.addAudioConfig();
    this.addVideoBackgroundLoopDelay();
  }

  createGameboardGrids(targetContainer, humanOrComputer) {
    const dimension = 10;
    const childrenOfContainer = targetContainer.querySelectorAll("box");
    childrenOfContainer.forEach((element) => {
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
    tiles.forEach((tile) => {
      tile.addEventListener("click", (event) => {
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
      game.playRound(tile_xCoor, tile_yCoor, game.humanPlayer);
    } else if (humanOrComputer === "human") {
      game.playRound(tile_xCoor, tile_yCoor, game.computerPlayer);
    } else {
      throw new Error(
        "Neither human nor computer is selected for the gameboard tile functions"
      );
    }

    // this.updateGameboard();
  }

  removeActivePlayerTagToAI() {
    const computerBoardDiv = document.querySelector(
      ".computer_gameboard_container"
    );
    computerBoardDiv.classList.remove("active_players_enemy");
  }

  addActivePlayerTagtoAI() {
    const computerBoardDiv = document.querySelector(
      ".computer_gameboard_container"
    );
    computerBoardDiv.classList.add("active_players_enemy");
  }

  updateGameboard() {
    // TO DO: disable the hit tiles
    // TO DO: you should only be able to attack computer board on human turn!
    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(
      ".computer_gameboard_container"
    );

    let isHumanTurn = game.activePlayer === game.humanPlayer;

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

        let currentHumanTile = game.humanPlayer.playerboard.fullBoard[i][j];
        let currentComputerTile =
          game.computerPlayer.playerboard.fullBoard[i][j];

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

    game.computerPlayer.playerboard.fullBoard;

    game.computerPlayer.playerboard.fullBoard[2][1].isTileHit;

    loadShipImages(game.humanPlayer.playerboard, humanBoardDiv);
    loadShipImages(game.computerPlayer.playerboard, computerBoardDiv);
  }

  endGame_DOM(isWinnerHumanOrComputer) {
    // isWinnerHumanOrComputer will be "human" or "computer"
    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(
      ".computer_gameboard_container"
    );

    if (isWinnerHumanOrComputer === "human") {
      humanBoardDiv.classList.add("has_won");
      computerBoardDiv.classList.add("has_lost");
    } else if (isWinnerHumanOrComputer === "computer") {
      humanBoardDiv.classList.add("has_lost");
      computerBoardDiv.classList.add("has_won");
    }

    const victoryScreen = document.querySelector(".victory_screen_container");
    const humanVictoryImage = document.querySelector(".victory_photo_human");
    const computerVictoryImage = document.querySelector(
      ".victory_photo_computer"
    );
    const overlay = document.querySelector(".overlay");

    overlay.classList.add("active");
    victoryScreen.classList.add("active");
    if (isWinnerHumanOrComputer === "human") {
      humanVictoryImage.classList.add("active");
    } else if (isWinnerHumanOrComputer === "computer") {
      computerVictoryImage.classList.add("active");
    } else {
      throw new Error(
        `isWinnerHumanOrComputer is neither "human" nor "computer"`
      );
    }

    //
  }

  newGameAfterVictory() {
    const overlay = document.querySelector(".overlay");
    const victoryScreen = document.querySelector(".victory_screen_container");
    const humanVictoryImage = document.querySelector(".victory_photo_human");
    const computerVictoryImage = document.querySelector(
      ".victory_photo_computer"
    );

    victoryScreen.classList.remove("active");
    humanVictoryImage.classList.remove("active");
    computerVictoryImage.classList.remove("active");
    overlay.classList.remove("active");

    this.newGameButtonEvent();
  }

  clearGameboardsDOM() {
    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(
      ".computer_gameboard_container"
    );

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
    const computerVictoryImage = document.querySelector(
      ".victory_photo_computer"
    );
    victoryScreen.classList.remove("active");
    humanVictoryImage.classList.remove("active");
    computerVictoryImage.classList.remove("active");
    overlay.classList.remove("active");

    const humanBoardDiv = document.querySelector(".human_gameboard_container");
    const computerBoardDiv = document.querySelector(
      ".computer_gameboard_container"
    );
    humanBoardDiv.classList.remove("has_lost");
    humanBoardDiv.classList.remove("has_won");
    computerBoardDiv.classList.remove("has_lost");
    computerBoardDiv.classList.remove("has_won");

    this.clearGameboardsDOM();
    // game.initialiseGame();

    generateMainGame();
  }

  startGameButtonEvent() {
    const startGame_Button = document.querySelector(".start_game_button");
    const resetBoard_Button = document.querySelector(".reset_board_button");
    startGame_Button.classList.add("inactive");
    resetBoard_Button.classList.add("inactive");

    const kirovReportingAudio = document.querySelector(
      "audio.kirov_reporting_audio"
    );
    kirovReportingAudio.play();

    this.updateGameboard(); // adds back the active player tag
    // TO DO: remove or grey out "Start Game" and "Reset Board" buttons
  }

  resetBoardButtonEvent() {
    this.clearGameboardsDOM();
    game.resetCurrentGameboards();
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
    return new Promise((res) => {
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

    if (player === game.humanPlayer) {
      prismAudio.currentTime = 0;
      await this.playAudio(prismAudio, 2);
    } else if (player === game.computerPlayer) {
      teslaAudio.currentTime = 0;
      await this.playAudio(teslaAudio, 2);
    }
  }

  async playAttackHitAudio(isHit) {
    const attackSuccessfulAudio = document.querySelector(
      ".attack_successful_audio"
    );
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

  addAudioConfig() {
    const audioBackground = document.querySelector("audio.background_music");
    const audioIconOn = document.querySelector(
      "button.background_music_button .icon_on"
    );
    const audioIconOff = document.querySelector(
      "button.background_music_button .icon_off"
    );
    audioIconOn.style.display = "none";
    const audioButton = document.querySelector(
      "button.background_music_button"
    );

    function togglePlay() {
      if (audioBackground.paused) {
        audioIconOn.style.display = "block";
        audioIconOff.style.display = "none";
        audioBackground.play();
      } else {
        audioIconOn.style.display = "none";
        audioIconOff.style.display = "block";
        audioBackground.pause();
      }
    }

    audioButton.addEventListener("click", () => {
      togglePlay();
    });
  }

  //
}
