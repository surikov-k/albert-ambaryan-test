import { ReactNode } from "react";

import { motion } from "framer-motion";

interface MotionFadeInProps {
  children: ReactNode;
}

export default function MotionFadeIn({ children }: MotionFadeInProps) {
  return (
    <motion.div
      className="flex w-full justify-center"
      initial={{ opacity: 0, scale: 0.92, y: -30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.2,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
}
