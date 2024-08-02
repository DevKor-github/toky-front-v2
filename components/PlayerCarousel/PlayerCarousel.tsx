import FreeModeCarousel from '@/components/FreeModeCarousel';

export function PlayerCarousel({ children }: { children: React.ReactNode }) {
  return (
    <FreeModeCarousel padding="0px 0px 0px 20px" spaceBetween={10}>
      {children}
    </FreeModeCarousel>
  );
}
