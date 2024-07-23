import styled from 'styled-components';

function MainCarouselContent({ src }: { src: string }) {
  return (
    <Wrapper>
      <img src={src} alt="banner1" />
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
