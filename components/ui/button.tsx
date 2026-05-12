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
      'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 shadow-soft hover:shadow-soft-lg',
    secondary:
      'bg-slate-100 text-slate-900 hover:bg-slate-200',
    outline:
      'border-2 border-slate-200 text-slate-900 hover:bg-slate-50',
    ghost:
      'text-slate-600 hover:bg-slate-100',
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
