export interface Card {
  readonly suit: number,
  readonly rank: number
}

export interface Player {
  readonly name: string,
  cards: Array<Card>
}