"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface AnimatedCardProps {
  children: React.ReactNode;
}

const AnimatedCard = ({ children }: AnimatedCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <Card
        className={`flex w-[600px] flex-col items-center justify-center border-none bg-black/45 transition-all duration-300`}
      >
        {children}
      </Card>
    </motion.div>
  );
};

export default AnimatedCard;
