import styled from 'styled-components';
import { Icon } from '@/libs/design-system/icons';

export function ResultBadge({ type }: { type: boolean }) {
  return (
    <BadgeWrapper>
      <Icon.AttendanceQuizResultBadgeTopStroke />
      <BadgeText>{type ? '정답' : '오답'}</BadgeText>
      <Icon.AttendanceQuizResultBadgeBottomStroke />
    </BadgeWrapper>
  );
}

// TODO: 다른 컴포넌트 위치에 따라서 BadgeWrapper의 top 값 조정

const BadgeWrapper = styled.div`
  position: absolute;
  top: 130px;
  left: calc((100% - 250px) / 2);
  display: flex;
  width: 250px;
  height: 86px;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  background: linear-gradient(90deg, rgba(18, 18, 18, 0) 0%, #4e0097 40%, #4e0097 65%, rgba(18, 18, 18, 0) 100%);
  backdrop-filter: blur(5px);
`;

const BadgeText = styled.div`
  color: #fff;
  text-align: center;
  font-family: Challan;
  font-size: 50px;
  font-style: normal;
  font-weight: 800;
  line-height: normal;
  letter-spacing: -2px;
`;
