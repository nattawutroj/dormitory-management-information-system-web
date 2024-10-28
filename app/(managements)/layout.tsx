import Image from 'next/image'
import Link from 'next/link'
import HorizonLogo from '@/assets/horizontalLogo.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Messages } from '@/constant/messages'
import { ChevronDown } from 'lucide-react'

export default function ManagementLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="relative z-10 h-16 w-full shadow">
        <div className="container flex h-full items-center justify-between">
          <Image src={HorizonLogo} alt="horizon logo" className="h-14 w-auto" />
          <div className="flex h-full items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-2 focus:outline-0">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <ChevronDown />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>
                  {Messages.navbar.profile.welcome}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/logout">{Messages.navbar.profile.logout}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {children}
    </>
  )
}
