'use client';

import React, { useEffect, useState } from 'react';

type TypeWriterProps = {
  texts: string[] | string;     // single string or array of strings
  speed?: number;               // ms per character while typing
  deleteSpeed?: number;         // ms per character while deleting
  pause?: number;               // ms pause after full text shown
  startDelay?: number;          // ms before starting first char
  loop?: boolean;               // loop phrases
  cursor?: React.ReactNode;     // cursor content
  className?: string;
};

export default function TypeWriter({
  texts,
  speed = 60,
  deleteSpeed = 30,
  pause = 1200,
  startDelay = 250,
  loop = false,
  cursor = '|',
  className,
}: TypeWriterProps) {

  const phrases = Array.isArray(texts) ? texts : [texts];

  const [phraseIndex, setPhraseIndex] = useState(0);

  const [display, setDisplay] = useState('');

  const [isDeleting, setIsDeleting] = useState(false);

  const [blink, setBlink] = useState(true);

  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {

    const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)');
    const v = mq ? mq.matches : false;

    setPrefersReduced(v);

    const handler = () => setPrefersReduced(Boolean(mq.matches));

    if (mq && mq.addEventListener) mq.addEventListener('change', handler);

    return () => { if (mq && mq.removeEventListener) mq.removeEventListener('change', handler); };
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setBlink(false);
      return;
    }
    const id = setInterval(() => setBlink((b) => !b), 500);
    return () => clearInterval(id);
  }, [prefersReduced]);

  useEffect(() => {
    if (prefersReduced) {
      // show full text immediately when reduced-motion is requested
      setDisplay(phrases.join(' '));
      return;
    }

    let mounted = true;
    let timer: number | undefined;

    const currentPhrase = phrases[phraseIndex];

    const tick = () => {

      if (!mounted) return;

      if (!isDeleting) {
        // typing
        const next = currentPhrase.slice(0, display.length + 1);
        setDisplay(next);

        if (next === currentPhrase) {
          // finished typing
          if (loop) {
            timer = window.setTimeout(() => setIsDeleting(true), pause);
          } else {
            return timer;
          }
        } else {
          timer = window.setTimeout(tick, speed);
        }
      } else {
        // deleting
        const next = currentPhrase.slice(0, display.length - 1);
        setDisplay(next);
        if (next === '') {
          // next phrase
          const nextIndex = (phraseIndex + 1) % phrases.length;
          setPhraseIndex(nextIndex);
          setIsDeleting(false);
          // if not looping and we've cycled through all, stop (show final phrase)
          if (!loop && nextIndex === 0) {
            setDisplay(phrases[0]);
            return;
          }
          timer = window.setTimeout(tick, startDelay);
        } else {
          timer = window.setTimeout(tick, deleteSpeed);
        }
      }
    };

    if (display === '') {
      timer = window.setTimeout(tick, startDelay);
    } else {
      timer = window.setTimeout(tick, isDeleting ? deleteSpeed : speed);
    }

    return () => {
      mounted = false;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display, isDeleting, phraseIndex, phrases, speed, deleteSpeed, pause, startDelay, loop, prefersReduced]);

  return (
    <>
        <span
            className={className}
            aria-live="polite"
            aria-atomic="true"
            style={{ whiteSpace: 'pre' }}
        >
            <span>
                {display}
            </span>
            <span aria-hidden style={{ display: 'inline-block', width: '0.6ch', marginLeft: 2 }}>
                {blink ? cursor : '\u00A0'}
            </span>
        </span>
    </>
  );
}
