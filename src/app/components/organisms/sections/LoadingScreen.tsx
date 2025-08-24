'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { LoaderFill } from '../../molecules';

export const LoadingScreen = () => {

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handle = setTimeout(() => setIsLoading(false), 2000); // Adjust duration
    return () => clearTimeout(handle);
  }, []);

  return (
    <>
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-white"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <LoaderFill />
                </motion.div>
            )}
        </AnimatePresence>
    </>
  );
};
