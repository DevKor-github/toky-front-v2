import { space } from '@/libs/design-system/styles';
import { useEffect, useRef } from 'react';

interface NavScrollProviderProps<Ttarget> {
  target: Ttarget;
}
export function NavScrollProvider<Ttarget>({ target }: NavScrollProviderProps<Ttarget>) {
  const prevTarget = useRef<null | Ttarget>(null);
  useEffect(() => {
    // 첫 렌더링을 제외한,
    // target 변경 시 스크롤 이동
    if (target !== prevTarget.current) {
      if (prevTarget.current !== null) {
        window.scrollTo({ top: space.predictionBannerHeight, behavior: 'smooth' });
      }
      prevTarget.current = target;
    }
  }, [target]);
  return <></>;
}
