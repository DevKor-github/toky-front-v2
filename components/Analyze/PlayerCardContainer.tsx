import styled from 'styled-components';

export function PlayerCardContainer({
  children,
  school,
  scale,
}: {
  children: React.ReactNode;
  school: string;
  scale: number;
}) {
  return (
    <>
      <School>{school}</School>
      <Wrapper scale={scale}>{children}</Wrapper>
    </>
  );
}

const Wrapper = styled.div<{ scale: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${(props) => 10 * props.scale}px;
  overflow-y: auto;
  height: 350px;
`;

const School = styled.div`
  align-self: stretch;
  color: var(--_87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
`;
