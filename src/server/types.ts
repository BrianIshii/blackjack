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
  bet: number,
  total: number,
  cards: Array<Card>,
  status: PlayerStatus,
}

export interface Account {
  readonly id: number
  readonly name: string;

}
