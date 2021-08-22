import React, { Children, ComponentPropsWithoutRef } from 'react'
import Navbar from './Navbar'

interface LayoutProps extends ComponentPropsWithoutRef<any> {}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="">
            <Navbar />
            <main className="flex justify-center items-center">{children}</main>
        </div>
    )
}
