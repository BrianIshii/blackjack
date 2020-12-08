import { Card } from "./types"

const suits = [0, 1, 2, 3]
const ranks = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

export const generateCards = (): Array<Card> => {
  let cards: Array<Card> = []
  suits.forEach(suit => {
    ranks.forEach(rank => {
      cards.push({suit, rank})
    })
  })

  return cards
}

export const isAce = (card: Card): boolean => card.rank === 14

export const getCardValue = (card: Card): number => {
  if (card.rank < 11) {
    return card.rank;
  }
  if (card.rank < 14) {
    return 10;
  }
  return 1;
}
