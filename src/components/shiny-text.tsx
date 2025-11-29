import React from 'react';
import { motion } from 'framer-motion';

interface ShinyTextProps {
  text: string;
  className?: string;
  duration?: number;
  gradientColor?: string;
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  className = '',
  duration = 2,
  gradientColor = 'rgba(255,255,255,0.8)'
}) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.span
        className="relative z-10"
        initial={{ backgroundPosition: '0% 50%' }}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          backgroundImage: `linear-gradient(90deg, transparent 0%, ${gradientColor} 50%, transparent 100%)`,
          backgroundSize: '200% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'inherit',
        }}
      >
        {text}
      </motion.span>
    </div>
  );
};

export default ShinyText;