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
import { DeviceReportForm } from '@/components/forms/device-report-form'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

export interface DeviceReport {
  id: string
  unit: string
  device: string
  signalLostTime: string
  fixedTime: string
  cause: string
  result: string
  personInCharge: string
  createdAt: string
}

const mockDeviceReports: DeviceReport[] = [
  {
    id: '1',
    unit: 'A',
    device: 'TV',
    signalLostTime: '12:01:00 11/5/2026',
    fixedTime: '13:01:00 11/5/2026',
    cause: 'Power outage',
    result: 'Reset circuit breaker',
    personInCharge: 'Hanh',
    createdAt: '2026-05-11',
  },
  {
    id: '2',
    unit: 'B',
    device: 'Router',
    signalLostTime: '14:30:00 11/5/2026',
    fixedTime: '14:45:00 11/5/2026',
    cause: 'Connection issue',
    result: 'Restarted device',
    personInCharge: 'Nam',
    createdAt: '2026-05-11',
  },
  {
    id: '3',
    unit: 'C',
    device: 'Projector',
    signalLostTime: '09:15:00 11/5/2026',
    fixedTime: '09:30:00 11/5/2026',
    cause: 'Cable disconnected',
    result: 'Reconnected cable',
    personInCharge: 'Linh',
    createdAt: '2026-05-11',
  },
]

export function DeviceReports() {
  const [reports, setReports] = useState<DeviceReport[]>(mockDeviceReports)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterUnit, setFilterUnit] = useState('')
  const [filterPerson, setFilterPerson] = useState('')
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingReport, setEditingReport] = useState<DeviceReport | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DeviceReport
    direction: 'asc' | 'desc'
  } | null>(null)
  const { success } = useToast()

  const units = ['A', 'B', 'C', 'D']
  const people = Array.from(new Set(reports.map((r) => r.personInCharge)))

  const filteredAndSortedReports = useMemo(() => {
    let filtered = reports.filter((report) => {
      const matchesSearch =
        report.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.result.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesUnit = !filterUnit || report.unit === filterUnit
      const matchesPerson = !filterPerson || report.personInCharge === filterPerson

      return matchesSearch && matchesUnit && matchesPerson
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
  }, [reports, searchTerm, filterUnit, filterPerson, sortConfig])

  const handleCreateReport = (data: Omit<DeviceReport, 'id' | 'createdAt'>) => {
    const newReport: DeviceReport = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
    }
    setReports([newReport, ...reports])
    setIsCreateModalOpen(false)
    success('Device report created successfully!')
  }

  const handleEditReport = (data: Omit<DeviceReport, 'id' | 'createdAt'>) => {
    if (!editingReport) return
    const updatedReports = reports.map((r) =>
      r.id === editingReport.id
        ? { ...r, ...data }
        : r
    )
    setReports(updatedReports)
    setIsEditModalOpen(false)
    setEditingReport(null)
    success('Device report updated successfully!')
  }

  const handleDeleteReport = (id: string) => {
    setReports(reports.filter((r) => r.id !== id))
    setDeleteConfirm(null)
    success('Device report deleted successfully!')
  }

  const handleExport = () => {
    const csv = [
      ['Unit', 'Device', 'Signal Lost Time', 'Fixed Time', 'Cause', 'Result', 'Person in Charge'].join(','),
      ...filteredAndSortedReports.map((r) =>
        [r.unit, r.device, r.signalLostTime, r.fixedTime, r.cause, r.result, r.personInCharge].join(',')
      ),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `device-reports-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    success('Device reports exported successfully!')
  }

  const columns: Column<DeviceReport>[] = [
    { key: 'unit', label: 'Unit', sortable: true, width: 'w-20' },
    { key: 'device', label: 'Device', sortable: true },
    { key: 'signalLostTime', label: 'Signal Lost Time', sortable: true },
    { key: 'fixedTime', label: 'Fixed Time', sortable: true },
    { key: 'cause', label: 'Cause', sortable: true },
    { key: 'result', label: 'Result', sortable: true },
    { key: 'personInCharge', label: 'Person in Charge', sortable: true },
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
          Device Reports
        </h1>
        <p className="text-slate-600">
          Manage and track device maintenance reports
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
            placeholder="Filter by person"
            options={people.map((p) => ({ value: p, label: p }))}
            value={filterPerson}
            onChange={(v) => setFilterPerson(v as string)}
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
            setSortConfig({ key: key as keyof DeviceReport, direction })
          }
          emptyMessage="No device reports found"
        />
      </Card>

      {/* Modals */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Device Report"
        size="lg"
      >
        <DeviceReportForm
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
        title="Edit Device Report"
        size="lg"
      >
        {editingReport && (
          <DeviceReportForm
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
        message="Are you sure you want to delete this device report? This action cannot be undone."
        onConfirm={() => deleteConfirm && handleDeleteReport(deleteConfirm)}
        onCancel={() => setDeleteConfirm(null)}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </motion.div>
  )
}
