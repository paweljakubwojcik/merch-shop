import graphcmsClient, { gql } from './graphcms-client'
import { COLLECTION_FRAGMENT } from '../../graphql/fragments'

export const getAllCollectionsQuery = gql`
    query AllCollections($locale: Locale!) {
        collections(locales: [$locale]) {
            ...CollectionFragment
        }
    }
    ${COLLECTION_FRAGMENT}
`

async function getAllCollections({ locale = 'en' }) {
    const { collections } = await graphcmsClient.request<{ collections: Array<Collection> }>(
        getAllCollectionsQuery,
        {
            locale,
        }
    )

    return {
        collections,
    }
}

export default getAllCollections
