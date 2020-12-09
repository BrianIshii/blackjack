import { parseSuit, parseRank} from '../utils/cardParser';
import { startGame, hitRequest, stayRequest } from '../server/Casino';
import { CardAPI, Game, Player } from '../types/types';
let subs: any = {}
let subsToPlayer: any = {}

let gameId = -1
const update = (player: Player) => {
  console.log('update')
  subs[player.name] && subs[player.name].forEach((sub: any) => {
    sub.cb(player.cards.concat([]))
  });
  subsToPlayer[player.name] && subsToPlayer[player.name].forEach((sub: any) => {
    sub.cb(player)
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
    update(player)
  })
  update(game.dealer)
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

const subscribeToPlayer = (playerName: string, cb: any) => {
  if (subsToPlayer[playerName]) {
    subsToPlayer[playerName].push({playerName: playerName, cb})
  } else {
    subsToPlayer[playerName] = [{playerName: playerName, cb}]
  }
}

const unsubscribeToPlayer = (playerName: string, cb: any) => {
  subsToPlayer[playerName] = subsToPlayer[playerName].filter((item: any) => item.cb !== cb)
}

const CasinoAPI = {
  subscribe: sub,
  unsubscribe: unsub,
  subscribeToPlayer: subscribeToPlayer,
  unsubscribeToPlayer: unsubscribeToPlayer
};

export default CasinoAPI;