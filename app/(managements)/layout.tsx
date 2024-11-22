import Image from 'next/image'
import Link from 'next/link'
import HorizonLogo from '@/assets/horizontalLogo.png'
import { BreadcrumbManagements } from '@/components/pages/managements/breadcrumb'
import Menu from '@/components/pages/managements/menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
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
    <div className="relative min-h-screen">
      <div className="sticky top-0 z-40 h-16 w-full bg-white shadow">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Image
              src={HorizonLogo}
              alt="horizon logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-2">
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
      <div className="container my-8 mt-12 flex justify-end">
        <div className="w-4/5">
          <BreadcrumbManagements />
        </div>
      </div>
      <div className="container mt-4 flex h-screen">
        <div className="mt-4 hidden w-1/5 lg:block">
          <Menu />
        </div>
        <div className="w-full lg:w-4/5">
          <Card className="p-6">{children}</Card>
        </div>
      </div>
    </div>
  )
}
