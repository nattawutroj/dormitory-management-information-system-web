import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-5">
      <h2 className="mb-4 text-4xl font-bold text-red-500">
        อุ๊ย! หาอะไรอยู่นะ
      </h2>
      <p className="mb-6 text-lg text-gray-600">
        อ่ออว...เราหาไม่เจอสิ่งที่คุณขอเลย
      </p>
      <Link
        href="/"
        className="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-lg transition duration-300 hover:bg-blue-700"
      >
        กลับไปหน้าแรก
      </Link>
    </div>
  )
}
