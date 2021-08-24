import '../styles/globals.css'
import '../styles/transitions.css'

import store from '../redux/store'
import { Provider as ReduxProvider } from 'react-redux'

import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return <ReduxProvider store={store}>{getLayout(<Component {...pageProps} />)}</ReduxProvider>
}
export default appWithTranslation(MyApp)
