'use client';

import { motion } from 'framer-motion';
import { BsHeartPulse } from 'react-icons/bs';

export const LoaderSpinner = () => (
    <>
        <motion.div
            className="flex items-center justify-center text-[var(--color-primary-dark)]"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        >
            <BsHeartPulse className="text-7xl" />
        </motion.div>
    </>
);
