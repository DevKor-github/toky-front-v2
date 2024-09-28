export function MainRankListStroke({ $width = '310' }: { $width?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={$width} height="2" viewBox={`0 0 ${$width} 2`} fill="none">
      <path d={`M0 1H${$width}`} stroke="white" strokeOpacity="0.15" />
    </svg>
  );
}
