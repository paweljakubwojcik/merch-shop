import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'

type ProductCardProps = {
    product: ProductData
} & React.ComponentPropsWithoutRef<'div'>

export default function ProductCard({
    product: { name, slug, images, price },
    ...props
}: ProductCardProps) {
    const { t } = useTranslation(['routes'])
    return (
        <div {...props} className="max-w-md w-full">
            <Link href={`/${t('product')}/${slug}`}>
                <a className="relative group cursor-pointer  block">
                    <div className="absolute w-full h-full filter saturate-0">
                        <Image
                            src={images[0].url}
                            blurDataURL={images[0].placeholderUrl}
                            placeholder={'blur'}
                            alt={name}
                            width={200}
                            height={300}
                            layout="responsive"
                            className="transform scale-150 "
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
                        className="block transform group-hover:opacity-0 transition-opacity duration-500 delay-75 "
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
