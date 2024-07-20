'use client';
import styled from 'styled-components';
import MainTopBar from '@/components/MainTopBar';

export default function Home() {
  return (
    <div>
      <MainTopBar />
      <h1>Home</h1>
      <Test>Test</Test>
    </div>
  );
}

const Test = styled.div`
  color: red;
`;
