import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { ComponentProps, ComponentPropsWithoutRef, ReactElement } from 'react'
import Layout from '../components/Layout'
import Image from 'next/image'

import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addProduct, removeProduct } from '../redux/reducers/shoppingCart'
import { useTranslation } from 'react-i18next'

export const getStaticProps: GetStaticProps = async ({ locale = 'en' }) => ({
    props: { ...(await serverSideTranslations(locale, ['common', 'cart'])) },
})

const CartPage: NextPageWithLayout = () => {
    const products = useAppSelector((state) => state.shoppingCart.products)
    const dispatch = useAppDispatch()

    return (
        <div className="flex flex-col items-center w-full p-20">
            <div className="grid grid-col-5 max-w-7xl w-full place-items-center">
                <Headers />
                {products.map((product) => (
                    <React.Fragment key={product.id}>
                        <Cell>
                            <div className={'m-2'}>
                                <Image
                                    src={product.images[0].url}
                                    alt={product.name}
                                    layout={'fixed'}
                                    width={100}
                                    height={150}
                                />
                            </div>

                            <div>{product.name}</div>
                        </Cell>
                        <Cell>{'w magazynie'}</Cell>
                        <Cell>{product.price} PLN</Cell>
                        <Cell>
                            <QuantitySelector
                                value={product.quantity}
                                increment={() => {
                                    dispatch(addProduct(product))
                                }}
                                decrement={() => {
                                    dispatch(removeProduct(product))
                                }}
                            />
                        </Cell>
                        <Cell>{product.price * product.quantity} PLN</Cell>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

const QuantitySelector = ({
    value,
    increment,
    decrement,
}: {
    value: number
    decrement: () => void
    increment: () => void
}) => {
    return (
        <div className={'grid grid-cols-2 grid-rows-2 gap-2 max-w-lg w-full'}>
            <div className={'border-2 border-gray-500 col-span-2 flex justify-center p-1'}>
                {value}
            </div>
            <button
                className={'border-2 border-gray-500 flex justify-center items-center'}
                onClick={increment}
            >
                +
            </button>
            <button
                className={'border-2 border-gray-500 flex justify-center items-center'}
                onClick={decrement}
            >
                -
            </button>
        </div>
    )
}

const Cell = ({ children }: ComponentPropsWithoutRef<'div'>) => (
    <div className={'w-full flex flex-col justify-center items-center p-4'}>{children}</div>
)

const Headers = () => {
    const { t } = useTranslation(['cart'])
    return (
        <>
            <div className={'col-start-1'}>{t('product')}</div>
            <div className={'col-start-2'}>{t('availability')}</div>
            <div className={'col-start-3'}>{t('price')}</div>
            <div className={'col-start-4'}>{t('quantity')}</div>
            <div className={'col-start-5'}>{t('sum')}</div>
            <div className={'col-span-5 h-1 w-full rounded-full bg-black block m-1'}></div>
        </>
    )
}

CartPage.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default CartPage
