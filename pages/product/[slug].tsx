import React, { ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Layout } from 'react-feather'
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

interface ProductData {
    images: Array<{ url: string; previewUrl: string }>
    name: string
}

export const getStaticProps: GetStaticProps<{ product: ProductData }> = ({ params }) => {
    const name = (params?.slug as string) || ''

    return {
        props: {
            product: {
                name,
                images: [
                    {
                        url: '',
                        previewUrl: '',
                    },
                ],
            },
        },
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: [{ params: { slug: 'produkt-1' } }, { params: { slug: 'produkt-2' } }],
        fallback: false,
    }
}

const Product: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
    product,
}) => {
    return <p>Product: {product}</p>
}

Product.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Product
