import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer, { ShoppingCartState } from './reducers/shoppingCart'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistConfig } from 'redux-persist/lib/types'

const persistReducerConfig: PersistConfig<ShoppingCartState> = {
    key: 'cart',
    storage,
}

const store = configureStore({
    reducer: {
        shoppingCart: persistReducer(persistReducerConfig, shoppingCartReducer),
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
