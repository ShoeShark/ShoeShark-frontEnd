'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    className: string
}

export default function MotionLayout({ children, className }: Props) {
    const variants = {
        hidden: { opacity: 0, },
        enter: { opacity: 1, },
        exit: { opacity: 0, },
    }

    return (
        <motion.main
            data-scroll
            className={className}
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            {children}
        </motion.main>
    )
}
