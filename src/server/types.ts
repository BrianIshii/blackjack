export interface Card {
  readonly suit: number,
  readonly rank: number
}

export enum PlayerStatus {
  WAITING,
  PLAYING,
  WON,
  LOST,
  PUSH,
  // only used on server below
  DEALER,
}

export interface Dealer {
  readonly name: string,
  cards: Array<Card>,
}

export interface Player {
  readonly name: string,
  cards: Array<Card>,
  status: PlayerStatus
}
