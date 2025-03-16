// Example usage in a route or controller
const Controller = require('./Controller')
const logger = require('../logger')

class HealthController extends Controller {
    constructor() {
        super()
    }

    checkHealth = async (req, res) => {
        logger.info(`Received ${req.method} ${req.url}`)

        try {
            this.response(res, {})
        } catch (error) {
            logger.error(error.message)
            this.response(res, error, error.status)
        }
    }
}

module.exports = new HealthController()
