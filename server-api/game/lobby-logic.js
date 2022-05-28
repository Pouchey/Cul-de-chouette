// --------------------------------------------------------------
//  Author:  Rouchet Théophile
//  Date:    2022
// --------------------------------------------------------------
const Party = require('./Party');
const Player = require('./Player');


var parties = require('./parties');

function initGame(socketID,newPlayer) {

  const host = new Player(socketID,newPlayer.name,0,newPlayer.avatar);

  const options = {
    negative: false,
    maxScore: 343
  }
  const party = new Party(host,options);
  parties.push(party);

  return {partyID: party.id,playerID :host.id};
}

function getParty(id) {
  let ret = parties.find(p => p.id === id);
  if(!ret)
    throw new Error('Party not found');
    
  return ret;
}

function deleteParty(id) {
  parties = parties.filter(p => p.id !== id);
}

function addPlayer(partyID,socketID,newPlayer) {
  const player = new Player(socketID,newPlayer.name,0,newPlayer.avatar);
  const party = getParty(partyID);
  party.addPlayer(player);
  return player.getId();
}

function reconnectPlayer(partyID,player) {
  const party = getParty(partyID);
  const p = party.getPlayer(player.id);
  player.setSocket(p.id);
  return p.id;
}

function removePlayer(partyID,playerID) {
  const party = getParty(partyID);
  party.removePlayer(playerID);

  if(party.getPlayers().length === 0)
    deleteParty(partyID);
}

function findPartyBySocket(socketID) {
  let ret = parties.find(p => p.getPlayers().find(p => p.getSocket() === socketID));
  return ret.getId();
}

function findPlayerBySocket(partyID,socketID) {
  const party = getParty(partyID);
  const player = party.getPlayers().find(p => p.getSocket() === socketID);
  return player.getId();
}

function getPlayers(partyID) {
  const party = getParty(partyID);
  const players = party.getPlayers();
  // We send back players without socket id
  const playersInfos = players.map(p => p.getPlayer());

  return playersInfos;
}


function setOptions(partyID,options) {
  const party = getParty(partyID);
  party.setOptions(options);
}

function getLaunched(partyID) {
  const party = getParty(partyID);
  return party.getLaunched();
}

function launch(partyID) {
  const party = getParty(partyID);
  party.setLaunched(true);
}

module.exports = {
  initGame,
  getParty,
  addPlayer,
  reconnectPlayer,
  removePlayer,
  findPartyBySocket,
  findPlayerBySocket,
  getPlayers,
  setOptions,
  getLaunched,
  launch,
}