import styled from "styled-components";
import { PlayerProps } from "./interface";

export const Board = styled.div`
  margin: 1rem;
  display: grid;
  height: calc(100vh - 2rem);
  grid-template: 1.5fr 2fr 1.5fr / 0.5fr 1.5fr 0.5fr;
  grid-template-areas: "p1 p2 p3" "p1 opt p3" "p1 p4 p3";
  place-items: center;
`;

export const Player = styled.div<PlayerProps>`
  grid-area: ${(props) => "p" + props.number};
  display: flex;
  flex-direction: ${(props) =>
    parseInt(props.number) % 2 === 0 ? "column" : "row"};

  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

export const Option = styled.div`
  grid-area: opt;
  display: flex;
  flex-direction: column;

  & > p {
    color: #ff3a2f;
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 0.75rem;
  }
`;
