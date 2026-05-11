'use client'

import { StatsCard } from '@/components/ui/card'
import {
  BarChart3,
  Users,
  AlertCircle,
  TrendingUp,
  Cpu,
  GraduationCap,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface DashboardStats {
  totalReports: number
  todayReports: number
  mostProblematicDevice: string
  topEmployee: string
  deviceReportsCount: number
  trainingReportsCount: number
}

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalReports: 156,
    todayReports: 12,
    mostProblematicDevice: 'TV - Unit A',
    topEmployee: 'Hanh Nguyen',
    deviceReportsCount: 120,
    trainingReportsCount: 36,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Welcome back! Here's your system overview.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        <StatsCard
          label="Total Reports"
          value={stats.totalReports}
          icon={<BarChart3 className="w-6 h-6" />}
          trend={{ value: 12, direction: 'up' }}
          color="blue"
        />
        <StatsCard
          label="Today's Reports"
          value={stats.todayReports}
          icon={<TrendingUp className="w-6 h-6" />}
          trend={{ value: 5, direction: 'up' }}
          color="green"
        />
        <StatsCard
          label="Most Problematic Device"
          value={stats.mostProblematicDevice}
          icon={<AlertCircle className="w-6 h-6" />}
          color="red"
        />
        <StatsCard
          label="Top Handling Employee"
          value={stats.topEmployee}
          icon={<Users className="w-6 h-6" />}
          color="purple"
        />
        <StatsCard
          label="Device Reports"
          value={stats.deviceReportsCount}
          icon={<Cpu className="w-6 h-6" />}
          color="blue"
        />
        <StatsCard
          label="Training Reports"
          value={stats.trainingReportsCount}
          icon={<GraduationCap className="w-6 h-6" />}
          color="green"
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Device Reports Preview */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Device Reports
            </h2>
            <a
              href="/device-reports"
              className="text-sm text-navy-500 hover:text-navy-600 font-medium transition-colors"
            >
              View all →
            </a>
          </div>
          <div className="space-y-4">
            {[
              {
                device: 'TV - Unit A',
                issue: 'Power outage',
                status: 'Resolved',
              },
              {
                device: 'Router - Unit B',
                issue: 'Connection lost',
                status: 'In Progress',
              },
              {
                device: 'Projector - Unit C',
                issue: 'Display issue',
                status: 'Pending',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.device}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.issue}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    item.status === 'Resolved'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : item.status === 'In Progress'
                        ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Training Reports Preview */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Recent Training Reports
            </h2>
            <a
              href="/training-reports"
              className="text-sm text-navy-500 hover:text-navy-600 font-medium transition-colors"
            >
              View all →
            </a>
          </div>
          <div className="space-y-4">
            {[
              {
                training: 'Safety Procedures',
                trainer: 'John Doe',
                participants: 15,
              },
              {
                training: 'System Basics',
                trainer: 'Jane Smith',
                participants: 12,
              },
              {
                training: 'Advanced Features',
                trainer: 'Mike Johnson',
                participants: 8,
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-navy-800 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {item.training}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by {item.trainer}
                  </p>
                </div>
                <span className="text-sm font-semibold text-navy-600 dark:text-navy-400">
                  {item.participants} people
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
