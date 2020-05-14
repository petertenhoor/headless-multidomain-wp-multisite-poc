import {getSiteById} from "../../utils/multisite"

module.exports = async (req, res, next) => {
    res.site = getSiteById(parseInt(req.header('blogid')))
    return next()
}