import React, { ComponentPropsWithoutRef, useEffect, useState } from 'react'
import Link from 'next/link'
import { Menu as MenuIcon, X as XIcon, ShoppingCart as ShopIcon } from 'react-feather'
import Button from './Button'
import { CSSTransition } from 'react-transition-group'
import FloatingButton from './FloatingButton'
import { useRouter } from 'next/dist/client/router'
import { useTranslation } from 'next-i18next'
import { useAppSelector } from '../redux/hooks'
import Badge from './Badge'
import { getProductsCount } from '../redux/reducers/shoppingCart'
import HoverGroup from './HoverGroup'

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
    const productsCount = useAppSelector(getProductsCount)
    const { pathname, push } = useRouter()
    const { t } = useTranslation(['common'])

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
    const isOnCartPage = pathname === '/cart'
    return (
        <>
            <div
                className={`flex items-center justify-between px-4 md:px-8 shadow-md mx-2 text-sm sticky z-30 top-0 bg-white ${
                    scrolled ? 'h-16 mb-8' : 'h-24 mb-0'
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

                {!isOnCartPage && (
                    <Button className="hidden md:flex" onClick={() => push('/cart')}>
                        {productsCount > 0 && <Badge>{productsCount}</Badge>}
                        <div>{t('Card')}</div>
                        <ShopIcon />
                    </Button>
                )}

                <button className="md:hidden relative z-50" onClick={() => setMenuOpen((v) => !v)}>
                    {menuOpen ? <XIcon size={28} /> : <MenuIcon size={28} />}
                </button>
                <CSSTransition in={menuOpen} timeout={300} classNames="opacity" unmountOnExit>
                    <MobileMenu className="md:hidden" />
                </CSSTransition>
            </div>
            {!isOnCartPage && (
                <FloatingButton
                    className="md:hidden fixed border-none bottom-10 right-8 z-30"
                    onClick={() => push('/cart')}
                >
                    {productsCount > 0 && (
                        <Badge className="-translate-x-1/4 -translate-y-1/4 ">
                            {productsCount}
                        </Badge>
                    )}
                    <ShopIcon />
                </FloatingButton>
            )}
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

const Links = ({ ...props }: ComponentPropsWithoutRef<'div'>) => {
    const { t } = useTranslation(['common'])

    return (
        <HoverGroup
            data={routes}
            renderItem={({ to, name }) => (
                <Link href={to}>
                    <a>{t(name)}</a>
                </Link>
            )}
            {...props}
        />
    )
}
