'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const codeText = `
for (when) {
    creators.are {
        .inspiring_movements()
    }
    we.are {
        .building_brands()
        .unlocking_potential()
        .scaling_legacies()
        .crafting_impact()
        .defining_future()
        .building_with_integrity()
    }
    we are {
        .studio93()
    }
}`;

const centeredText = `[ GROUNDS ]            [ CREATOR FOUNDRY ]             [ RESET ]             [ STNDRD ]`;

const codeLines = codeText.split("\n");
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^";

export default function AnimatedCode() {
  const [scrambledCodeLines, setScrambledCodeLines] = useState(codeLines.map(line =>
    line.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)]))
  );
  const [scrambledCenteredText, setScrambledCenteredText] = useState(
    centeredText.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)])
  );
  const [stoppingIndex, setStoppingIndex] = useState(-1);
  const [stopCenteredText, setStopCenteredText] = useState(false);

  useEffect(() => {
    let scrambleCounters = Array(codeLines.length).fill(0);
    let maxScrambleCounts = codeLines.map((_, i) => 7 + i * 3);
    let interval = setInterval(() => {
      setScrambledCodeLines(prevLines =>
        prevLines.map((line, index) =>
          scrambleCounters[index] < maxScrambleCounts[index]
            ? line.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)])
            : codeLines[index]
        )
      );

      scrambleCounters = scrambleCounters.map((count, i) => count + 1);

      if (scrambleCounters.every((count, i) => count >= maxScrambleCounts[i])) {
        clearInterval(interval);
        let index = 0;
        const stopInterval = setInterval(() => {
          setStoppingIndex(prev => {
            if (prev >= codeLines.length - 1) {
              clearInterval(stopInterval);
              setStopCenteredText(true);
            }
            return prev + 1;
          });
        }, 800);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!stopCenteredText) {
      let interval = setInterval(() => {
        setScrambledCenteredText(prevText =>
          prevText.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)])
        );
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setScrambledCenteredText(centeredText);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [stopCenteredText]);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-white text-blackfont-mono text-lg whitespace-pre p-4">
    <div className="max-w-[340px]">
    {scrambledCodeLines.map((line, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 + index * 0.3 }}
          className="code-line"
        >
          <motion.span
            animate={{ filter: stoppingIndex >= index ? "blur(0px)" : "blur(0px)" }}
            transition={{ duration: 0.4 + index * 0.3 }}
          >
            {stoppingIndex >= index ? codeLines[index] : line}
          </motion.span>
        </motion.div>
      ))}
    </div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5 }}
        className="centered-text w-full flex justify-center text-center mt-8 text-xl"
      >
        {scrambledCenteredText}
      </motion.div>
    </div>
  );
}