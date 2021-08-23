/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    i18n: {
        locales: ['PL', 'en'],
        defaultLocale: 'en',
        localeDetection: false,
    },
    images: {
        domains: ['media.graphcms.com'],
    },
}
