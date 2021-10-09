import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from './reducers/shoppingCart'
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'

const isBrowser = typeof window !== 'undefined'

const webOnlyMiddleware = isBrowser
    ? [createStateSyncMiddleware({ blacklist: ['persist/PERSIST', 'persist/REHYDRATE'] })]
    : []

const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer,
    },
    middleware: [...webOnlyMiddleware],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

isBrowser && initMessageListener(store)

export default store
