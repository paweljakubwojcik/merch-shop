import '../styles/globals.css'
import '../styles/transitions.css'

import store from '../redux/store'
import { Provider as ReduxProvider } from 'react-redux'

import { appWithTranslation } from 'next-i18next'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

const persistor = persistStore(store)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {getLayout(<Component {...pageProps} />)}
            </PersistGate>
        </ReduxProvider>
    )
}
export default appWithTranslation(MyApp)
