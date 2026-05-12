'use client'

import { motion } from 'framer-motion'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { useToast } from '@/components/ui/toaster'
import { useState } from 'react'
import { Bell, Lock, Palette, Users } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    companyName: 'Report Management System',
    email: 'admin@example.com',
    theme: 'system',
    notifications: true,
    autoBackup: true,
  })
  const { success } = useToast()

  const handleSave = () => {
    success('Settings saved successfully!')
  }

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
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your system preferences and configuration
        </p>
      </motion.div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* General Settings */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-navy-100 dark:bg-navy-900 flex items-center justify-center">
                <Palette className="w-5 h-5 text-navy-600 dark:text-navy-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                General Settings
              </h2>
            </div>

            <div className="space-y-4">
              <Input
                label="Company Name"
                value={settings.companyName}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    companyName: e.target.value,
                  })
                }
              />

              <Input
                label="Email"
                type="email"
                value={settings.email}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    email: e.target.value,
                  })
                }
              />

              <Select
                label="Theme"
                options={[
                  { value: 'light', label: 'Light' },
                  { value: 'dark', label: 'Dark' },
                  { value: 'system', label: 'System' },
                ]}
                value={settings.theme}
                onChange={(v) =>
                  setSettings({
                    ...settings,
                    theme: v as string,
                  })
                }
              />
            </div>
          </Card>
        </motion.div>

        {/* Notification Settings */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      notifications: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Enable notifications
                </span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.autoBackup}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoBackup: e.target.checked,
                    })
                  }
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  Enable automatic backups
                </span>
              </label>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
                You&apos;ll receive notifications about report updates and system events.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Security Settings */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Security
              </h2>
            </div>

            <div className="space-y-4">
              <Button variant="secondary" className="w-full">
                Change Password
              </Button>
              <Button variant="secondary" className="w-full">
                Two-Factor Authentication
              </Button>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Protect your account with advanced security options.
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Account Settings */}
        <motion.div variants={itemVariants}>
          <Card className="mb-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Account
              </h2>
            </div>

            <div className="space-y-4">
              <Button variant="secondary" className="w-full">
                Manage Team Members
              </Button>
              <Button variant="secondary" className="w-full">
                API Keys
              </Button>
              <Button
                variant="outline"
                className="w-full text-red-600 dark:text-red-400 border-red-200 dark:border-red-800"
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Save Button */}
      <motion.div variants={itemVariants} className="mt-8 flex gap-4 justify-end">
        <Button variant="secondary">Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </motion.div>
    </motion.div>
  )
}
