'use client'

import {
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Trash2,
  Edit2,
} from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export interface Column<T> {
  key: keyof T
  label: string
  sortable?: boolean
  width?: string
  render?: (value: any, row: T) => React.ReactNode
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  onEdit?: (item: T) => void
  onDelete?: (item: T) => void
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void
  emptyMessage?: string
}

export function Table<T extends { id: string }>({
  columns,
  data,
  onEdit,
  onDelete,
  onSort,
  emptyMessage = 'No data available',
}: TableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T
    direction: 'asc' | 'desc'
  } | null>(null)

  const handleSort = (key: keyof T) => {
    const newDirection =
      sortConfig?.key === key && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc'
    setSortConfig({ key, direction: newDirection })
    onSort?.(key, newDirection)
  }

  const getSortIcon = (key: keyof T) => {
    if (sortConfig?.key !== key)
      return <ChevronsUpDown className="w-4 h-4 opacity-40" />
    return sortConfig.direction === 'asc' ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    )
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-500">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-white border-b border-gray-100 sticky top-0">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-6 py-3 text-left text-sm font-semibold text-slate-700 ${
                  column.width || ''
                }`}
              >
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="flex items-center gap-2 hover:text-slate-900 transition-colors"
                  >
                    {column.label}
                    {getSortIcon(column.key)}
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-3 text-sm font-semibold text-slate-700">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="border-b border-gray-100 hover:bg-red-50/30 transition-colors"
            >
              {columns.map((column) => (
                <td
                  key={`${row.id}-${String(column.key)}`}
                  className={`px-6 py-4 text-sm text-slate-900 ${
                    column.width || ''
                  }`}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key])}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {onEdit && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onEdit(row)}
                        className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors text-blue-600"
                      >
                        <Edit2 className="w-4 h-4" />
                      </motion.button>
                    )}
                    {onDelete && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onDelete(row)}
                        className="p-1.5 hover:bg-red-100 rounded-lg transition-colors text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    )}
                  </div>
                </td>
              )}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
