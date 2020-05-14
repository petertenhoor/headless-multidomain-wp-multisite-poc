import path from "path"
import fs from "fs"
import cacheManager from "cache-manager"
import fsStore from "cache-manager-fs-hash"

/**
 * class ApiCacheModel
 */
class ApiCacheModel {

    /**
     * Define diskCache
     * @type {null}
     */
    diskCache = null

    /**
     * Define cache path
     */
    cachePath = path.join(__dirname, '../../../cache/api')

    /**
     * ApiCacheModel constructor
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
        console.log('Resetting api cache..')
        return await this.diskCache.reset()
    }

    /**
     * Generate cache key based on request
     * @param url
     * @param responseBody
     * @returns {Promise<string>}
     */
    async generateCacheKey(url, responseBody) {
        return `api-cache_${url}_${JSON.stringify(responseBody)}`
    }

    /**
     * Fetch and cache data
     * @param url
     * @param responseBody
     * @param res
     * @param cache
     * @returns {Promise<void>}
     */
    async fetchAndCache(url = '', responseBody = {}, res, cache = false) {
        if (!url || url === '') res.status(200).send({success: false, data: "No URL given."})
        if (!responseBody) responseBody = {}

        const key = await this.generateCacheKey(url, responseBody)
        const data = await this.get(key)

        if (data !== false && cache !== false) {
            if (process.env.DEV === 'true') {
                console.log(`Serving api response from cache: ${key}`)
            }
            res.setHeader('x-cache', 'HIT')
            res.status(200).send(data)
            return
        }

        try {
            const options = {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(responseBody)
            }

            if (process.env.DEV === 'true') {
                const isNode = typeof (window) === "undefined"
                if (isNode) options.agent = new (require("https").Agent)({rejectUnauthorized: false})
            }

            const apiData = await (await fetch(url, options)).json()

            // Something is wrong with the request, let's skip the cache
            if (res.statusCode !== 200 || apiData.success === false || cache === false) {
                res.send(apiData)
                return
            }

            // Let's cache this api response
            await this.set(key, apiData)
            res.setHeader('x-cache', 'MISS')
            if (process.env.DEV === 'true') {
                console.log(`Missed api response cache: ${key}`)
            }
            res.status(200).send(apiData)
            return
        } catch (err) {
            res.status(500).send({
                success: false,
                data: `Something went wrong while proxying request to API: ${err.message} `
            })
            return
        }
    }
}

/**
 * Export model
 */
export default ApiCacheModel