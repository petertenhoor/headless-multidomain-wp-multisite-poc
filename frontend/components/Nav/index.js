import PropTypes from "prop-types"
import Link from "next/link"

import {sites} from "utils/multisite"

const Nav = ({pages}) => {
    return (
        <>

            <h3>Internal links</h3>

            <ul>
                {pages.map((page, index) => {
                    return (
                        <li key={`page_link_${index}`}>
                            <Link href={`/single-page?slug=${page.slug}`} as={`/${page.slug}`}>
                                <a>{page.heading}</a>
                            </Link>
                        </li>
                    )
                })}
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

Nav.defaultProps = {
    pages: []
}

Nav.propTypes = {
    pages: PropTypes.arrayOf(PropTypes.shape({
        slug: PropTypes.string.isRequired,
        heading: PropTypes.string,
        content: PropTypes.string
    }))
}

export default Nav