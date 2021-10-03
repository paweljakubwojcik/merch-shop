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

    type CategoryGroup = {
        id: string
        name: string
        slug: string
        categories: Array<Category>
    }

    type Category = {
        id: string
        name: string
        slug: string
        categoryGroup: {
            slug: string
        }
    }
    interface ProductData {
        id: string
        images: Array<{ placeholderUrl: string; id: string; url: string }>
        name: string
        categories: Array<Category>
        description: string
        name: string
        price: number
        slug: string
        locale: string
    }
}
