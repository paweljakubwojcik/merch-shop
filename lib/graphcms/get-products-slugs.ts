import graphcmsClient, { gql } from './graphcms-client'

export const getProductsSlugsQuery = gql`
    query ProductsSlugs($locale: Locale!) {
        products(locales: [$locale]) {
            slug
        }
    }
`

async function getProductsSlugs({ locale = 'en' }) {
    const { products } = await graphcmsClient.request<{
        products: Array<Pick<ProductData, 'slug'>>
    }>(getProductsSlugsQuery, {
        locale,
    })

    return {
        slugs: products.map((p) => p.slug),
    }
}

export default getProductsSlugs
