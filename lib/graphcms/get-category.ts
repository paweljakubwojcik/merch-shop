import graphcmsClient, { gql } from './graphcms-client'
import { PRODUCT_CARD_FRAGMENT } from '../../graphql/fragments'

export const getCategoryQuery = gql`
    query Category($locale: Locale!, $slug: String!) {
        categories(where: { slug: $slug }, locales: [$locale]) {
            name
            products {
                ...ProductCardFragment
            }
        }
    }
    ${PRODUCT_CARD_FRAGMENT}
`

type CategoryResult = { [key: string]: { products: Array<ProductData>; name: string }[] }

async function getCategory({ locale = 'en', slug = '' }) {
    const {
        categories: [category],
    } = await graphcmsClient.request<CategoryResult>(getCategoryQuery, {
        locale,
        slug,
    })

    return category
}

export default getCategory
