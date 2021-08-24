import React, { ComponentPropsWithoutRef } from 'react'

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {}

export default function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button
            className={`border-2 border-current px-6 py-2 flex space-x-2 bg-white hover:text-white 
            hover:bg-black focus:text-white focus:bg-black transition-colors ${className} `}
            {...props}
        >
            {children}
        </button>
    )
}
