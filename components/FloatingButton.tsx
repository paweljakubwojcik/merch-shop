import React, { ComponentPropsWithoutRef } from 'react'

interface FloatingButtonProps extends ComponentPropsWithoutRef<'button'> {}

export default function FloatingButton({ className, children, ...props }: FloatingButtonProps) {
    return (
        <button
            className={`border-2  flex p-3
            bg-black text-white hover:text-black 
            hover:bg-white focus:text-black focus:bg-white transition-colors 
            rounded-full
            ${className} `}
            {...props}
        >
            {children}
        </button>
    )
}
