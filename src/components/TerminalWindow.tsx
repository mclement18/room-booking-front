'use client';
import React, { useEffect, useState } from 'react';
import TerminalParagraph from './TerminalParagraph';
import TerminalAlertParagraph from './TerminalAlertParagraph';
import TerminalNewLine from './TerminalNewLine';
import useAlertContext from '@/hooks/useAlertContext';

interface TerminalWindowProps {
  paragraphs: string[];
}

const TerminalWindow = ({ paragraphs }: TerminalWindowProps) => {
  const [printUntil, setPrintUntil] = useState(-1);
  const [skip, setSkip] = useState(false);
  const { alerts } = useAlertContext();

  const paragraphsToPrint = [...paragraphs, ...alerts];

  const onSkip = () => {
    setSkip(true);
    setPrintUntil(paragraphsToPrint.length);
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

  useEffect(() => {
    if (printUntil === paragraphsToPrint.length) {
      setSkip(false);
    }
  }, [paragraphsToPrint.length, printUntil]);

  return (
    <div
      className="
        max-w-[600px] mx-auto h-[250px] py-5 relative
        rounded-md border border-electric-green-700
        bg-gradient-radial from-electric-green-800 from-5% via-electric-green-900 via-30% to-black
      "
    >
      <div
        ref={(node) => {
          if (!node) return;
          const resizeObserver = new ResizeObserver(() => {
            node.scrollTop = node.scrollHeight;
          });
          for (let i = 0; i < node.children.length; i++) {
            const child = node.children[i];
            resizeObserver.observe(child);
          }
        }}
        className="px-5 overflow-y-scroll h-[208px] scrollbar-terminal"
      >
        {printUntil >= 0 ? (
          paragraphsToPrint.slice(0, printUntil + 1).map((paragraph, idx) => {
            if (typeof paragraph === 'string') {
              return (
                <TerminalParagraph
                  key={paragraph}
                  text={paragraph}
                  skip={skip}
                  onTerminated={printNext(idx)}
                />
              );
            } else {
              return (
                <TerminalAlertParagraph
                  key={paragraph.id}
                  alert={paragraph}
                  skip={skip}
                  onTerminated={printNext(idx)}
                />
              );
            }
          })
        ) : (
          <TerminalNewLine />
        )}
        {printUntil === paragraphsToPrint.length && <TerminalNewLine />}
      </div>
      {printUntil < paragraphsToPrint.length && printUntil >= 0 && (
        <div className="flex justify-end w-full p-5 absolute bottom-[-20px] right-[-10px]">
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
