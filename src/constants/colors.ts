export const colors = [
  'blue',
  'lightblue',
  'violet',
  'orange',
  'red',
  'pink',
  'yellow',
] as const;

export type Color = (typeof colors)[number];
