import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export const AnimatedCard = ({ children, className = "", delay = 0, hoverable = true, ...props }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", stiffness: 300, damping: 24, delay }}
      whileHover={hoverable ? { scale: 1.02, y: -5 } : {}}
      className={cn(
        "bg-surface-card rounded-2xl border border-surface-border p-6 shadow-lg transition-shadow",
        hoverable && "hover:shadow-primary/20 hover:border-primary/50",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
