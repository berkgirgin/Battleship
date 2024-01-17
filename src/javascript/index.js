//
import { Ship } from "./factories/ship.js";
import { GameboardTile, Gameboard } from "./factories/gameboard.js";
import { Player } from "./factories/player.js";
import { GameController } from "./factories/gamecontroller.js";
import { getAIMove, getRandomNonHitTile } from "./AI.js";

import "../styles/index.css";

export { game, generateMainGame };

let game;

function generateMainGame() {
  game = new GameController();
  game.initialiseGame();
}

generateMainGame();
