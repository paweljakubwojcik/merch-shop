import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

// Define a type for the slice state

export interface Product extends Pick<ProductData, 'name' | 'price' | 'images' | 'id'> {
    quantity: number
}

export interface ShoppingCartState {
    products: Array<Product>
}

// Define the initial state using that type
const initialState: ShoppingCartState = {
    products: [],
}

const { actions, reducer } = createSlice({
    name: 'shoppinCart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            const productIndex = state.products.findIndex((p) => p.id === action.payload.id)
            if (productIndex !== -1) {
                state.products[productIndex].quantity++
            } else {
                state.products.push(action.payload)
            }
        },
        removeProduct: (state, action: PayloadAction<Product>) => {
            const productIndex = state.products.findIndex((p) => p.id === action.payload.id)

            if (productIndex !== -1) {
                state.products[productIndex].quantity--
                if (state.products[productIndex].quantity <= 0) {
                    state.products = state.products.filter((p) => p.id !== action.payload.id)
                }
            }
        },
        clearShoppingCart: (state) => {
            state = initialState
        },
    },
})

// Action creators are generated for each case reducer function
export const { addProduct, removeProduct, clearShoppingCart } = actions

export const getProductsCount = (state: RootState) =>
    state.shoppingCart.products.reduce((c, p) => c + p.quantity, 0)

export default reducer
