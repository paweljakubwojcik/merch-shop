import React, { ComponentPropsWithoutRef } from 'react'

export default function ProductGrid({ children, className }: ComponentPropsWithoutRef<'div'>) {
    return <div className={"grid grid-cols-1 md:grid-cols-3 gap-8 w-full " + className}>{children}</div>
}
