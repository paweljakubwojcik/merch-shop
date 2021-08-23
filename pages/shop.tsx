import { GetStaticProps } from 'next'
import Link from 'next/link'
import { ReactElement } from 'react'
import Image from 'next/image'
import Layout from '../components/Layout'
import getAllProducts from '../lib/graphcms/get-all-products'

const Shop: NextPageWithLayout<{ products: Array<ProductData> }> = ({ products }) => {
    return (
        <div className="w-full flex">
            <Categories />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full m-4">
                {products.map(({ name, slug, images, price }, i) => (
                    <div key={i}>
                        <Link href={`/product/${slug}`}>
                            <a className="relative group cursor-pointer  block">
                                <div className="absolute w-full h-full">
                                    <Image
                                        src={images[0].placeholderUrl}
                                        alt={name}
                                        width={200}
                                        height={300}
                                        layout="responsive"
                                        className="filter blur-lg brightness-90 transform scale-125 "
                                    />
                                </div>
                                <Image
                                    src={images[0].url}
                                    placeholder={'blur'}
                                    blurDataURL={images[0].placeholderUrl}
                                    alt={name}
                                    width={200}
                                    height={300}
                                    layout="responsive"
                                    className="block transform group-hover:scale-75  transition-transform duration-200 delay-75 "
                                />
                            </a>
                        </Link>

                        <div className="flex flex-wrap justify-between items-center h-10">
                            <div className="font-bold">{name}</div>
                            <div className="">{price}PLN</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async function ({ locale = 'en' }) {
    const { products } = await getAllProducts({ locale })

    return {
        props: { products: products }, // will be passed to the page component as props
    }
}

const Categories = () => {
    return (
        <div className="sticky top-0 left-0 text-sm flex-shrink-0 m-8 hidden md:block">
            <ul>
                <li>
                    <h4>Kategoria 1</h4>
                    <ul>
                        <li>
                            <h5>Kategoria 1</h5>
                            <ul>
                                <li>sub sub kategoria 1</li>
                                <li>sub sub kategoria 2</li>
                                <li>sub sub kategoria 3</li>
                                <li>sub sub kategoria 4</li>
                            </ul>
                        </li>
                        <li>
                            <h5>Kategoria 2</h5>
                            <ul>
                                <li>sub sub kategoria 1</li>
                                <li>sub sub kategoria 2</li>
                                <li>sub sub kategoria 3</li>
                                <li>sub sub kategoria 4</li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <h4>Kategoria 2</h4>
                    <ul>
                        <li>
                            <h5>sub Kategoria 1</h5>
                            <ul>
                                <li>sub sub kategoria 1</li>
                                <li>sub sub kategoria 2</li>
                                <li>sub sub kategoria 3</li>
                                <li>sub sub kategoria 4</li>
                            </ul>
                        </li>
                        <li>
                            <h5>sub Kategoria 2</h5>
                            <ul>
                                <li>sub sub kategoria 1</li>
                                <li>sub sub kategoria 2</li>
                                <li>sub sub kategoria 3</li>
                                <li>sub sub kategoria 4</li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

Shop.getLayout = function getLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
}

export default Shop
