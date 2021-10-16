import styled from "styled-components";
import patten from "../img/pattern.png";
import flower from "../img/rose.png";
import skull from "../img/skull.png";
import { CardType } from "../utils/const";

interface Props extends React.HTMLProps<HTMLButtonElement> {
  rapInside?: boolean;
  iconType: CardType;
}

const Card = styled.button<{ isEmpty: boolean }>`
  border: 0;

  width: 5.5rem;
  aspect-ratio: 1;
  background-color: ${(props) => (!props.isEmpty ? "#ffd185" : "#ffff")};
  ${(props) => props.isEmpty && "border: 5px dashed #FFD185;"};
  border-radius: 100%;
  display: grid;
  place-items: center;

  & > img {
    width: 100%;
    height: 100%;
    padding: 18px;
  }
`;

const Rapper = styled.div`
  border: 5px dashed #ff3a2f;

  & > button {
    margin: 0.5rem;
  }
`;

export const PlayingCard = ({
  rapInside = false,
  iconType,
  ...props
}: Props) => {
  const imgSelector = () => {
    switch (iconType) {
      case "Flower":
        return { src: flower, alt: "Flower" };
      case "Skull":
        return { src: skull, alt: "Skull" };
      case "Hidden":
        return { src: patten, alt: "Hidden" };
    }
  };

  const toRender = (
    <Card
      isEmpty={iconType === "Empty"}
      name={props.name}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {iconType !== "Empty" && <img alt="" {...imgSelector()} />}
    </Card>
  );

  return rapInside ? <Rapper>{toRender}</Rapper> : toRender;
};
