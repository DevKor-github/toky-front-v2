'use client';

import MainTopBar from '@/components/MainTopBar';
import PlayerCarousel from '@/components/PlayerCarousel';
import PlayerCard from '@/components/PlayerCard';

export default function Analyze() {
  // TODO: 선수 데이터 contants나 서버에서 가져와서 패칭해야함
  return (
    <div>
      <PlayerCarousel>
        <PlayerCard
          image="https://picsum.photos/110/110"
          name="김기현"
          jerseyNumber="10"
          position="SH"
          year="21"
          heightWeight="180/70"
        />
        <PlayerCard
          image="https://picsum.photos/110/110"
          name="김기현"
          jerseyNumber="10"
          position="SH"
          year="21"
          heightWeight="180/70"
        />
        <PlayerCard
          image="https://picsum.photos/110/110"
          name="김기현"
          jerseyNumber="10"
          position="SH"
          year="21"
          heightWeight="180/70"
        />
        <PlayerCard
          image="https://picsum.photos/110/110"
          name="김기현"
          jerseyNumber="10"
          position="SH"
          year="21"
          heightWeight="180/70"
        />
        <PlayerCard
          image="https://picsum.photos/110/110"
          name="김기현"
          jerseyNumber="10"
          position="SH"
          year="21"
          heightWeight="180/70"
        />
        <PlayerCard
          image="https://picsum.photos/110/110"
          name="김기현"
          jerseyNumber="10"
          position="SH"
          year="21"
          heightWeight="180/70"
        />
      </PlayerCarousel>
    </div>
  );
}
