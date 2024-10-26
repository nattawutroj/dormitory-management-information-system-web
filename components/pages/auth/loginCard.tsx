'use client'

import Image from 'next/image'
import { useForm } from '@tanstack/react-form'
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
import { Messages } from '@/constant/messages'
import { LoginDefaultValues, LoginSchema } from '@/hooks/forms/auth/schema'

export const LoginCard = () => {
  const form = useForm({
    defaultValues: LoginDefaultValues,
    onSubmit: async ({ value }) => {
      console.log(value)
    },
    validatorAdapter: zodValidator(),
    validators: {
      onChange: LoginSchema,
    },
  })

  return (
    <Card className="w-4/5 pb-8 sm:w-4/5 md:w-3/5 lg:w-2/5">
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
    </Card>
  )
}
