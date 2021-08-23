import graphcmsClient, { gql } from './graphcms-client'
import { CATEGORY_FRAGMENT, PRODUCT_CARD_FRAGMENT } from '../../graphql/fragments'

export const getAllCategoriesQuery = gql`
    query AllCategories($locale: Locale!) {
        categories(locales: [$locale]) {
            ...CategoryFragment
        }
    }
    ${CATEGORY_FRAGMENT}
`

async function getAllCategories({ locale = 'en' }) {
    const { categories } = await graphcmsClient.request<{ categories: Array<Collection> }>(
        getAllCategoriesQuery,
        {
            locale,
        }
    )

    return {
        categories,
    }
}

export default getAllCategories
