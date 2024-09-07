import styled from 'styled-components';

export function PlayerCardContainer({
  children,
  school,
  scale,
  caption,
}: {
  children: React.ReactNode;
  school: string;
  scale: number;
  caption: string;
}) {
  return (
    <>
      <TitleWrapper>
        <School>{school}</School>
        <Caption>{caption}</Caption>
      </TitleWrapper>
      <ContentsWrapper scale={scale}>{children}</ContentsWrapper>
    </>
  );
}

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
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

const Caption = styled.div`
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 160%; /* 22.4px */
  letter-spacing: -0.56px;
  text-align: right;
  padding-right: 3px;
`;

const ContentsWrapper = styled.div<{ scale: number }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: ${(props) => 10 * props.scale}px;
  overflow-y: auto;
  height: 350px;
`;
