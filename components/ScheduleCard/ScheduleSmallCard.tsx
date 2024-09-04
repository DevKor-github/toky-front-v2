import { Flex } from '@/libs/design-system/flex';
import Image from 'next/image';
import styled from 'styled-components';

interface ScheduleSmallCardProps {
  title: string;
  time: string;
  backgroundImage: string;
}

export function ScheduleSmallCard({ title, time, backgroundImage }: ScheduleSmallCardProps) {
  return (
    <Card>
      <BackGroundImage src={backgroundImage} fill alt="스케줄 카드" sizes="30vw 100%" />
      <Flex $direction="column" style={{ position: 'relative' }}>
        <Time>{time}</Time>
        <Name>{title}</Name>
      </Flex>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 110px;
  height: 64px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  border-radius: 10px;
  background: var(
    --Background-3,
    linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%),
    #121212
  );
  flex-shrink: 1;
`;

const BackGroundImage = styled(Image)`
  position: absolute;
  top: 0px;
  left: 0px;
  object-fit: contain;
`;

const Time = styled.div`
  color: ${({ theme }) => theme.colors.white87};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%; /* 21px */
  letter-spacing: -0.56px;
`;

const Name = styled.div`
  color: ${({ theme }) => theme.colors.white87};
  font-size: 15px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.6px;
`;
