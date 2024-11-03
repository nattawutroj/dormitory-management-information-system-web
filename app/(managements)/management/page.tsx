import dynamic from 'next/dynamic'

const ManagementClient = dynamic(() => import('./managementClient'), {
  ssr: false,
})

export default function Management() {
  return <ManagementClient />
}
