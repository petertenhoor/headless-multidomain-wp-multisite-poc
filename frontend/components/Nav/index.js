import Link from "next/link"

import {wrapper} from "redux/store"

import {sites} from "utils/multisite"

const Nav = () => {
    return (
        <>

            <h3>Internal links</h3>

            <ul>

                <li>
                    <Link href={`/home-page`} as={`/`}>
                        <a>Home</a>
                    </Link>
                </li>

                <li>
                    <Link href={`/single-page?slug=about`} as={`/about`}>
                        <a>About</a>
                    </Link>
                </li>

            </ul>

            <h3>External links</h3>

            <ul>
                {sites.map((site) => {
                    return (
                        <li key={`site_link_${site.siteId}`}>
                            <a href={site.siteUrl}>
                                {site.siteUrl}
                            </a>
                        </li>
                    )
                })}
            </ul>

        </>
    )
}

export default wrapper.withRedux(Nav)