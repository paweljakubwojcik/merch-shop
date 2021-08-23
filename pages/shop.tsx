import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { ReactElement } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import ProductGrid from '../components/ProductGrid'
import SideMenu from '../components/SideMenu'
import getAllCategories from '../lib/graphcms/get-all-categories'
import getAllCollections from '../lib/graphcms/get-all-collections'
import getAllProducts from '../lib/graphcms/get-all-products'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps: GetStaticProps<{
    products: Array<ProductData>
    collections: Array<Collection>
    categories: Array<Category>
}> = async function ({ locale = 'en' }) {
    const { products } = await getAllProducts({ locale })
    const { categories } = await getAllCategories({ locale })
    const { collections } = await getAllCollections({ locale })

    return {
        props: {
            products,
            categories,
            collections,
            ...(await serverSideTranslations(locale, ['common'])),
        }, // will be passed to the page component as props
    }
}

const Shop: NextPageWithLayout<InferGetStaticPropsType<typeof getStaticProps>> = ({
    products,
    collections,
    categories,
}) => {
    return (
        <div className="w-full flex">
            <SideMenu collections={collections} categories={categories} />
            <ProductGrid>
                {products.map((product, i) => (
                    <ProductCard product={product} key={i} />
                ))}
            </ProductGrid>
        </div>
    )
}

Shop.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Shop
