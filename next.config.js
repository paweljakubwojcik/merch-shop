const { i18n } = require('./next-i18next.config')
const { getLocalizationConfig } = require('./plugins/localizedRoutesConfig')
const localizedRoutesPL = require('./public/locales/PL/routes.json')

const defaultLocale = i18n.defaultLocale

const localizedRoutesMap = [
    {
        locale: 'PL',
        dictionary: localizedRoutesPL,
    },
]

const { redirects, rewrites } = getLocalizationConfig({ localizedRoutesMap, defaultLocale })

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
