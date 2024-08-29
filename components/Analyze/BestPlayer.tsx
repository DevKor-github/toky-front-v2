import { styled } from 'styled-components';
import Image from 'next/image';
import { BEST_PLAYER_LIST } from './constants';
import { SelectionType } from '@/libs/constants/sports';
import BestPlayerItem from './BestPlayerItem';

export function BestPlayer({ match }: { match: Exclude<SelectionType, 'all'> }) {
  const bestPlayers = BEST_PLAYER_LIST[match];
  return (
    <Wrapper>
      {bestPlayers.map((player, i) => {
        return <BestPlayerItem key={player.name} player={player} />;
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  /* min-width: 390px; */
  padding-top: 20px;
  background-color: #121212;
`;
