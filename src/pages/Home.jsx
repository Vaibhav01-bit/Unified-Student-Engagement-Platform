import React from "react";
import { motion } from "framer-motion";
import { PageTransition } from "../components/ui/PageTransition";
import { ButtonAnim } from "../components/ui/ButtonAnim";
import { Tilt3D } from "../components/ui/Tilt3D";
import { GlassBox } from "../components/ui/GlassBox";
import { staggerContainer, popIn } from "../utils/animations";
import { Sparkles, ArrowRight, GraduationCap } from "lucide-react";

export const Home = () => {
  return (
    <PageTransition transitionKey="home">
      <div className="min-h-screen relative overflow-hidden flex items-center pt-24 pb-16">

        {/* Animated Background Blobs */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1], translate: [0, -50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-teal/20 rounded-full blur-[100px] pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

          {/* Hero Content */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="flex flex-col items-start gap-6"
          >
            <motion.div variants={popIn} className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-teal-100">Next Gen Education</span>
            </motion.div>

            <motion.h1
              variants={popIn}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Unified <span className="text-gradient">Student</span> Engagement
            </motion.h1>

            <motion.p
              variants={popIn}
              className="text-lg text-muted max-w-lg"
            >
              Experience a premium, highly interactive platform designed to keep you motivated, organized, and ahead of the curve.
            </motion.p>

            <motion.div variants={popIn} className="flex items-center gap-4 mt-4">
              <ButtonAnim variant="primary" className="flex items-center gap-2">
                Get Started <ArrowRight className="w-4 h-4" />
              </ButtonAnim>
              <ButtonAnim variant="secondary">
                View Dashboard
              </ButtonAnim>
            </motion.div>
          </motion.div>

          {/* Hero 3D Element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full flex justify-center items-center"
          >
            <Tilt3D tiltMaxAngle={15} className="w-full max-w-md aspect-square max-h-[500px]">
              <GlassBox className="w-full h-full flex flex-col items-center justify-center p-8 gap-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />

                <motion.div
                  animate={{ y: [0, -15, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-teal-400 flex items-center justify-center glow-blue">
                    <GraduationCap className="w-12 h-12 text-white" />
                  </div>
                </motion.div>

                <h3 className="text-2xl font-bold text-center mt-4">Master Your Path</h3>
                <p className="text-muted text-center text-sm">
                  Track your progress, manage finances, and explore universities all in one fluid workspace.
                </p>

                {/* Floating decorative elements */}
                <motion.div
                  className="absolute top-12 left-12 w-8 h-8 rounded-full bg-teal-500/20 blur-md"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-16 right-12 w-12 h-12 rounded-full bg-blue-500/20 blur-md"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                />
              </GlassBox>
            </Tilt3D>
          </motion.div>

        </div>
      </div>
    </PageTransition>
  );
};
