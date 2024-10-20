import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {

  return (
    <div>Hello</div>
  )
}