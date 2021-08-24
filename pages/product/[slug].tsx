import React, { ReactElement } from 'react'
import Layout from '../../components/Layout'
import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next'
import getProductsSlugs from '../../lib/graphcms/get-products-slugs'
import getProductBySlug from '../../lib/graphcms/get-product-by-slug'
import Image from 'next/image'
import Button from '../../components/Button'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

export const getStaticProps: GetStaticProps<{ product: ProductData }> = async ({
    params,
    locale = 'en',
}) => {
    const slug = (params?.slug as string) || ''

    let product: ProductData
    // case - product wasnt prerendered but locale match the slug
    const data = await getProductBySlug({ locale, slug })
    product = data.product

    return {
        props: { product, ...(await serverSideTranslations(locale, ['common', 'product'])) },
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

    const { t } = useTranslation(['product', 'common'])

    const linksAggregated = [
        ...categories.map((c) => ({
            name: c.name,
            link: `/category/${c.slug}`,
            id: c.id,
        })),
        ...collections.map((c) => ({
            name: c.name,
            link: `/collection/${c.slug}`,
            id: c.id,
        })),
    ]

    return (
        <article className="flex flex-col items-center justify-items-center md:grid grid-cols-2 grid-rows-2 grid-flow-col-dense w-full px-4 ">
            <div className="flex justify-center items-center flex-col space-y-4 text-sm col-start-2 py-20 max-w-lg">
                <div className="flex flex-wrap justify-center space-x-4 text-xs text-gray-600">
                    {linksAggregated.map((c, i) => (
                        <>
                            {i !== 0 && (
                                <div
                                    className="block bg-current w-1 h-1 rounded-full my-auto"
                                    key={i}
                                ></div>
                            )}
                            <div className="" key={c.id}>
                                <Link href={c.link}>
                                    <a>{c.name}</a>
                                </Link>
                            </div>
                        </>
                    ))}
                </div>
                <header>
                    <h2 className="font-bold text-xl">{name}</h2>
                </header>
                <p>{price}PLN</p>
                <Button>{t('Add To Card')}</Button>
            </div>

            <StyledImage image={image} alt={name} />

            <section className="flex justify-center items-center flex-col space-y-4 py-20 max-w-lg ">
                <header>
                    <h2 className="font-bold">{t('Description')}</h2>
                </header>
                <p className="text-center text-xs">{description}</p>
            </section>

            <StyledImage image={image} alt={name} />
        </article>
    )
}

const StyledImage = ({
    image,
    alt,
}: {
    image: { url: string; placeholderUrl: string }
    alt: string
}) => (
    <div className="md:p-10 w-full">
        <Image
            src={image.url}
            alt={alt}
            placeholder="blur"
            blurDataURL={image.placeholderUrl}
            layout="responsive"
            objectFit="cover"
            width={25}
            height={30}
        />
    </div>
)

Product.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Product
