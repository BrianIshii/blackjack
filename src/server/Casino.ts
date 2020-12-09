import { table } from "console";
import { Deck } from "./Deck";
import { Game } from "./Game";
import { Player, PlayerStatus } from "./types";

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

export const createTableRequest = (player: Player): any => {
  let deck = new Deck()
  deck.shuffle()

  let game = new Game(deck, [player]);

  state.games[game.id] = game
  return game.data()
}

export const playHandRequest = (tableId: number): any => {
  const game = state.games[tableId];
  game.dealCards();

  return game.data();
}

export const resetTable = (tableId: number): any => {
  let game = state.games[tableId]
  game.reset()
  return game.data();
}

export const betRequest = (tableId: number, playerName: string, bet: number): any => {
  let game = state.games[tableId]
  game.bet(playerName, bet)
  return game.data();
}
