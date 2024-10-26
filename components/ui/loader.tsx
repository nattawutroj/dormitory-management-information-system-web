import { useEffect } from 'react'

export default function Loader({ size = '40' }: { size?: string }) {
  useEffect(() => {
    async function getLoader() {
      const { lineSpinner } = await import('ldrs')
      lineSpinner.register()
    }
    getLoader()
  }, [])
  return (
    <l-line-spinner
      size={size}
      stroke="3"
      speed="1"
      color="black"
    ></l-line-spinner>
  )
}
