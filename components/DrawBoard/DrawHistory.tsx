import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';

interface DrawHistoryProps {
  name: string;
  usedDraw: number;
}

export function DrawHistory({ name, usedDraw }: DrawHistoryProps) {
  return (
    <Flex $direction="column" style={{ width: 70 }} $justify="center" $align="center" $gap={4}>
      <ProductName>{name}</ProductName>
      <UsedDraw>{usedDraw}장</UsedDraw>
    </Flex>
  );
}

const ProductName = styled.p`
  color: ${({ theme }) => theme.colors.white87};
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.56px;
`;

const UsedDraw = styled.p`
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.72px;
`;
