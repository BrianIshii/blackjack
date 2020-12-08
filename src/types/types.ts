export interface Card {
  readonly suit: string,
  readonly rank: string 
}

export interface CardAPI {
  readonly suit: number,
  readonly rank: number 
}
export interface Player {
  readonly name: string,
  readonly cards: Array<CardAPI>
}

export interface Game {
  readonly id: number,
  readonly dealer: Array<CardAPI>,
  readonly players: Array<Player>;
}