/**
 * Get request util
 *
 * @param endpoint
 * @param defaultResponse
 * @return {Promise<*>}
 */
const getRequest = async (endpoint, defaultResponse = {}) => {
    const response = defaultResponse

    try {
        const {success, data} = await (await fetch(endpoint)).json()
        response.success = success
        response.data = data
    } catch (error) {
        console.log(`Error occurred when executing get request to endpoint ${endpoint}`, error)
    }

    return response
}

export {getRequest}