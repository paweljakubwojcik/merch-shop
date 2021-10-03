import { useEffect, useState } from 'react'
import { X as XIcon } from 'react-feather'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import HoverGroup from './HoverGroup'

type SideMenuProps = {
    categories: Array<CategoryGroup>
}

const SideMenu = ({ categories }: SideMenuProps) => {
    const { pathname } = useRouter()
    const [open, setOpen] = useState(false)
    useEffect(() => {
        setOpen(false)
    }, [pathname])

    return (
        <aside
            className={`fixed z-20 left-0 text-sm flex-shrink-0 p-8 block bg-white transform ${
                open ? 'translate-x-0' : '-translate-x-full'
            } transition-transform h-full shadow-lg
                md:sticky md:translate-x-0 md:top-20 md:shadow-none
            `}
        >
            <button
                className={`absolute right-0 top-0 transform transition-transform p-2 md:hidden`}
                onClick={() => setOpen(false)}
            >
                <XIcon size={28} />
            </button>
            <button
                onClick={() => setOpen(true)}
                className={`absolute right-0 top-1/2 transform transition-transform 
                 md:hidden text-xs bg-white rotate-90 origin-bottom-right p-1 z-negative
                 ${open ? 'opacity-0' : ''}`}
            >
                side menu
            </button>
            {categories.map(({ id, slug, name, categories }) => (
                <SectionDiv key={id}>
                    <h3 className="font-bold">
                        <Link href={slug}>{name}</Link>
                    </h3>
                    <HoverGroup
                        data={categories}
                        renderItem={({ name, categoryGroup, slug }) => <Link href={`/shop/${categoryGroup.slug}/${slug}`}>{name}</Link>}
                        className={'flex-col'}
                        itemClassNames={'my-4 ml-2'}
                    />
                </SectionDiv>
            ))}
        </aside>
    )
}

const SectionDiv: React.FC = ({ children }) => <section className="my-8">{children}</section>

export default SideMenu
