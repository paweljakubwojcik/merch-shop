import { configureStore } from '@reduxjs/toolkit'
import shoppingCartReducer from './reducers/shoppingCart'
import { createStateSyncMiddleware, initMessageListener } from 'redux-state-sync'

const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer,
    },
    middleware: [
        createStateSyncMiddleware({ blacklist: ['persist/PERSIST', 'persist/REHYDRATE'] }),
    ],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

initMessageListener(store)

export default store
