import {wrapper} from "redux/store"
import {SET_SITE_DATA} from "redux/actions/actions"

import {getPages} from "models/pageModel"

const CustomApp = ({Component, pageProps}) => <Component {...pageProps} />

CustomApp.getInitialProps = async ({Component, ctx}) => {
    const isServer = !!ctx.req
    let siteData = {}

    //save site data in redux
    if (isServer) {
        siteData = ctx.query.site
        await ctx.store.dispatch({type: SET_SITE_DATA, payload: siteData})
    } else {
        const {siteId, siteUrl, siteLanguage} = await ctx.store.getState()
        siteData = {siteId, siteUrl, siteLanguage}
    }

    ctx.site = siteData

    //fetch pages data
    const {data, success} = await getPages(siteData)

    return {
        pageProps: {
            pages: data,
            siteData,
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
        }
    }
}

export default wrapper.withRedux(CustomApp)