'use client'

import * as React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Messages } from '@/constant/messages'
import {
  CreateDormitoryClient,
  useDormitories,
} from '@/hooks/queries/client/dormitory'
import { cn } from '@/lib/utils'
import { CirclePlus } from 'lucide-react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { ConfirmAction } from './confirmAction'

const useCreateDormitory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: ['createDormitory'],
    mutationFn: (value: string) => CreateDormitoryClient({ name: value }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dormitory'] })
    },
  })
}

export const ModalsAddRoom = () => {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState('')
  const [query, setQuery] = React.useState('')

  const { data: getDormitoryValue } = useDormitories()
  const dormitoryMutation = useCreateDormitory()

  React.useMemo(() => {
    setValue(getDormitoryValue?.find((a) => a.name === query)?.id || '')
    setOpen(false)
    setQuery('')
  }, [getDormitoryValue])

  const filteredDormitories = React.useMemo(() => {
    return getDormitoryValue?.filter((dormitory) =>
      dormitory.name.toLowerCase().includes(query.toLowerCase())
    )
  }, [getDormitoryValue, query])

  return (
    <Dialog>
      <DialogTrigger>
        <CirclePlus />
        {Messages.rooms.addRoomsBtn}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{Messages.rooms.modal.title}</DialogTitle>
          <DialogDescription>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={dormitoryMutation.isPending}
                  aria-expanded={open}
                  className="w-[300px] justify-between"
                >
                  <p>
                    {value
                      ? getDormitoryValue?.find((a) => a.id === value)?.name
                      : Messages.rooms.modal.selectDormitory.placeholder}
                  </p>
                  <ChevronsUpDown className="opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command shouldFilter={false}>
                  <CommandInput
                    placeholder={Messages.rooms.modal.selectDormitory.find}
                    onValueChange={(a) => setQuery(a)}
                  />
                  <CommandList>
                    <>
                      <ConfirmAction
                        action={() => {
                          dormitoryMutation.mutate(query)
                          setOpen(false)
                        }}
                      >
                        {filteredDormitories?.filter(
                          (a) => a.name.toLowerCase() === query.toLowerCase()
                        ).length === 0 &&
                          query && (
                            <div className="mt-2 flex cursor-pointer justify-center gap-2 p-2 hover:bg-stone-50">
                              {Messages.rooms.modal.selectDormitory
                                .newDormitory +
                                " '" +
                                query +
                                "'"}
                              <CirclePlus className="ml-2 shrink-0" />
                            </div>
                          )}
                      </ConfirmAction>
                      <CommandGroup>
                        {filteredDormitories?.map((a) => (
                          <CommandItem
                            key={a?.id}
                            value={a?.id}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? '' : currentValue
                              )
                              setOpen(false)
                            }}
                          >
                            {a?.name}
                            <Check
                              className={cn(
                                'ml-auto',
                                value === a?.id ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
