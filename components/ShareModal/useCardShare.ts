import html2canvas from 'html2canvas';
import { useState } from 'react';

export function useCardShare(ref: React.RefObject<HTMLDivElement>) {
  const [isDownloding, setIsDownloading] = useState(false);

  async function downloadImage() {
    if (ref.current === null) return;
    const name = 'my-prediction.jpeg';
    setIsDownloading(true);

    const canvas = await html2canvas(ref.current, {
      allowTaint: true,
      removeContainer: true,
      useCORS: true,
      scale: 4,
      imageTimeout: 15000,
    });

    const imgUrl = canvas.toDataURL('image/jpeg', 1.0);
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

  async function shareImage() {
    const name = 'my-prediction.jpeg';
    if (ref.current === null) return;
    const canvas = await html2canvas(ref.current, {
      allowTaint: true,
      removeContainer: true,
      useCORS: true,
      scale: 4,
      imageTimeout: 15000,
    });
    const imgUrl = canvas.toDataURL('image/jpeg', 1.0);
    const blob = await (await fetch(imgUrl)).blob();

    const filesArray = [
      new File([blob], `${name}`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    ];

    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
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
        alert(e);
      }
    } else {
      alert('지원되지 않는 브라우저입니다. 모바일 크롬으로 접속해주세요!');
    }
  }

  return { downloadImage, isDownloding, shareImage };
}
