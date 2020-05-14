import express from "express"
import next from "next"
import compression from "compression"
import cors from "cors"
import helmet from "helmet"
import bodyParser from "body-parser"
import favicon from "serve-favicon"
import {config} from "dotenv"
import {join} from "path"

import SsrCacheModel from "./models/SsrCacheModel"
import ApiCacheModel from "./models/ApiCacheModel"

import withSiteData from "./middlewares/withSiteData"

//import fake data
import {getPages, getPageBySlug} from "./data/pages"

const server = express()
const dev = process.env.NODE_ENV !== 'production'
const app = next({dir: '.', dev})
const handle = app.getRequestHandler()

//read .env file
config({path: __dirname + '/./../../.env'})

const SsrCacheModelInstance = new SsrCacheModel()
const ApiCacheModelInstance = new ApiCacheModel()

//add generic middlewares
server.use(compression({threshold: 0}))
server.use(cors())
server.use(helmet())
server.use(bodyParser.json())

/**
 * Redirect all pages to non trailing slash pages
 */
server.use((req, res, next) => {
    const test = /\?[^]*\//.test(req.url)
    if (req.url.substr(-1) === '/' && req.url.length > 1 && !test) res.redirect(301, req.url.slice(0, -1))
    else next()
})

//serve favicon
server.use(favicon(join(__dirname, '..', 'public', 'static', 'favicon.ico')))

app.prepare().then(() => {

    //handle static next.js assets with their handler
    server.get('/static/*', async (req, res) => handle(req, res))
    server.get('/_next/*', async (req, res) => handle(req, res))

    //pages api endpoint
    server.get('/api/:siteId/pages', async (req, res) => {
        const siteId = parseInt(req.params.siteId)
        const data = await getPages(siteId)
        if (data !== false) return res.json({success: true, data})
        return res.status(404).send(`No pages data found for siteId ${siteId}.`)
    })

    //page api endpoint
    server.get('/api/:siteId/page/:slug', async (req, res) => {
        const siteId = parseInt(req.params.siteId)
        const slug = req.params.slug
        const data = await getPageBySlug(siteId, slug)
        if (data !== false) return res.json({success: true, data})
        return res.status(404).send(`No page data found for siteId ${siteId} and slug ${slug}.`)
    })

    //handle home route
    server.get(`/`, withSiteData, async (req, res) => {
        return await SsrCacheModelInstance.renderAndCacheDynamic(app, req, res, '/single-page', {
            slug: '',
            site: res.site
        }, !dev)
    })

    //handle page routes
    server.get('/*', withSiteData, async (req, res) => {
        return await SsrCacheModelInstance.renderAndCacheDynamic(app, req, res, '/single-page', {
            slug: req.params[0],
            site: res.site
        }, !dev)
    })
})

server.listen(process.env.FRONTEND_PORT, '127.0.0.1', async (err) => {
    if (err) throw err
    await SsrCacheModelInstance.reset()
    await ApiCacheModelInstance.reset()
    console.log(`> Server is now running on http://127.0.0.1:${process.env.FRONTEND_PORT}`)
})