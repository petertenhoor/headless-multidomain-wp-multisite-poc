import Document, {Html, Head, Main, NextScript} from "next/document"

class CustomDocument extends Document {

    /**
     * Get lang from next data
     * @return {string|string}
     */
    getHtmlLangTag() {
        const site = this.props.__NEXT_DATA__.query.site
        return site && site !== false ? site.siteLanguage : 'en'
    }

    /**
     * Render lifecycle
     * @return {*}
     */
    render() {
        return (
            <Html lang={this.getHtmlLangTag()}>
                <Head/>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

export default CustomDocument