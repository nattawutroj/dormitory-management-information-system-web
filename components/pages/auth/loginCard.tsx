'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useForm } from '@tanstack/react-form'
import { useMutation } from '@tanstack/react-query'
import { zodValidator } from '@tanstack/zod-form-adapter'
import logoSq from '@/assets/dmisLogoSq.png'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Loader from '@/components/ui/loader'
import { Messages } from '@/constant/messages'
import { LoginDefaultValues, LoginSchema } from '@/hooks/forms/auth/schema'
import { toast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { errorHandler } from '@/utils/axios/errorHandler'

export const LoginCard = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: (data: FormData) => {
      return axios.post('/api/auth', data)
    },
    onSuccess() {
      router.push('/launcher')
    },
    onError(error) {
      const { data } = errorHandler(error)
      toast({
        variant: 'destructive',
        title: Messages.toast.destructive,
        description: data.messages,
      })
    },
  })

  const form = useForm({
    defaultValues: LoginDefaultValues,
    onSubmit: async ({ value }) => {
      const formData = new FormData()
      formData.append('username', value.username)
      formData.append('password', value.password)
      mutation.mutate(formData)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onSubmit: LoginSchema,
    },
  })

  return (
    <Card
      className={cn(
        'min-h-[552px] w-4/5 overflow-hidden pb-8 transition-all duration-1000 sm:w-4/5 md:w-3/5 lg:w-2/5',
        mutation.isPending && 'h-56 min-h-56 !w-56 pb-0'
      )}
    >
      {mutation.isPending || mutation.isSuccess ? (
        <div className="flex h-full flex-col items-center justify-center gap-8">
          <Loader size="80" />
          <p className="text-xl text-stone-600">{Messages.login.loader}</p>
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <CardHeader className="items-center">
            <CardTitle className="text-center text-3xl">
              <Image src={logoSq} alt="DMIS logo" />
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">
            <form.Field name="username">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>{Messages.login.username}</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={Messages.login.placeholderUser}
                  />
                  {field.state.meta.errors.length !== 0 && (
                    <p className="text-xs text-error">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
            <form.Field name="password">
              {(field) => (
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={field.name}>{Messages.login.password}</Label>
                  <Input
                    type="text"
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder={Messages.login.placeholderPass}
                  />
                  {field.state.meta.errors.length !== 0 && (
                    <p className="text-xs text-error">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
                </div>
              )}
            </form.Field>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              {Messages.login.loginBtn}
            </Button>
          </CardFooter>
        </form>
      )}
    </Card>
  )
}
