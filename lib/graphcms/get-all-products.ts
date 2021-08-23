import graphcmsClient, { gql } from './graphcms-client'
import { PRODUCT_CARD_FRAGMENT } from './graphql-fragments'

export const getAllProductsQuery = gql`
    query AllProductsQuery($locale: Locale!) {
        products(locales: [$locale]) {
            ...ProductCardFragment
        }
    }
    ${PRODUCT_CARD_FRAGMENT}
`

async function getAllProducts({ locale = 'en' }) {
    const { products } = await graphcmsClient.request<{ products: Array<ProductData> }>(
        getAllProductsQuery,
        {
            locale,
        }
    )

    return {
        products,
    }
}

export default getAllProducts
