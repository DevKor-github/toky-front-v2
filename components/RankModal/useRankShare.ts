import { useRefEffect } from '@/libs/hooks/useRefEffect';
import { useProfileStore } from '@/libs/store/Providers/ProfileStoreProvider';
import html2canvas from 'html2canvas';
import { useEffect, useRef, useState } from 'react';
import { useToast } from '../Toast';
import { sendGAEvent } from '@next/third-parties/google';
import { useTicketStore } from '@/libs/store/Providers/TicketStoreProvider';
import { useGetRankInfo, usePostRankShare } from '@/libs/apis/bets';
import { RANK_IMAGE_LIST } from './constants';

export function useRankShare() {
  const [isDownloding, setIsDownloading] = useState(false);
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [canvasImageUrl, setCanvasImageUrl] = useState('');
  const addtickets = useTicketStore((state) => state.addTickets);
  const { openToast } = useToast();
  const { data: rankInfo, refetch: fetchMyRank, isLoading: isFetchLoading } = useGetRankInfo();
  const { mutate: postShare } = usePostRankShare(openShareSuccessToast);
  const imageRef = useRef(null);
  const [imgSrc, setImgSrc] = useState<string>();
  const isLoading = isFetchLoading || isCanvasLoading || isDownloding || isShareLoading;

  const shareRef = useRefEffect(
    (div: HTMLDivElement) => {
      if (!imgSrc || !rankInfo) return;
      makeImageUrl(div);
    },
    [imgSrc, rankInfo],
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * RANK_IMAGE_LIST.length);
    setImgSrc(RANK_IMAGE_LIST[randomIndex]);
  }, []);

  useEffect(() => {
    fetchMyRank();
  }, [fetchMyRank]);

  function openShareSuccessToast(ticket: number) {
    addtickets(1);
    openToast({ message: `응모권 1장 획득!` });
  }

  async function downloadImage() {
    if (imageRef.current === null) return;
    const name = 'my-rank.png';
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
    const name = 'my-rank.png';
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
    rankInfo,
    imgSrc,
    isFetchLoading,
  };
}
