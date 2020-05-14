const sites = [
    {
        siteId: 1,
        siteUrl: 'http://hans.test',
        siteLanguage: 'nl'
    },
    {
        siteId: 2,
        siteUrl: 'http://klaas.test',
        siteLanguage: 'en-US'
    }
]

/**
 * Get site data by blog id
 * @param id {number}
 * @return {*}
 */
const getSiteById = (id = 0) => {
    if (id === 0) return false
    const match = sites.findIndex((site) => parseInt(site.siteId) === parseInt(id))
    return match > -1 ? sites[match] : false
}

export {sites, getSiteById}