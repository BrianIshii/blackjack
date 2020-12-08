const suits = ['Diamond', 'Club', 'Heart', 'Spade']
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

export const parseSuit = (suit: number): string => suits[suit]
export const parseRank = (rank: number): string => ranks[rank - 2]