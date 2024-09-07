import styled from 'styled-components';
import Image from 'next/image';
import { sendGAEvent } from '@next/third-parties/google';
import { useRouter } from 'next/navigation';

function MainCarouselContent({ src, link }: { src: string; link: string }) {
  const router = useRouter();
  return (
    <Wrapper
      onClick={() => {
        sendGAEvent('event', 'banner_click', {
          src: src,
          screen_name: 'Home',
        });
        router.push(link);
      }}
    >
      <Image src={src} alt="banner1" fill />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  aspect-ratio: 390/210;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default MainCarouselContent;
