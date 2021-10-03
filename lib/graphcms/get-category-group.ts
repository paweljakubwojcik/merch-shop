import graphcmsClient, { gql } from './graphcms-client'
import { CATEGORY_FRAGMENT } from '../../graphql/fragments'

export const getCategoryGroupQuery = gql`
    query CategoryGroup($slug: String!) {
        categoryGroups(where: { slug: $slug }, locales: [PL, en]) {
            name
            id
            categories {
                ...CategoryFragment
            }
        }
    }
    ${CATEGORY_FRAGMENT}
`

async function getCategoryGroup({ slug }: { slug: string }) {
    const {
        categoryGroups: [categoryGroup],
    } = await graphcmsClient.request<{
        categoryGroups: Array<CategoryGroup>
    }>(getCategoryGroupQuery, {
        slug,
    })

    return {
        categoryGroup,
    }
}

export default getCategoryGroup
