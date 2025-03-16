
const Service = require('./Service')
const config = require('./config/service.config')
const db = require('./sequelize')
const models = require('./models/models')

//add routes
const routes = require('./router/router')

class HDBCatalogService extends Service {
    constructor(name) {
        super(name)
        this.initRoutes()
    }

    initRoutes() {
        /* Load the middleware */
        this.App.use(config.SERVICE_BASE, routes)
    }

    async start() {
        super.start()
    }
}

module.exports = HDBCatalogService
