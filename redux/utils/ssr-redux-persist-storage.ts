import { WebStorage } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'



const createNoopStorage: () => WebStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null)
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value)
        },
        removeItem(_key: any) {
            return Promise.resolve()
        },
    }
}

/**
 * returns dummy storage on ssr to prevent errors on node
 */
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

export default storage
