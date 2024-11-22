import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Messages } from '@/constant/messages'
import { CirclePlus } from 'lucide-react'

export default function Rooms() {
  return (
    <div className="flex flex-row justify-end">
      <Dialog>
        <DialogTrigger>
          <CirclePlus />
          {Messages.rooms.addRoomsBtn}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{Messages.rooms.modal.title}</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
