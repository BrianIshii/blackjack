import { useEffect, useState } from "react";
import CasinoAPI from "./CasinoAPI";
import { parseSuit, parseRank} from "../utils/cardParser"
import { Card, CardAPI, Player, PlayerStatus } from "../types/types";


const usePlayer = (playerName: string) => {
  const [player, setPlayer] = useState<Player>({name: '', cards: [], status: PlayerStatus.WAITING, count: 0});

  useEffect(() => {
    const handleCardChange = (p: Player) => {
      setPlayer(p);
    };
    
    CasinoAPI.subscribeToPlayer(playerName, handleCardChange)

    return () => {
      CasinoAPI.unsubscribeToPlayer(playerName, handleCardChange);
    };
  }, [playerName])
  return player
}

export default usePlayer;