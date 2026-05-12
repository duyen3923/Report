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
      className="bg-white border-r border-gray-100 flex flex-col py-6 px-4 shadow-sm"
    >
      {/* Logo */}
      <div className="flex items-center justify-between mb-8 px-2">
        <motion.div
          animate={{ opacity: isCollapsed ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center">
            <Cpu className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-slate-900">Report</h1>
            <p className="text-xs text-slate-500">System</p>
          </div>
        </motion.div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ChevronDown
            className={`w-5 h-5 text-slate-600 transition-transform ${
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
                    ? 'bg-red-50 text-red-700 shadow-soft'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-red-600' : 'text-slate-500'}`} />
                <motion.span
                  animate={{ opacity: isCollapsed ? 0 : 1 }}
                  transition={{ duration: 0.2 }}
                  className={`text-sm font-medium ${isActive ? 'text-red-700' : 'text-slate-700'}`}
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
        className="pt-4 border-t border-gray-100"
      >
        <p className="text-xs text-slate-500 text-center">
          v1.0.0
        </p>
      </motion.div>
    </motion.aside>
  )
}
