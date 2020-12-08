import { generateCards } from './Card';
import { Card } from './types';

export class Deck {
  cards: Array<Card>;

  constructor() {
    this.cards = generateCards()
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  cut(index: number) {

  }

  dealCard(): Card {
    // TODO: find a better fix for the type
    return this.cards.shift() || {suit: -1, rank: -1 };
  }

}
