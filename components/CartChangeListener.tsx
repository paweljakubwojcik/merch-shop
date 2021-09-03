import React, { useState } from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useRef } from 'react'
import { Product } from '../redux/reducers/shoppingCart'
import getNewId from '../utils/getNewId'

type Change = {
    id: number
    message: string
    product: Product
}

type ActionType = 'REMOVED' | 'ADDED' | 'MODYFIED'

type Diff<T> = { payload: T; action: ActionType }

const getArrayDiffrence: (
    array1: Array<Product>,
    array2: Array<Product>,
    key: keyof Product
) => Diff<Product> = (array1, array2, key) => {
    const hashedArray1 = Object.fromEntries(array1.map((value) => [value[key], value]))
    const hashedArray2 = Object.fromEntries(array2.map((value) => [value[key], value]))

    let payload
    let action: ActionType = 'ADDED'

    for (let v in hashedArray1) {
        if (!hashedArray2[v]) {
            payload = hashedArray1[v]
            action = 'REMOVED'
        }
    }
    for (let v in hashedArray2) {
        if (!hashedArray1[v]) {
            payload = hashedArray1[v]
            action = 'ADDED'
        }
    }

    for (const prevObject of array1) {
        const nextObject: Product | undefined = array2.find((obj) => obj[key] === prevObject[key])
        if (!nextObject) break

        if (prevObject.quantity < nextObject.quantity) {
            payload = {
                ...prevObject,
                quantity: 1,
            }
            action = 'ADDED'
        }
        if (prevObject.quantity > nextObject.quantity) {
            payload = {
                ...prevObject,
                quantity: 1,
            }
            action = 'REMOVED'
        }
    }

    return { payload, action }
}

const getChange: (diffrence: Diff<Product>) => Change = (diffrence) => {
    const productName = diffrence.payload?.name

    const message = `${productName} was ${
        diffrence.action === 'ADDED'
            ? 'added to'
            : diffrence.action === 'REMOVED'
            ? 'removed from'
            : ''
    } cart`

    return {
        product: diffrence.payload,
        id: getNewId(),
        message,
    }
}

export default function CartChangeListener() {
    const products = useAppSelector((state) => state.shoppingCart.products)
    const productsSnapshot = useRef(products)

    const [changes, setChanges] = useState<Array<Change>>([])

    useEffect(() => {

        const diffrence = getArrayDiffrence(productsSnapshot.current, products, 'id')
        productsSnapshot.current = products
        if (!diffrence.payload) return

        const newChange = getChange(diffrence)

        setChanges((prev) => [newChange, ...prev])
        setTimeout(() => setChanges((prev) => prev.filter((c) => c.id !== newChange.id)), 3000)
    }, [products])

    return (
        <div className={'fixed bottom-0 right-0 p-4 flex flex-col max-w-full'}>
            <TransitionGroup>
                {changes.map((change) => (
                    <CSSTransition classNames={'shift-right'} timeout={300} key={change.id}>
                        <ChangeAnnouncer>{change.message}</ChangeAnnouncer>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}

const ChangeAnnouncer = ({ children }: ComponentPropsWithoutRef<'div'>) => (
    <div className={' bg-white p-6 shadow-lg m-2 max-w-md text-sm'}>{children}</div>
)
