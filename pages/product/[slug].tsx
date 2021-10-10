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

import { useAppDispatch } from '../../redux/hooks'
import { addProduct } from '../../redux/reducers/shoppingCart'
import HoverGroup from 'components/HoverGroup'

export const getStaticProps: GetStaticProps<{ product: ProductData }> = async ({
    params,
    locale = 'en',
}) => {
    const slug = (params?.slug as string) || ''
    try {
        const { product } = await getProductBySlug({ locale, slug })

        return {
            props: { product, ...(await serverSideTranslations(locale)) },
        }
    } catch (error) {
        console.error(error)
        return {
            notFound: true,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    let paths: GetStaticPathsResult['paths'] = []
    try {
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
    } catch (e) {
        console.error(e)
    }

    return {
        paths,
        fallback: true,
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
        id,
    } = product

    const { t } = useTranslation(['routes', 'product', 'common'])
    const dispatch = useAppDispatch()

    const handleAddToCard = () =>
        dispatch(
            addProduct({
                id,
                name,
                price,
                quantity: 1,
                images: product.images,
            })
        )

    return (
        <article className="flex flex-col items-center justify-items-center md:grid grid-cols-2 grid-rows-2 grid-flow-col-dense w-full px-4 ">
            <div className="flex justify-center items-center flex-col space-y-4 text-sm col-start-2 py-20 max-w-lg">
                <div className="flex flex-wrap justify-center space-x-4 text-xs text-gray-600 ">
                    <HoverGroup
                        className={'grid grid-flow-col auto-cols-fr justify-items-center'}
                        data={categories}
                        renderItem={({ slug, categoryGroup, name }, i) => (
                            <Link href={`/${t('shop')}/${categoryGroup.slug}/${slug}`}>
                                <a className="flex whitespace-nowrap">{name}</a>
                            </Link>
                        )}
                        itemClassNames={'mx-2'}
                        Separator={<div className="w-1">|</div>}
                    />
                </div>
                <header>
                    <h2 className="font-bold text-xl">{name}</h2>
                </header>
                <p>{price}PLN</p>
                <Button onClick={handleAddToCard}>{t('Add To Card', { ns: 'product' })}</Button>
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
