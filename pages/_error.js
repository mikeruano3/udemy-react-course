import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

const indexPage = () => (
    <div>
        <h1>Oops, something went wrong.</h1>
        <p>Try <Link href="/auth"><a>going back</a></Link>.</p>
    </div>
)

export default indexPage