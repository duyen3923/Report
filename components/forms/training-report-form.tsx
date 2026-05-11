'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { TrainingReport } from '@/components/pages/training-reports'

interface TrainingReportFormProps {
  initialData?: TrainingReport
  onSubmit: (data: Omit<TrainingReport, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

export function TrainingReportForm({
  initialData,
  onSubmit,
  onCancel,
}: TrainingReportFormProps) {
  const [formData, setFormData] = useState({
    unit: initialData?.unit || '',
    trainingContent: initialData?.trainingContent || '',
    trainer: initialData?.trainer || '',
    participants: initialData?.participants || '',
    trainingTime: initialData?.trainingTime || '',
    result: initialData?.result || '',
    notes: initialData?.notes || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const units = ['A', 'B', 'C', 'D']
  const trainingTopics = [
    'Safety Procedures',
    'System Basics',
    'Advanced Features',
    'Emergency Protocols',
    'Equipment Maintenance',
  ]
  const trainers = ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Williams']
  const results = ['Completed', 'In Progress', 'Pending', 'Cancelled']

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Unit"
          placeholder="Select unit"
          options={units.map((u) => ({ value: u, label: u }))}
          value={formData.unit}
          onChange={(v) => setFormData({ ...formData, unit: v as string })}
        />
        <Select
          label="Training Content"
          placeholder="Select content"
          options={trainingTopics.map((t) => ({ value: t, label: t }))}
          value={formData.trainingContent}
          onChange={(v) =>
            setFormData({ ...formData, trainingContent: v as string })
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Select
          label="Trainer"
          placeholder="Select trainer"
          options={trainers.map((t) => ({ value: t, label: t }))}
          value={formData.trainer}
          onChange={(v) => setFormData({ ...formData, trainer: v as string })}
        />
        <Input
          label="Participants"
          placeholder="Number of participants"
          type="number"
          value={formData.participants}
          onChange={(e) =>
            setFormData({ ...formData, participants: e.target.value })
          }
        />
      </div>

      <Input
        label="Training Time"
        placeholder="e.g., 09:00:00 11/5/2026"
        value={formData.trainingTime}
        onChange={(e) =>
          setFormData({ ...formData, trainingTime: e.target.value })
        }
      />

      <Select
        label="Result"
        placeholder="Select result"
        options={results.map((r) => ({ value: r, label: r }))}
        value={formData.result}
        onChange={(v) => setFormData({ ...formData, result: v as string })}
      />

      <Input
        label="Notes"
        placeholder="Additional notes about the training..."
        value={formData.notes}
        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
      />

      <div className="flex gap-2 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button type="submit" className="flex-1">
          {initialData ? 'Update Report' : 'Create Report'}
        </Button>
      </div>
    </form>
  )
}
