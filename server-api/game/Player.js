// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
const { v4: uuidv4 } = require('uuid');
class Player {

  constructor(socketID,name,score,avatar){
    this.id = uuidv4();
    this.socket = socketID;
    this.name = name;
    this.score = score;
    this.grelotine = false;
    this.avatar = avatar;
  }

  getId() {
    return this.id;
  }

  getSocket() {
    return this.socket;
  }

  setSocket(socketID) {
    this.socket = socket;
  }

  removeSocket() {
    this.socket = null;
  }

  getName() {
    return this.name;
  }

  getScore() {
    return this.score;
  }

  setScore(score) {
    this.score = score;
  }

  getGrelotine() {
    return this.grelotine;
  }

  setGrelotine(grelotine) {
    this.grelotine = grelotine;
  }

  getAvatar() {
    return this.avatar;
  }
  
  setAvatar(avatar) {
    this.avatar = avatar;
  }

  toString() {
    return `Player: ${this.name} \nSocketID : ${this.socket} \nScore: ${this.score} \nGrelotine: ${this.grelotine ? 'true' : 'false'}`;
  }

}

module.exports = Player;