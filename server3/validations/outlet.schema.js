const Joi = require('joi')
const ValidateSchema = require('@middlewares/validate-schema')

const schema = {
    name: Joi.string(),
    alamat: Joi.string()
}

const UpdateSchema = Joi.object(schema)
const CreateSchema = UpdateSchema.fork(Object.keys(schema), field => field.required())

module.exports = {
    UpdateOutletSchema: ValidateSchema(UpdateSchema),
    CreateOutletSchema: ValidateSchema(CreateSchema)
}

