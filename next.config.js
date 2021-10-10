const { i18n } = require('./next-i18next.config')

const localizedRoutesPL = require('./public/locales/PL/routes.json')

const defaultLocale = i18n.defaultLocale

const localizedRoutesMap = [
    {
        locale: 'PL',
        dictionary: localizedRoutesPL,
    },
]

const rewrites = localizedRoutesMap.reduce(
    (rewrites, { locale, dictionary }) => [
        ...rewrites,
        ...Object.entries(dictionary).map(([def, foreign]) => ({
            source: `/${locale}/${foreign}/:slug*`,
            destination: `/${locale}/${def}/:slug*`,
            locale: false,
        })),
    ],
    []
)

const redirects = localizedRoutesMap.reduce(
    (rewrites, { locale, dictionary }) => [
        ...rewrites,
        ...Object.entries(dictionary).reduce((acc, [def, foreign]) => {
            return [
                ...acc,
                {
                    source: `/${locale}/${def}/:param*`,
                    destination: `/${locale}/${pl}/:param*`,
                    locale: false,
                    permanent: true,
                },
                {
                    source: `/${defaultLocale}/${foreign}/:param*`,
                    destination: `/${defaultLocale}/${def}`,
                    permanent: true,
                    locale: false,
                },
            ]
        }, []),
    ],
    []
)

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
