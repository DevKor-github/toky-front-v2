import Image from 'next/image';
import styled from 'styled-components';

interface TopBarProps {
  title: string;
}

const TopBar = ({ title }: TopBarProps) => {
  return (
    <TopBarWrapper>
      {/*
            <Image
				style={{
					position: 'absolute',
					left: '16px',
					bottom: '20px',
					cursor: 'pointer',
				}}
				onClick={handleBack}
				src={LeftArrow}
				alt='back'
				width={20}
			/>
            */}
      <Title>{title}</Title>
      {/* <SideBar
				style={{
					position: 'absolute',
					right: '20px',
					bottom: '18px',
					backgroundColor: '#222222',
				}}
			/> */}
    </TopBarWrapper>
  );
};

const TopBarWrapper = styled.div`
  position: relative;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #222222;
`;

const Title = styled.div`
  color: rgba(255, 255, 255, 0.87);
  font-size: 18px;
  font-family: Spoqa Han Sans Neo;
  font-weight: 400;
  letter-spacing: -1.08px;
`;

export default TopBar;
