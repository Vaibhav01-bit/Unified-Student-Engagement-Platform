import React from "react";
import { motion } from "framer-motion";

export const GlassBox = ({ children, className = "", delay = 0, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`bg-surface/80 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
