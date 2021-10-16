import styled from "styled-components";

const Text = styled.p`
  font-style: normal;
  font-weight: 500;
  font-size: 2rem;
  line-height: 2.6rem;
  /* identical to box height */

  text-align: center;
  text-transform: uppercase;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;

  color: #ff3a2f;
`;

const Card = styled.div<{ isCircle: boolean; isPlaying: boolean }>`
  width: 4rem;
  aspect-ratio: 1;
  background-color: #ffd185;
  border-radius: ${(props) => (props.isCircle ? "100%" : "10px")};
  ${(props) =>
    (props.isCircle || props.isPlaying) && "border: 5px solid #ff3a2f;"};
  display: grid;
  place-items: center;

  & > img {
    width: 100%;
    height: 100%;
    padding: 18px;
  }
`;

interface Props {
  name?: string;
  score?: number;
  isPlaying?: boolean;
  type: "pname" | "score";
}

export const NameAndScore = (props: Props) => {
  const fullName = props.name?.split(" ");
  const displayName = `${fullName?.[0][0]}${
    fullName?.[1] ? fullName?.[1][0] : ""
  }`;
  return (
    <Card
      isCircle={props.type !== "pname"}
      isPlaying={props.isPlaying || false}
    >
      <Text>{props.type === "score" ? props.score : displayName}</Text>
    </Card>
  );
};
