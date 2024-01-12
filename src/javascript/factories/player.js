import { Gameboard } from "./gameboard";

export { Player };

class Player {
  constructor() {
    this.playerboard = new Gameboard();
    this.isMyTurn = false;
    this.enemyPlayer;
  }

  setEnemyPlayer(player) {
    this.enemyPlayer = player;
  }

  isAttackAllowed(X_coor, Y_coor) {
    if (
      X_coor >= this.enemyPlayer.playerboard.boardSize ||
      Y_coor >= this.enemyPlayer.playerboard.boardSize
    ) {
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
