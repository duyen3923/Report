'use client'

import { useState, useMemo } from 'react'
import { Plus, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Table, Column } from '@/components/ui/table'
import { Modal } from '@/components/ui/modal'
import { useToast } from '@/components/ui/toaster'
import { TrainingReportForm } from '@/components/forms/training-report-form'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export interface TrainingReport {
  id: string
  unit: string
  trainingContent: string
  trainer: string
  participants: string
  trainingHours: string
  result: string
  notes: string
  createdAt: string
}

const mockTrainingReports: TrainingReport[] = [
  {
    id: '1',
    unit: 'A',
    trainingContent: 'Safety Procedures',
    trainer: 'John Doe',
    participants: '15',
    trainingHours: '2 hours',
    result: 'Completed',
    notes: 'All participants passed the exam',
    createdAt: '2026-05-11',
  },
  {
    id: '2',
    unit: 'B',
    trainingContent: 'System Basics',
    trainer: 'Jane Smith',
    participants: '12',
    trainingHours: '3 hours',
    result: 'Completed',
    notes: 'Excellent participation',
    createdAt: '2026-05-11',
  },
  {
    id: '3',
    unit: 'C',
    trainingContent: 'Advanced Features',
    trainer: 'Mike Johnson',
    participants: '8',
    trainingHours: '1 hour',
    result: 'In Progress',
    notes: 'Hands-on session',
    createdAt: '2026-05-10',
  },
]

export function TrainingReports() {
  const [reports, setReports] = useState<TrainingReport[]>(mockTrainingReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUnit, setFilterUnit] = useState('')
  const [filterTrainer, setFilterTrainer] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<TrainingReport | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof TrainingReport
    direction: 'asc' | 'desc'
  } | null>(null)
  const { success } = useToast()

  const units = ['A', 'B', 'C', 'D']
  const trainers = Array.from(new Set(reports.map((r) => r.trainer)))

  const filteredAndSortedReports = useMemo(() => {
    let filtered = reports.filter((report) => {
      const matchesSearch =
        report.trainingContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.trainer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.notes.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesUnit = !filterUnit || report.unit === filterUnit
      const matchesTrainer = !filterTrainer || report.trainer === filterTrainer

      return matchesSearch && matchesUnit && matchesTrainer
    })

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key]
        const bValue = b[sortConfig.key]

        if (typeof aValue === 'string') {
          return sortConfig.direction === 'asc'
            ? aValue.localeCompare(bValue as string)
            : (bValue as string).localeCompare(aValue)
        }

        const aNum = Number(aValue)
        const bNum = Number(bValue)
        return sortConfig.direction === 'asc'
          ? aNum - bNum
          : bNum - aNum
      })
    }

    return filtered
  }, [reports, searchTerm, filterUnit, filterTrainer, sortConfig])

  const handleCreateReport = (data: Omit<TrainingReport, 'id' | 'createdAt'>) => {
    const newReport: TrainingReport = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    }
    setReports([newReport, ...reports])
    setIsCreateModalOpen(false)
    success('Training report created successfully!')
  }

  const handleEditReport = (data: Omit<TrainingReport, 'id' | 'createdAt'>) => {
    if (!editingReport) return
    const updatedReports = reports.map((r) =>
      r.id === editingReport.id
        ? { ...r, ...data }
        : r
    )
    setReports(updatedReports)
    setIsEditModalOpen(false)
    setEditingReport(null)
    success('Training report updated successfully!')
  }

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id))
    setDeleteConfirm(null)
    success('Training report deleted successfully!')
  }

  const handleExport = () => {
    const csv = [
      ['Unit', 'Training Content', 'Trainer', 'Participants', 'Training Hours', 'Result', 'Notes'].join(','),
      ...filteredAndSortedReports.map((r) =>
        [r.unit, r.trainingContent, r.trainer, r.participants, r.trainingHours, r.result, r.notes].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `training-reports-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    success('Training reports exported successfully!')
  }

  const columns: Column<TrainingReport>[] = [
    { key: 'unit', label: 'Unit', sortable: true, width: 'w-20' },
    { key: 'trainingContent', label: 'Training Content', sortable: true },
    { key: 'trainer', label: 'Trainer', sortable: true },
    { key: 'participants', label: 'Participants', sortable: true, width: 'w-24' },
    { key: 'trainingHours', label: 'Training Hours', sortable: true },
    { key: 'result', label: 'Result', sortable: true },
    {
      key: 'notes',
      label: 'Notes',
      render: (value) => (
        <span className="text-slate-600 truncate max-w-xs">
          {value}
        </span>
      ),
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="p-8"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Training Reports
        </h1>
        <p className="text-slate-600">
          Track and manage training sessions
        </p>
      </div>

      {/* Filters and Actions */}
      <Card className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <Input
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Select
            placeholder="Filter by unit"
            options={units.map((u) => ({ value: u, label: u }))}
            value={filterUnit}
            onChange={(v) => setFilterUnit(v as string)}
          />
          <Select
            placeholder="Filter by trainer"
            options={trainers.map((t) => ({ value: t, label: t }))}
            value={filterTrainer}
            onChange={(v) => setFilterTrainer(v as string)}
          />
          <div className="flex gap-2">
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex-1"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
            <Button
              onClick={handleExport}
              variant="secondary"
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
        <p className="text-sm text-slate-500">
          {filteredAndSortedReports.length} report{filteredAndSortedReports.length !== 1 ? 's' : ''} found
        </p>
      </Card>

      {/* Table */}
      <Card>
        <Table
          columns={columns}
          data={filteredAndSortedReports}
          onEdit={(report) => {
            setEditingReport(report)
            setIsEditModalOpen(true)
          }}
          onDelete={(report) => setDeleteConfirm(report.id)}
          onSort={(key, direction) =>
            setSortConfig({ key: key as keyof TrainingReport, direction })
          }
          emptyMessage="No training reports found"
        />
      </Card>

      {/* Modals */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Training Report"
        size="lg"
      >
        <TrainingReportForm
          onSubmit={handleCreateReport}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false)
          setEditingReport(null)
        }}
        title="Edit Training Report"
        size="lg"
      >
        {editingReport && (
          <TrainingReportForm
            initialData={editingReport}
            onSubmit={handleEditReport}
            onCancel={() => {
              setIsEditModalOpen(false)
              setEditingReport(null)
            }}
          />
        )}
      </Modal>

      <ConfirmDialog
        isOpen={deleteConfirm !== null}
        title="Delete Report"
        message="Are you sure you want to delete this training report? This action cannot be undone."
        onConfirm={() => deleteConfirm && handleDeleteReport(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  )
}
