"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  animation?: Variants;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  delay = 0,
  duration = 0.6,
  animation,
  className = "",
}: AnimateOnScrollProps) {
    
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            variants={
                animation || {
                hidden: { opacity: 0, y: 50 },
                visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration, delay, ease: "easeOut" },
                },
                }
            }
            className={className}
        >
            {children}
        </motion.div>
    </>
  );
}
