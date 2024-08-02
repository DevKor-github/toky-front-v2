import styled from 'styled-components';

interface ScheduleCardProps {
  title: string;
  time: string;
  location: string;
  backgroundImage: string;
}

export function ScheduleCard({ title, time, location, backgroundImage }: ScheduleCardProps) {
  return (
    <Card>
      <BackGroundImage src={backgroundImage} />
      <CardContent>
        <Time>{time}</Time>
        <ContentDetails>
          <Title>{title}</Title>
          <Location>{location}</Location>
        </ContentDetails>
      </CardContent>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  width: 152px;
  height: 96px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  margin-right: 12px;
  padding: 12px 16px;
  background: var(
    --Background-3,
    linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%),
    #121212
  );
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

const BackGroundImage = styled.img<{ src: string }>`
  position: absolute;
  top: -2px;
  left: 0px;
  width: 152px;
  height: 96px;
`;

const Time = styled.div`
  align-self: stretch;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.56px;
  z-index: 1;
`;

const ContentDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  align-self: stretch;
  z-index: 1;
`;

const Title = styled.div`
  align-self: stretch;
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 150%;
  letter-spacing: -0.64px;
`;

const Location = styled.div`
  align-self: stretch;
  color: var(--white-medium-emphasis-60, rgba(255, 255, 255, 0.6));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.52px;
`;
