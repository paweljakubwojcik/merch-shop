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
import getCategoryGroup from 'lib/graphcms/get-category-group'

export const getStaticProps: GetStaticProps<{
    categories: Array<Category>
    name: string
    categoryGroups: Array<CategoryGroup>
}> = async ({ params: { categoryGroup } = {}, locale = 'en' }) => {
    try {
        const {
            categoryGroup: { categories, name },
        } = await getCategoryGroup({ slug: categoryGroup as string })

        const { categoryGroups } = await getAllCategories({ locale })

        return {
            props: {
                name,
                categories,
                categoryGroups,
                ...(await serverSideTranslations(locale, ['common'])),
            },
        }
    } catch (e) {
        console.error(e)
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

            paths = [
                ...paths,
                ...categoryGroups.map(({ slug }) => ({
                    params: { categoryGroup: slug },
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

const CategoryGroup: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
    name,
    categories,
    categoryGroups,
}) => {
    return (
        <div className="w-full flex">
            <SideMenu categories={categoryGroups} />
            <div className="w-full flex flex-col p-4">
                <h2 className="py-4 text-xl font-bold">{name}</h2>
                <ProductGrid className={''}>
                    {categories.map(({ name }, i) => (
                        <div key={i}>{name}</div>
                    ))}
                </ProductGrid>
            </div>
        </div>
    )
}

CategoryGroup.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default CategoryGroup
