import styled from 'styled-components';
import Link from 'next/link';

interface ActionButtonProps {
  bgColor?: string;
  color: string;
  fontSize?: string;
  children: React.ReactNode;
  onClick?: () => void;
  width?: string;
  height?: string;
  borderRadius?: string;
  href?: string;
  padding?: string;
}

export function ActionButton({
  bgColor,
  color,
  children,
  onClick,
  width,
  height,
  borderRadius,
  href,
  fontSize,
  padding,
}: ActionButtonProps) {
  return (
    <>
      {href !== undefined ? (
        <Link href={href}>
          <Wrapper
            bgColor={bgColor}
            color={color}
            width={width}
            height={height}
            borderRadius={borderRadius}
            fontSize={fontSize}
            padding={padding}
          >
            {children}
          </Wrapper>
        </Link>
      ) : (
        <Wrapper
          bgColor={bgColor}
          color={color}
          width={width}
          height={height}
          borderRadius={borderRadius}
          fontSize={fontSize}
          onClick={onClick}
          padding={padding}
        >
          {children}
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div<ActionButtonProps>`
  background-color: ${({ bgColor }) => bgColor || 'transparent'};
  color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width || 'auto'};
  height: ${({ height }) => height || 'auto'};
  border-radius: ${({ borderRadius }) => borderRadius || '0px'};
  font-size: ${({ fontSize }) => fontSize || '14px'};
  font-family: 'Spoqa Han Sans Neo';
  cursor: pointer;
  padding: ${({ padding }) => padding || '0'};
`;
