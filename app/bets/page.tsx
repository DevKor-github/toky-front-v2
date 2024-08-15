'use client';

import 'swiper/css';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

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
import { QuestionType } from '@/libs/types/bets';

export default function Bets() {
  const { openShareModal } = useShareModal();

  // "Baseball" | "Soccer" | "Basketball" | "Rugby" | "Hockey"로 관리
  const [curNav, setCurNav] = useState<Exclude<SelectionType, 'All'>>('Baseball');
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    // 스와이퍼와 curNav 동기화
    swiperRef.current?.swiper.slideTo(SelectionMap[curNav]);
  }, [curNav]);

  async function openModal() {
    await openShareModal();
  }

  const handleNav = useCallback((selection: SelectionType) => {
    if (selection !== 'All') {
      setCurNav(selection);
    }
  }, []);

  // TODO: 실제 API로 변경
  const [questionData, setQuestionData] = useState(DUMMY_QUESTIONS_API);
  const requestHandler = (qid: number, answer: number) => {
    const newData = {
      ...questionData,
      [curNav]: questionData[curNav].map((quesition) => {
        if (quesition.questionId === qid) {
          return { ...quesition, answer };
        }
        return { ...quesition };
      }),
    };
    setQuestionData(newData);
    if (
      !checkIsDones(questionData) &&
      checkIsDones(newData) &&
      curNav !== SelectionArray[SelectionArray.length - 1].type
    ) {
      setCurNav(SelectionArray[SelectionMap[curNav] + 1].type);
    }
  };

  const checkIsDones = useCallback(
    (data: {
      Baseball: QuestionType[];
      Soccer: QuestionType[];
      Basketball: QuestionType[];
      Rugby: QuestionType[];
      Hockey: QuestionType[];
    }) => {
      let isDone = true;
      for (let key in data[curNav]) {
        if (data[curNav][key].answer === null) {
          isDone = false;
          break;
        }
      }
      return isDone;
    },
    [curNav],
  );

  return (
    <div>
      <NavScrollProvider<Exclude<SelectionType, 'All'>> target={curNav} />
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <PredictionBanner shareHandler={openModal} />
        <SportsSelectionBar curSelection={curNav} handleSelect={handleNav} isSticky />
        <Swiper slidesPerView={1} allowTouchMove={false} ref={swiperRef}>
          {Object.entries(questionData).map(([sportsName, questions]) => (
            <SwiperSlide key={sportsName}>
              <QuestionsWrapper>
                {questions.map((question, index) => {
                  return (
                    <PredictionQuestion
                      key={`${sportsName}-${index}`}
                      questionId={question.questionId}
                      questionIndex={index}
                      questionDescription={question.description}
                      options={question.choices}
                      myAnswer={question.answer}
                      percentage={question.percentage}
                      requestHandler={requestHandler}
                    />
                  );
                })}
              </QuestionsWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
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
