import React, { Children, ComponentPropsWithoutRef } from 'react'
import CartChangeListener from './CartChangeListener'
import Navbar from './Navbar'

interface LayoutProps extends ComponentPropsWithoutRef<any> {}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="">
            <Navbar />
            <main className="flex justify-center items-center">{children}</main>
            <CartChangeListener />
        </div>
    )
}
