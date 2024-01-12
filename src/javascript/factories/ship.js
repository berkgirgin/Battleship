export { Ship };

class Ship {
  constructor(length) {
    this.length = length;
    this.hitCount = 0;
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
