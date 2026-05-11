'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
}

export function Button({
  children,
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
  size = 'md',
  type = 'button',
}: ButtonProps) {
  const baseStyles = 'btn-base font-medium rounded-lg transition-all'

  const variants = {
    primary:
      'bg-navy-500 text-white hover:bg-navy-600 active:bg-navy-700 shadow-soft hover:shadow-soft-lg',
    secondary:
      'bg-gray-100 dark:bg-navy-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-navy-700',
    outline:
      'border-2 border-gray-200 dark:border-navy-700 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-navy-800',
    ghost:
      'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-navy-800',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
