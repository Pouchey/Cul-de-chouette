// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------

class Dices{

  constructor(numberOfDices,numberOfFaces) {
    this.numberOfDices = numberOfDices;
    this.numberOfFaces = numberOfFaces;
    this.dices = [];
    this.dices.length = numberOfDices;
    this.dices.fill(0);
  }

  roll() {
    this.dices.forEach(() => {
      this.dices[i] = Math.floor(Math.random() * this.numberOfFaces) + 1;
    });
  }

  getDices() {
    return this.dices;
  }
}

module.exports = Dices;