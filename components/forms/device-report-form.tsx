'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { DeviceReport } from '@/components/pages/device-reports'

interface DeviceReportFormProps {
  initialData?: DeviceReport
  onSubmit: (data: Omit<DeviceReport, 'id' | 'createdAt'>) => void
  onCancel: () => void
}

export function DeviceReportForm({
  initialData,
  onSubmit,
  onCancel,
}: DeviceReportFormProps) {
  const [formData, setFormData] = useState({
    unit: initialData?.unit || '',
    device: initialData?.device || '',
    signalLostTime: initialData?.signalLostTime || '',
    fixedTime: initialData?.fixedTime || '',
    cause: initialData?.cause || '',
    result: initialData?.result || '',
    personInCharge: initialData?.personInCharge || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const units = ['A', 'B', 'C', 'D']
  const devices = ['TV', 'Router', 'Projector', 'Computer', 'Printer', 'Speaker']
  const people = ['Hanh', 'Nam', 'Linh', 'Duc', 'An']

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
          label="Device"
          placeholder="Select device"
          options={devices.map((d) => ({ value: d, label: d }))}
          value={formData.device}
          onChange={(v) => setFormData({ ...formData, device: v as string })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Signal Lost Time"
          placeholder="e.g., 12:01:00 11/5/2026"
          value={formData.signalLostTime}
          onChange={(e) =>
            setFormData({ ...formData, signalLostTime: e.target.value })
          }
        />
        <Input
          label="Fixed Time"
          placeholder="e.g., 13:01:00 11/5/2026"
          value={formData.fixedTime}
          onChange={(e) =>
            setFormData({ ...formData, fixedTime: e.target.value })
          }
        />
      </div>

      <Input
        label="Cause"
        placeholder="What caused the issue?"
        value={formData.cause}
        onChange={(e) => setFormData({ ...formData, cause: e.target.value })}
      />

      <Input
        label="Result"
        placeholder="How was it resolved?"
        value={formData.result}
        onChange={(e) => setFormData({ ...formData, result: e.target.value })}
      />

      <Select
        label="Person in Charge"
        placeholder="Select person"
        options={people.map((p) => ({ value: p, label: p }))}
        value={formData.personInCharge}
        onChange={(v) =>
          setFormData({ ...formData, personInCharge: v as string })
        }
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
