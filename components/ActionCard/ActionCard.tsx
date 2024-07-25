import styled from 'styled-components';

interface ActionCardProps {
  message: string;
  contents: React.ReactNode;
  padding?: string;
}

export function ActionCard({ message, contents, padding }: ActionCardProps) {
  return (
    <Wrapper padding={padding}>
      <Message>{message}</Message>
      <div>{contents}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div<{ padding?: string }>`
  display: flex;
  padding: ${({ padding }) => padding || '0'};
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 10px;
  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
`;

const Message = styled.div`
  color: var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87));
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 27px */
  letter-spacing: -0.36px;
  white-space: pre-line;
`;
