'use client'

import { Search, Bell, User } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Header() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between shadow-sm">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 max-w-md"
      >
        <div
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg transition-all ${
            searchFocused
              ? 'bg-white ring-2 ring-red-500 shadow-soft border border-red-100'
              : 'bg-slate-50 border border-gray-200 hover:border-gray-300'
          }`}
        >
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports, devices..."
            className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder-slate-400"
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
          className="relative p-2 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </motion.button>

        {/* Profile */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white hover:shadow-soft transition-all"
        >
          <User className="w-5 h-5" />
        </motion.button>
      </div>
    </header>
  )
}
