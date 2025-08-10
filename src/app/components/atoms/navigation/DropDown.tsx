'use client';

import React from 'react';
import { NavigationLink } from '../../molecules/navigation/NavigationLink';
import {
  FiHome,
  FiCheckCircle,
  FiChevronDown,
  FiUser,
} from 'react-icons/fi';

import { motion, AnimatePresence, Variants, useReducedMotion } from 'framer-motion';

interface DropDownProps {
  isOpen: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({ isOpen }) => {
    
  const shouldReduce = useReducedMotion();

  // Backdrop variants (covers entire viewport, under the panel)
  const backdropVariants: Variants = {
    hidden: { opacity: 0, pointerEvents: 'none' },
    visible: { opacity: 0.48, pointerEvents: 'auto', transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, pointerEvents: 'none', transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } },
  };

  // Panel (scaleY) + fade variants
  const panelVariants: Variants = {
    hidden: {
      opacity: 0,
      scaleY: 0,
      y: -6,
      transformOrigin: 'top center',
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] },
    },
    visible: {
      opacity: 1,
      scaleY: 1,
      y: 0,
      transformOrigin: 'top center',
      transition: {
        duration: 0.44,
        ease: [0.22, 1, 0.36, 1],
        when: 'beforeChildren',
        staggerChildren: 0.06,
        delayChildren: 0.06,
      },
    },
    exit: {
      opacity: 0,
      scaleY: 0,
      y: -6,
      transformOrigin: 'top center',
      transition: { duration: 0.26, ease: [0.22, 1, 0.36, 1] },
    },
  };

  // Menu item variants (subtle pop + slide)
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: -8, scale: 0.995 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 700,
        damping: 40,
        mass: 0.24,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Dark fullscreen backdrop (uses theme color) */}
          {!shouldReduce ? (
            <motion.div
              className="fixed inset-0 z-10 bg-[var(--color-primary-dark)]"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={backdropVariants}
              aria-hidden="true"
              style={{ willChange: 'opacity' }}
            />
          ) : (
            // Reduced motion: static backdrop (no animation)
            <div className="fixed inset-0 z-10 bg-[var(--color-primary-dark)]" aria-hidden="true" />
          )}

          {/* The dropdown panel (preserves your original classes & layout) */}
          <motion.div
            className="
                lg:hidden absolute inset-x-0 top-0
                bg-[var(--color-bg-primary)] shadow-lg z-20
            "
            // animation props for panel (respect reduced motion)
            {...(shouldReduce ? {} : { initial: 'hidden', animate: 'visible', exit: 'exit', variants: panelVariants })}
            style={{ transformOrigin: 'top center', willChange: 'transform, opacity' }}
            aria-hidden={!isOpen}
            role="dialog"
          >
            <motion.nav
              className="flex flex-col px-4 pt-24 pb-4 space-y-4"
              // keep nav simple; children use itemVariants and are staggered by panelVariants
              {...(shouldReduce ? {} : { initial: 'hidden', animate: 'visible', exit: 'hidden' })}
            >
              <motion.div variants={shouldReduce ? {} : itemVariants}>
                <NavigationLink
                  href="/"
                  label="Home"
                  icon={<FiHome className="text-[var(--color-primary-dark)] text-lg" />}
                  className="text-[var(--color-primary-dark)]"
                />
              </motion.div>

              <motion.div variants={shouldReduce ? {} : itemVariants}>
                <NavigationLink
                  href="/about"
                  label="About Us"
                  icon={<FiCheckCircle className="text-[var(--color-primary)] text-lg" />}
                  className="text-[var(--color-primary)]"
                />
              </motion.div>

              <motion.div variants={shouldReduce ? {} : itemVariants}>
                <NavigationLink
                  href="/services"
                  label="Our Services"
                  icon={<FiChevronDown className="text-[var(--color-primary)] text-lg" />}
                  className="text-[var(--color-primary)]"
                />
              </motion.div>

              <motion.div variants={shouldReduce ? {} : itemVariants}>
                <NavigationLink
                  href="/login"
                  label="Login"
                  icon={<FiUser className="text-[var(--color-primary)] text-lg" />}
                  className="text-[var(--color-primary)]"
                />
              </motion.div>
            </motion.nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
