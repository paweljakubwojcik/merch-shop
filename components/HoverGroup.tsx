import React, { ComponentPropsWithoutRef, ReactNode, useEffect, useState } from 'react'

type HoverGroupProps<ItemType> = {
    itemClassNames?: string
    data: Array<ItemType>
    renderItem: (item: ItemType, i: number) => ReactNode
    Separator?: ReactNode
} & ComponentPropsWithoutRef<'div'>

const HoverGroup: <ItemType>(props: HoverGroupProps<ItemType>) => JSX.Element = ({
    className,
    itemClassNames,
    data,
    renderItem,
    Separator,
}) => {
    const [hovered, setHovered] = useState<number>()
    const [focused, setFocused] = useState<number>()

    return (
        <ul className={`flex group ${className}`}>
            {data.map((item, i) => {
                const index = i + 1
                return (
                    <React.Fragment key={index}>
                        {i !== 0 && Separator}
                        <li
                            className={`transition-opacity ${
                                (hovered || focused) && 'opacity-50'
                            } ${(hovered === index || focused === index) && 'opacity-100'}
                    ${itemClassNames}`}
                            onMouseEnter={() => setHovered(index)}
                            onFocusCapture={() => setFocused(index)}
                            onMouseLeave={() => setHovered(undefined)}
                            onBlurCapture={() => setFocused(undefined)}
                        >
                            {renderItem(item, i)}
                        </li>
                    </React.Fragment>
                )
            })}
        </ul>
    )
}

export default HoverGroup
