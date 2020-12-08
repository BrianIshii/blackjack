import Hand from './Hand/Hand';
import useCards from './useCards';

interface Props {
  hit: (playerName: string) => void,
  stay: (playerName: string) => void,
  startGame: (players: Array<string>) => void
}


const BlackJack = (props: Props) => {
  const playerName = 'Player'
  const cards = useCards(playerName)
  console.log(props)

  return (
    <div>
      <Hand name={ 'Dealer' } />
      <Hand name={ playerName } />
      { cards.length > 0 
      ?
      <div>
        <button onClick={ () => props.hit(playerName) }>Hit</button>
        <button onClick={ () => props.stay(playerName) }>Stay</button>
        <button onClick={ () => props.startGame([playerName]) }>Restart</button>
      </div>
      :
      <button onClick={ () => props.startGame([playerName]) }>Start</button>
      }
    </div>
  )
}

export default BlackJack;