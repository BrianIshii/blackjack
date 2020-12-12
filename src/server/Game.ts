import { getCardValue, isAce } from './Card';
import { Deck } from './Deck';
import { Card, Player, PlayerStatus } from './types';

let gameNumber = 0
const getNewGameId = () => gameNumber++
const getCount = (cards: Array<Card>): number => {
  let total = 0
  let hasAce = false
  cards.forEach(card => {
    hasAce = hasAce || isAce(card)
    total += getCardValue(card)
  })
  if (total < 12 && hasAce) {
    total += 10;
  }
  
  return total;
}

export class Game {
  id: number;
  deck: Deck;
  players: Array<Player>;
  dealer: Player;
  currentPlayer: number;

  constructor(deck: Deck, players: Array<Player>) {
    this.id = getNewGameId()
    this.deck = deck
    this.players = players
    this.dealer = {name: 'Dealer', bet: 0, total: 0, cards: [], status: PlayerStatus.DEALER}
    this.currentPlayer = 0  
  }

  dealCards() {
    let allPlayers = this.players.concat([this.dealer])
    let arr = [0, 1]
    arr.forEach(_ => {
      allPlayers.forEach(player => {
        let card = this.deck.dealCard();
        player.cards.push(card);
      })
    })

    // conditions for early blackjack
    // this.dealer.cards = [{suit: 1, rank: 14}, {suit: 1, rank: 10}]
    this.players[0].cards = [{suit: 1, rank: 14}, {suit: 1, rank: 10}]
    const dealerCount = getCount(this.dealer.cards);
    
    this.players.forEach(player => {
      const playerCount = getCount(player.cards)
      if (playerCount === 21) {
        if (dealerCount === 21) {
          player.status = PlayerStatus.PUSH
          player.total += player.bet
          player.bet = 0
        } else {
          player.status = PlayerStatus.WON
          player.total += player.bet * 2
        }
      } else if (dealerCount === 21) {
        player.status = PlayerStatus.LOST
        player.bet = 0
      }
    });
    
    for(let i = 0; i < this.players.length; i++) {
      const status = this.players[i].status;
      if (status < 2) {
        this.players[i].status = PlayerStatus.PLAYING;
        this.currentPlayer = i;
        return;
      }
    }
    this.currentPlayer = this.players.length;
  }

  bet(playerName: string, bet: number) {
    for (let i = 0; i < this.players.length; i++) {
      const player = this.players[i];
      if (player.name === playerName && player.status === PlayerStatus.WAITING) {
        const diffBet = bet - player.bet;
        const newTotal = player.total - diffBet
        this.players[i] = { ...player, bet: bet, total: newTotal}
      }
    }
  }

  hit(playerName: string) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === playerName && i === this.currentPlayer) {
        this.players[i].cards.push(this.deck.dealCard());
        if (getCount(this.players[i].cards) > 21) {
          this.players[i].status = PlayerStatus.LOST
          this.nextPlayer(playerName)
        }
      }
    }
  }

  stay(playerName: string) {
    this.nextPlayer(playerName)
  }

  nextPlayer(playerName: string) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === playerName && i === this.currentPlayer) {
        this.players[i].status = PlayerStatus.WAITING;
        this.currentPlayer++;
        if (this.isDone()) {
          this.dealerTurn()
        }
      }
    }
  }

  dealerTurn() {
    console.log('dealers turn')
    let dealerCount = getCount(this.dealer.cards)
    while (dealerCount <= 16) {
      if (dealerCount > 17) {
        break;
      }
      this.dealer.cards.push(this.deck.dealCard());
      dealerCount = getCount(this.dealer.cards)
    }

    this.players.forEach(player => {
      let playerCount = getCount(player.cards);
      if (playerCount > 21) {
        player.status = PlayerStatus.LOST
      } else if (dealerCount > 21) {
        player.status = PlayerStatus.WON
        player.total += player.bet * 2
      } else if (playerCount > dealerCount) {
        player.status = PlayerStatus.WON
        player.total += player.bet * 2
      } else if (playerCount === dealerCount) {
        player.status = PlayerStatus.PUSH
        player.total += player.bet
      } else {
        player.status = PlayerStatus.LOST
      }
      player.bet = 0
    });
  }

  isDone() {
    return this.currentPlayer >= this.players.length
  }

  reset() {
    this.currentPlayer = 0
    this.dealer.cards = []

    this.players.forEach(player => {
      player.status = PlayerStatus.WAITING
      player.cards = []
    })

  }

  data() {
    const players = this.players.map(player => {
      return { ...player, count: getCount(player.cards)}
    });
    const dealer = this.isDone() ?
      { ...this.dealer, count: getCount(this.dealer.cards)} :
    {name: this.dealer.name, cards: this.dealer.cards.slice(0, 1), count: getCount(this.dealer.cards)}
    console.log({dealer})
    console.log({data: { id: this.id, dealer: dealer, players: players}})
    return { id: this.id, dealer: dealer, players: players}
  }
}