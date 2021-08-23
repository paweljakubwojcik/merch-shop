import { gql } from './graphcms-client'

export const PRODUCT_CARD_FRAGMENT = gql`
    fragment ProductCardFragment on Product {
        images(locales: [en]) {
            placeholderUrl: url(transformation: { image: { resize: { width: 10 } } })
            url(transformation: { image: { resize: { width: 600 } } })
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
