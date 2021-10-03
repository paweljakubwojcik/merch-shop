import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

type ProductCardProps = {
    product: ProductData
} & React.ComponentPropsWithoutRef<'div'>

export default function ProductCard({
    product: { name, slug, images, price },
    ...props
}: ProductCardProps) {
    return (
        <div {...props} className="max-w-md">
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
                        className="block transform group-hover:scale-75 transition-transform duration-200 delay-75 "
                    />
                </a>
            </Link>

            <div className="flex flex-wrap justify-between items-center h-10">
                <div className="font-bold">{name}</div>
                <div className="">{price}PLN</div>
            </div>
        </div>
    )
}
