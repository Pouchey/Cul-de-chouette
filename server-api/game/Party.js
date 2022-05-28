// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
const { v4: uuidv4 } = require('uuid');

const MAX_PLAYERS = 10;

class Party{

  constructor(host,options) {
    this.id = uuidv4();
    this.host = host.id;
    this.players = [];
    this.launched = false;
    this.options = options;
    // Options :
    // - negative
    // - maxScore

    this.players.push(host);
  }

  getId() {
    return this.id;
  }

  getHost() {
    return this.host;
  }
  
  setHost(player) {
    // Verify if the player is in the party
    if(!this.players.find(p => p.id === player.id)) {
      throw new Error('The player is not in the party');
    }
    this.host = player.id;
  }

  getPlayers() {
    return this.players;
  }

  getPlayer(playerID) {
    const player = this.players.find(p => p.id === playerID);
    if(!player)
      throw new Error('Player not found');
    return player;
  }

  getOptions() {
    return this.options;
  }

  setOptions(options) {
    if(!options || !options.negative || !options.maxScore) {
      throw new Error('Invalid options');
    }
    this.options = options;
  }

  getLaunched() {
    return this.launched;
  }

  setLaunched(launched) {
    this.launched = launched;
  }

  addPlayer(player) {
    // Verify if the player is not in the party
    if(this.players.find(p => p.socket === player.socket || p.id === player.id)) 
      throw new Error('The player is already in the party');

    if(this.players.length < MAX_PLAYERS && !this.launched )
      this.players.push(player);
    else
      throw new Error('Party is full');

  }

  removePlayer(playerID) {

    // Verify if the player is in the party
    if(!this.players.find(p => p.id === playerID)) {
      throw new Error('Player is not in the party');
    }
    // If the game is launched the player is not removed
    // but the socket is closed
    // In this case the player can reconnect to the game
    if(this.launched){
      const player = this.players.find(p => p.id === playerID);
      player.removeSocket();

    }
    else{
      this.players.filter(p => p.id !== playerID);
    }
  
  }

  toString() {
    return `Party: ${this.id} \nHost : ${this.host} \nPlayers: ${this.players} \nOptions: ${this.options} \nLaunched: ${this.launched}`;
  }

}

module.exports = Party;