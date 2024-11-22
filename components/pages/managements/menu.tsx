'use client'

import { usePathname } from 'next/navigation'
import { ListLink, ListsWarper } from '@/components/ui/cto/lists'
import { listMenu } from '@/constant/listMenu'

const Menu = () => {
  const pathname = usePathname()
  return (
    <ListsWarper>
      {listMenu.map((a, b) => {
        return (
          <ListLink key={b} href={a.path} isActive={a.path === pathname}>
            {a.title}
          </ListLink>
        )
      })}
    </ListsWarper>
  )
}

export default Menu
