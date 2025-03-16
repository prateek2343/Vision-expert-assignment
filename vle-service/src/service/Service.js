const { Op } = require('sequelize')
const logger = require('../logger')
const Sequelize = require('sequelize')
const HTTPError = require('../exceptions/HTTPError')
const HTTPNotFound = require('../exceptions/HTTPNotFound')
const HTTPBadRequest = require('../exceptions/HTTPBadRequest')
const HTTPInternalServerError = require('../exceptions/HTTPInternalServerError')
const ValidationError = Sequelize.ValidationError
const DatabaseError = Sequelize.DatabaseError

class Service {
    constructor(model) {
        this.model = model
    }

    async getAll(queryParams) {
        try {

            const { filter = {}, search, sortField, sortOrder, limit, offset = 0 } = queryParams
            const attributes = this.model.getAttributes()
            const searchableColumns = [], dateTimeColumns = []

            for (const [key, value] of Object.entries(attributes)) {
                if (value.type instanceof Sequelize.DATE ||
                    value.type instanceof Sequelize.BOOLEAN) {
                    dateTimeColumns.push(key)
                    continue
                }
                searchableColumns.push(key)
            }

            filter.deleted = filter.deleted ?? false

            const fullQuery = [];
            // Include existing filter conditions
            for (const key in filter) {
                if (filter[key] == "null") {
                    fullQuery.push({ [key]: { [Op.is]: null } })
                }
                else {
                    fullQuery.push({ [key]: filter[key] })
                }
            }

            if (search) {
                const searchQuery = []
                searchableColumns.forEach((column) => {
                    searchQuery.push({ [column]: { [Op.like]: `%${search}%` } })
                })
                fullQuery.push({
                    [Op.or]: searchQuery,
                })
            }

            const query = {}
            query.where = { [Op.and]: fullQuery }

            // Apply searching
            if (search) {
                query.where = { [Op.and]: fullQuery }
            }

            // Apply sorting
            if (sortField) {
                const direction = ['asc', 'desc'].includes(sortOrder?.toLowerCase()) ? sortOrder : 'asc';
                query.order = [[sortField, direction]];
            }

            // Apply pagination
            if (limit) {
                query.limit = parseInt(limit)
                query.offset = parseInt(offset)
            }

            const result = await this.model.findAndCountAll(query)

            if (result.length == 0)
                throw new HTTPNotFound()

            return result
        } catch (error) {
            this.handle(error)
        }
    }

    async get(id) {
        try {
            const result = await this.findById(id)

            if (!result)
                throw new HTTPNotFound(`Not Found <${id}>`)

            return result
        } catch (error) {
            this.handle(error)
        }
    }

    async post(data) {
        try {
            const result = await this.model.create(data)

            if (!result)
                throw new HTTPInternalServerError(`Failed to post data`)

            return result
        }
        catch (error) {
            this.handle(error)
        }
    }

    async put(data) {
        throw new HTTPForbidden()
    }

    async patch(id, data) {
        try {
            const result = await this.findById(id)

            if (!result)
                throw new HTTPNotFound(`Record not found <${id}>`)

            await this.model.update(
                { ...result, ...data },
                {
                    where: { id: parseInt(id) },
                    returning: true, // Return the updated record
                    plain: true, // Return only the plain JSON object
                }
            )
            return await this.findById(id)
        } catch (error) {
            this.handle(error)
        }
    }

    async delete(id) {
        try {
            const result = await this.findById(id)

            if (!result)
                throw new HTTPNotFound(`Record not found <${id}>`)

            await this.model.update(
                {
                    deleted: true,
                },
                {
                    where: {
                        id: id,
                    },
                },
            )

            result.deleted = true

            return result
        } catch (error) {
            throw error
        }
    }

    findById = async (id) => {
        const result = await this.model.findOne({
            where: Sequelize.and({ deleted: 0 }, { id: id }),
        })
        return result
    }

    handle(err) {
        if (err instanceof HTTPError) {
            throw err
        }
        if (err instanceof ValidationError) {
            //let error = err.errors[0]
            throw new HTTPBadRequest(err.message)
        }
        if (err instanceof DatabaseError) {
            //let error = err.errors[0]
            throw new HTTPInternalServerError(err.message)
        }
        // if (err instanceof Error) {
        //     throw new HTTPInternalServerError(err.message)
        // }
        throw new HTTPInternalServerError(err.message)

    }
}

module.exports = Service
