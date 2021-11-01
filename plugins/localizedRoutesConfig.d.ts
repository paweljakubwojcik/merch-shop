import { Redirect, Rewrite } from 'next/dist/lib/load-custom-routes'

export function getLocalizationConfig(options: {
    localizedRoutesMap: Record<string, string>
    defaultLocale: string
}): {
    rewrites: Rewrite[]
    redirects: Redirect[]
}
