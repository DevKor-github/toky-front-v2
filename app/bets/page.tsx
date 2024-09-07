'use client';

import 'swiper/css';
import styled from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import { useAuthStore } from '@/libs/store/Providers/AuthStoreProvider';
import { useTicketStore } from '@/libs/store/Providers/TicketStoreProvider';
import { useGetBetQuestions, useGetMyBets, usePostBet } from '@/libs/apis/bets';
import { PlaySportsArray, SelectionArray, SelectionMap, SelectionType } from '@/libs/constants/sports';
import { NavScrollProvider } from '@/app/bets/NavScrollProvider';
import { QuestionType } from '@/libs/types/bets';
import { createQuestions } from '@/libs/utils/createQuestions';

import { useToast } from '@/components/Toast';
import { useLoginModal } from '@/components/LoginModal/useLoginModal';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import PredictionBanner from '@/components/PredictionBanner';
import SportsSelectionBar from '@/components/SportsSelectionBar';
import PredictionQuestion from '@/components/PredictionQuestion';
import PredictionBottomBar from '@/components/PredictionBottomBar';
import { sendGAEvent } from '@next/third-parties/google';

const checkIsDones = (data: QuestionType[]) => {
  let isDone = true;
  for (let i = 0; i < data.length; i++) {
    if (data[i].myAnswer === null) {
      isDone = false;
      break;
    }
  }
  return isDone;
};

export default function Bets() {
  const isLogin = useAuthStore((state) => state.isLogin);
  const addTickets = useTicketStore((state) => state.addTickets);

  const { openLoginModal } = useLoginModal();
  const { openShareModal } = useShareModal();
  const { openToast } = useToast();

  const { data: betQuestions } = useGetBetQuestions();
  const { data: myBets, refetch: getMyBets } = useGetMyBets();
  const { mutate: bet } = usePostBet();
  const questionData = createQuestions(betQuestions!, myBets);

  // "baseball" | "football" | "basketball" | "icehockey"로 관리
  const [curNav, setCurNav] = useState<Exclude<SelectionType, 'all' | 'rugby'>>('baseball');
  const swiperRef = useRef<SwiperRef>(null);
  useEffect(() => {
    // 스와이퍼와 curNav 동기화
    swiperRef.current?.swiper.slideTo(SelectionMap[curNav]);
  }, [curNav]);

  useEffect(() => {
    if (isLogin) {
      getMyBets();
    }
  }, [getMyBets, isLogin]);

  const openModal = useCallback(async () => {
    await openShareModal();
  }, [openShareModal]);

  const handleNav = useCallback((selection: SelectionType) => {
    if (selection !== 'all' && selection !== 'rugby') {
      setCurNav(selection);
    }
  }, []);

  const requestHandler = useCallback(
    (qid: number, answer: number, prevAnswer: number | null) => {
      if (!isLogin) {
        openLoginModal();
        return;
      }

      const newData = questionData[curNav].map((question) => {
        if (question.questionId === qid) {
          return { ...question, myAnswer: answer };
        }
        return { ...question };
      });

      sendGAEvent('event', 'bet', {
        type: 'click',
        questionID: qid,
        sports: curNav,
        answer,
      });

      bet(
        { answer, questionId: qid, sports: curNav },
        {
          onSuccess: () => {
            if (prevAnswer === null) {
              openToast({ message: '응모권 1장 획득!' });
              addTickets(1);
              sendGAEvent('event', 'bet', {
                type: 'first-click',
                questionID: qid,
                sports: curNav,
                answer,
              });
            }
          },
        },
      );

      if (!checkIsDones(questionData[curNav]) && checkIsDones(newData)) {
        // 이전에 응답을 덜 했었고,
        // 이번 응답으로 현재 종목의 모든 응답이 완료된 경우
        let allDone = true;
        for (let i = 0; i < PlaySportsArray.length; i++) {
          const key = PlaySportsArray[i].type;
          if (key !== curNav) {
            if (!checkIsDones(questionData[key])) {
              allDone = false;
              break;
            }
          }
        }

        if (allDone) {
          // 진짜 모든 종목의 응답이 끝난 경우
          setTimeout(openModal, 500);
        } else {
          if (curNav !== PlaySportsArray[PlaySportsArray.length - 1].type) {
            // 마지막 종목이 아닌 경우
            setTimeout(() => setCurNav(PlaySportsArray[SelectionMap[curNav] + 1].type), 500);
          }
        }
      }
    },
    [curNav, questionData, isLogin, openLoginModal, openToast, bet, addTickets, openModal],
  );

  return (
    <div>
      <NavScrollProvider<Exclude<SelectionType, 'all'>> target={curNav} />
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <PredictionBanner shareHandler={openModal} />
        <SportsSelectionBar isPlayOnly={true} curSelection={curNav} handleSelect={handleNav} isSticky />
        <Swiper slidesPerView={1} allowTouchMove={false} ref={swiperRef}>
          {PlaySportsArray.map(({ type }) => (
            <SwiperSlide
              key={type}
              onFocus={() => {
                if (swiperRef.current) {
                  swiperRef.current.swiper.el.scrollLeft = 0;
                }
              }}
            >
              {
                <QuestionsWrapper>
                  {questionData[type].map((question, index) => {
                    return (
                      <PredictionQuestion
                        key={`${type}-${index}`}
                        questionId={question.questionId}
                        questionIndex={index}
                        questionDescription={question.description}
                        options={question.choices}
                        myAnswer={question.myAnswer}
                        percentage={question.percentage}
                        requestHandler={requestHandler}
                        realAnswer={question.realAnswer}
                      />
                    );
                  })}
                </QuestionsWrapper>
              }
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
