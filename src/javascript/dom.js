export { DOM_Generator };
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
        newDiv.textContent = `${j + i * 10}`; //TO DO: remove later

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

    this.updateGameboard();
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
      computerBoardDiv.classList.add("activeplayer");
    } else {
      computerBoardDiv.classList.remove("activeplayer");
    }

    //

    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        const selector = `.tile[data-x_coor="${i}"][data-y_coor="${j}"]`;

        let currentHumanTile_DOM = humanBoardDiv.querySelector(selector);
        let currentComputerTile_DOM = computerBoardDiv.querySelector(selector);

        // for testing, make ship tiles visible.
        if (game.humanPlayer.playerboard.fullBoard[i][j].hasTileShip()) {
          currentHumanTile_DOM.classList.add("has_ship");
        }
        if (game.computerPlayer.playerboard.fullBoard[i][j].hasTileShip()) {
          currentComputerTile_DOM.classList.add("has_ship");
        }
        //

        // making hit tiles visible
        if (game.humanPlayer.playerboard.fullBoard[i][j].isTileHit) {
          currentHumanTile_DOM.classList.add("hit");
        }
        if (game.computerPlayer.playerboard.fullBoard[i][j].isTileHit) {
          currentComputerTile_DOM.classList.add("hit");
        }
        //
      }
    }

    game.computerPlayer.playerboard.fullBoard;

    game.computerPlayer.playerboard.fullBoard[2][1].isTileHit;
  }

  endGame_DOM(isWinnerHumanOrComputer) {
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
  }
}
