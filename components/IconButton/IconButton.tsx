import { Icon } from '@/libs/design-system/icons';
import Link from 'next/link';
import styled from 'styled-components';

export interface IconButtonProps {
  icon: keyof typeof Icon;
  onClick?: () => void;
  text?: string;
  href?: string;
  type: 'primary' | 'secondary' | 'tertiary';
}

export function IconButton({ icon, onClick, text, href, type }: IconButtonProps) {
  const IconNode = Icon[icon];
  return (
    <>
      {href !== undefined ? (
        <Link href={href}>
          <Content type={type}>
            <IconNode />
          </Content>
          {text && <ButtonText>{text}</ButtonText>}
        </Link>
      ) : (
        <button type="button" onClick={onClick}>
          <Content type={type}>
            <IconNode />
          </Content>
          {text && <ButtonText>{text}</ButtonText>}
        </button>
      )}
    </>
  );
}

type ContentProps = Pick<IconButtonProps, 'type'>;

const Content = styled.div<ContentProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  width: 54px;
  height: 54px;
  border-radius: 12px;
  margin: auto;
  background: ${({ type, theme }) => {
    if (type === 'primary') return theme.colors.gradientButtonBlue;
    if (type === 'secondary') return theme.colors.gradientButtonGray;
    if (type === 'tertiary') return 'transparent';
  }};
`;
const ButtonText = styled.p`
  margin-top: 8px;
  color: white;
`;
