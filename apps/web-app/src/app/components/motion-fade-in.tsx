import { ReactNode } from "react";

import { motion } from "framer-motion";

interface MotionFadeInProps {
  children: ReactNode;
}

export default function MotionFadeIn({ children }: MotionFadeInProps) {
  return (
    <motion.div
      className="flex w-full justify-center"
      initial={{ rotateY: 90 }}
      animate={{ rotateY: 0 }}
      exit={{ rotateY: -90 }}
      transition={{
        duration: 0.3,
        // delay: 0.2,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}
