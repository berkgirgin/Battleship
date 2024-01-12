import { Ship } from "../../src/javascript/factories/ship.js";

describe("Ship Class", () => {
  test("hitCount and hit() works, does not exceed length", () => {
    const testShip = new Ship(3);
    expect(testShip.hitCount).toBe(0);
    testShip.hit();
    expect(testShip.hitCount).toBe(1);
    testShip.hit();
    expect(testShip.hitCount).toBe(2);
    testShip.hit();
    expect(testShip.hitCount).toBe(3);
    testShip.hit();
    expect(testShip.hitCount).toBe(3);
  });

  test("isSunk works", () => {
    const testShip = new Ship(2); // hitCount is 0
    expect(testShip.isSunk()).toBe(false);

    testShip.hit(); // hitCount is 1
    expect(testShip.isSunk()).toBe(false);

    testShip.hit(); // hitCount is 2
    expect(testShip.isSunk()).toBe(true);
  });

  test("getLength works", () => {
    const testShip1 = new Ship(2);
    expect(testShip1.getLength()).toBe(2);

    const testShip2 = new Ship(5);
    expect(testShip2.getLength()).toBe(5);
  });
});
