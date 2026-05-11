'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Cpu,
  GraduationCap,
  Settings,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

const navigation = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Device Reports',
    href: '/device-reports',
    icon: Cpu,
  },
  {
    name: 'Training Reports',
    href: '/training-reports',
    icon: GraduationCap,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3 }}
      className="glass-effect border-r border-gray-200 dark:border-navy-700 flex flex-col py-6 px-4"
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-8 px-2">
        <motion.div
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy-500 to-navy-600 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-navy-900 dark:text-white">Report</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">System</p>
          </div>
        </motion.div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg transition-colors"
        >
          <ChevronDown
            className={`w-5 h-5 transition-transform ${
              isCollapsed ? 'rotate-90' : ''
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-navy-500 text-white shadow-soft'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-navy-800'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <motion.span
                  animate={{ opacity: isCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium"
                >
                  {item.name}
                </motion.span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Footer Info */}
      <motion.div
        animate={{ opacity: isCollapsed ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="pt-4 border-t border-gray-200 dark:border-navy-700"
      >
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          v1.0.0
        </p>
      </motion.div>
    </motion.aside>
  )
}
