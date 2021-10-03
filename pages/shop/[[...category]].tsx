import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import Layout from 'components/Layout'
import ProductCard from 'components/ProductCard'
import ProductGrid from 'components/ProductGrid'
import SideMenu from 'components/SideMenu'
import getAllCategories from 'lib/graphcms/get-all-categories'
import getCategory from 'lib/graphcms/get-category'
import getAllProducts from 'lib/graphcms/get-all-products'

export const getStaticProps: GetStaticProps<{
    products: ProductData[]
    categoryGroups: Array<CategoryGroup>
    name: string
}> = async ({ params: { category } = {}, locale = 'en' }) => {
    const slug = (category as string[])?.pop() || ''

    const { products, name } = slug
        ? await getCategory({ locale, slug })
        : { ...(await getAllProducts({ locale })), name: 'all' }

    const { categoryGroups } = await getAllCategories({ locale })

    return {
        props: {
            name,
            products,
            categoryGroups,
            ...(await serverSideTranslations(locale, ['common'])),
        },
    }
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    let paths: GetStaticPathsResult['paths'] = []

    for (const locale of locales) {
        const { categoryGroups } = await getAllCategories({ locale })
        const flatenedCategories = categoryGroups.reduce(
            (acc, {categories}) => [
                ...acc,
                ...categories,
            ],
            [] as Array<Category>
        )
        paths = [
            ...paths,
            ...flatenedCategories.map(({ slug, categoryGroup }) => ({
                params: { category: [categoryGroup.slug, slug] },
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
    categoryGroups,
}) => {
    return (
        <div className="w-full flex">
            <SideMenu categories={categoryGroups} />
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
