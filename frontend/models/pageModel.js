import {getRequest} from "./abstractModel"

/**
 * Get all pages
 * @param site
 * @return {Promise<*>}
 */
const getPages = async(site) => await getRequest(`${site.siteUrl}/api/${site.siteId}/pages`)

/**
 * Get page by slug
 * @param site
 * @param slug
 * @return {Promise<*>}
 */
const getPageData = async (site, slug) => await getRequest(`${site.siteUrl}/api/${site.siteId}/page/${slug}`)

export {getPages, getPageData}