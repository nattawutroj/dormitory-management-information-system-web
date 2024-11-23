'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Messages } from '@/constant/messages'

interface ConfirmActionProps {
  action: () => void
  children: React.ReactNode
  message?: string
  title?: string
  confirmText?: string
  cancelText?: string
}

export const ConfirmAction: React.FC<ConfirmActionProps> = ({
  action,
  children,
  message = Messages.confirmAction.message,
  title = Messages.confirmAction.title,
  confirmText = Messages.confirmAction.confirmText,
  cancelText = Messages.confirmAction.cancelText,
}) => {
  const [open, setOpen] = useState(false)

  const handleConfirm = () => {
    action()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <div className="mt-4 flex justify-end space-x-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            {cancelText}
          </Button>
          <Button onClick={handleConfirm}>{confirmText}</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
