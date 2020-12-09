import { PlayerStatus } from '../../types/types';
import CardView from '../Card';
import useCards from '../useCards';
import usePlayer from '../usePlayer';
import './Hand.css';

interface Props {
  name: string,
}

const Hand = (props: Props) => {
  const cards = useCards(props.name);
  const player = usePlayer(props.name);
  console.log(player)

  return (
    <div>
      <div>
        { props.name }
      </div>
      <div className='cards'>
        { cards.map((card, index) => (
          <CardView key={index} card={card} />
        ))}
      </div>
      <div>
        { PlayerStatus[player.status] }
      </div>
    </div>
  );
}

export default Hand;