// set babel settings
var babelSettings = {presets: ['next/babel']}

// load babel
require('@babel/register')(babelSettings)
require('@babel/polyfill')

// include server and export as es module
const server = require('./server')
module.exports = server