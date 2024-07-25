'use client';
import MainTopBar from '@/components/MainTopBar';
import NavigationBar from '@/components/NavigationBar';
import { useShareModal } from '@/components/ShareModal';
import { useCardShare } from '@/components/ShareModal/useCardShare';
import { v4 as uuidv4 } from 'uuid';

import html2canvas from 'html2canvas';
import { useRef } from 'react';
import styled from 'styled-components';
import Blob1 from '@/public/banner1.png';
import { IMG_LIST } from './constatnts';

export default function Bets() {
  const { openShareModal } = useShareModal();
  const ref = useRef<HTMLDivElement>(null);
  async function openModal() {
    await openShareModal();
  }
  async function shareImage() {
    if (ref.current === null) return;
    if (!navigator.share) {
      alert('지원되지 않는 브라우저입니다. 모바일 크롬으로 접속해주세요!');
      return;
    }

    const name = 'my-prediction.png';
    const blob = await fetch(Blob1.src).then((res) => res.blob());
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
        alert(e);
      }
    }
  }
  async function shareImage2() {
    if (ref.current === null) return;
    if (!navigator.share) {
      alert('지원되지 않는 브라우저입니다. 모바일 크롬으로 접속해주세요!');
      return;
    }

    const name = `${uuidv4()}.png`;
    const canvas = await html2canvas(ref.current, {
      allowTaint: true,
      scale: 4,
    });
    const imgUrl = canvas.toDataURL('image/png', 1.0);
    const blob = await imageUrlToBlob(imgUrl);
    if (!blob) return;

    const file = new File([blob], `${name}`, {
      type: 'image/png',
      lastModified: new Date().getTime(),
    });
    const formData = new FormData();
    formData.append('file', file);
    const response = await fetch('/api/s3-upload', {
      method: 'POST',
      body: formData,
    });
    const { key } = await response.json();
    const newBlob = await imageUrlToBlob(`/api/image-proxy/${key}`);
    return { newBlob, name };
  }

  async function sharereal(newBlob: Blob | undefined, name: string) {
    if (!newBlob) return;
    const filesArray = [
      new File([newBlob], `${name}`, {
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
        alert(e);
      }
    }
  }
  async function shareAndUpload() {
    const { newBlob, name } = (await shareImage2()) ?? {};
    if (!newBlob || !name) return;
    await sharereal(newBlob, name);
  }

  async function imageUrlToBlob(imageUrl: string) {
    try {
      // Fetch the image from the URL
      const response = await fetch(imageUrl, {
        method: 'GET',
        // mode: 'cors', // Ensure CORS mode is enabled
        headers: {
          'Content-Type': 'image/png', // Adjust this based on the image type
        },
      });

      // Ensure the fetch was successful
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Convert the response to a Blob
      const blob = await response.blob();

      return blob;
    } catch (error) {
      console.error('There was an error!', error);
      alert(error);
    }
  }

  async function shareImage3() {
    // if (ref.current === null) return;
    // if (!navigator.share) {
    //   alert('지원되지 않는 브라우저입니다. 모바일 크롬으로 접속해주세요!');
    //   return;
    // }

    const name = 'my-prediction.jpeg';
    // const canvas = await html2canvas(ref.current);
    // const imgUrl = canvas.toDataURL('image/jpeg', 1.0);
    // const blob = await (await fetch(imgUrl)).blob();
    alert('hi');
    const blob = await imageUrlToBlob('/api/image-proxy/42a5b98b-ac6b-4e77-9554-5b8756453985.png');
    alert('hi2');
    if (!blob) return;
    const filesArray = [
      new File([blob], `${name}`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    ];
    console.log(filesArray);
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
        alert(e);
      }
    }
  }

  async function shareImage4() {
    // if (ref.current === null) return;
    // if (!navigator.share) {
    //   alert('지원되지 않는 브라우저입니다. 모바일 크롬으로 접속해주세요!');
    //   return;
    // }

    const name = 'my-prediction.jpeg';
    // const canvas = await html2canvas(ref.current);
    // const imgUrl = canvas.toDataURL('image/jpeg', 1.0);
    // const blob = await (await fetch(imgUrl)).blob();
    const imgRandom = IMG_LIST[Math.floor(Math.random() * IMG_LIST.length)];
    alert('hi');
    const blob = await imageUrlToBlob(`/api/image-proxy/${imgRandom.src}`);
    alert('hi2');
    if (!blob) return;
    const filesArray = [
      new File([blob], `${name}`, {
        type: 'image/jpeg',
        lastModified: new Date().getTime(),
      }),
    ];
    console.log(filesArray);
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
        alert(e);
      }
    }
  }

  function share() {
    navigator.share({
      title: 'TOKY',
      text: 'TOKY',
      url: 'https://toky.com',
    });
  }
  // const { shareImage } = useCardShare(ref);
  return (
    <div>
      <MainTopBar />
      <NavigationBar />
      <Wrapper>
        <button style={{ color: 'white' }} onClick={openModal}>
          공유
        </button>
        <button style={{ color: 'white' }} onClick={share}>
          공유
        </button>
        <div ref={ref} style={{ width: '100px', height: '100px', backgroundColor: 'red' }}></div>
        <button style={{ color: 'white' }} onClick={shareAndUpload}>
          공유
        </button>
        <button style={{ color: 'white' }} onClick={shareImage}>
          공유
        </button>
        <button style={{ color: 'white' }} onClick={shareImage3}>
          공유
        </button>
        <button style={{ color: 'white' }} onClick={shareImage4}>
          공유
        </button>
        {/* <img src="https://toky-bucket-dev.s3.ap-northeast-2.amazonaws.com/football_main_player.png" /> */}
      </Wrapper>
    </div>
  );
}

const Wrapper = styled.div`
  padding-top: ${(props) => props.theme.space.mainTopBarHeight + props.theme.space.navigationBarHeight}px;
`;
