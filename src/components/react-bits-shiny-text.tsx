import React from 'react';
import { motion } from 'framer-motion';

interface ReactBitsShinyTextProps {
  text: string;
  className?: string;
  duration?: number;
  shineColor?: string;
  textColor?: string;
}

const ReactBitsShinyText: React.FC<ReactBitsShinyTextProps> = ({ 
  text, 
  className = '',
  duration = 2,
  shineColor = 'rgba(255,255,255,0.9)',
  textColor = 'inherit'
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        initial={{ backgroundPosition: '-100% 0' }}
        animate={{ backgroundPosition: '200% 0' }}
        transition={{
          duration: duration,
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear"
        }}
        style={{
          backgroundImage: `linear-gradient(
            90deg,
            transparent 0%,
            ${shineColor} 50%,
            transparent 100%
          )`,
          backgroundSize: '200% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: textColor,
          backgroundRepeat: 'no-repeat',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default ReactBitsShinyText;