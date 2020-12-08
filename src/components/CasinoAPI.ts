import { parseSuit, parseRank} from '../utils/cardParser';
import { startGame, hitRequest, stayRequest } from '../server/Casino';
import { CardAPI, Game, Player } from '../types/types';
let subs: any = {}
let subsToCurrentPlayer: Array<any> = []

let gameId = -1
const update = (playerName: string, cards: Array<CardAPI>) => {
  console.log('update')
  subs[playerName] && subs[playerName].forEach((sub: any) => {
    sub.cb(cards.concat([]))
  });
}

// const getCount = (cards) => {
//   let total = 0
//   cards.forEach(card => total += card.rank)
  
//   return total;
// }

// const checkGameStatus = (state) => {
//   let count = getCount(state[state.currentPlayer].cards);
//   if (count > 21) {
//     console.log("busted")
//   }
// }

export const hit = (playerName: string) => {
  let game = hitRequest(gameId, playerName)
  updateAll(game);
}

export const stay = (playerName: string) => {
  let game = stayRequest(gameId, playerName)
  updateAll(game);
//   console.log('app stay')

//   console.log(state['Dealer'].cards)
//   checkGameStatus(state)
}
const updateAll = (game: Game) => {
  gameId = game.id;
  console.log({gameId})
  game.players.forEach(player => {
    update(player.name, player.cards)
  })
  update('Dealer', game.dealer)
}

export const start = (players: Array<string>) => {
  let game = startGame(players)
  updateAll(game);
}

const sub = (playerName: string, cb: any) => {
  if (subs[playerName]) {
    subs[playerName].push({id: playerName, cb})
  } else {
    subs[playerName] = [{id: playerName, cb}]
  }
};

const unsub = (playerName: string, cb: any) => {
  console.log("unsubbed")
  subs[playerName] = subs[playerName].filter((item: any) => item.cb !== cb)
  console.log(subs[playerName])
};

const subscribeToCurrentPlayer = (cb: any) => {
  subsToCurrentPlayer.push(cb);
}

const unsubscribeToCurrentPlayer = (cb: any) => {
  subsToCurrentPlayer.filter(item => item !== cb)
}
const CasinoAPI = {
  subscribe: sub,
  unsubscribe: unsub,
  subscribeToCurrentPlayer: subscribeToCurrentPlayer,
  unsubscribeToCurrentPlayer: unsubscribeToCurrentPlayer
};

export default CasinoAPI;