export interface Card {
  readonly suit: string,
  readonly rank: string 
}

export interface CardAPI {
  readonly suit: number,
  readonly rank: number 
}

export enum PlayerStatus {
  WAITING,
  PLAYING,
  WON,
  LOST,
  PUSH,
}

export interface Player {
  readonly name: string,
  readonly cards: Array<CardAPI>,
  readonly status: PlayerStatus
  readonly count: number
}

export interface Game {
  readonly id: number,
  readonly dealer: Player,
  readonly players: Array<Player>;
}