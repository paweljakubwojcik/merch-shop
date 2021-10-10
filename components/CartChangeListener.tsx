import React, { useCallback, useState } from 'react'
import { ComponentPropsWithoutRef } from 'react'
import { useEffect } from 'react'
import { useAppSelector } from '../redux/hooks'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { useRef } from 'react'
import { addProduct, Product, removeProduct } from '../redux/reducers/shoppingCart'
import getNewId from '../utils/getNewId'
import { useTranslation } from 'react-i18next'
import { X } from 'react-feather'
import { useDispatch } from 'react-redux'

type Change = {
    id: number
    message: string
    product: Product
    action: ActionType
}

type ActionType = 'REMOVED' | 'ADDED'

type Diff<T> = { payload: T; action: ActionType }

const getArrayDifference: (
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

export default function CartChangeListener() {
    const { t } = useTranslation(['cartChangeListener'])
    const products = useAppSelector((state) => state.shoppingCart.products)
    const dispatch = useDispatch()
    const productsSnapshot = useRef(products)

    const [changes, setChanges] = useState<Array<Change>>([])

    const getChange: (difference: Diff<Product>) => Change = useCallback(
        (difference) => {
            const productName = difference.payload?.name

            const message = `${t('Product')} "${productName}" ${
                difference.action === 'ADDED'
                    ? t('added message')
                    : difference.action === 'REMOVED'
                    ? t('removed message')
                    : ''
            } `

            return {
                product: difference.payload,
                id: getNewId(),
                message,
                action: difference.action,
            }
        },
        [t]
    )

    const removeChange = useCallback(
        (id) => setChanges((prev) => prev.filter((c) => c.id !== id)),
        []
    )

    useEffect(() => {
        const difference = getArrayDifference(productsSnapshot.current, products, 'id')
        productsSnapshot.current = products
        if (!difference.payload) return

        const newChange = getChange(difference)

        setChanges((prev) => [newChange, ...prev])
        setTimeout(() => removeChange(newChange.id), 5000)
    }, [products, getChange, removeChange])

    const undo = (change: Change) => {
        switch (change.action) {
            case 'REMOVED':
                dispatch(addProduct(change.product))
                break
            case 'ADDED':
                dispatch(removeProduct(change.product))
                break
        }
        removeChange(change.id)
    }

    return (
        <div className={'fixed bottom-0 right-0 p-4 flex flex-col max-w-full'}>
            <TransitionGroup>
                {changes.map((change) => (
                    <CSSTransition classNames={'shift-right'} timeout={300} key={change.id}>
                        <div className={'bg-white p-6 shadow-lg m-2 max-w-md text-sm'}>
                            <div className="flex my-2">
                                <div>{change.message}</div>
                                <button onClick={() => removeChange(change.id)} className="mx-4">
                                    <X size={28} />
                                </button>
                            </div>
                            <div className="flex">
                                <button className="text-red-500" onClick={() => undo(change)}>
                                    Undo
                                </button>
                            </div>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    )
}
