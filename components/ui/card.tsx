'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

export function Card({
  children,
  className = '',
  onClick,
  hoverable = false,
}: CardProps) {
  return (
    <motion.div
      whileHover={hoverable ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-all border border-gray-100 ${hoverable ? 'cursor-pointer' : ''} ${className}`}
    >
      {children}
    </motion.div>
  )
}

interface StatsCardProps {
  label: string
  value: string | number
  icon: ReactNode
  trend?: {
    value: number
    direction: 'up' | 'down'
  }
  color?: 'blue' | 'green' | 'red' | 'purple'
}

export function StatsCard({
  label,
  value,
  icon,
  trend,
  color = 'blue',
}: StatsCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    red: 'bg-red-100 text-red-600',
    purple: 'bg-purple-100 text-purple-600',
  }

  return (
    <Card className="flex items-start justify-between">
      <div className="flex-1">
        <p className="text-sm text-slate-500 mb-2">{label}</p>
        <p className="text-2xl font-bold text-slate-900 mb-2">
          {value}
        </p>
        {trend && (
          <p
            className={`text-xs font-medium ${
              trend.direction === 'up'
                ? 'text-green-600'
                : 'text-red-600'
            }`}
          >
            {trend.direction === 'up' ? '↑' : '↓'} {Math.abs(trend.value)}% from
            last week
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${colorClasses[color]}`}>{icon}</div>
    </Card>
  )
}
