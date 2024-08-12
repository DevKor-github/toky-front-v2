'use client';

import styled from 'styled-components';
import { useCallback, useEffect, useState } from 'react';

import { SelectionArray, SelectionMap, SelectionType } from '@/libs/constants/sports';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import PredictionBanner from '@/components/PredictionBanner';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import PredictionQuestion from '@/components/PredictionQuestion';
import PredictionBottomBar from '@/components/PredictionBottomBar';
import { NavScrollProvider } from '@/app/bets/NavScrollProvider';
import { DUMMY_QUESTIONS_API } from '@/app/bets/dummy';

export default function Bets() {
  const { openShareModal } = useShareModal();

  // "Baseball" | "Soccer" | "Basketball" | "Rugby" | "Hockey"로 관리
  const [curNav, setCurNav] = useState<Exclude<SelectionType, 'All'>>('Baseball');

  async function openModal() {
    await openShareModal();
  }

  const handleNav = useCallback((selection: SelectionType) => {
    if (selection !== 'All') {
      setCurNav(selection);
    }
  }, []);

  // TODO: API 또는 Constant로 대체
  const questions = DUMMY_QUESTIONS_API[curNav];

  // TODO: 실제 API로 변경
  const [myAnswers, setMyAnswers] = useState<{ [key in number]: number | null }>({
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
  });
  useEffect(
    () =>
      setMyAnswers({
        0: null,
        1: null,
        2: null,
        3: null,
        4: null,
      }),
    [curNav],
  );
  const requestHandler = (qid: number, answer: number) => {
    setMyAnswers((p) => {
      const newObj = { ...p };
      newObj[qid] = answer;
      return newObj;
    });
  };

  useEffect(() => {
    let isDone = true;
    for (let key in myAnswers) {
      if (myAnswers[key] === null) {
        isDone = false;
        break;
      }
    }

    if (isDone && curNav !== SelectionArray[SelectionArray.length - 1].type) {
      setCurNav(SelectionArray[SelectionMap[curNav] + 1].type);
    }
  }, [myAnswers, curNav]);

  return (
    <div>
      <NavScrollProvider<Exclude<SelectionType, 'All'>> target={curNav} />
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <PredictionBanner shareHandler={openModal} />
        <SportsSelectionBar curSelection={curNav} handleSelect={handleNav} isSticky />
        <QuestionsWrapper>
          {questions.map((question, index) => (
            <PredictionQuestion
              key={`${curNav}-${index}`}
              questionId={question.questionId}
              questionIndex={index}
              questionDescription={question.description}
              options={question.choices}
              myAnswer={myAnswers[index]}
              percentage={question.percentage}
              requestHandler={requestHandler}
            />
          ))}
        </QuestionsWrapper>
        <PredictionBottomBar curSelection={curNav} handleNav={handleNav} />
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
