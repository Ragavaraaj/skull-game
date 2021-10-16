import { useState, MouseEvent, useEffect } from "react";
import { HorizontalStack, StackSelector } from "../../atoms/Stack";
import { NameAndScore } from "../../molecules/NameAndScore";
import { PlayingCard } from "../../molecules/PlayingCard";
import { CardType } from "../../utils/const";
import { CardsPlayedObj, InitialGameState, PlayerObj } from "./interface";
import { Board, Option, Player } from "./style";

const playerInitialValue = (
  forType: "inHand" | "played"
): CardType[] | CardsPlayedObj[] => {
  switch (forType) {
    case "inHand":
      return ["Flower", "Flower", "Flower", "Skull"];
    case "played":
      return Array.from(
        { length: 4 },
        (): CardsPlayedObj => ({
          isEmpty: true,
          toShow: false,
          played: "Empty",
        })
      );
  }
};

export const GameBoard = () => {
  const [gameState, setGameState] = useState<InitialGameState>({
    turn: 0,
    cardsOnTheBoard: 0,
    betPhase: {
      highestBet: 0,
      playersBets: [0, 0, 0, 0],
      playerIndexOfHighestBet: -1,
    },
    players: [
      {
        pid: "p1",
        pname: "ragav",
        score: 0,
        turnsPlayed: 0,
        cardsInHand: playerInitialValue("inHand") as CardType[],
        cardsPlayed: playerInitialValue("played") as CardsPlayedObj[],
      },
      {
        pid: "p2",
        pname: "Aug",
        score: 0,
        turnsPlayed: 0,
        cardsInHand: playerInitialValue("inHand") as CardType[],
        cardsPlayed: playerInitialValue("played") as CardsPlayedObj[],
      },
      {
        pid: "p3",
        pname: "feb",
        score: 0,
        turnsPlayed: 0,
        cardsInHand: playerInitialValue("inHand") as CardType[],
        cardsPlayed: playerInitialValue("played") as CardsPlayedObj[],
      },
      {
        pid: "p4",
        pname: "dec",
        score: 0,
        turnsPlayed: 0,
        cardsInHand: playerInitialValue("inHand") as CardType[],
        cardsPlayed: playerInitialValue("played") as CardsPlayedObj[],
      },
    ],
  });

  const [addCardOption, setAddCardOption] = useState(false);
  const [betPhase, setBetPhase] = useState(false);
  const [guessPhase, setGuessPhase] = useState(false);

  const filterArrays = (player: PlayerObj, selectedCard: CardType) => {
    let cardsInHand: CardType[];
    if (selectedCard === "Skull") {
      cardsInHand = player.cardsInHand.filter((x) => x !== "Skull");
    } else {
      let flowers: CardType[] = player.cardsInHand.filter((x) => x !== "Skull");
      cardsInHand = flowers.slice(0, flowers.length - 1);
      if (player.cardsInHand.includes("Skull")) {
        cardsInHand.push("Skull");
      }
    }

    let newCardsPlayed = player.cardsPlayed;
    newCardsPlayed[player.turnsPlayed] = {
      isEmpty: false,
      toShow: false,
      played: selectedCard,
    };

    return { turnsPlayed: ++player.turnsPlayed, cardsInHand, newCardsPlayed };
  };

  const handleCardAdd =
    (cardSelected: CardType) => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      let newPlayerArray = gameState.players;
      let currentPlayer = gameState.players[gameState.turn];
      newPlayerArray[gameState.turn] = {
        ...currentPlayer,
        ...filterArrays(currentPlayer, cardSelected),
      };
      setGameState((prv) => ({
        ...prv,
        turn: prv.turn < 3 ? prv.turn + 1 : 0,
        cardsOnTheBoard: prv.cardsOnTheBoard++,
        players: newPlayerArray,
      }));
      setAddCardOption(false);
    };

  const handleBet =
    (betOrPass: "bet" | "pass") => (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      let newBetPhase = gameState.betPhase;
      if (betOrPass === "bet") {
        newBetPhase.highestBet = gameState.betPhase.highestBet + 1;
        newBetPhase.playersBets[gameState.turn] = newBetPhase.highestBet;
        newBetPhase.playerIndexOfHighestBet = gameState.turn;
      } else {
        newBetPhase.playersBets[gameState.turn] = -1;
      }
      setGameState((prv) => ({
        ...prv,
        turn: prv.turn < 3 ? prv.turn + 1 : 0,
        betPhase: newBetPhase,
      }));
    };

  const openHiddenCards =
    (pid: string, cardIndex: number) => (e: MouseEvent<HTMLButtonElement>) => {
      const playerIndex = gameState.players.findIndex(
        (player) => player.pid === pid
      );
      let newPlayerArray = gameState.players;
      newPlayerArray[playerIndex].cardsPlayed[cardIndex].toShow = true;

      let newBetPhase = gameState.betPhase;
      if (
        newPlayerArray[playerIndex].cardsPlayed[cardIndex].played === "Flower"
      ) {
        newBetPhase.highestBet -= 1;
      } else {
        newBetPhase.highestBet = -9999;
      }

      setGameState((prv) => ({
        ...prv,
        betPhase: newBetPhase,
        players: newPlayerArray,
      }));
    };

  useEffect(() => {
    if (
      gameState.betPhase.playersBets.filter((bet) => bet === -1).length ===
        gameState.players.length - 1 &&
      gameState.betPhase.highestBet > 0
    ) {
      setBetPhase(false);
      setGuessPhase(true);
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState.betPhase.highestBet === 0 && guessPhase) {
      let newPlayers = gameState.players;
      newPlayers[gameState.betPhase.playerIndexOfHighestBet].score += 1;
      setGuessPhase(false);
      setGameState((prv) => ({
        ...prv,
        players: newPlayers,
      }));
    }
    if (gameState.betPhase.highestBet === -9999 && guessPhase) {
      console.log("remove card phase pls");
      setGuessPhase(false);
    }
  }, [gameState]);

  return (
    <Board>
      {gameState.players.map((player, index) => (
        <Player number={`${index + 1}`}>
          {index + 1 < 3 && (
            <StackSelector playerNumber={index + 1}>
              <NameAndScore
                type="pname"
                name={player.pname}
                isPlaying={gameState.turn === index}
              />
              <NameAndScore type="score" score={player.score} />
            </StackSelector>
          )}
          <StackSelector playerNumber={index + 1}>
            {player.cardsPlayed.map((card: CardsPlayedObj, index: number) => (
              <PlayingCard
                iconType={
                  card.isEmpty ? "Empty" : card.toShow ? card.played : "Hidden"
                }
                onClick={openHiddenCards(player.pid, index)}
                disabled={!guessPhase}
              />
            ))}
          </StackSelector>
          {index + 1 >= 3 && (
            <StackSelector playerNumber={index + 1}>
              <NameAndScore type="pname" name={player.pname} />
              <NameAndScore type="score" score={player.score} />
            </StackSelector>
          )}
        </Player>
      ))}
      <Option>
        {!addCardOption && !betPhase && !guessPhase && (
          <>
            <p>{gameState.players[gameState.turn].pname} Choose and option</p>
            {gameState.cardsOnTheBoard < 16 && (
              <button onClick={() => setAddCardOption(true)}>
                add more cards
              </button>
            )}
            {gameState.cardsOnTheBoard > 3 && (
              <button onClick={() => setBetPhase(true)}>Bet Now</button>
            )}
          </>
        )}
        {!betPhase && addCardOption && (
          <>
            <p>Choose a card to play</p>
            <HorizontalStack>
              {gameState.players[gameState.turn].cardsInHand.map((card) => (
                <PlayingCard
                  iconType={card}
                  onClick={handleCardAdd(card)}
                  rapInside
                />
              ))}
            </HorizontalStack>
          </>
        )}
        {betPhase && (
          <>
            {gameState.players[gameState.turn].pname}
            <br />
            {gameState.betPhase.playersBets.toString()}
            <br />
            {gameState.betPhase.highestBet.toString()}
            {gameState.betPhase.highestBet < gameState.cardsOnTheBoard && (
              <>
                <button onClick={handleBet("bet")}>+1</button>
                <button onClick={handleBet("pass")}>pass</button>
              </>
            )}
          </>
        )}
        {guessPhase && (
          <p>
            Please guess the cards{" "}
            {
              gameState.players[gameState.betPhase.playerIndexOfHighestBet]
                .pname
            }
          </p>
        )}
      </Option>
    </Board>
  );
};
