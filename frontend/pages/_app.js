import {wrapper} from "redux/store"
import {SET_SITE_DATA} from "redux/actions/actions"

const CustomApp = ({Component, pageProps}) => <Component {...pageProps} />

CustomApp.getInitialProps = async ({Component, ctx}) => {
    const isServer = !!ctx.req

    //save site data in redux
    if (isServer) {
        const siteData = ctx.query.site
        ctx.store.dispatch({type: SET_SITE_DATA, payload: siteData})
    }

    return {
        pageProps: {
            ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
            pathname: ctx.pathname
        }
    }
}

export default wrapper.withRedux(CustomApp)