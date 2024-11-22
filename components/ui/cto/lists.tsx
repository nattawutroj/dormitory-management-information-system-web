import React from 'react'
import { cn } from '@/lib/utils'

const ListsWarper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('flex flex-col gap-2', className)} {...props} />
))
ListsWarper.displayName = 'ListsWarper'

const ListHeader = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg', className)} {...props} />
))
ListHeader.displayName = 'ListHeader'

interface ListLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean
}

const ListLink = React.forwardRef<HTMLAnchorElement, ListLinkProps>(
  ({ className, isActive = false, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={cn(
          'mx-2 cursor-pointer rounded p-1 px-2 text-base hover:bg-primary-foreground',
          isActive ? 'cursor-default underline hover:bg-transparent' : '',
          className
        )}
        {...props}
      />
    )
  }
)

ListLink.displayName = 'ListLink'

export { ListsWarper, ListHeader, ListLink }
