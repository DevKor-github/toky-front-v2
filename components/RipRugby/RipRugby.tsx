import Image from 'next/image';
import styled from 'styled-components';

export function RipRugby() {
  return (
    <Wrapper>
      <Image src="/image-proxy/rip.png" alt="선수 추모 사진" width={195} height={201} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 390px;
  position: relative;
  margin-top: ${({ theme }) => theme.space.sportsSelectionBarHeight}px;
`;
