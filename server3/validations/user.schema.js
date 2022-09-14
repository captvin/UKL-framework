const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    name: Joi.string(),
    username: Joi.string(),
    password: Joi.string(),
    id_outlet: Joi.number(),
    role: Joi.string().valid('admin','kasir','owner')

}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateUserSchema: ValidateSchema(UpdateSchema),
    CreateUserSchema: ValidateSchema(CreateSchema)
}