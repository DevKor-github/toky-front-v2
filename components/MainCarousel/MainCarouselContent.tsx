import styled from 'styled-components';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';

function MainCarouselContent({ src }: { src: string }) {
  return (
    <Wrapper
      onClick={() =>
        sendGAEvent('event', 'banner_click', {
          src: src,
          screen_name: 'Home',
        })
      }
    >
      <Image src={src} alt="banner1" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export default MainCarouselContent;
