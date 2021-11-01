
function getLocalizationConfig({ localizedRoutesMap, defaultLocale }) {
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
        (redirects, { locale, dictionary }) => [
            ...redirects,
            ...Object.entries(dictionary).reduce((acc, [def, foreign]) => {
                return [
                    ...acc,
                    {
                        source: `/${locale}/${def}/:param*`,
                        destination: `/${locale}/${foreign}/:param*`,
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

    return { redirects, rewrites }
}

module.exports = { getLocalizationConfig }
