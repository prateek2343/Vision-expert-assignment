const Express = require('express')

const Router = Express.Router()
const health = require('./health')

Router.use(health)
module.exports = Router