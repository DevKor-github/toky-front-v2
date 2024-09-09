import { useGetShareScore, usePostShare } from '@/libs/apis/bets';
import { useRefEffect } from '@/libs/hooks/useRefEffect';
import { useProfileStore } from '@/libs/store/Providers/ProfileStoreProvider';
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '../Toast';
import { sendGAEvent } from '@next/third-parties/google';
import { DRAW_IMAGE_LIST, KOREA_WIN_IMAGE_LIST, YONSEI_WIN_IMAGE_LIST } from './constants';
import { useTicketStore } from '@/libs/store/Providers/TicketStoreProvider';

export type PredictionResult = 'KOREA' | 'YONSEI' | 'DRAW';

export function useCardShare() {
  const [isDownloding, setIsDownloading] = useState(false);
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [canvasImageUrl, setCanvasImageUrl] = useState('');
  const profile = useProfileStore((state) => state.profile);
  const addtickets = useTicketStore((state) => state.addTickets);
  const { openToast } = useToast();
  const { data: scoreData, refetch: fetchMyScore, isLoading: isFetchLoading } = useGetShareScore();
  const { mutate: postShare } = usePostShare(openShareSuccessToast);
  const imageRef = useRef(null);
  const [predictionResult, setPredictionResult] = useState<PredictionResult>();
  const [imgSrc, setImgSrc] = useState<string>();
  const isLoading = isFetchLoading || isCanvasLoading || isDownloding || isShareLoading;

  useEffect(() => {
    if (!scoreData) return;
    setPredictionResult(undefined);
    if (scoreData.numWinKorea > scoreData.numWinYonsei) setPredictionResult('KOREA');
    else if (scoreData.numWinKorea < scoreData.numWinYonsei) setPredictionResult('YONSEI');
    else setPredictionResult('DRAW');
  }, [scoreData]);

  useEffect(() => {
    setImgSrc(undefined);
    const charaterSrcList =
      predictionResult === 'KOREA'
        ? KOREA_WIN_IMAGE_LIST
        : predictionResult === 'YONSEI'
          ? YONSEI_WIN_IMAGE_LIST
          : DRAW_IMAGE_LIST;
    const randomIndex = Math.floor(Math.random() * charaterSrcList.length);
    setImgSrc(charaterSrcList[randomIndex]);
  }, [predictionResult]);

  const shareRef = useRefEffect(
    (div: HTMLDivElement) => {
      if (!profile || !imgSrc) return;
      makeImageUrl(div);
    },
    [profile, imgSrc],
  );

  useEffect(() => {
    fetchMyScore();
  }, [fetchMyScore]);

  function openShareSuccessToast(ticket: number) {
    // TODO : 공유 성공 토스트
    addtickets(1);
    openToast({ message: `응모권 1장 획득!` });
  }

  async function downloadImage() {
    if (imageRef.current === null) return;
    const name = 'my-prediction.png';
    setIsDownloading(true);

    const canvas = await html2canvas(imageRef.current, {
      allowTaint: true,
      removeContainer: true,
      useCORS: true,
      scale: 4,
      imageTimeout: 15000,
    });

    const imgUrl = canvas.toDataURL('image/png', 1.0);
    imageLinkDownload(imgUrl, `${name}`);
    setIsDownloading(false);
  }

  function imageLinkDownload(blobLink: string, fileName: string) {
    const url = window.document.createElement('a');
    url.download = fileName;
    url.href = blobLink;
    document.body.appendChild(url);
    url.click();
    document.body.removeChild(url);
    url.remove();
  }

  async function makeImageUrl(div: HTMLDivElement) {
    setIsCanvasLoading(true);
    const canvas = await html2canvas(div, {
      allowTaint: true,
      removeContainer: true,
      useCORS: true,
      scale: 4,
      imageTimeout: 15000,
    });
    const imgUrl = canvas.toDataURL('image/png', 1.0);
    setCanvasImageUrl(imgUrl);
    setIsCanvasLoading(false);
  }

  async function imageUrlToBlob(imageUrl: string) {
    try {
      const response = await fetch(imageUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'image/png',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();

      return blob;
    } catch (error) {
      alert('에러가 발생했습니다 다시 시도해주세요');
    }
  }

  async function shareImage() {
    if (!navigator.share) {
      // TODO 모달로 변경
      alert('지원되지 않는 브라우저입니다. 모바일 크롬으로 접속해주세요!');
      return;
    }

    if (!canvasImageUrl) {
      //TODO : 이미지 준비중 alert
      alert('이미지를 준비 중입니다. 다시 한 번 시도해주세요');
      return;
    }
    setIsShareLoading(true);
    const blob = await imageUrlToBlob(canvasImageUrl);

    if (!blob) return;
    const name = 'my-prediction.png';
    const filesArray = [
      new File([blob], `${name}`, {
        type: 'image/png',
        lastModified: new Date().getTime(),
      }),
    ];

    if (navigator.canShare({ files: filesArray })) {
      try {
        sendGAEvent('event', 'share', {
          type: 'instagram-image-share',
        });
        await navigator.share({
          files: filesArray,
          // text: 'https://www.toky.com',
          // title: 'hi',
        });
      } catch (e: any) {
        if (name in e && e.name !== 'AbortError') {
          console.error(e);
        }
      } finally {
        postShare();
        setIsShareLoading(false);
      }
    }
    setIsShareLoading(false);
  }

  return {
    isLoading,
    imageRef,
    shareImage,
    makeImageUrl,
    shareRef,
    downloadImage,
    scoreData,
    profile,
    isFetchLoading,
    predictionResult,
    imgSrc,
  };
}
