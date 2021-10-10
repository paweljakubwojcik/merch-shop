import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import Layout from 'components/Layout'
import ProductCard from 'components/ProductCard'
import ProductGrid from 'components/ProductGrid'
import SideMenu from 'components/SideMenu'
import getAllCategories from 'lib/graphcms/get-all-categories'
import getAllProducts from 'lib/graphcms/get-all-products'

export const getStaticProps: GetStaticProps<{
    products: ProductData[]
    categoryGroups: Array<CategoryGroup>
}> = async ({ locale = 'en' }) => {
    try {
        const { products } = await getAllProducts({ locale })
        const { categoryGroups } = await getAllCategories({ locale })

        return {
            props: {
                products,
                categoryGroups,
                ...(await serverSideTranslations(locale)),
            },
        }
    } catch (e) {
        return {
            notFound: true,
        }
    }
}

const Shop: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
    products,
    categoryGroups,
}) => {
    return (
        <div className="w-full flex">
            <SideMenu categories={categoryGroups} />
            <div className="w-full flex flex-col p-4">
                <h2 className="py-4 text-xl font-bold">{'Wszystkie produkty'}</h2>
                <ProductGrid className={''}>
                    {products.map((product, i) => (
                        <ProductCard product={product} key={i} />
                    ))}
                </ProductGrid>
            </div>
        </div>
    )
}

Shop.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Shop
