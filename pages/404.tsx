import React from 'react'
import Link from 'next/link'

export default function Custom404() {
    return (
        <div className="flex flex-col h-screen container items-center justify-center m-auto">
            <h1>Oops</h1>
            <p>this place does not exist</p>
            <Link href={'/'}>
                <a>Go to homepage</a>
            </Link>
        </div>
    )
}
