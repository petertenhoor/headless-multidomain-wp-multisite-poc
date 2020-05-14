const withPlugins = require('next-compose-plugins')
const withTM = require('@weco/next-plugin-transpile-modules')
const withBundleAnalyzer = require('@next/bundle-analyzer')({enabled: process.env.ANALYZE === 'true'})

const nextConfig = {
    useFileSystemPublicRoutes: false,
    webpack: (config) => {

        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack']
        })

        //add polyfills
        const originalEntry = config.entry
        config.entry = async () => {
            const entries = await originalEntry()
            if (entries['main.js'] && !entries['main.js'].includes('./polyfills.js')) entries['main.js'].unshift('./polyfills.js')
            return entries
        }

        return config
    }
}

module.exports = withPlugins([
    [withTM, {transpileModules: []}],
    withBundleAnalyzer,
], nextConfig);