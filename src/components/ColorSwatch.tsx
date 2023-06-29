import { Color } from '@/constants/colors';
import React, { ForwardedRef, HtmlHTMLAttributes, forwardRef } from 'react';

type ColorSwatchProps = HtmlHTMLAttributes<
  HTMLSpanElement | HTMLButtonElement
> & { color: Color; component?: 'span' | 'button' };

const ColorSwatch = forwardRef<
  HTMLSpanElement | HTMLButtonElement,
  ColorSwatchProps
>(({ color, className, component, ...other }, ref) => {
  const colorClasses: Record<Color, string> = {
    blue: 'border-electric-blue-700 hover:border-electric-blue-300 bg-electric-blue-100',
    lightblue:
      'border-electric-lightblue-700 hover:border-electric-lightblue-300 bg-electric-lightblue-100',
    orange:
      'border-electric-orange-700 hover:border-electric-orange-300 bg-electric-orange-100',
    pink: 'border-electric-pink-700 hover:border-electric-pink-300 bg-electric-pink-100',
    red: 'border-electric-red-700 hover:border-electric-red-300 bg-electric-red-100',
    violet:
      'border-electric-violet-700 hover:border-electric-violet-300 bg-electric-violet-100',
    yellow:
      'border-electric-yellow-700 hover:border-electric-yellow-300 bg-electric-yellow-100',
  };

  const classes = `inline-block w-6 h-6 rounded-full border ${
    colorClasses[color]
  } ${className === undefined ? '' : className}`;

  return component === 'button' ? (
    <button
      type="button"
      ref={ref as ForwardedRef<HTMLButtonElement>}
      {...other}
      className={classes}
    ></button>
  ) : (
    <span ref={ref} {...other} className={classes}></span>
  );
});

ColorSwatch.displayName = 'ColorSwatch';

export default ColorSwatch;
