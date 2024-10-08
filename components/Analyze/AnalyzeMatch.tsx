import { SelectionType } from '@/libs/constants/sports';
import styled from 'styled-components';
import { BestPlayer } from './BestPlayer';
import { RecentMatch } from '@/components/Analyze/RecentMatch';

export function AnalyzeMatch({ match }: { match: Exclude<SelectionType, 'all'> }) {
  return (
    <>
      <RecordWrapper $backgroundUrl={`/${match}_history.webp`} />
      <RecentMatch match={match} />
      <BestPlayer match={match} />
    </>
  );
}

const RecordWrapper = styled.div<{ $backgroundUrl: string }>`
  height: 400px;
  position: relative;
  width: 100%;
  padding-top: 40px;
  background: url(${(props) => props.$backgroundUrl}) no-repeat center;
  background-size: cover;
`;
