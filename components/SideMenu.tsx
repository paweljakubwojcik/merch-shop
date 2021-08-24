import { useState } from 'react'
import Button from './Button'

type SideMenuProps = {
    collections: Array<Collection>
    categories: Array<Category>
}

const SideMenu = ({ collections, categories }: SideMenuProps) => {
    const [open, setOpen] = useState(false)

    return (
        <aside
            className={`fixed z-20 left-0 text-sm flex-shrink-0 p-8 block bg-white transform ${
                open ? 'translate-x-0' : '-translate-x-full'
            } transition-transform h-full 
                md:sticky md:translate-x-0 md:top-20 
            `}
        >
            <Button
                className={`absolute left-full top-0 transform ${
                    open ? '-translate-x-full' : 'translate-x-0'
                } transition-transform md:hidden`}
                onClick={() => setOpen((v) => !v)}
            >
                Open
            </Button>
            <SectionDiv>
                <h3 className="font-bold">Collections</h3>
                <ul>
                    {collections.map((collection) => (
                        <ListElement data={collection} key={collection.id} />
                    ))}
                </ul>
            </SectionDiv>
            <SectionDiv>
                <h3 className="font-bold">Categories</h3>
                <ul>
                    {categories.map((category) => (
                        <ListElement data={category} key={category.id} />
                    ))}
                </ul>
            </SectionDiv>
        </aside>
    )
}

const SectionDiv: React.FC = ({ children }) => <section className="my-8">{children}</section>

type ListElementProps = {
    data: Collection | Category
}

const ListElement = ({ data }: ListElementProps) => <li className="my-4 ml-2">{data.name}</li>

export default SideMenu
