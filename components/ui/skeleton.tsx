'use client'

import { motion } from 'framer-motion'

export function SkeletonCard() {
  return (
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="card space-y-4"
    >
      <div className="skeleton h-6 w-1/2" />
      <div className="skeleton h-4 w-full" />
      <div className="skeleton h-4 w-3/4" />
    </motion.div>
  )
}

export function SkeletonTable() {
  return (
    <div className="card">
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
            className="flex gap-4"
          >
            {Array.from({ length: 6 }).map((_, j) => (
              <div
                key={j}
                className="skeleton h-12 flex-1"
              />
            ))}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export function SkeletonLine() {
  return (
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="skeleton h-4 w-full"
    />
  )
}

interface SkeletonProps {
  width?: string
  height?: string
  circle?: boolean
}

export function Skeleton({
  width = 'w-full',
  height = 'h-4',
  circle = false,
}: SkeletonProps) {
  return (
    <motion.div
      animate={{ opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className={`skeleton ${width} ${height} ${circle ? 'rounded-full' : ''}`}
    />
  )
}
