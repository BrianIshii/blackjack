import { useEffect, useState } from "react";
import CasinoAPI from "./CasinoAPI";
import { parseSuit, parseRank} from "../utils/cardParser"
import { Card, CardAPI } from "../types/types";


const useCards = (playerName: string) => {
  const [cards, setCards] = useState<Array<Card>>([]);

  useEffect(() => {
    const handleCardChange = (cards: Array<CardAPI>) => {
      setCards(cards.map((card: CardAPI): Card => ({ suit: parseSuit(card.suit), rank: parseRank(card.rank) })));
    };

    
    CasinoAPI.subscribe(playerName, handleCardChange)

    return () => {
      CasinoAPI.unsubscribe(playerName, handleCardChange);
    };
  }, [playerName, cards])
  return cards
}

export default useCards;