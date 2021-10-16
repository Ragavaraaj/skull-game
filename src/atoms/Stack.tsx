import styled from "styled-components";

export const HorizontalStack = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const VerticalStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const StackSelector = (props: {
  children: React.ReactNode;
  playerNumber: number;
}) =>
  props.playerNumber % 2 === 0 ? (
    <HorizontalStack>{props.children}</HorizontalStack>
  ) : (
    <VerticalStack>{props.children}</VerticalStack>
  );
