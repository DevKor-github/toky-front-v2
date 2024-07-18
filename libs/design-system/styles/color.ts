export const colors = {
  primary: "#000000",
} as const;

export type Colors = keyof typeof colors;

export const colorValues = Object.keys(colors);
