import styled from 'styled-components';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

interface ActionButtonProps extends PropsWithChildren {
  bgColor?: string;
  color?: string;
  fontSize?: string;
  onClick?: () => void;
  width?: string;
  height?: string;
  borderRadius?: string;
  href?: string;
  padding?: string;
  fontWeight?: string;
}

type StyledProps<T> = {
  [K in keyof T as `$${string & K}`]: T[K];
};

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
  fontWeight,
}: ActionButtonProps) {
  return (
    <>
      {href !== undefined ? (
        <Link href={href}>
          <Wrapper
            $bgColor={bgColor}
            $color={color}
            $width={width}
            $height={height}
            $borderRadius={borderRadius}
            $fontSize={fontSize}
            $padding={padding}
            $fontWeight={fontWeight}
          >
            {children}
          </Wrapper>
        </Link>
      ) : (
        <Wrapper
          $bgColor={bgColor}
          $color={color}
          $width={width}
          $height={height}
          $borderRadius={borderRadius}
          $fontSize={fontSize}
          $padding={padding}
          $fontWeight={fontWeight}
          onClick={onClick}
        >
          {children}
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled.div<StyledProps<ActionButtonProps>>`
  background: ${({ $bgColor }) => $bgColor || 'transparent'};
  color: ${({ $color }) => $color || 'black'};
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ $width }) => $width || 'auto'};
  height: ${({ $height }) => $height || 'auto'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '0px'};
  font-size: ${({ $fontSize }) => $fontSize || '14px'};
  cursor: pointer;
  padding: ${({ $padding }) => $padding || '0'};
  font-weight: ${({ $fontWeight }) => $fontWeight || '500'};
`;
