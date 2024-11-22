import dynamic from 'next/dynamic'

const ScannerClient = dynamic(() => import('./scannerClient'), {
  ssr: false,
})

export default function MeterReading() {
  return (
    <div>
      <h1>OCR Scanner</h1>
      <ScannerClient />
    </div>
  )
}
