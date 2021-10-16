import { CardType } from "../../utils/const";

export interface PlayerProps {
  number: string;
}

export interface CardsPlayedObj {
  toShow: boolean;
  isEmpty: boolean;
  played: CardType;
}

export interface PlayerObj {
  pid: string;
  pname: string;
  score: number;
  turnsPlayed: number;
  cardsInHand: CardType[];
  cardsPlayed: CardsPlayedObj[];
}

export interface BetPhaseObj {
  highestBet: number;
  playerIndexOfHighestBet: number;
  playersBets: number[];
}

export interface InitialGameState {
  turn: number;
  cardsOnTheBoard: number;
  betPhase: BetPhaseObj;
  players: PlayerObj[];
}
