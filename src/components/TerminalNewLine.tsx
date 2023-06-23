import React, { PropsWithChildren } from 'react';

interface TerminalNewLineProps extends PropsWithChildren {
  disableCursor?: boolean;
}

const TerminalNewLine = ({ disableCursor, children }: TerminalNewLineProps) => (
  <p
    className={`${
      disableCursor ? 'after:content-none' : "after:content-['']"
    } after:animate-blink after:h-full after:border-r-4 after:border-electric-green-100`}
  >
    {children}
  </p>
);

export default TerminalNewLine;
