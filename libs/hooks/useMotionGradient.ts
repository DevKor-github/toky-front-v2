import { useSpring, useTransform } from 'framer-motion';

export function useMotionGradient(position: 'left' | 'center' | 'right') {
  const colorHandler = useSpring(0, { bounce: 0 });

  const triggerAnimation = (status: -1 | 0 | 1) => {
    colorHandler.set(status);
  };

  const lastBG =
    position === 'left'
      ? 'linear-gradient(90deg, #F3233C 0%, rgba(243, 35, 60, 0.25) 100%)'
      : position === 'right'
        ? 'linear-gradient(90deg, rgba(41, 72, 255, 0.25) 0%, #2948FF 100%)'
        : 'linear-gradient(90deg, rgba(76, 14, 176, 0.60) -12.75%, #4C0EB0 38.63%, #4C0EB0 60.71%, rgba(76, 14, 176, 0.60) 113.73%)';

  return {
    triggerAnimation,
    background: useTransform(
      colorHandler,
      [-1, 0, 1],
      [
        'linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.03) 100%), #121212',
        'linear-gradient(0deg, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.14) 100%), #121212',
        lastBG,
      ],
    ),
  };
}
