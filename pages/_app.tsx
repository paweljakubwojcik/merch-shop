import '../styles/globals.css'
import '../styles/transitions.css'
import { appWithTranslation } from 'next-i18next'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return <>{getLayout(<Component {...pageProps} />)}</>
}
export default appWithTranslation(MyApp)
