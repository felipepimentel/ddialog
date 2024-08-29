import React from 'react';
import { motion } from "framer-motion";
import { Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TypingIndicatorProps {
  isDarkMode: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={cn("flex items-center", isDarkMode ? "text-gray-400" : "text-gray-600")}
    >
      <Bot className="h-4 w-4 mr-2" />
      <span>AI is thinking</span>
      <Loader2 className="h-4 w-4 ml-2 animate-spin" />
    </motion.div>
  );
};

export default TypingIndicator;