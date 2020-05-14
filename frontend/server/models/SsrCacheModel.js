import path from "path"
import fs from "fs"
import cacheManager from "cache-manager"
import fsStore from "cache-manager-fs-hash"
import {minify} from "html-minifier"

/**
 * class SsrCacheModel
 */
class SsrCacheModel {

    /**
     * Define diskCache
     * @type {null}
     */
    diskCache = null

    /**
     * Define cache path
     */
    cachePath = path.join(__dirname, '../../../cache/ssr')

    /**
     * SsrCacheModel constructor
     */
    constructor() {
        //create cache folder if it does not exist
        if (!fs.existsSync(this.cachePath)) fs.mkdirSync(this.cachePath, {recursive: true})

        this.diskCache = cacheManager.caching({
            store: fsStore,
            options: {
                ttl: 2592000, //1 month in seconds
                path: this.cachePath,
                subdirs: false
            }
        })
    }

    /**
     * Attempt to Get a value from cache
     * Returns false if not set
     *
     * @param key
     * @returns {Promise<*>}
     */
    async get(key) {
        const cachedValue = await this.diskCache.get(key)
        return cachedValue !== undefined ? cachedValue : false
    }

    /**
     * Set new value in cache
     *
     * @param key
     * @param value
     * @returns {Promise<*>}
     */
    async set(key, value) {
        return await this.diskCache.set(key, value)
    }

    /**
     * Reset cache
     * @returns {Promise<*>}
     */
    async reset() {
        console.log('Resetting ssr cache..')
        return await this.diskCache.reset()
    }

    /**
     * Generate cache key based on request
     * @param req
     * @param siteId {string}
     * @returns {Promise<string>}
     */
    async generateCacheKey(req, siteId = 0) {
        return `ssr-cache_${siteId}_${req.path}_${JSON.stringify(req.query)}`
    }

    /**
     * Handle and cache dynamic route
     *
     * @param app
     * @param req
     * @param res
     * @param path
     * @param query
     * @param cache
     * @returns {Promise<void>}
     */
    async renderAndCacheDynamic(app, req, res, path, query, cache = false) {
        const key = await this.generateCacheKey(req, query.site.siteId)
        const data = await this.get(key)

        // If we have a page in the cache, let's serve it
        if (data !== false && cache !== false) {
            if (process.env.DEV === 'true') {
                console.log(`Serving dynamic route from cache: ${key}`)
            }
            res.setHeader('x-cache', 'HIT')
            res.send(data)
            return
        }

        try {
            // If not let's render the page into HTML
            let html = await app.renderToHTML(req, res, path, query)

            // Something is wrong with the request or caching is disabled, let's skip the cache
            if (res.statusCode !== 200 || cache === false) {
                res.send(html)
                return
            }

            //TODO encrypt e-mail addresses

            //minify html
            html = minify(html, {
                removeComments: true,
                collapseWhitespace: false,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                minifyJS: true,
                minifyCSS: true
            })

            // Let's cache this page
            await this.set(key, html)

            res.setHeader('x-cache', 'MISS')
            if (process.env.DEV === 'true') {
                console.log(`Missed dynamic route: ${key}`)
            }

            res.send(html)

        } catch (err) {
            app.renderError(err, req, res, path, query)
        }
    }
}

/**
 * Export model
 */
export default SsrCacheModel