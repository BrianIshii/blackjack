import { getCardValue, isAce } from './Card';
import { Deck } from './Deck';
import { Card, Player } from './types';

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
    this.dealer = {name: 'Dealer', cards: []}
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
  }

  hit(playerName: string) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === playerName && i === this.currentPlayer) {
        this.players[i].cards.push(this.deck.dealCard());
      }
    }
  }

  stay(playerName: string) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === playerName && i === this.currentPlayer) {
        this.currentPlayer++;
        if (this.isDone()) {
          this.dealerTurn()
        }
      }
    }
  }

  dealerTurn() {
    console.log('dealers turn')
    let currentCount = getCount(this.dealer.cards)
    while (currentCount <= 16) {
      if (currentCount > 17) {
        break;
      }
      this.dealer.cards.push(this.deck.dealCard());
      currentCount = getCount(this.dealer.cards)
    }
  }

  isDone() {
    return this.currentPlayer >= this.players.length
  }

  data() {
    const playerCards = this.players;
    const dealerCards = this.isDone() ? this.dealer.cards : this.dealer.cards.slice(0, 1)
    console.log({data: { id: this.id, dealer: dealerCards, players: playerCards}})
    return { id: this.id, dealer: dealerCards, players: playerCards}
  }
}