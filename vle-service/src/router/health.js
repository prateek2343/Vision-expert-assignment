const HealthController = require('../controller/health')
const Express = require('express')
const Router = Express.Router()

/* List all routes here*/

Router.get('/health', HealthController.checkHealth)

module.exports = Router
