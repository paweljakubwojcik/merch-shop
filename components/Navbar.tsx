import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu as MenuIcon, X as XIcon, ShoppingCart as ShopIcon } from 'react-feather'
import Button from './Button'
import { CSSTransition } from 'react-transition-group'
import FloatingButton from './FloatingButton'
import { useRouter } from 'next/dist/client/router'

const routes = [
    {
        to: '/about',
        name: 'About',
    },
    {
        to: '/shop',
        name: 'Shop',
    },
    {
        to: '/contact',
        name: 'Contact',
    },
]

export default function Navbar() {
    const { pathname } = useRouter()

    const [menuOpen, setMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY !== 0)
        }

        document.addEventListener('scroll', handleScroll)
        return () => document.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setMenuOpen(false)
    }, [pathname])

    return (
        <>
            <div
                className={`flex items-center justify-between px-4 md:px-8 shadow-md mx-2 text-sm sticky z-10 top-0 bg-white ${
                    scrolled ? 'h-16' : 'h-24'
                } transition-all`}
            >
                <h1 className="font-bold text-2xl">
                    <Link href="/">
                        <a>Logo</a>
                    </Link>
                </h1>

                <nav className="hidden w-full absolute left-0 justify-center md:flex pointer-events-none">
                    <Links className="space-x-8  pointer-events-auto" />
                </nav>

                <Button className="hidden md:flex">
                    <div>Koszyk</div> <ShopIcon />
                </Button>

                <button className="md:hidden relative z-50" onClick={() => setMenuOpen((v) => !v)}>
                    {menuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
                </button>
                <CSSTransition in={menuOpen} timeout={300} classNames="opacity" unmountOnExit>
                    <MobileMenu className="md:hidden" />
                </CSSTransition>
            </div>
            <FloatingButton className="md:hidden fixed border-none bottom-10 right-8 z-30">
                <ShopIcon />
            </FloatingButton>
        </>
    )
}

const MobileMenu = ({ className }: ComponentPropsWithoutRef<'div'>) => {
    return (
        <div
            className={`fixed bg-white w-screen h-screen flex flex-col justify-center items-center top-0 left-0 space-y-8 ${className}`}
        >
            <Links className="flex-col items-center space-y-8" />
        </div>
    )
}

const Links = ({ className }: ComponentPropsWithoutRef<'div'>) => {
    const [hovered, setHovered] = useState<string>()

    return (
        <ul className={`flex group ${className}`}>
            {routes.map(({ to, name }) => (
                <li
                    key={name}
                    className={`transition-opacity ${hovered && 'opacity-50'} ${
                        hovered === name && 'opacity-100'
                    } `}
                    onMouseEnter={() => setHovered(name)}
                    onFocus={() => setHovered(name)}
                    onMouseLeave={() => setHovered('')}
                    onBlur={() => setHovered('')}
                >
                    <Link href={to}>
                        <a>{name}</a>
                    </Link>
                </li>
            ))}
        </ul>
    )
}
