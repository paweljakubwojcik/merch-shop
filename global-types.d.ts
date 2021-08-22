import type { NextPage } from 'next'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { ReactElement, ReactNode } from 'react'

declare global {
    type NextPageWithLayout<P = {}, IP = {}> = NextPage<P, IP> & {
        getLayout?: (page: ReactElement) => ReactNode
    }

    type AppPropsWithLayout = AppProps & {
        Component: NextPageWithLayout
    }
}
