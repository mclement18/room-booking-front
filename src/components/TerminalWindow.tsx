'use client';
import React, { useEffect, useState } from 'react';
import TerminalParagraph from './TerminalParagraph';

interface TerminalWindowProps {
  paragraphs: string[];
}

const TerminalWindow = ({ paragraphs }: TerminalWindowProps) => {
  const [printUntil, setPrintUntil] = useState(-1);
  const [skip, setSkip] = useState(false);

  const onSkip = () => {
    setSkip(true);
    setPrintUntil(paragraphs.length);
  };

  const printNext = (idx: number) => () =>
    setPrintUntil((current) => (idx === current ? current + 1 : current));

  useEffect(() => {
    if (printUntil !== -1) return;

    function start() {
      setPrintUntil(0);
    }
    const timeoutId = setTimeout(start, 1700);
    return () => clearTimeout(timeoutId);
  }, [printUntil]);

  return (
    <div
      className="
        max-w-[600px] mx-auto min-h-[250px] p-5 relative
        rounded-md border border-electric-green-700
        bg-gradient-radial from-electric-green-800 from-5% via-electric-green-900 via-30% to-black
      "
    >
      {printUntil >= 0 &&
        paragraphs
          .slice(0, printUntil + 1)
          .map((paragraph, idx) => (
            <TerminalParagraph
              key={paragraph}
              text={paragraph}
              skip={skip}
              onTerminated={printNext(idx)}
            />
          ))}
      {printUntil < paragraphs.length && printUntil >= 0 && (
        <div className="flex justify-end w-full p-5 absolute bottom-0 right-0">
          <span
            className="hover:text-electric-green-400 hover:underline cursor-pointer"
            onClick={onSkip}
          >
            Skip &gt;&gt;
          </span>
        </div>
      )}
    </div>
  );
};

export default TerminalWindow;
