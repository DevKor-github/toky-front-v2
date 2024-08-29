'use client';

import 'swiper/css';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { useToast } from '@/components/Toast';
import { useLoginModal } from '@/components/LoginModal/useLoginModal';
import { SelectionArray, SelectionMap, SelectionType } from '@/libs/constants/sports';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import PredictionBanner from '@/components/PredictionBanner';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import PredictionQuestion from '@/components/PredictionQuestion';
import PredictionBottomBar from '@/components/PredictionBottomBar';
import { NavScrollProvider } from '@/app/bets/NavScrollProvider';
import { QuestionType } from '@/libs/types/bets';
import { useGetBetQuestions, useGetMyBets } from '@/libs/apis/bets';
import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';
import { createQuestions } from '@/libs/utils/createQuestions';

const checkIsDones = (
  data: {
    baseball: QuestionType[];
    football: QuestionType[];
    basketball: QuestionType[];
    rugby: QuestionType[];
    icehockey: QuestionType[];
  },
  curNav: Exclude<SelectionType, 'all'>,
) => {
  let isDone = true;
  for (let key in data[curNav]) {
    if (data[curNav][key].myAnswer === null) {
      isDone = false;
      break;
    }
  }
  return isDone;
};

export default function Bets() {
  const { openShareModal } = useShareModal();
  const isLogin = useAuthStore((state) => state.isLogin);
  const { openLoginModal } = useLoginModal();
  const { openToast } = useToast();

  // "baseball" | "football" | "basketball" | "rugby" | "icehockey"로 관리
  const [curNav, setCurNav] = useState<Exclude<SelectionType, 'all'>>('baseball');
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    // 스와이퍼와 curNav 동기화
    swiperRef.current?.swiper.slideTo(SelectionMap[curNav]);
  }, [curNav]);

  async function openModal() {
    await openShareModal();
  }

  const handleNav = useCallback((selection: SelectionType) => {
    if (selection !== 'all') {
      setCurNav(selection);
    }
  }, []);

  // TODO: 실제 API로 변경
  const { data: betQuestions } = useGetBetQuestions();
  const { data: myBets, refetch: getMyBets } = useGetMyBets();

  useEffect(() => {
    if (isLogin) {
      getMyBets();
    }
  }, [getMyBets, isLogin]);

  const questionData = createQuestions(betQuestions!, myBets);
  console.log(questionData);

  const requestHandler = useCallback(
    (qid: number, answer: number, prevAnswer: number | null) => {
      if (!isLogin) {
        openLoginModal();
        return;
      }

      if (prevAnswer === null) {
        openToast({ message: '응모권 1장 획득!' });
      }
      const newData = {
        ...questionData,
        [curNav]: questionData[curNav].map((quesition) => {
          if (quesition.questionId === qid) {
            return { ...quesition, answer };
          }
          return { ...quesition };
        }),
      };
      // setQuestionData(newData);
      if (
        !checkIsDones(questionData, curNav) &&
        checkIsDones(newData, curNav) &&
        curNav !== SelectionArray[SelectionArray.length - 1].type
      ) {
        setCurNav(SelectionArray[SelectionMap[curNav] + 1].type);
      }
    },
    [curNav, questionData, isLogin, openLoginModal],
  );

  return (
    <div>
      <NavScrollProvider<Exclude<SelectionType, 'all'>> target={curNav} />
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
                      myAnswer={question.myAnswer}
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
