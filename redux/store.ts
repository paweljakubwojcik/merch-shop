import { configureStore } from '@reduxjs/toolkit'
import { getStateFormLocalStorage, saveStateToLocalStorage } from './middleware/localStorage'
import shoppingCartReducer from './reducers/shoppingCart'

const LOCAL_STORAGE_KEY = `TRUTUTU-state`

const store = configureStore({
    reducer: {
        shoppingCart: shoppingCartReducer,
    },
    preloadedState: getStateFormLocalStorage(LOCAL_STORAGE_KEY),
})

store.subscribe(() => {
    saveStateToLocalStorage(LOCAL_STORAGE_KEY, store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
