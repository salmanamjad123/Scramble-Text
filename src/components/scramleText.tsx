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

const centeredTextArray = ["[ GROUNDS ]", "[ CREATOR FOUNDRY ]", "[ RESET ]", "[ STNDRD ]"];
const codeLines = codeText.split("\n");
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890*#@/*!%&^";

export default function AnimatedCode() {
  const [scrambledCodeLines, setScrambledCodeLines] = useState(codeLines.map(line =>
    line.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)]))
  );
  const [scrambledCenteredText, setScrambledCenteredText] = useState(
    centeredTextArray.map(text => text.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)]))
  );
  const [stoppingIndex, setStoppingIndex] = useState(-1);
  const [stopCenteredText, setStopCenteredText] = useState(false);

  useEffect(() => {
    let scrambleCounters = Array(codeLines.length).fill(0);
    const maxScrambleCounts = codeLines.map((_, i) => 3 + i * 2);

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
          prevText.map(text => text.replace(/[^\s]/g, () => chars[Math.floor(Math.random() * chars.length)]))
        );
      }, 100);
      setTimeout(() => {
        clearInterval(interval);
        setScrambledCenteredText(centeredTextArray);
      }, 3200);
      return () => clearInterval(interval);
    }
  }, [stopCenteredText]);

  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-white font-firaCode text-sm  sm:text-xl text-black  whitespace-pre p-4 w-full overflow-hidden">
      <div className="max-w-[340px]">
        {scrambledCodeLines.map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="code-line font-firaCode"
          >
            {stoppingIndex >= index ? codeLines[index] : line}
          </motion.div>
        ))}
      </div>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 0.7, delay: codeLines.length * 0.1 }}
        className="centered-text w-full grid grid-cols-2 sm:grid-cols-4 gap-4 text-center mt-8 text-sm sm:text-xl  mob:text-sm font-firaCode max-w-[1400px]"
      >
        {scrambledCenteredText.map((text, index) => (
          <div key={index}>{text}</div>
        ))}
      </motion.div>
    </div>
  );
}