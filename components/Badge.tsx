import React, { ComponentPropsWithoutRef } from 'react'

export default function Badge({ className, children, ...props }: ComponentPropsWithoutRef<'span'>) {
    return (
        <span
            className={` ${className} absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2 
            bg-black text-white text-xs rounded-full 
            flex justify-center items-center w-6 h-6 `}
            {...props}
        >
            {children}
        </span>
    )
}
