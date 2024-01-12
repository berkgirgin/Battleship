import { Player } from "../../src/javascript/factories/player.js";
import { Ship } from "../../src/javascript/factories/ship.js";

function setTwoPlayers() {
  const player1 = new Player();
  const player2 = new Player();

  player1.setEnemyPlayer(player2);
  player2.setEnemyPlayer(player1);

  return { player1, player2 };
}

describe("Player Class", () => {
  test("attackEnemyPlayer works", () => {
    const { player1, player2 } = setTwoPlayers();

    expect(player1.playerboard.fullBoard[4][6].isTileHit).toBe(false); // should stay unaffected
    expect(player2.playerboard.fullBoard[2][3].isTileHit).toBe(false); // should stay unaffected
    expect(player2.playerboard.fullBoard[4][6].isTileHit).toBe(false);
    player1.attackEnemyPlayer(4, 6);
    expect(player1.playerboard.fullBoard[4][6].isTileHit).toBe(false);
    expect(player2.playerboard.fullBoard[2][3].isTileHit).toBe(false);
    expect(player2.playerboard.fullBoard[4][6].isTileHit).toBe(true);
  });

  //
  test("isAttackAllowed works", () => {
    const { player1, player2 } = setTwoPlayers();
    const testShip2 = new Ship(3);

    expect(
      player1.isAttackAllowed(player1.enemyPlayer.playerboard.boardSize, 4)
    ).toBe(false);

    expect(player1.isAttackAllowed(1, 4)).toBe(true);
    player2.playerboard.placeShip(testShip2, 1, 3, 4, 4);
    expect(player1.isAttackAllowed(1, 4)).toBe(true);
    player2.playerboard.receiveAttack(1, 4);
    expect(player1.isAttackAllowed(1, 4)).toBe(false);
  });
});
