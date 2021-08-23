import graphcmsClient, { gql } from './graphcms-client'
import { PRODUCT_CARD_FRAGMENT } from '../../graphql/fragments'

export const getProductBySlugQuery = gql`
    query ProductBySlug($locale: Locale!, $slug: String!) {
        products(where: { slug: $slug }, locales: [$locale]) {
            ...ProductCardFragment
        }
    }
    ${PRODUCT_CARD_FRAGMENT}
`

async function getProductBySlug({ locale = 'en', slug = '' }) {
    const { products: [product] = [] } = await graphcmsClient.request<{
        products: Array<ProductData>
    }>(getProductBySlugQuery, {
        locale,
        slug,
    })

    return {
        product,
    }
}

export default getProductBySlug
