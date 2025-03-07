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
    const maxScrambleCounts = codeLines.map((_, i) => 7 + i * 3);

    const interval = setInterval(() => {
      setScrambledCodeLines(prevLines =>
        prevLines.map((line, index) =>
          scrambleCounters[index] < maxScrambleCounts[index]
            ? line.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)])
            : codeLines[index]
        )
      );

      scrambleCounters = scrambleCounters.map(count => count + 1);

      if (scrambleCounters.every((count, i) => count >= maxScrambleCounts[i])) {
        clearInterval(interval);
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
      const interval = setInterval(() => {
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
    <div className="relative flex flex-col justify-center items-center h-screen bg-white text-black font-mono text-lg whitespace-pre p-4">
      <div className="max-w-[340px]">
        {scrambledCodeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="code-line"
          >
            {stoppingIndex >= index ? codeLines[index] : line}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.3, delay: codeLines.length * 0.2 }}
        className="centered-text w-full flex justify-center text-center mt-8 text-xl"
      >
        {scrambledCenteredText}
      </motion.div>
    </div>
  );
}
