const pagesHans = [
    {
        slug: 'home',
        heading: 'Ik ben Hans',
        content: 'Home content van Hans. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Donec elementum ligula eu sapien consequat eleifend. Donec nec dolor erat, condimentum sagittis sem. Praesent porttitor porttitor risus, dapibus rutrum ipsum gravida et. Integer lectus nisi, facilisis sit amet eleifend nec.'
    },
    {
        slug: 'over-ons',
        heading: 'Over Hans',
        content: 'Hans is een kei gave gozert.'
    },
    {
        slug: 'contact',
        heading: 'Contact met Hans',
        content: 'Stuur maar een e-mail ofzo.'
    },
]

const pagesKlaas = [
    {
        slug: 'home',
        heading: 'I am Klaas',
        content: 'Home content by Klaas. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Donec elementum ligula eu sapien consequat eleifend. Donec nec dolor erat, condimentum sagittis sem. Praesent porttitor porttitor risus, dapibus rutrum ipsum gravida et. Integer lectus nisi, facilisis sit amet eleifend nec.'
    },
    {
        slug: 'over-klaas',
        heading: 'Over Klaas',
        content: 'Klaas is uniek.'
    },
    {
        slug: 'contact-met-klaas',
        heading: 'Mail Klaas',
        content: 'Een postduif is ook goed'
    },
]

/**
 *
 * @param blogId
 * @return {Promise<boolean|*>}
 */
const getPages = async (blogId) => {
    switch (blogId) {
        case 1:
            return pagesHans
        case 2:
            return pagesKlaas
        default:
            return false
    }
}

/**
 * Get page by slug
 * @param blogId {number}
 * @param slug {string}
 * @return {Promise<boolean|*>}
 */
const getPageBySlug = async (blogId, slug) => {
    switch (blogId) {
        case 1:
            const pageMatchHans = pagesHans.findIndex((page) => page.slug === slug)
            return pageMatchHans > -1 ? pagesHans[pageMatchHans] : false
        case 2:
            const pageMatchKlaas = pagesKlaas.findIndex((page) => page.slug === slug)
            return pageMatchKlaas > -1 ? pagesKlaas[pageMatchKlaas] : false
        default:
            return false
    }
}

export {getPageBySlug, getPages}