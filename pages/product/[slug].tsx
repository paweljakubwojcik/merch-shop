import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next'
import getProductsSlugs from '../../lib/graphcms/get-products-slugs'
import getProductBySlug from '../../lib/graphcms/get-product-by-slug'
import Image from 'next/image'
import Button from '../../components/Button'

export const getStaticProps: GetStaticProps<{ product: ProductData }> = async ({
    params,
    locale = 'en',
}) => {
    const slug = (params?.slug as string) || ''

    const { product } = await getProductBySlug({ locale, slug })

    return {
        props: { product },
    }
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    let paths: GetStaticPathsResult['paths'] = []

    for (const locale of locales) {
        const { slugs } = await getProductsSlugs({ locale })
        paths = [
            ...paths,
            ...slugs.map((slug) => ({
                params: { slug },
                locale,
            })),
        ]
    }

    return {
        paths,
        fallback: false,
    }
}

const Product: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
    product,
}) => {
    const {
        images: [image],
        name,
        description,
        price,
        categories,
        collections,
    } = product

    return (
        <article className="flex flex-col items-center justify-items-center md:grid grid-cols-2 grid-rows-2 grid-flow-col-dense w-full px-4  ">
            <div className="flex justify-center items-center flex-col space-y-4 text-sm col-start-2 py-20 max-w-lg">
                <div className="flex space-x-4 text-xs text-gray-600">
                    {categories.concat(collections).map((c, i) => (
                        <>
                            {i !== 0 && <div>{' | '}</div>}
                            <div className="" key={c.id}>
                                {c.name}
                            </div>
                        </>
                    ))}
                </div>
                <header>
                    <h2 className="font-bold text-xl">{name}</h2>
                </header>
                <p>{price}PLN</p>
                <Button>Dodaj do koszyka</Button>
            </div>
            <div className="md:p-10 w-full">
                <Image
                    src={image.url}
                    alt={name}
                    placeholder="blur"
                    blurDataURL={image.placeholderUrl}
                    layout="responsive"
                    objectFit="cover"
                    width={25}
                    height={30}
                />
            </div>
            <section className="flex justify-center items-center flex-col space-y-4 py-20 max-w-lg ">
                <header>
                    <h2 className="font-bold">description</h2>
                </header>
                <p className="text-center text-xs">{description}</p>
            </section>
            <div className="md:p-10 w-full">
                <Image
                    src={image.url}
                    alt={name}
                    placeholder="blur"
                    blurDataURL={image.placeholderUrl}
                    layout="responsive"
                    objectFit="cover"
                    width={25}
                    height={30}
                />
            </div>
        </article>
    )
}

Product.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Product
