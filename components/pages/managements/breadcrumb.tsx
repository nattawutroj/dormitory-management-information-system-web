'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { listMenu } from '@/constant/listMenu'

export function BreadcrumbManagements() {
  const pathname = usePathname()

  const pathSegments = pathname.split('/').filter(Boolean)

  const getMenuByPath = (path: string) =>
    listMenu.find((menu) => menu.path === path)

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathSegments.map((_, index) => {
          const currentPath = `/${pathSegments.slice(0, index + 1).join('/')}`
          const menu = getMenuByPath(currentPath)
          const isLastSegment = index === pathSegments.length - 1
          return (
            <React.Fragment key={currentPath}>
              {index !== 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {menu && !isLastSegment ? (
                  <BreadcrumbLink href={menu.path}>{menu.title}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>
                    {menu?.title || pathSegments[index]}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadcrumbManagements
