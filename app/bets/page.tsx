'use client';

import styled from 'styled-components';

import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import PredictionBanner from '@/components/PredictionBanner';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import { useCallback, useState } from 'react';
import { SelectionType } from '@/components/SportsSelectionBar/constants';
import PredictionQuestion from '@/components/PredictionQuestion';

export default function Bets() {
  const { openShareModal } = useShareModal();

  // "Baseball" | "Soccer" | "Basketball" | "Rugby" | "Hockey"로 관리
  const [curNav, setCurNav] = useState<SelectionType>('Baseball');

  async function openModal() {
    await openShareModal();
  }

  const handleNav = useCallback((selection: SelectionType) => {
    setCurNav(selection);
  }, []);

  // TODO: API 또는 Constant로 대체
  const DUMMY_QUESTION = [
    { text: '우승할 팀을 예측해주세요.', option: ['고려대학교', '연세대학교'] },
    { text: '점유율이 더 높을 것 같은 팀을 선택해주세요.', option: ['고려대학교', '연세대학교'] },
    { text: '몇 점 차이로 승리할지 예측해주세요.', option: ['0~2점차', '3~4점차', '5점차 이상'] },
    { text: '첫 골을 선점할 팀을 예측해주세요.', option: ['고려대학교', '연세대학교'] },
    { text: '먼저 득점에 성공할 팀을 선택해주세요.', option: ['고려대학교', '연세대학교'] },
  ];

  // TODO: 실제 API로 변경
  const [myAnswers, setMyAnswers] = useState<{ [key in number]: number | null }>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });
  const requestHandler = (qid: number, answer: number) => {
    setMyAnswers((p) => {
      const newObj = { ...p };
      newObj[qid] = answer;
      return newObj;
    });
  };

  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <PredictionBanner shareHandler={openModal} />
        <SportsSelectionBar curSelection={curNav} handleSelect={handleNav} isSticky />
        <QuestionsWrapper>
          {DUMMY_QUESTION.map((question, index) => (
            <PredictionQuestion
              key={`${curNav}-${index}`}
              questionId={index}
              questionIndex={index}
              questionDescription={question.text}
              options={question.option}
              myAnswer={myAnswers[index]}
              percentage={question.option.map(() => 50)}
              requestHandler={requestHandler}
            />
          ))}
        </QuestionsWrapper>
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
`;

const QuestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 30px 20px 20px 20px;
`;
