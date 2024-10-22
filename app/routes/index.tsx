import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/start'
import { Button } from '../components/ui/button'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {

  return (
    <div>Hello <Button>hello</Button></div>
  )
}