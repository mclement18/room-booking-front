'use client';
import React, { useEffect, useState } from 'react';

interface TerminalParagraphProps {
  text: string;
  skip?: boolean;
  onTerminated?: () => void;
}

const TerminalParagraph = ({
  text,
  skip,
  onTerminated,
}: TerminalParagraphProps) => {
  const [printedText, setPrintedText] = useState<string>('');
  const [printing, setPrinting] = useState(false);

  useEffect(() => {
    if (skip) {
      setPrintedText(text);
      setPrinting(false);
      return;
    }

    let timeoutId: number;
    function print() {
      if (printedText.length === text.length) {
        setPrinting(false);
        if (onTerminated) onTerminated();
      } else {
        if (!printing) setPrinting(true);
        setPrintedText((currentText) => text.slice(0, currentText.length + 1));
        timeoutId = window.setTimeout(print, 70);
      }
    }
    timeoutId = window.setTimeout(print, 70);
    return () => clearTimeout(timeoutId);
  }, [onTerminated, printedText.length, printing, skip, text]);

  return (
    <p
      className={`${
        printing ? "after:content-['']" : 'after:content-none'
      } after:animate-blink after:h-full after:border-r-4 after:border-electric-green-100`}
    >
      {printedText}
    </p>
  );
};

export default TerminalParagraph;
