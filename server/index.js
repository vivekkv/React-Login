var express = require("express")
var app = express()

const webpack = require('webpack')
const webpackMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const config = require('../webpack.config.js')
const compiler = webpack(config)
const middleware = webpackMiddleware(compiler, {
publicPath: config.output.publicPath,
stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
}
})

app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('/', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  res.end()
})

app.use('/assets', express.static(path.join(__dirname, './assets')))
var server = app.listen(3000, "localhost", (err) => {

    if (err) {
        return onError(err)
    }

    var socket = require("socket.io")
    var io = socket(server)
    require('./socket').init(io)
    console.log("SERVER STARTED !")
})