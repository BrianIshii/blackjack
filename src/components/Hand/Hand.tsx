import { Card } from '../../types/types';
import CardView from '../Card';
import useCards from '../useCards';
import './Hand.css';

interface Props {
  name: string,
}

const Hand = (props: Props) => {
  const cards = useCards(props.name);
  console.log(cards);

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
    </div>
  );
}

export default Hand;