import { gql } from '../lib/graphcms/graphcms-client'

export const PRODUCT_CARD_FRAGMENT = gql`
    fragment ProductCardFragment on Product {
        images(locales: [en]) {
            placeholderUrl: url(transformation: { image: { resize: { width: 10 } } })
            url(transformation: { image: { resize: { width: 800 } } })
            id
        }
        categories {
            id
            name
            slug
        }
        collections {
            id
            name
            slug
        }
        description
        name
        price
        slug
    }
`
export const CATEGORY_FRAGMENT = gql`
    fragment CategoryFragment on Category {
        id
        name
        slug
    }
`

export const COLLECTION_FRAGMENT = gql`
    fragment CollectionFragment on Collection {
        id
        name
        slug
    }
`
