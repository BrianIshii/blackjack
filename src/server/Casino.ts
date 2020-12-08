import { Deck } from "./Deck";
import { Game } from "./Game";
import { Player } from "./types";

const state: {games: any} = {
  games: {}
};

export const hitRequest = (gameId: number, playerName: string): any => {
  console.log("hit request")
  if (state.games[gameId]) {
    state.games[gameId].hit(playerName)
    return state.games[gameId].data()
  }
  return {}
}

export const stayRequest = (gameId: number, playerName: string) => {
  console.log("stay request")
  if (state.games[gameId]) {
    state.games[gameId].stay(playerName)
    return state.games[gameId].data()
  }
  return {}
}


export const startGame = (players: Array<string>) => {
  let deck = new Deck()
  deck.shuffle()

  let playerData: Array<Player> = []
  players.forEach(player => {
    let temp: Player = {name: player, cards: []};
    playerData.push(temp);
  })

  let game = new Game(deck, playerData);
  game.dealCards()

  state.games[game.id] = game
  return game.data()
}


