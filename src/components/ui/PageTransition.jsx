import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const PageTransition = ({ children, transitionKey }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={transitionKey}
        initial="initial"
        animate="enter"
        exit="exit"
        variants={variants}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
