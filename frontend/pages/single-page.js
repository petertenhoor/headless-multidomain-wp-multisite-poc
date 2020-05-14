import {useSelector} from "react-redux"

import Nav from "components/Nav"

import {getPageData} from "models/pageModel"

const SinglePage = ({heading, content, pages}) => {
    const {siteId, siteUrl, siteLanguage} = useSelector(state => state)

    return (
        <div>
            <Nav pages={pages}/>

            <h1>{heading}</h1>

            <p>{content}</p>

            <div><small>Site ID: {siteId}</small></div>
            <div><small>Site url: {siteUrl}</small></div>
            <div><small>Site language: {siteLanguage}</small></div>

        </div>
    )
}

SinglePage.getInitialProps = async (context) => {
    const {success, data} = await getPageData(context.site, context.query.slug)
    //TODO catch 404 based on success
    return data
}

export default SinglePage