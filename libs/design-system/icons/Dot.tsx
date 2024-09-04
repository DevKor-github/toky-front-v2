import { getColor } from '../styles';
import { IconProps } from './type';

export function Dot({ fill = 'white87', size = 5 }: IconProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 5 6" fill="none">
      <circle cx="2.5" cy="3" r="2.5" fill={getColor(fill)} />
    </svg>
  );
}
