export const colors = {
  primary: '#121212',
  topBar: '#121212',
  background: '#121212',
  white87: 'rgba(255, 255, 255, 0.87)',
  white60: 'rgba(255, 255, 255, 0.60)',
  secondaryBackground: 'rgba(255, 255, 255, 0.15)',
  navigationBar:
    'var(--Background-5, linear-gradient(0deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.05) 100%), #121212)',
  header:
    'background: var(--Background-7, linear-gradient(0deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.07) 100%), #121212)',
  gradientButtonBlue: 'linear-gradient(180deg, #4C0EB0 0%, rgba(76, 14, 176, 0.60) 100%)',
  gradientButtonGray:
    'linear-gradient(180deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.05) 100%), #121212  ',
  purple: '#4C0EB0',
  black24: '#383838',
} as const;

export type Colors = keyof typeof colors;

export const colorValues = Object.keys(colors);

export function getColor(color: Colors) {
  return colors[color];
}
