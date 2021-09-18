import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import Layout from 'components/Layout'
import ProductCard from 'components/ProductCard'
import ProductGrid from 'components/ProductGrid'
import SideMenu from 'components/SideMenu'
import getAllCategories from 'lib/graphcms/get-all-categories'
import getAllCollections from 'lib/graphcms/get-all-collections'
import getCategory from 'lib/graphcms/get-category'
import getAllProducts from 'lib/graphcms/get-all-products'

export const getStaticProps: GetStaticProps<{
    products: ProductData[]
    collections: Array<Collection>
    categories: Array<Category>
    name: string
}> = async ({ params: { category } = {}, locale = 'en' }) => {
    const slug = (category as string[])?.pop() || ''

    const { products, name } = slug
        ? await getCategory({ locale, slug })
        : { ...(await getAllProducts({ locale })), name: 'all' }

    const { categories } = await getAllCategories({ locale })
    const { collections } = await getAllCollections({ locale })

    return {
        props: {
            name,
            products,
            categories: categories.map((c) => ({ ...c, slug: `category/${c.slug}` })),
            collections: collections.map((c) => ({ ...c, slug: `collection/${c.slug}` })),
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    let paths: GetStaticPathsResult['paths'] = []

    for (const locale of locales) {
        const { categories } = await getAllCategories({ locale })
        const { collections } = await getAllCollections({ locale })
        paths = [
            ...paths,
            ...categories.map(({ slug }) => ({
                params: { category: ['category', slug] },
                locale,
            })),
            ...collections.map(({ slug }) => ({
                params: { category: ['collection', slug] },
                locale,
            })),
            {
                params: { category: [] },
                locale,
            },
        ]
    }

    return {
        paths,
        fallback: 'blocking',
    }
}

const Collection: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
    name,
    products,
    collections,
    categories,
}) => {
    return (
        <div className="w-full flex">
            <SideMenu collections={collections} categories={categories} />
            <div className="w-full flex flex-col p-4">
                <h2 className="py-4 text-xl font-bold">{name}</h2>
                <ProductGrid className={''}>
                    {products.map((product, i) => (
                        <ProductCard product={product} key={i} />
                    ))}
                </ProductGrid>
            </div>
        </div>
    )
}

Collection.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Collection
