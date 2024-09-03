import { styled } from 'styled-components';
import Image from 'next/image';
import { BEST_PLAYER_IMAGE } from './constants';
import { SelectionType } from '@/libs/constants/sports';

export function BestPlayer({ match }: { match: Exclude<SelectionType, 'all'> }) {
  // const bestPlayers = BEST_PLAYER_LIST[match];
  return (
    <Wrapper>
      {/* {bestPlayers.map((player, i) => {
        return <BestPlayerItem key={player.name} player={player} />;
      })} */}
      <BestPlayerImage
        key={BEST_PLAYER_IMAGE[match]}
        src={BEST_PLAYER_IMAGE[match]}
        fill
        priority
        alt="메인플레이어"
        sizes="100vw"
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* min-width: 390px; */
  position: relative;
  padding-top: 20px;
  background-color: #121212;
  aspect-ratio: 390 / 580;
`;

const BestPlayerImage = styled(Image)`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;
