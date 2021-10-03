import { GetStaticPaths, GetStaticPathsResult, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import Layout from 'components/Layout'
import ProductCard from 'components/ProductCard'
import ProductGrid from 'components/ProductGrid'
import SideMenu from 'components/SideMenu'
import getAllCategories from 'lib/graphcms/get-all-categories'
import getCategory from 'lib/graphcms/get-category'

export const getStaticProps: GetStaticProps<{
    products: ProductData[]
    categoryGroups: Array<CategoryGroup>
    name: string
}> = async ({ params: { categoryGroup, category } = {}, locale = 'en' }) => {
    const slug = category as string
    try {
        const { products, name } = await getCategory({ locale, slug })
        const { categoryGroups } = await getAllCategories({ locale })

        return {
            props: {
                name,
                products,
                categoryGroups,
                ...(await serverSideTranslations(locale, ['common'])),
            },
        }
    } catch (e) {
        console.log(`Error ocured during static generation of category page`, e)
        return {
            notFound: true,
        }
    }
}

export const getStaticPaths: GetStaticPaths = async ({ locales = [] }) => {
    let paths: GetStaticPathsResult['paths'] = []

    try {
        for (const locale of locales) {
            const { categoryGroups } = await getAllCategories({ locale })
            const flatenedCategories = categoryGroups.reduce(
                (acc, { categories }) => [...acc, ...categories],
                [] as Array<Category>
            )
            paths = [
                ...paths,
                ...flatenedCategories.map(({ slug, categoryGroup }) => ({
                    params: { categoryGroup: categoryGroup.slug, category: slug },
                    locale,
                })),
            ]
        }
    } catch (e) {
        console.error(e)
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
