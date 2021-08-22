import type { NextPage } from 'next'
import { AppProps } from 'next/dist/shared/lib/router/router'
import { ReactElement, ReactNode } from 'react'

declare global {
    type NextPageWithLayout = NextPage & {
        getLayout?: (page: ReactElement) => ReactNode
    }

    type AppPropsWithLayout = AppProps & {
        Component: NextPageWithLayout
    }
}
