import { useEffect, useState } from 'react';
import { Player, PlayerStatus } from '../types/types';
import Hand from './Hand/Hand';
import useCards from './useCards';
import usePlayer from './usePlayer';

interface Props {
  createTable: (player: Player) => void,
  bet: (playerName: string, bet: number) => void
  playHand: () => void,
  hit: (playerName: string) => void,
  stay: (playerName: string) => void,
  reset: () => void
}


const BlackJack = (props: Props) => {
  const playerName = 'Player'
  const cards = useCards(playerName)
  const player = usePlayer(playerName)
  const isGameOver = player.status === PlayerStatus.LOST || player.status === PlayerStatus.WON || player.status === PlayerStatus.WAITING
  
  useEffect(() => {
    props.createTable({ ...player, name: playerName})
  }, [])

  return (
    <div>
      <Hand name={ 'Dealer' } />
      <Hand name={ playerName } />
      { cards.length > 0 
      ?
      <div>
        <button disabled={isGameOver} onClick={ () => props.hit(playerName) }>Hit</button>
        <button  onClick={ () => props.stay(playerName) }>Stay</button>
        <button onClick={ () => props.reset() }>Restart</button>
      </div>
      :
      <button disabled={player.bet <= 0} onClick={ () => props.playHand() }>Start</button>
      }
      <div>
        <div>Total: {player.total}</div>
      </div>
      <div>
        <div>Betting</div>
        <div>{ player.bet }</div>
        <button disabled={ !isGameOver } onClick={ () => props.bet(playerName, (10 <= player.total ? player.bet + 10 : player.bet)) }>+10</button>
        <button disabled={ !isGameOver } onClick={ () => props.bet(playerName, (1 <= player.total ? player.bet + 1 : player.bet)) }>+1</button>
        <button disabled={ !isGameOver } onClick={ () => props.bet(playerName, player.bet > 0 ? player.bet - 1 : 0) }>-1</button>
      </div>
    </div>
  )
}

export default BlackJack;