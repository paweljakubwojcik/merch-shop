type SideMenuProps = {
    collections: Array<Collection>
    categories: Array<Category>
}

const SideMenu = ({ collections, categories }: SideMenuProps) => {
    return (
        <aside className="sticky top-0 left-0 text-sm flex-shrink-0 m-8 hidden md:block">
            <section>
                <h3>Collections</h3>
                <ul>
                    {collections.map((collection) => (
                        <ListElement data={collection} key={collection.id} />
                    ))}
                </ul>
            </section>
            <section>
                <h3>Categories</h3>
                <ul>
                    {categories.map((category) => (
                        <ListElement data={category} key={category.id} />
                    ))}
                </ul>
            </section>
        </aside>
    )
}

type ListElementProps = {
    data: Collection | Category
}

const ListElement = ({ data }: ListElementProps) => <li>{data.name}</li>

export default SideMenu
