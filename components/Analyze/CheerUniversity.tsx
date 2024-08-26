import { Flex } from '@/libs/design-system/flex';
import styled from 'styled-components';
import { OptionButton } from '../PredictionQuestion/OptionButton';
import { useGetCheersParticipants, usePostCheers } from '@/libs/apis/cheers';
import { useAuthStore } from '@/libs/store/useAuthStore';
import { useLoginModal } from '../LoginModal/useLoginModal';
import { useEffect, useState } from 'react';

interface CheerInfo {
  myAnswer: number | null;
  koreaParticipants: number;
  yonseiParticipants: number;
  totalParticipants: number;
  koreaPercentage: number;
  yonseiPercentage: number;
}

export function CheerUniversity() {
  const { isLogin } = useAuthStore();
  const { data } = useGetCheersParticipants();
  const { mutate: postCheers, isSuccess } = usePostCheers();
  const { openLoginModal } = useLoginModal();
  const [cheerInfo, setCheerInfo] = useState<CheerInfo | null>(null);

  function handleAnswer(index: number) {
    if (!isLogin) {
      openLoginModal();
      return;
    }
    if (!cheerInfo) return;
    if (cheerInfo.myAnswer === index) return;
    postCheers({ univ: index });

    const newTotalParticipants =
      cheerInfo.myAnswer == null ? cheerInfo.totalParticipants + 1 : cheerInfo.totalParticipants;

    if (index === 0) {
      const newKoreaParticipants = cheerInfo.koreaParticipants + 1;
      const newKoreaPercentage = Math.floor((newKoreaParticipants / newTotalParticipants) * 100);

      setCheerInfo({
        koreaParticipants: newKoreaParticipants,
        totalParticipants: newTotalParticipants,
        yonseiParticipants: newTotalParticipants - newKoreaParticipants,
        koreaPercentage: newKoreaPercentage,
        yonseiPercentage: 100 - newKoreaPercentage,
        myAnswer: index,
      });
    } else {
      const newYonseiParticipants = cheerInfo.yonseiParticipants + 1;
      const newYonseiPercentage = Math.floor((newYonseiParticipants / newTotalParticipants) * 100);

      setCheerInfo({
        yonseiParticipants: newYonseiParticipants,
        koreaParticipants: newTotalParticipants - newYonseiParticipants,
        totalParticipants: newTotalParticipants,
        yonseiPercentage: newYonseiPercentage,
        koreaPercentage: 100 - newYonseiPercentage,
        myAnswer: index,
      });
    }
  }

  useEffect(() => {
    if (data) {
      const myAnswer = data.cheering ?? null;
      const koreaParticipants = data.participants[0] ?? 0;
      const yonseiParticipants = data.participants[1] ?? 0;
      const totalParticipants = koreaParticipants + yonseiParticipants;
      const koreaPercentage = totalParticipants === 0 ? 0 : Math.floor((koreaParticipants / totalParticipants) * 100);
      const yonseiPercentage = 100 - koreaPercentage;

      setCheerInfo({
        myAnswer,
        koreaParticipants,
        yonseiParticipants,
        totalParticipants,
        koreaPercentage,
        yonseiPercentage,
      });
    }
  }, [data]);

  return (
    <Wrapper>
      <Flex $direction="column" $align="center">
        <Title>자신의 학교를 응원해주세요!</Title>
      </Flex>
      <Flex style={{ width: '100%' }} $justify="center">
        <OptionButton
          option={'고려대학교'}
          index={0}
          handleAnswer={handleAnswer}
          position="left"
          percentage={cheerInfo?.koreaPercentage ?? 0}
          myAnswer={cheerInfo?.myAnswer ?? null}
        />
        <OptionButton
          option="연세대학교"
          index={1}
          handleAnswer={handleAnswer}
          position="right"
          percentage={cheerInfo?.yonseiPercentage ?? 0}
          myAnswer={cheerInfo?.myAnswer ?? null}
        />
      </Flex>
      <InfoWrapper>
        현재 <b>{cheerInfo?.koreaParticipants ?? 0}명</b>이 고려대학교, <b> {cheerInfo?.yonseiParticipants ?? 0}명</b>이
        연세대학교를
        <br /> 응원하고있어요!
      </InfoWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background: var(
    --Background-5,
    linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%),
    #121212
  );
  padding: 60px 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoWrapper = styled.div`
  color: #fff;
  text-align: center;
  font-family: 'Spoqa Han Sans Neo';
  font-size: 13px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;

  & b {
    font-weight: 400;
  }
  margin-top: 16px;
`;

const Title = styled.h1`
  color: var(--_87, rgba(255, 255, 255, 0.87));
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: -0.8px;
  margin-bottom: 24px;
`;