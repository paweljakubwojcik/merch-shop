import graphcmsClient, { gql } from './graphcms-client'

export const getCollectionsSlugsQuery = gql`
    query CollectionsSlugs($locale: Locale!) {
        collections(locales: [$locale]) {
            slug
        }
    }
`

async function getCollectionsSlugs({ locale = 'en' }) {
    const { collections } = await graphcmsClient.request<{
        collections: Array<Pick<Collection, 'slug'>>
    }>(getCollectionsSlugsQuery, {
        locale,
    })

    return {
        slugs: collections.map((p) => p.slug),
    }
}

export default getCollectionsSlugs
