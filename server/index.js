var express = require("express")
var app = express()
var path = require("path")
const bodyParser = require('body-parser');
const passport = require('passport');

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

app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(middleware)
app.use(webpackHotMiddleware(compiler))
app.get('/', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')))
  res.end()
})

// load passport strategies

const localLoginStrategy = require('./passport/local-login');


passport.use('local-login', localLoginStrategy);

const authCheckMiddleware = require('./middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
// const authRoutes = require('./routes/auth');
// const apiRoutes = require('./routes/api');
// app.use('/api', apiRoutes);

app.use('/auth', require('./routes/auth'));
app.use('/assets', express.static(path.join(__dirname, './assets')))
var server = app.listen(3000, "localhost", (err) => {
    if (err) {
        return onError(err)
    }
    console.log("SERVER STARTED !")
})