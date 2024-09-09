import { styled } from 'styled-components';
import Image from 'next/image';
import { BEST_PLAYER_IMAGE } from './constants';
import { SelectionType } from '@/libs/constants/sports';

export function RecentMatch({ match }: { match: Exclude<SelectionType, 'all'> }) {
  return (
    <Wrapper>
      <RecentMatchImage
        key={`${match} Recent Match`}
        src={`/${match}_recent.webp`}
        fill
        priority
        alt="최근 경기"
        sizes="100vw"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* min-width: 390px; */
  position: relative;
  padding-top: 20px;
  background: var(--Background-0, #121212);
  aspect-ratio: 390 / 275;
`;

const RecentMatchImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
