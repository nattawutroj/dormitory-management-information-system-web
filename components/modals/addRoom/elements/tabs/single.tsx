'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TabsContent } from '@/components/ui/tabs'
import { Messages } from '@/constant/messages'
import { useCreateRoom } from '@/hooks/queries/client/room'

export const TabsSingle = ({
  value,
  dormitoryID,
}: {
  value: string
  dormitoryID: string
}) => {
  const [roomValue, setRoomValue] = useState<string>('')
  const mutation = useCreateRoom(dormitoryID)

  useMemo(() => {
    setRoomValue('')
  }, [mutation.isSuccess])

  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <CardTitle>{Messages.rooms.modal.tabs.single.title}</CardTitle>
          <CardDescription>
            <Label htmlFor={'singleRoom'}>
              {Messages.rooms.modal.tabs.single.labelRoomNumber}
            </Label>
            <Input
              type="text"
              id={'singleRoom'}
              name={'singleRoom'}
              value={roomValue}
              onChange={(e) => setRoomValue(e.target.value)}
              placeholder={
                Messages.rooms.modal.tabs.single.roomNumberPlaceholder
              }
            />
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <Button
            disabled={!(roomValue !== '' && dormitoryID !== '')}
            onClick={() => {
              mutation.mutate({
                room_number: roomValue,
              })
            }}
          >
            เพิ่ม
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  )
}
