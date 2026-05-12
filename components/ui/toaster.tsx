'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, AlertCircle, Info } from 'lucide-react'
import { useState, useCallback } from 'react'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

interface Toast {
  id: string
  message: string
  type: ToastType
}

let toastCount = 0
const toastStore = new Set<(toasts: Toast[]) => void>()
const toasts = new Map<string, Toast>()

export const useToast = () => {
  const [_] = useState<Toast[]>([])

  const notify = useCallback(
    (message: string, type: ToastType = 'info', duration = 4000) => {
      const id = `toast-${toastCount++}`
      const toast: Toast = { id, message, type }

      toasts.set(id, toast)
      toastStore.forEach((callback) => callback(Array.from(toasts.values())))

      if (duration > 0) {
        setTimeout(() => {
          toasts.delete(id)
          toastStore.forEach((callback) =>
            callback(Array.from(toasts.values()))
          )
        }, duration)
      }

      return id
    },
    []
  )

  return {
    success: (msg: string) => notify(msg, 'success'),
    error: (msg: string) => notify(msg, 'error'),
    info: (msg: string) => notify(msg, 'info'),
    warning: (msg: string) => notify(msg, 'warning'),
  }
}

export function Toaster() {
  const [toastList, setToastList] = useState<Toast[]>([])

  useCallback(() => {
    const callback = (newToasts: Toast[]) => {
      setToastList(newToasts)
    }
    toastStore.add(callback)
    return () => toastStore.delete(callback)
  }, [])()

  const getIcon = (type: ToastType) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5" />
      case 'error':
        return <X className="w-5 h-5" />
      case 'warning':
        return <AlertCircle className="w-5 h-5" />
      default:
        return <Info className="w-5 h-5" />
    }
  }

  const getStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-900'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-900'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-900'
      default:
        return 'bg-blue-50 border-blue-200 text-blue-900'
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toastList.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg border ${getStyles(
              toast.type
            )} pointer-events-auto glass-effect shadow-soft-lg`}
          >
            {getIcon(toast.type)}
            <p className="text-sm font-medium">{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
