import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config.js' // Fix the path

const {
    theme: { screens },
} = resolveConfig(tailwindConfig as any)

type Breakpoints = {
    [P in keyof NonNullable<typeof screens>]: number
}

export default function useBreakpoints() {
    const breakpoints = Object.fromEntries(
        Object.entries(screens!).map(([key, value]) => [key, parseInt(value.replace('px', ''))])
    )
    return { breakpoints: breakpoints as Breakpoints }
}
