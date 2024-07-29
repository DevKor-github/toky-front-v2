import { useRefEffect } from '@/libs/hooks/useRefEffect';
import html2canvas from 'html2canvas';
import { useRef, useState } from 'react';

export function useCardShare() {
  const [isDownloding, setIsDownloading] = useState(false);
  const [isCanvasLoading, setIsCanvasLoading] = useState(true);
  const [isShareLoading, setIsShareLoading] = useState(false);
  const [canvasImageUrl, setCanvasImageUrl] = useState('');
  const imageRef = useRef(null);

  const shareRef = useRefEffect((div: HTMLDivElement) => {
    makeImageUrl(div);
  }, []);

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
    setIsCanvasLoading(false);
    setCanvasImageUrl(imgUrl);
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
      console.error('There was an error!', error);
      alert(error);
    }
  }

  async function shareImage() {
    if (!navigator.share) {
      alert('지원되지 않는 브라우저입니다. 모바일 크롬으로 접속해주세요!');
      return;
    }

    if (!canvasImageUrl) {
      //TODO : 이미지 준비중 alert
      alert('이미지가 준비되지 않았습니다.');
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
        setIsShareLoading(false);
      }
    }
    setIsShareLoading(false);
  }

  return { isCanvasLoading, isDownloding, isShareLoading, imageRef, shareImage, makeImageUrl, shareRef, downloadImage };
}