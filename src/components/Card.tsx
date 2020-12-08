import { Card } from "../types/types";

interface Props {
  card: Card
} 

const CardView = (props: Props) => {
  return (
    <div>
      <div>{props.card.rank}</div>
      <div>{props.card.suit}</div>
    </div>
  );
}

export default CardView