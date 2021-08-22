import '../styles/globals.css'
import '../styles/transitions.css'

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    return <>{getLayout(<Component {...pageProps} />)}</>
}
export default MyApp
