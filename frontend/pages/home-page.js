import {useSelector} from "react-redux"

import Nav from "components/Nav"

import {wrapper} from "redux/store"

const HomePage = () => {
    const {siteId, siteUrl, siteLanguage} = useSelector((state) => state)
    return (
        <div>
            <h1>Home Page</h1>
            <p>Site ID: {siteId}</p>
            <p>Site URL: {siteUrl}</p>
            <p>Site language: {siteLanguage}</p>
            <Nav/>
        </div>
    )
}

export default wrapper.withRedux(HomePage)