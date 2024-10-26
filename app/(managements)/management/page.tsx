import Link from 'next/link'

export default function Management() {
  return (
    <div className="relative">
      <div className="absolute z-10 h-screen w-screen overscroll-none bg-white/30">
        <div className="flex h-screen items-center justify-center">
          <Link className="border p-2 shadow" href="/logout">
            ออกจากระบบ
          </Link>
        </div>
      </div>
    </div>
  )
}
