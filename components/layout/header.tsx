'use client'

import { Search, Bell, User, Moon, Sun } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [searchFocused, setSearchFocused] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setTheme(isDark ? 'dark' : 'light')
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    if (theme === 'light') {
      html.classList.add('dark')
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      html.classList.remove('dark')
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <header className="glass-effect border-b border-gray-200 dark:border-navy-700 px-8 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 max-w-md"
      >
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            searchFocused
              ? 'bg-white dark:bg-navy-800 ring-2 ring-navy-500 shadow-soft'
              : 'bg-gray-50 dark:bg-navy-800 border border-gray-200 dark:border-navy-700'
          }`}
        >
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports, devices..."
            className="flex-1 bg-transparent outline-none text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </motion.div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-8">
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </motion.button>

        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 hover:bg-gray-100 dark:hover:bg-navy-800 rounded-lg transition-colors"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-gray-600" />
          ) : (
            <Sun className="w-5 h-5 text-yellow-400" />
          )}
        </motion.button>

        {/* Profile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-navy-500 to-navy-600 flex items-center justify-center text-white hover:shadow-soft transition-all"
        >
          <User className="w-5 h-5" />
        </motion.button>
      </div>
    </header>
  )
}
