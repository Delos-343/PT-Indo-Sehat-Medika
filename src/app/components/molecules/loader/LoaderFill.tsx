'use client';

import { motion } from 'framer-motion';
import { LoaderSpinner } from '../../atoms';

export const LoaderFill = () => (
    <>
        <div className="flex flex-col items-center gap-4">
            <LoaderSpinner />
                <motion.p
                    className="text-lg font-semibold text-[var(--color-primary-dark)] my-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                >
                    Untuk Kesehatan Anda . . .
                </motion.p>
        </div>
    </>
);
