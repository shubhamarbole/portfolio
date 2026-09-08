import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface CharacterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Character: React.FC<CharacterProps> = ({ char, progress, range }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {char}
      </span>
      <motion.span style={{ opacity }} className="absolute left-0 top-0">
        {char}
      </motion.span>
    </span>
  );
};

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const words = text.split(' ');
  const totalCharacters = text.length;

  let globalCharIndex = 0;

  return (
    <p
      ref={containerRef}
      className={className}
      style={{
        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
        ...style,
      }}
      aria-label={text}
    >
      {words.map((word, wordIndex) => {
        const wordChars = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {wordChars.map((char, charIndex) => {
              const start = globalCharIndex / totalCharacters;
              const end = (globalCharIndex + 1) / totalCharacters;
              globalCharIndex++;

              return (
                <Character
                  key={charIndex}
                  char={char}
                  progress={scrollYProgress}
                  range={[start, Math.min(end + 0.05, 1)]}
                />
              );
            })}
            {wordIndex < words.length - 1 && (() => {
              globalCharIndex++;
              return <span>&nbsp;</span>;
            })()}
          </span>
        );
      })}
    </p>
  );
};

export default AnimatedText;
