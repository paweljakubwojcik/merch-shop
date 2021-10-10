const { i18n } = require('./next-i18next.config')

const localizedRoutesPL = require('./public/locales/PL/routes.json')

const rewrites = Object.entries(localizedRoutesPL).map(([eng, pl]) => ({
    source: `/PL/${pl}/:slug*`,
    destination: `/PL/${eng}/:slug*`,
    locale: false,
}))

const redirects = Object.entries(localizedRoutesPL).reduce((acc, [eng, pl]) => {
    return [
        ...acc,
        {
            source: `/PL/${eng}/:param*`,
            destination: `/PL/${pl}/:param*`,
            locale: false,
            permanent: true,
        },
        {
            source: `/en/${pl}/:param*`,
            destination: `/en/${eng}`,
            permanent: true,
            locale: false,
        },
    ]
}, [])

/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    i18n,
    images: {
        domains: ['media.graphcms.com'],
    },
    async rewrites() {
        return rewrites
    },
    async redirects() {
        return redirects
    },
}
