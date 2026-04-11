import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

export const Tilt3D = ({ children, className = "", tiltMaxAngle = 10, ...props }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Values from -1 to 1 based on mouse position relative to center of the card
    const x = (clientX - left - width / 2) / (width / 2);
    const y = (clientY - top - height / 2) / (height / 2);
    
    // Note: RotateX uses Y axis movement, and RotateY uses X axis movement
    mouseX.set(y * -tiltMaxAngle);
    mouseY.set(x * tiltMaxAngle);
  }
  
  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const transform = useMotionTemplate`perspective(1000px) rotateX(${mouseX}deg) rotateY(${mouseY}deg)`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`relative rounded-2xl w-full h-full ${className}`}
      {...props}
    >
      {/* Container for content that preserves 3d */}
      <div style={{ transform: "translateZ(30px)" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};
