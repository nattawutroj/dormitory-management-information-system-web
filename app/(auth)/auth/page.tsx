import { LoginCard } from '@/components/pages/auth/loginCard'

export default function Auth() {
  return (
    <div className="relative">
      <div className="absolute z-10 h-screen w-screen overscroll-none bg-white/30">
        <div className="flex h-screen items-center justify-center">
          <LoginCard />
        </div>
      </div>
    </div>
  )
}
