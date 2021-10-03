import graphcmsClient, { gql } from './graphcms-client'
import { CATEGORY_FRAGMENT } from '../../graphql/fragments'

export const getAllCategoriesQuery = gql`
    query AllCategories($locale: Locale!) {
        categoryGroups(locales: [$locale]) {
            id
            name
            slug
            categories {
                ...CategoryFragment
            }
        }
    }
    ${CATEGORY_FRAGMENT}
`

async function getAllCategories({ locale = 'en' }) {
    const { categoryGroups } = await graphcmsClient.request<{
        categoryGroups: Array<CategoryGroup>
    }>(getAllCategoriesQuery, {
        locale,
    })

    return {
        categoryGroups,
    }
}

export default getAllCategories
