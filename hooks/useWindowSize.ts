import { useEffect, useState } from "react"

const isBrowser = typeof window !== 'undefined'

export default function useWindowSize() {
    const [size, setSize] = useState(
        isBrowser
            ? {
                  width: window?.innerWidth,
                  height: window?.innerHeight,
              }
            : { width: 1400, height: 800 }
    )

    const updateSizes = () => {
        setSize({
            width: window?.innerWidth,
            height: window?.innerHeight,
        })
    }

    useEffect(() => {
        if (isBrowser) window.addEventListener('resize', updateSizes)

        return () => {
            if (isBrowser) window.removeEventListener('resize', updateSizes)
        }
    }, [])

    return size
}
